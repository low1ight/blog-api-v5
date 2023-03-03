import {ViewUserModel} from "./ViewUserModel";

export type ViewUserModelWithPagination = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items:ViewUserModel[]
}