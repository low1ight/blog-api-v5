import {ViewModelWithPagination} from "../../models/ViewModelWithPagination";
import {Collection} from "mongodb";
import {createSearchingObj} from "./createSearchingObj";
import {calculateSkipElemCount} from "./calculateSkipElemCount";
import {createSortObj} from "./createSortObj";

export const getPaginatedAndSortedResults = async ({pageNumber, pageSize, sortBy ,sortDirection, ...searchingParams}:QueryType ,
                                                   collection:Collection<any> , arrToViewModel:Function, additionalSearchParams:object):Promise<ViewModelWithPagination> => {


    const skipElemCount = calculateSkipElemCount(pageNumber,pageSize)

    const searchingObj = createSearchingObj(searchingParams,additionalSearchParams)

    const sortObj = createSortObj(sortBy,sortDirection)

    const totalElemCount = await collection.countDocuments()

    const result = await collection
        .find(searchingObj)
        .sort(sortObj)
        .skip(skipElemCount)
        .limit(+pageSize).toArray()



    return {
        pagesCount: Math.ceil(totalElemCount / +pageSize) || 1,
        page: +pageNumber,
        pageSize: +pageSize,
        totalCount: totalElemCount,
        items: arrToViewModel(result)
    }

}


type QueryType = {
    searchNameTerm?:string | null | undefined
    sortBy:string
    sortDirection:string
    pageNumber: number
    pageSize:number
}


