import React from "react";
import { AiTwotoneLike, AiOutlineLike } from "react-icons/ai";
import { GrLike } from "react-icons/gr";

import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContextProvider.jsx";
import { storage, db, auth } from "../../Firebase/firebase.config.js";
export default function LikeArticle({ id, likes, colDB }) {
  const { user } = useContext(ProductContext);

  const newArr = likes.sort(() => Math.random() - 0.5);
  const arrLikes = newArr.slice(0, 5);
  const likesRef = doc(db, colDB, id);
  // console.log(likes);
  const handleLike = () => {
    if (likes?.includes(user.avatar)) {
      updateDoc(likesRef, {
        likes: arrayRemove(user.avatar),
      })
        .then(() => {
          // console.log("unliked");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      updateDoc(likesRef, {
        likes: arrayUnion(user.avatar),
      })
        .then(() => {
          // console.log("liked");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <div
      onClick={handleLike}
      style={{
        cursor: "pointer",
        color: likes?.includes(user.avatar) ? "red" : null,
      }}
      className="text-2xl text-black flex items-center justify-center "
    >
      {!likes?.includes(user.avatar) ? (
        <>
          <AiOutlineLike className="" />
        </>
      ) : (
        <>
          <AiTwotoneLike className="text-red-500 mr-2" />
        </>
      )}
      {/* <AiOutlineLike /> */}
      <div class="flex flex-row-reverse md:mt-2 lg:mt-0">
        <span class="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-navy-700 ">
          +{newArr.length - arrLikes?.length}
        </span>
        {arrLikes &&
          arrLikes.map((item, index) => {
            return (
              <span class="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                <img
                  class="h-full w-full rounded-full object-cover"
                  // src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar1.eeef2af6dfcd3ff23cb8.png"
                  alt=""
                  src={item}
                />
              </span>
            );
          })}
      </div>
      {/* <span className="mx-2 flex ml-2">
        {arrLikes &&
          arrLikes.map((item, index) => (
            <>
              <img
                key={index}
                src={item}
                className={`-ml-[10px] h-6 w-6 rounded-full left-2 z-[${index}]`}
              />
            </>
          ))}
      </span> */}
    </div>
  );
}
