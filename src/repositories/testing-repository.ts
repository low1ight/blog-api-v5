import {blogsCollection, postsCollection, usersCollection} from "../db/db";



export const testingRepository = {

    async deleteAllData() {

        const allBlogsRemoveResult = await blogsCollection.deleteMany({})
        const allPostsRemoveResult = await postsCollection.deleteMany({})
        const allUsersRemoveResult = await usersCollection.deleteMany({})

        return allBlogsRemoveResult.acknowledged && allPostsRemoveResult.acknowledged && allUsersRemoveResult.acknowledged;
    }
}