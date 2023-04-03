import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  // fetch session from client side
  const session = await getSession(context);

  // ensures that you cannot enter page w/o auth
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: user, isLoading } = useCurrentUser();
  // user is an array for some reason?
  // add functionality for preview of videos when the mouse hovers over it
  if (user) {
    console.log(user[0]);
  }
  return (
    <>
      <Navbar />
    </>
  );
}
