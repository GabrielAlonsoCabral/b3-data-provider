import "dotenv/config";

interface IEnvironment {
    aws:{
        accessKeyId:string,
        secretAccessKey:string,
        region:string
        bucketName:string
    }
}

export const environment:IEnvironment = {
    aws:{
        accessKeyId:String(process.env.AWS_ACCESS_KEY_ID),
        secretAccessKey:String(process.env.AWS_SECRET_ACCESS_KEY),
        region:String(process.env.AWS_REGION),
        bucketName:String(process.env.AWS_BUCKET_NAME)

    }
}
export default environment