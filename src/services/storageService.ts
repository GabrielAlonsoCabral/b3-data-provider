import * as AWS from 'aws-sdk';
import environment from '../configs/environment';

export class StorageService {
  private storageClient: AWS.S3;
  bucketName:string

  constructor(){
    this.storageClient= new AWS.S3()
    this.bucketName= environment.aws.bucketName
  }

  async listen(){
    const {Contents} = await this.storageClient.listObjectsV2({
      Bucket:this.bucketName,
      Prefix:'/data-provider/files/historical-series/',   
         
    }).promise()

    if (Contents && Contents.length > 0) {
      for (const object of Contents) {        
        console.log(`New file detected: ${object.Key}`);
      }
    } else {
      console.log('No new files found. Waiting for changes...');
      await this.listen();    
    }
  }
}