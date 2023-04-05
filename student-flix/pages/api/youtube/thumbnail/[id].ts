import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import ytdl from 'ytdl-core';
import axios from 'axios';
// cache image
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 60 }); // cache for 60 seconds

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { id } = req.query;
  const cachedImage = cache.get(id as NodeCache.Key);

  if (cachedImage) {
    res.setHeader('Content-Type', 'image/jpeg');
    return res.status(200).send(cachedImage);
  }

  const videoUrl = `https://www.youtube.com/watch?v=${id}`;

  try {
    const videoInfo = await ytdl.getInfo(videoUrl);
    const thumbnailUrl = videoInfo.videoDetails.thumbnails[videoInfo.videoDetails.thumbnails.length - 1].url;
    
    const image = await axios.get(thumbnailUrl, { responseType: 'arraybuffer' });
    cache.set(id as NodeCache.Key, Buffer.from(image.data));
  
    res.setHeader('Content-Type', 'image/jpeg');
    res.status(300).redirect(thumbnailUrl)
  } catch (error) {
    console.log(error)
    res.status(400).end()
  }
}
