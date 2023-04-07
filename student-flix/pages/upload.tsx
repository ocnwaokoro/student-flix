/*
potentially use youtube-regex
big form w/ diff upload styles
*/

import Dropdown from "@/components/Dropdown";
import fetcher from "@/lib/fetcher";
import axios from "axios";
import email from "next-auth/providers/email";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import ytdl from "ytdl-core";

/*

const movieSchema =  new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  thumbnailUrl: String,
  genre: String,
  duration: String,
});

*/

const Upload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("");
  const [movieLink, setMovieLink] = useState("");
  const [variant, setVariant] = useState("regular");
  const router = useRouter();

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "regular" ? "youtube" : "regular"
    );
  }, []);
  // add functionality for validating all input!

  const upload = useCallback(async () => {
    try {
      if (variant === "youtube") {
        const videoId = await ytdl.getVideoID(movieLink);
        console.log("videoid:", videoId);
        setVideoUrl(`/api/youtube/video/${videoId}`);
        setThumbnailUrl(`/api/youtube/thumbnail/${videoId}`);
        setDuration(
          await (
            await axios.get(`/api/youtube/duration/${videoId}`)
          ).data
        );
      }
      await axios.post("/api/upload", {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        genre,
        duration,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [title, description, videoUrl, thumbnailUrl, genre, duration]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.png')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          {/* Adjust height to match real netflix height */}
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full h-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {/*variant === "login" ? "Sign In" : "Register"*/}
            </h2>
            <div className="flex flex-col gap-4">
              <Dropdown
                id="title"
                onChange={(ev: any) => setTitle(ev.target.value)}
                value={title}
                label="Title"
                type="title"
              />
              <Dropdown
                id="description"
                onChange={(ev: any) => setDescription(ev.target.value)}
                value={description}
                label="Description"
                type="description"
              />
              {variant === "regular" && (
                <>
                  <Dropdown
                    id="videoUrl"
                    onChange={(ev: any) => setVideoUrl(ev.target.value)}
                    value={videoUrl}
                    label="Video Url"
                    type="videoUrl"
                  />
                  <Dropdown
                    id="thumbnailUrl"
                    onChange={(ev: any) => setThumbnailUrl(ev.target.value)}
                    value={thumbnailUrl}
                    label="Thumbnail Url"
                    type="thumbnailUrl"
                  />
                </>
              )}
              <Dropdown
                id="genre"
                onChange={(ev: any) => setGenre(ev.target.value)}
                value={genre}
                label="Genre"
                type="genre"
              />
              {variant === "regular" && (
                <Dropdown
                  id="duration"
                  onChange={(ev: any) => setDuration(ev.target.value)}
                  value={duration}
                  label="Duration"
                  type="duration"
                />
              )}
              {variant === "youtube" && (
                <Dropdown
                  id="movieLink"
                  onChange={(ev: any) => setMovieLink(ev.target.value)}
                  value={movieLink}
                  label="Movie Link"
                  type="movieLink"
                />
              )}
            </div>
            <button
              onClick={upload}
              className="bg-[#8900e1] py-3 text-white rounded-md w-full mt-10 hover:bg-[#57068c] transition"
            >
              {variant === "regular"
                ? "Upload Movie via CDN"
                : "Upload Movie via YouTube"}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant === "regular"
                ? "Not using a CDN?"
                : "Not using YouTube?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "regular"
                  ? "Use Youtube Upload"
                  : "Use Regular Upload"}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
