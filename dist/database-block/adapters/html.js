import { DatabaseBlockSchema, } from '@blocksuite/affine-model';
import { BlockHtmlAdapterExtension, HastUtils, TextUtils, } from '@blocksuite/affine-shared/adapters';
import { nanoid } from '@blocksuite/store';
import { format } from 'date-fns/format';
const DATABASE_NODE_TYPES = ['table', 'thead', 'tbody', 'th', 'tr'];
export const databaseBlockHtmlAdapterMatcher = {
    flavour: DatabaseBlockSchema.model.flavour,
    toMatch: o => HastUtils.isElement(o.node) && DATABASE_NODE_TYPES.includes(o.node.tagName),
    fromMatch: o => o.node.flavour === DatabaseBlockSchema.model.flavour,
    toBlockSnapshot: {
        enter: (o, context) => {
            if (!HastUtils.isElement(o.node)) {
                return;
            }
            const { walkerContext } = context;
            if (o.node.tagName === 'table') {
                const tableHeader = HastUtils.querySelector(o.node, 'thead');
                if (!tableHeader) {
                    return;
                }
                const tableHeaderRow = HastUtils.querySelector(tableHeader, 'tr');
                if (!tableHeaderRow) {
                    return;
                }
                // Table header row as database header row
                const viewsColumns = tableHeaderRow.children.map(() => {
                    return {
                        id: nanoid(),
                        hide: false,
                        width: 180,
                    };
                });
                // Build database cells from table body rows
                const cells = Object.create(null);
                const tableBody = HastUtils.querySelector(o.node, 'tbody');
                tableBody?.children.forEach(row => {
                    const rowId = nanoid();
                    cells[rowId] = Object.create(null);
                    row.children.forEach((cell, index) => {
                        cells[rowId][viewsColumns[index].id] = {
                            columnId: viewsColumns[index].id,
                            value: TextUtils.createText(cell.children
                                .map(child => ('value' in child ? child.value : ''))
                                .join('')),
                        };
                    });
                });
                // Build database columns from table header row
                const columns = tableHeaderRow.children.map((_child, index) => {
                    return {
                        type: index === 0 ? 'title' : 'rich-text',
                        name: _child.children
                            .map(child => ('value' in child ? child.value : ''))
                            .join(''),
                        data: {},
                        id: viewsColumns[index].id,
                    };
                });
                walkerContext.openNode({
                    type: 'block',
                    id: nanoid(),
                    flavour: 'affine:database',
                    props: {
                        views: [
                            {
                                id: nanoid(),
                                name: 'Table View',
                                mode: 'table',
                                columns: [],
                                filter: {
                                    type: 'group',
                                    op: 'and',
                                    conditions: [],
                                },
                                header: {
                                    titleColumn: viewsColumns[0]?.id,
                                    iconColumn: 'type',
                                },
                            },
                        ],
                        title: {
                            '$blocksuite:internal:text$': true,
                            delta: [],
                        },
                        cells,
                        columns,
                    },
                    children: [],
                }, 'children');
                walkerContext.setNodeContext('affine:table:rowid', Object.keys(cells));
                walkerContext.skipChildren(1);
            }
            // The first child of each table body row is the database title cell
            if (o.node.tagName === 'tr') {
                const { deltaConverter } = context;
                walkerContext
                    .openNode({
                    type: 'block',
                    id: walkerContext.getNodeContext('affine:table:rowid').shift() ?? nanoid(),
                    flavour: 'affine:paragraph',
                    props: {
                        text: {
                            '$blocksuite:internal:text$': true,
                            delta: deltaConverter.astToDelta(o.node.children[0]),
                        },
                        type: 'text',
                    },
                    children: [],
                })
                    .closeNode();
                walkerContext.skipAllChildren();
            }
        },
        leave: (o, context) => {
            if (!HastUtils.isElement(o.node)) {
                return;
            }
            const { walkerContext } = context;
            if (o.node.tagName === 'table') {
                walkerContext.closeNode();
            }
        },
    },
    fromBlockSnapshot: {
        enter: (o, context) => {
            const { walkerContext } = context;
            const columns = o.node.props.columns;
            const children = o.node.children;
            const cells = o.node.props.cells;
            const createAstTableCell = (children) => ({
                type: 'element',
                tagName: 'td',
                properties: Object.create(null),
                children,
            });
            const createAstTableHeaderCell = (children) => ({
                type: 'element',
                tagName: 'th',
                properties: Object.create(null),
                children,
            });
            const createAstTableRow = (cells) => ({
                type: 'element',
                tagName: 'tr',
                properties: Object.create(null),
                children: cells,
            });
            const { deltaConverter } = context;
            const htmlAstRows = Array.prototype.map.call(children, (v) => {
                const rowCells = Array.prototype.map.call(columns, col => {
                    const cell = cells[v.id]?.[col.id];
                    if (!cell && col.type !== 'title') {
                        return createAstTableCell([{ type: 'text', value: '' }]);
                    }
                    switch (col.type) {
                        case 'rich-text':
                            return createAstTableCell(deltaConverter.deltaToAST(cell.value.delta));
                        case 'title':
                            return createAstTableCell(deltaConverter.deltaToAST(v.props.text.delta));
                        case 'date':
                            return createAstTableCell([
                                {
                                    type: 'text',
                                    value: format(new Date(cell.value), 'yyyy-MM-dd'),
                                },
                            ]);
                        case 'select': {
                            const value = col.data.options.find((opt) => opt.id === cell.value)?.value ?? '';
                            return createAstTableCell([{ type: 'text', value }]);
                        }
                        case 'multi-select': {
                            const value = Array.prototype.map
                                .call(cell.value, val => col.data.options.find((opt) => val === opt.id).value ?? '')
                                .filter(Boolean)
                                .join(',');
                            return createAstTableCell([{ type: 'text', value }]);
                        }
                        case 'checkbox': {
                            return createAstTableCell([
                                { type: 'text', value: String(cell.value) },
                            ]);
                        }
                        default:
                            return createAstTableCell([
                                { type: 'text', value: String(cell.value) },
                            ]);
                    }
                });
                return createAstTableRow(rowCells);
            });
            // Handle first row (header).
            const headerRow = createAstTableRow(Array.prototype.map.call(columns, v => createAstTableHeaderCell([
                {
                    type: 'text',
                    value: v.name ?? '',
                },
            ])));
            const tableHeaderAst = {
                type: 'element',
                tagName: 'thead',
                properties: Object.create(null),
                children: [headerRow],
            };
            const tableBodyAst = {
                type: 'element',
                tagName: 'tbody',
                properties: Object.create(null),
                children: [...htmlAstRows],
            };
            walkerContext
                .openNode({
                type: 'element',
                tagName: 'table',
                properties: Object.create(null),
                children: [tableHeaderAst, tableBodyAst],
            })
                .closeNode();
            walkerContext.skipAllChildren();
        },
    },
};
export const DatabaseBlockHtmlAdapterExtension = BlockHtmlAdapterExtension(databaseBlockHtmlAdapterMatcher);
//# sourceMappingURL=html.js.map