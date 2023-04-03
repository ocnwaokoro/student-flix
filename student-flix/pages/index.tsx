import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";
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
  const { data: user, isLoading } = useCurrentUser();
  // user is an array for some reason?
  // add functionality for preview of videos when the mouse hovers over it
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();
  //

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <div className="relative">
        <div className="absolute top-0 left-0">
        <Billboard />
        </div>
        <div className="absolute top-0 left-0 mt-[40%] hover:shadow-outline">
          <MovieList title="Trending Now" data={movies} />
          <MovieList title="My List" data={favorites} />
        </div>
      </div>
    </>
  );
}
