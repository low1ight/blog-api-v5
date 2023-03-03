import {ViewBlogModel} from "./ViewBlogModel";

export type ViewBlogModelWithPagination = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items:ViewBlogModel[]
}