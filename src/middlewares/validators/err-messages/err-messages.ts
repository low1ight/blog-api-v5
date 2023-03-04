export const fieldErrorMessages = {

    tooLong:(max:number) => `Field is too long ( max:${max} )`,
    tooShort:(min:number) => `Field is too short ( min:${min} )`,
    wrongType:(requireType:string) => `Field should be a ${requireType}`,
    incorrectFieldFormat:(fieldName:string) => `Incorrect ${fieldName} format`,
    fieldAlreadyTaken: (fieldName:string) => `${fieldName} is already taken`,

    dontExist:"Field must exist",
    isEmpty: "Field can't be empty",
    blogDontExist: "Can't create the post for non-existent blog",
    mustBeURL: "Field must be URL",
    invalidId:"invalid id format",

}


