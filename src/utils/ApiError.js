class ApiError extends Error { 
    constructor(
        stautusCode,
        message="Something went wrong",
        errors=[],
        stack=""
        
    ){
        super(message);
        this.statusCode=stautusCode;
        this.errors=errors;
        this.data=null;
        this.success=false;
        if(stack){
            this.stack=stack;
        }else{
            Error.captureStackTrace(this,this.constructor);
        }
    }

}

export {ApiError};