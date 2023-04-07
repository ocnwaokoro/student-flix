import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import { MOVIE, USER } from "@/data/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req);

      const { movieId } = req.body;

      const existingMovie = await MOVIE.findById(movieId);

      if (!existingMovie) {
        throw new Error("Invalid ID");
      }

      const user = await USER.findOneAndUpdate(
        { email: currentUser?.email },
        { $push: { favoriteIds: existingMovie._id } }
      );

      return res.status(200).json(user);
    }

    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth(req);
      const { movieId } = req.body;
      const existingMovie = await MOVIE.findById(movieId);
      if (!existingMovie) {
        throw new Error("Invalid ID");
      }

      const updatedUser = await USER.findOneAndUpdate(
        { email: currentUser?.email },
        { $pull: { favoriteIds: existingMovie._id } }
      );
      return res.status(200).json(updatedUser);
    }

    return res.status(405).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
