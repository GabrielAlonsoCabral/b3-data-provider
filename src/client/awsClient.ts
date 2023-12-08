import * as AWS from 'aws-sdk';
import environment from '../configs/environment';

AWS.config.update({
  accessKeyId: environment.aws.accessKeyId,
  secretAccessKey: environment.aws.secretAccessKey,
  region: environment.aws.region,
});

export { AWS };
export default AWS