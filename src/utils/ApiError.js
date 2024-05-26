class ApiError extends Error {
    //making own constructor
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if(stack){
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.costructor)
        }
    }
}

export {ApiError};