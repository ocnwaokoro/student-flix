import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import { MOVIE } from "@/data/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'GET'){
        return res.status(405).end()
    }

    try {
        await serverAuth(req)
        const movies = await MOVIE.find()
        return res.status(200).json(movies)
        
    } catch (error) {
        console.log(error)
    }
}