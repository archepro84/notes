const express = require('express');
const awsSdkV2 = require('aws-sdk');

// FIXME: disable aws-sdk V2 maintenance mode message
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

const app = express();
const PORT = 3000;

const s3 = new awsSdkV2.S3();
const S3_BUCKET_NAME = "test-irsa-s3";


app.get('/', (req, res) => {
  return res.status(200).json({
    ip: req.ip,
    timestamp: new Date().toISOString(),
  })
})

app.get('/files', async (req, res) => {
  try {
    const params = {
      Bucket: S3_BUCKET_NAME,
    };
    const data = await s3.listObjectsV2(params).promise();

    const files = data.Contents.map((file) => ({
      Key: file.Key,
      LastModified: file.LastModified,
      Size: file.Size,
    }));

    res.status(200).json(files);
  } catch (error) {
    console.error('Error retrieving files:', error);
    res.status(500).json({error: 'Error retrieving files'});
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});