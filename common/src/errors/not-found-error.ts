import {CustomError} from "./custom-error";

export class NotFoundError extends CustomError{
    statusCode = 404;

    constructor() {
        super('Requested resource not found!');

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [{message:'Requested resource not found!'}];
    }

}