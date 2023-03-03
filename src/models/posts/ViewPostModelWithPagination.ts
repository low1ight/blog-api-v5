import {ViewPostModel} from "./ViewPostModel";

export type ViewPostModelWithPagination = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items:ViewPostModel[]
}