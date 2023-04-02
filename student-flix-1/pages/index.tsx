import useCurrentUser from "@/hooks/useCurrentUser"
import { NextPageContext } from "next"
import { getSession, signOut } from "next-auth/react"

export async function getServerSideProps(context: NextPageContext) {
  // fetch session from client side
  const session = await getSession(context)

  // ensures that you cannot enter page w/o auth
  if(!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default function Home() {
  const { data: user, isLoading } =  useCurrentUser();
  // user is an array for some reason?
  if(user) {console.log(user[0]?.name)}
  return (
    <>
      <h1 className="text-4xl text-green-400 justify-center text-center"> Student-Flix </h1>
      <p className="text-white text-2xl">Logged in as {user?.at(0).name} </p>
      <button onClick={() => signOut()} className="bg-violet-500 w-full h-12"> Sign Out</button>
    </>
  )
}
