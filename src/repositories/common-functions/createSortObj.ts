import {sortObjType} from "../../models/sortObjModel";

export const createSortObj = (sortKey:string ,sortDirection:string ) => {

    let sortObj:sortObjType = {}

    sortObj[sortKey] = sortDirection === 'asc' ? 1 : -1

    return sortObj

}