import { NextApiRequest, NextApiResponse } from "next";
import { MOVIE } from "@/data/db";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
     if(req.method!=='GET'){
        res.status(405).end()
     }

     try {
        await serverAuth(req)
        const movieCount = await MOVIE.countDocuments()
        const randomIndex = Math.floor(Math.random() * movieCount)
        const randomMovie = await MOVIE.find().skip(randomIndex).limit(1).exec()
        return res.status(200).json(randomMovie[0])
     } catch (error) {
        console.log(error)
     }
}