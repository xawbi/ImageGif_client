"use client";
import { FC, useState } from "react";
import { postRating } from "@/api/rating";
import { FileDTO } from "@/api/dto/file.dto";
import { UserDTO } from "@/api/dto/user.dto";

interface filePageProps {
  file: FileDTO;
  user: UserDTO;
}

const FileButtons: FC<filePageProps> = ({ file, user }) => {
  const downloadFileUrl = process.env.NEXT_PUBLIC_HOST + "/public/download/" + `${file.user.id}/` + file.fileName;
  const [likes, setLikes] = useState(file.rating.reduce((accumulator, el) => accumulator + (el.like || 0), 0));
  const [dislikes, setDislikes] = useState(file.rating.reduce((accumulator, el) => accumulator + (el.dislike || 0), 0));
  const [likeClicked, setLikeClicked] = useState(
    user ? file.rating.some(el => el.user.id === user.id && el.like > 0) : false
  );
  const [dislikeClicked, setDislikeClicked] = useState(
    user ? file.rating.some(el => el.user.id === user.id && el.dislike > 0) : false
  );
  const [modal, setModal] = useState("");

  const handleRating = async (rating: string) => {
    if (rating === "like" && !likeClicked) {
      if (dislikeClicked) {
        setDislikes(dislikes - 1);
        setDislikeClicked(false);
      }
      setLikes(likes + 1);
      setLikeClicked(true);
    } else if (rating === "like" && likeClicked) {
      setLikes(likes - 1);
      setLikeClicked(false);
    } else if (rating === "dislike" && !dislikeClicked) {
      if (likeClicked) {
        setLikes(likes - 1);
        setLikeClicked(false);
      }
      setDislikes(dislikes + 1);
      setDislikeClicked(true);
    } else if (rating === "dislike" && dislikeClicked) {
      setDislikes(dislikes - 1);
      setDislikeClicked(false);
    }

    const obj = {
      targetType: "file",
      type: rating,
      targetId: String(file.id)
    };
    await postRating(obj);
  };

  const handleUserRating = (rating: string) => {
    if (user) {
      return handleRating(rating);
    } else {
      setModal(rating);
    }
  };

  const handleFavorites = (favorite: string) => {
    if (user) {
      return console.log("add favorites");
    } else {
      setModal(favorite);
    }
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => handleUserRating("like")}
          className={`text-center py-[3px] z-50 ${likeClicked && "text-fuchsia-600"} hover:text-fuchsia-600 text-[#B3B3B3]`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5}
               stroke="currentColor" className="inline-block w-[22px] h-[22px]">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
          </svg>
          {likes}
        </button>
        {modal === "like" && (
          <>
            <div className="fixed inset-0" onClick={() => setModal("")} />
            <div
              className="absolute bg-black border-2 border-gray-500 p-4 rounded-md text-white top-[-160px] left-[50%] transform translate-x-[-50%] w-50">
              <h1 className="text-xl font-bold mb-2 text-center">Log in</h1>
              <p className="text-center">Log in to upvote the posts you like</p>
              <button
                className="ml-[calc(50%-25px)] mt-2 px-2 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-300">
                Go!
              </button>
            </div>
          </>
        )}
      </div>
      <div className="relative">
        <button
          onClick={() => handleUserRating("dislike")}
          className={`text-center py-[3px] z-50 ${dislikeClicked && "text-fuchsia-600"} hover:text-fuchsia-600 text-[#B3B3B3]`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5}
               stroke="currentColor" className="inline-block w-[22px] h-[22px]">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
          </svg>
          {dislikes}
        </button>
        {modal === "dislike" && (
          <>
            <div className="fixed inset-0" onClick={() => setModal("")} />
            <div
              className="absolute bg-black border-2 border-gray-500 p-4 rounded-md text-white top-[-160px] left-[50%] transform translate-x-[-50%] w-50">
              <h1 className="text-xl font-bold mb-2 text-center">Log in</h1>
              <p className="text-center">Log in to upvote the posts you like</p>
              <button
                className="ml-[calc(50%-25px)] mt-2 px-2 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-300">
                Go!
              </button>
            </div>
          </>
        )}
      </div>
      <div className="relative">
        <button onClick={() => handleFavorites("favorite")}
                className={`text-center py-[3px] px-[5px] hover:text-fuchsia-600 z-50 text-[#B3B3B3]`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5}
               stroke="currentColor" className="w-6 h-6 hover:text-fuchsia-600 transition">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
        {modal === "favorite" && (
          <>
            <div className="fixed inset-0" onClick={() => setModal("")} />
            <div
              className="absolute bg-black border-2 border-gray-500 p-4 rounded-md text-white top-[-160px] left-[50%] transform translate-x-[-50%] w-60">
              <h1 className="text-xl font-bold mb-2 text-center">Log in</h1>
              <p className="text-center">Log in to add an posts you like to favorites</p>
              <button
                className="ml-[calc(50%-25px)] mt-2 px-2 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-300">
                Go!
              </button>
            </div>
          </>
        )}
      </div>
      <a href={downloadFileUrl}
         className={`text-center py-[3px] px-[5px] hover:text-fuchsia-600 z-50 text-[#B3B3B3]`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
             className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
      </a>
    </>
  );
};

export default FileButtons;