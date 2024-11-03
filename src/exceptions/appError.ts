// exceptions/AppError.ts
class AppError extends Error {
    public statusCode: number;
  
    constructor(message: string = "An application error occurred", statusCode: number = 500) {
      super(message);
      this.statusCode = statusCode;
      this.name = this.constructor.name;
      Object.setPrototypeOf(this, AppError.prototype); // Corrige a cadeia de protótipos
    }
  }
  
  export default AppError;
  