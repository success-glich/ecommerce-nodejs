
import app from "./express-app";

const PORT = process.env.PORT ?? 9000

export const StartServer = async()=>{
    app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));
    process.on('uncaughtException', function (err) {
        console.log(err);
        process.exit(1);

    });
}

StartServer().then(()=>{
    console.log('Server started');  
})