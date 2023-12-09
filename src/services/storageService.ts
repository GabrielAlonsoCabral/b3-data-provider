import * as AWS from 'aws-sdk';
import { writeFile } from 'fs/promises';
import { environment } from '../configs/environment';

type IListObjectsInput =  {prefix:string}

type IDownloadInput =  {key:string, outDir:string}

type IMoveFileInput = {sourceKey:string,destinationKey:string}

export class StorageService {
  private storageClient: AWS.S3 = new AWS.S3()
  private bucketName = environment.aws.bucketName

  async download({key, outDir}:IDownloadInput){
    try {      
    console.log("StorageService - downloading", key, outDir)
    const { Body } = await this.storageClient.getObject({
      Bucket:this.bucketName,
      Key:key
    }).promise();

    await writeFile(outDir, Body as Buffer)

    return {
      success:true
    }
    } catch (error) {
      console.error("StorageService - download", error)
      return {success:false}
    }

  }
  async listObjects({prefix}:IListObjectsInput){
    const {Contents} = await this.storageClient.listObjectsV2({Bucket:this.bucketName, Prefix:prefix}).promise()

    return Contents||[]
  }

  async moveFile({destinationKey, sourceKey}:IMoveFileInput){
    try {
      console.log("StorageService - moving file", sourceKey, destinationKey)
      await this.storageClient
      .copyObject({
        Bucket: this.bucketName,
        CopySource: `${this.bucketName}/${sourceKey}`,
        Key: destinationKey,
      })
      .promise();
  
    await this.storageClient
      .deleteObject({
        Bucket: this.bucketName,
        Key: sourceKey,
      })
      .promise();

      return {success:true}      
    } catch (error) {
      console.error("StorageService - moveFile", error)
      return {success:false}
    }

  }
}