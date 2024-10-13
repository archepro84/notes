const https = require('https');
const aws4 = require('aws4');
const dotenv = require('dotenv');

dotenv.config({path: "sample.env"});


const OPEN_SEARCH_ENDPOINT = process.env.OPEN_SEARCH_ENDPOINT;
const OPEN_SEARCH_REGION = process.env.OPEN_SEARCH_REGION
const OPEN_SEARCH_SNAPSHOT_REPOSITORY_ROLE_ARN = process.env.OPEN_SEARCH_SNAPSHOT_REPOSITORY_ROLE_ARN
const OPEN_SEARCH_SNAPSHOT_REPOSITORY_NAME = process.env.OPEN_SEARCH_SNAPSHOT_REPOSITORY_NAME

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME
const S3_BUCKET_SNAPSHOT_PATH = process.env.S3_BUCKET_SNAPSHOT_PATH

const AWS_IAM_REPOSITORY_USER_ACCESS_KEY_ID = process.env.AWS_IAM_REPOSITORY_USER_ACCESS_KEY_ID
const AWS_IAM_REPOSITORY_USER_SECRET_ACCESS_KEY = process.env.AWS_IAM_REPOSITORY_USER_SECRET_ACCESS_KEY

function request(opts) {
  https.request(opts, function (res) {
    res.pipe(process.stdout);
  }).end(opts.body || '');
}

const signer = aws4.sign({
    service: 'es',
    host: OPEN_SEARCH_ENDPOINT,
    region: OPEN_SEARCH_REGION,
    method: 'PUT',
    path: `/_snapshot/${OPEN_SEARCH_SNAPSHOT_REPOSITORY_NAME}?pretty`,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "type": "s3",
      "settings": {
        "bucket": S3_BUCKET_NAME,
        "region": OPEN_SEARCH_REGION,
        "role_arn": OPEN_SEARCH_SNAPSHOT_REPOSITORY_ROLE_ARN,
        "base_path": S3_BUCKET_SNAPSHOT_PATH,
      }
    })
  },
  {
    accessKeyId: AWS_IAM_REPOSITORY_USER_ACCESS_KEY_ID,
    secretAccessKey: AWS_IAM_REPOSITORY_USER_SECRET_ACCESS_KEY,
  }
);

request(signer);


