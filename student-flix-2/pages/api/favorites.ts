import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import { MOVIE, USER } from "@/data/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method !== 'GET'){
        return res.status(405).end()
    }
    
    try {
        const { currentUser } = await serverAuth(req);
        const favoriteMovies = await USER.findById(currentUser._id).populate('favoriteIds').exec();
        res.status(200).json(favoriteMovies?.favoriteIds)

    } catch (error) {
        console.log(error)
    }
}