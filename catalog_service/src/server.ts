import { ExpressApp } from "./expressApp";

export const StartServer = async()=>{
    const app = new ExpressApp();
    app.start(9001);
    process.on('uncaughtException', function (err) {
        console.log(err);
        process.exit(1);

    });
}

StartServer().then(()=>{
    console.log('Server started');  
})