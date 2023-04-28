import useBillboard from "@/hooks/useBillboard";
import React, { useCallback } from "react";
import { AiOutlineInfoCircle } from 'react-icons/ai'
import PlayButton from "./PlayButton";
interface BillboardProps {
  autoPlay: boolean
}
const Billboard: React.FC<BillboardProps> = ({autoPlay}) => {
  const { data } = useBillboard();
  // change to include just preview
  // maybe video preview object component is needed??
  return (
    <div className="relative h-[56.25vw]">
      {autoPlay && <video
        className="w-full h-[56.25vw] object-cover bright-[60%]"
        autoPlay
        muted
        loop
        poster={data?.thumbnailUrl}
        src={data?.videoUrl}
      ></video>}
      {!autoPlay && <img alt="billboard"
        className="w-full h-[56.25vw] object-cover bright-[60%]"
        src={data?.thumbnailUrl}
      ></img>}
      <div className="absolute top-[30%] md:tope-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-4 md:mt-4 gap-3">
          <PlayButton movieId={data?._id}/>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
