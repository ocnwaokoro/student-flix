import { BsSearch } from "react-icons/bs";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useState,
} from "react";
import useSearchByTitle from "@/hooks/useSearchByTitle";
import { useRouter } from "next/router";

const useSearch = () => {
  const [query, setQuery] = useState("");
  const { data, isLoading } = useSearchByTitle(query);

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  return { query, handleQueryChange, data, isLoading };
};

const SearchButton = () => {
  const [visibleBar, setVisibleBar] = useState(false);
  const { query, handleQueryChange, data, isLoading } = useSearch();
  console.log(data);

  const toggleSearchBar = () => {
    setVisibleBar(!visibleBar);
  };

  const router = useRouter();
  const watchMovie = (movieId: Key) => {
    router.push(`/watch/${movieId}`);
  };

  return (
    <div>
      {!visibleBar ? (
        <div
          onClick={toggleSearchBar}
          className="text-gray-200 hover:text-gray-300 cursor-pointer transition"
        >
          <BsSearch />
        </div>
      ) : (
        <>
          <div onBlur={toggleSearchBar} className="relative top-0">
            <input
              autoComplete="off"
              id="search-btn"
              onChange={(ev: any) => {
                handleQueryChange(ev.target.value);
              }}
              type="string"
              className="
                  block
                  border border-white
                  px-6
                  pt-6
                  pb-1
                  w-full
                  text-md
                  text-white
                  bg-neutral-700
                  appearance-none
                  focus:outline-none
                  focus:ring-0
                  peer
                  "
              placeholder=" "
            />
            <label
              htmlFor="search-btn"
              className="
                  absolute
                  text-md
                  text-zinc-400
                  duration-150
                  transform
                  -translate-y-3
                  scale-75
                  top-4
                  z-10
                  origin-[0]
                  left-6
                  peer-placeholder-shown:scale-100
                  peer-placeholder-shown:translate-y-0
                  peer-focus:scale-75
                  peer-focus:-translate-y-3
                  "
            >
              <div className="flex flex-row gap-5">
                <div className="left-0 text-gray-200 hover:text-gray-300 cursor-pointer transition">
                  <BsSearch />
                </div>
                <p>{"Find Movies"}</p>
              </div>
            </label>
          </div>
          <div
            className="               
            w-full                  text-md
                  text-zinc-400
                  bg-neutral-700
                  text-center"
          >
            {data?.map(
              (movie: {
                _id: Key | null | undefined;
                title:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | ReactFragment
                  | ReactPortal
                  | null
                  | undefined;
              }) => (
                <div
                  onClick={() => {watchMovie(movie?._id || '')}}
                  className="border border-white cursor-pointer hover:text-zinc-500"
                  key={movie._id}
                >
                  {movie.title}
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchButton;
