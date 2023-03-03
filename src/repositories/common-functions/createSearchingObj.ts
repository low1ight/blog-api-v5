
export const createSearchingObj = (searchString:string | null | undefined, additionalParams:object = {}) => {

    if(!searchString) return {...additionalParams}

    return {name:{$regex: searchString, $options:'i'},...additionalParams}


}