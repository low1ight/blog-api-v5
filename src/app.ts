import express, {Response,Request} from 'express'
import {blogsRouter} from "./routes/blogs-router";
import {postsRouter} from "./routes/posts-router";
import {testsRouter} from "./routes/testing-router";
import {usersRouter} from "./routes/users-router";
import {authRouter} from "./routes/auth-router";
import {commentsRouter} from "./routes/comments-router";


declare module 'express-serve-static-core' {
    interface Request {
        userId: string
    }
}

export const app = express()


app.use(express.json())

const baseURL:string = "/api"


app.use(`${baseURL}/blogs`, blogsRouter)
app.use(`${baseURL}/posts`, postsRouter)
app.use(`${baseURL}/users`, usersRouter)
app.use(`${baseURL}/auth`, authRouter)
app.use(`${baseURL}/comments`, commentsRouter)
app.use(`${baseURL}/testing`, testsRouter)



app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!')
})




