import "dotenv/config";
import { Stage } from ".";

interface IEnvironment {
    stage:Stage,
    
    tasks:{
        historicalSeries:{
            cron:string,
            bucketPrefix:string    
        },
    }
    aws:{
        accessKeyId:string,
        secretAccessKey:string,
        region:string
        bucketName:string
    }
}

export const environment:IEnvironment = {
    stage:String(process.env.STAGE) as Stage,
    tasks:{
        historicalSeries:{
            cron:String(process.env.CRON_HISTORICAL_SERIES),
            bucketPrefix:String(process.env.BUCKET_PREFIX_HISTORICAL_SERIES)
        }
    },
    aws:{
        accessKeyId:String(process.env.AWS_ACCESS_KEY_ID),
        secretAccessKey:String(process.env.AWS_SECRET_ACCESS_KEY),
        region:String(process.env.AWS_REGION),
        bucketName:String(process.env.AWS_BUCKET_NAME)

    }
}
export default environment