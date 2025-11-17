class BaseAIError extends Error {
}
export var AIErrorType;
(function (AIErrorType) {
    AIErrorType["GeneralNetworkError"] = "GeneralNetworkError";
    AIErrorType["PaymentRequired"] = "PaymentRequired";
    AIErrorType["Unauthorized"] = "Unauthorized";
})(AIErrorType || (AIErrorType = {}));
export class UnauthorizedError extends BaseAIError {
    constructor() {
        super('Unauthorized');
        this.type = AIErrorType.Unauthorized;
    }
}
// user has used up the quota
export class PaymentRequiredError extends BaseAIError {
    constructor() {
        super('Payment required');
        this.type = AIErrorType.PaymentRequired;
    }
}
// general 500x error
export class GeneralNetworkError extends BaseAIError {
    constructor(message = 'Network error') {
        super(message);
        this.type = AIErrorType.GeneralNetworkError;
    }
}
//# sourceMappingURL=types.js.map