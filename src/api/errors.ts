class BaseError extends Error {
    _code: string;
    _value: any;
    constructor(code: string, message?: string, value?: any,) {
        super(message);
        this._code = code;
        this._value = value;
    }
}

export class ApiError extends BaseError {
    _status: number;
    _requestId: string;
    constructor(status: number, code: string, requestId: string, message?: string, value?: any, ) {
        super(code, value, message);
        this._status = status;
        this._requestId = requestId;
    }

    toObject() {
        return {
            status: this._status,
            code: this._code,
            value: this._value,
            message: this.message,
            requestId: this._requestId,
        };
    }

    getCode() {
        return this._code;
    }
}

/**
 * Generic "400 Bad Request" error
 */
export class BadRequestError extends ApiError {
    constructor(requestId: string, code?: string, message?: string) {
        super(400, code || 'badRequest', requestId, message);
    }
}

/**
 * Generic "401 Unauthorized" error
 */
export class UnauthorizedError extends ApiError {
    constructor(requestId: string, code?: string, message?: string) {
        super(401, code || 'unauthorized', requestId, message);
    }
}

/**
 * Generic "403 Forbidden" error
 */
export class ForbiddenError extends ApiError {
    constructor(requestId: string, code?: string, message?: string) {
        super(403, code || 'forbidden', requestId, message);
    }
}

/**
 * Generic "404 Not Found" error
 */
export class NotFoundError extends ApiError {
    constructor(requestId: string,  code?: string, message?: string) {
        super(404, code || 'notFound', requestId, message);
    }
}

/**
 * Generic "409 Conflict" error
 */
export class ConflictError extends ApiError {
    constructor(requestId: string, code?: string, message?: string) {
        super(409, code || 'conflict', requestId, message);
    }
}


/**
 * Generic "500 Internal Server Error" error
 */
export class InternalServerError extends ApiError {
    constructor(requestId: string, code?: string, message?: string) {
        super(500, code || 'internalServerError', requestId, message);
    }
}