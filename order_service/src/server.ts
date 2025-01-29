
import  { ExpressApp } from "./express-app";

const PORT = process.env.PORT ?? 9002

export const StartServer = async()=>{

    const expressApp = await ExpressApp()
    
    expressApp.listen(PORT,()=>console.log(`Server started on port ${PORT}`));
    process.on('uncaughtException', function (err) {
        console.log(err);
        process.exit(1);

    });
}

StartServer().then(()=>{
    console.log('Server started');  
})