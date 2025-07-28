
//error handling utility function 
// this function will create an error object with a status code and message
// it will be used to create custom error responses in the application
export const errorHandler = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

