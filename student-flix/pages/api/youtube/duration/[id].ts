import { NextApiRequest, NextApiResponse } from "next";
import ytdl from "ytdl-core";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
try {
  const { id } = req.query;
  const videoUrl = `https://www.youtube.com/watch?v=${id}`;

  const videoInfo = await ytdl.getInfo(videoUrl);
  res.status(200).send(`${videoInfo.videoDetails.lengthSeconds} seconds`);
} catch (error) {
  console.log(error)
  res.status(400).end()
}
}
