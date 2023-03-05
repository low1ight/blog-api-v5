import {ViewCommentModel} from "./ViewCommentModel";

export type ViewCommentModelWithPagination = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items:ViewCommentModel[]
}