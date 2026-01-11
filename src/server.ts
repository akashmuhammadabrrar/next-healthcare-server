import { Server } from "http";
import config from "./config";
import app from "./app";
import { error } from "console";



async function bootstrap() {
    // this variable will hold our server instance
    let server: Server;

    try {
        // start the server 
        server = app.listen(config.port, () => {
            console.log(`Server running on http://localhost:${config.port}`)
        })
        // Function to gracefully shut down the server 
        const exitHandler = () => {
            if(server) {
                server.close(() => {
                    console.log("server clonsed gracefully.")
                    process.exit(1); // exit with failure code
                })
            } else {
                process.exit(1);
            }
        };

        // handle unhandled promise rejections
        process.on("unhandledRejection", (error: Error) => {
            console.log("Unhandled rejection is detected, we are closing the server...")
             if(server){
            server.close(() => {
                console.log(error);
                process.exit(1);
            })
        }else {
            process.exit(1);
        }
        });
       
    } catch (error) {
        console.error("Error during server startup:", error);
        process.exit(1);
    }
}

bootstrap();