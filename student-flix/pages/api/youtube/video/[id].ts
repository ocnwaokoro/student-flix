import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import ytdl from 'ytdl-core';
import { send } from 'micro';
import AWS from 'aws-sdk'
import axios from "axios";
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

  if (await (async () => {
    try {
      const response = await axios.get(`https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${id}.mp4`);
      return response.status === 200;
    } catch (error) {
        return false;      
    }
  })()) {
    res.status(300).redirect(`https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${id}.mp4`)
  } else {
  try {
    // does not work for now
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
    // for security reasons, ensure that the video url is not viewable and that the address cannot be copied
    
    //const redirectUrl = `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/Tp_YZNqNBhw.mp4`
  // input redirect to test video page until bug fixed
    res.status(300).redirect(redirectUrl)
  } catch (error) {
    console.log(error)
    res.status(400).end()
  }
}

}
