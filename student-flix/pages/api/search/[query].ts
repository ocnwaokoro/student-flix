import { NextApiRequest, NextApiResponse } from "next";
import { MOVIE } from "@/data/db";
import serverAuth from "@/lib/serverAuth";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'GET'){
        return res.status(405).end()
    }

    try {
        await serverAuth(req)

        const {query} = req.query

        console.log('QUERY MADE: ',query)

        const movies = await MOVIE.find({title: {$regex: new RegExp('^'+query+'.*','i')}}).exec()
        console.log('MOVIES FOUND: ', movies)

        return res.status(200).json(movies)
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}