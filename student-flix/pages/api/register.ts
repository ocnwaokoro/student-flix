import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import {USER} from '@/data/db.js'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { email, name, password } = req.body;

    const existingUser = await USER.findOne({ email: email });

    if (existingUser) {
      return res.status(422).json({ error: "Email taken" });
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const user = await USER.create({
      email: email,
      name: name,
      password: hash,
      image: "",
      emailVerified: new Date(),
    }); 
    user.save()
    console.log(user)
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).end()
  }
}
