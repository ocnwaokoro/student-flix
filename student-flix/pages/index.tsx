import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useMovieList from "@/hooks/useMovieList";
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
// on play, route will be /watch/:movieId
export default function Home() {
  // user is an array for some reason?
  // add functionality for preview of videos when the mouse hovers over it
  const { data: movies = [] } = useMovieList();

  return (
    <>
      <Navbar />
      <div className="relative">
        <div className="absolute top-0 left-0">
        <Billboard autoPlay={false} />
        </div>
        <div className="absolute top-0 left-0 mt-[40%] hover:shadow-outline">
          <MovieList title="Trending Now" data={movies} />
        </div>
      </div>
    </>
  );
}
