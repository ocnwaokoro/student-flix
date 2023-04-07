import { MOVIE } from "@/data/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { title, description, videoUrl, thumbnailUrl, genre, duration } =
      req.body;

    const existingMovie = await MOVIE.findOne({ videoUrl: videoUrl });

    if (existingMovie) {
      return res.status(422).json({ error: "videoUrl already in use" });
    }

    const movie = await MOVIE.create({
      title: title,
      description: description,
      videoUrl: videoUrl,
      thumbnailUrl: thumbnailUrl,
      genre: genre,
      duration: duration,
    });
    movie.save();
    console.log(movie);
    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
