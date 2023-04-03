import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import ytdl from 'ytdl-core';

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
  videoStream.pipe(res.status(200));
}
