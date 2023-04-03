import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import { USER } from "@/data/db";
// call before every route?

const serverAuth = async (req: NextApiRequest) => {
    // use ServerAuth in API controller & request param will hold the jwt that the getSession can use to get logged in user
    const session  = await getSession({ req });
    
    if(!session?.user?.email) {
        throw new Error('Not signed in')
    }

    const currentUser  = await USER.find({email: session.user.email})

    if(!currentUser) {
        throw new Error('Not signed in')
    }

    return {currentUser}
}

export default serverAuth;
