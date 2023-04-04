import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import ytdl from 'ytdl-core';
import { send } from 'micro';
import AWS from 'aws-sdk'
const s3 = new AWS.S3(
  {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_REGION
  }
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  // const data = await s3.listBuckets().promise();
  // console.log('Bucket Names:', data?.Buckets?.map(bucket => bucket.Name));

  const { id } = req.query
  const videoUrl = `https://www.youtube.com/watch?v=${id}`;
  
  const videoInfo = await ytdl.getInfo(videoUrl);
  const format = ytdl.chooseFormat(videoInfo.formats, { filter: 'audioandvideo', quality: 'highestvideo' });
  
  const videoStream = ytdl(videoUrl, { format });
  
  res.setHeader('Content-Type', 'video/mp4');

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET as string,
    Key: `${id}.mp4`,
    Body: videoStream,
    ContentType: 'video/mp4'
  }

  await s3.upload(uploadParams).promise();

  const redirectUrl = `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${uploadParams.Key}`

  res.status(300).redirect(redirectUrl)

}
