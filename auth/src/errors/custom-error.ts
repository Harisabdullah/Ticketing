export abstract class CustomError extends Error{
    abstract statusCode: number;
    abstract serializeErrors() : {
        message: string,
        fields?: string
    }[];

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
        console.log(message);
    }
}
