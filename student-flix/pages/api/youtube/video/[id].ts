import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import ytdl from 'ytdl-core';
import { send } from 'micro';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { id } = req.query
  const videoUrl = `https://www.youtube.com/watch?v=${id}`;
  
  const videoInfo = await ytdl.getInfo(videoUrl);
  const format = ytdl.chooseFormat(videoInfo.formats, { filter: 'audioandvideo', quality: 'highestvideo' });
  
  const videoStream = ytdl(videoUrl, { format });
  
  res.setHeader('Content-Type', 'video/mp4');

  if (process.env.VERCEL) {
    // Using Vercel, so use Vercel's `send` method to send the response
    send(res, 200, videoStream);
  } else {
    // Using Next.js, so use Next.js's `send` method to send the response
    videoStream.pipe(res);
  }

  videoStream.pipe(res);
}
