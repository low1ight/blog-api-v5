
export const createSearchingObj = (searchParams:ParamsObjType, additionalParams:object = {}) => {

    const fieldsForSearch = mapSearchParams(searchParams)


    //without any search by field
    if(fieldsForSearch.length === 0) return {...additionalParams}


    // with searching by only one field
    if(fieldsForSearch.length === 1) return {...fieldsForSearch[0],...additionalParams}


    //search by several fields
    if(fieldsForSearch.length > 1) return {$and:[...fieldsForSearch],...additionalParams}



    // return {name:{$regex: searchParams, $options:'i'},...additionalParams}


}

const mapSearchParams = (searchParamsObj:ParamsObjType) => {
    let searchFieldArr = []
    for(let key in searchParamsObj) {
        if(searchParamsObj[key]) {

            const searchingString:string = searchParamsObj[key] as string

            const searchingObj = searchObjects[key](searchingString)

            searchFieldArr.push(searchingObj)
        }
    }
    return searchFieldArr
}


const searchObjects:SearchObjType = {

    searchNameTerm: (searchString:string) => ({name:{$regex: searchString, $options:'i'}}),
    searchLoginTerm: (searchString:string) => ({login:{$regex: searchString, $options:'i'}}),
    searchEmailTerm: (searchString:string) => ({email:{$regex: searchString, $options:'i'}})

}
// const mapSearchParams = (paramsObj:ParamsObjType) => {
//     let arr = []
//     for(let key in paramsObj) {
//
//         if(!paramsObj[key]) continue;
//
//         const sortFieldName:string = searchObjBy[key]
//         const searchingSubString:string= paramsObj[key] as string
//
//         arr.push({:{'$regex': searchingSubString, '$options':'i'}})
//     }
//
//
// }
//
// const searchObjBy:SearchObjType = {
//     searchNameTerm:"name",
//     searchLoginTerm:"login",
//     searchEmailTerm:'email'
// }
type SearchObjType = {
    [key:string] :Function
}

type ParamsObjType = {
    [key:string] :string | null
}
