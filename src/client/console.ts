import { Console as NodeConsole } from "console";
import environment from "../configs/environment";

export default class Console extends NodeConsole {
    private stage = environment.stage

    log(...data: any[]): void;
    log(message?: any, ...optionalParams: any[]): void;
    //@ts-ignore
    log(message?: unknown, ...optionalParams?: unknown[]): void {
        if(this.stage==='dev'||this.stage==='hml'){
            console.log(message, optionalParams)
        }
    }
}