import {runDB} from "./db/db";
import {app} from "./app";


const port = process.env.PORT || 3000



const startApp = async () => {

    await runDB()

    return app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
}
startApp()