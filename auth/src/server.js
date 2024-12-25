
import app from './app.js'
const startServer= ()=>{
    const port = process.env.PORT || 8013
    app.listen(port,()=>console.log(`Server listening on port ${port}`))
}

startServer();

