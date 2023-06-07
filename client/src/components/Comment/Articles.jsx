import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect, Fragment } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { GiRapidshareArrow } from "react-icons/gi";
import avatars from "../../images/avt.jpg";
import { ProductContext } from "../../contexts/ProductContextProvider.jsx";
import { storage, db, auth } from "../../Firebase/firebase.config.js";
import DeleteArticle from "./DeleteArticle.jsx";
import LikeArticle from "./LikeArticle.jsx";
import Comment from "./Comment.jsx";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";

export default function Articles({ colDB }) {
  const { user } = useContext(ProductContext);
  const [articles, setArticles] = useState([]);
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const customAnimation = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };

  useEffect(() => {
    const articleRef = collection(db, colDB);
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
    });
  }, []);

  return (
    <>
      <div className="mb-14 mt-10 m-auto items-center justify-center">
        {articles.length === 0 ? (
          <p>Hãy Là Người Đầu Tiên Bình Luận!</p>
        ) : (
          articles.map(
            ({
              id,
              title,
              userPhotoURL,
              description,
              createdAt,
              createdBy,
              userId,
              likes,
              dislikes,
              comments,
            }) => (
              <div
                key={id}
                className="flex justify-center relative top-1/3 mb-10"
              >
                <div class="justify-center relative top-1/3">
                  <div
                    class={`relative w-[570px] grid grid-cols-1 gap-4 mb-2 border rounded-lg bg-white shadow-lg ${
                      user && user.userId === userId
                        ? " bg-black/10"
                        : "bg-blue-800/10"
                    }`}
                  >
                    <div class="relative flex gap-4 mx-4 ">
                      <img
                        src={userPhotoURL ? userPhotoURL : avatars}
                        class="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20"
                        alt=""
                        loading="lazy"
                      />
                      <div class="flex flex-col w-full">
                        <div class="flex flex-row justify-between w-full ">
                          <p class="relative  text-xl whitespace-nowrap truncate overflow-hidden">
                            <Link to={`/u/${userId}/`}>
                              <span class="text-blue-400 hover:text-pink-600">
                                {createdBy}
                              </span>
                            </Link>
                          </p>
                          <p className="justify-end">
                            {user && user.userId === userId && (
                              <DeleteArticle
                                id={id}
                                colDB={colDB}
                                description={description}
                              />
                            )}
                          </p>
                        </div>
                        <p
                          class={`text-gray-400 text-sm ${
                            user && user.userId === userId ? "-mt-4" : "-mt-1"
                          }`}
                        >
                          {createdAt.toDate().toDateString()}
                        </p>
                      </div>
                    </div>
                    <p
                      readOnly
                      class={`-mt-4  mx-4 rounded-md break-words border-none `}
                    >
                      {description.substring(0, 3000)}
                    </p>
                    <div className="w-full flex justify-between -mt-2">
                      <div className="w-full flex justify-end">
                        <div className="block  md:flex  w-fit px-3 md:mr-2">
                          <span className="flex  px-1 py-[2px] rounded-lg md:mr-2 justify-center items-center">
                            <span
                              className={` text-xl justify-center items-center text-black  font-medium 
                                `}
                            >
                              {user && user ? (
                                <span className="justify-center items-center">
                                  {likes?.length}
                                </span>
                              ) : (
                                <span className=" flex justify-center items-center mr-2">
                                  <AiOutlineLike className="text-2xl" />
                                  <span className="">{likes?.length}</span>
                                </span>
                              )}
                            </span>
                            <span className=" rounded-lg">
                              {user && (
                                <LikeArticle
                                  id={id}
                                  likes={likes}
                                  colDB={colDB}
                                />
                              )}
                            </span>
                          </span>
                          {/* <span className="flex shadow-lg px-1 py-[2px]  rounded-lg">
                            <span
                                className={` text-lg text-blue-300  
                                `}
                            >
                                {user && user ? (
                                    <span>{dislikes?.length}</span>
                                ) : (
                                    <span className=" flex justify-center items-center">
                                        <span>{dislikes?.length}</span>
                                        <AiOutlineLike className="text-xl" />
                                    </span>
                                )}
                            </span>
                            <span className=" rounded-lg">
                                {user && <Dislike id={id} dislikes={dislikes} colDB={colDB} />}
                            </span>
                        </span> */}
                          <span className="flex  px-1 py-[2px] rounded-lg md:mr-2">
                            {comments && (
                              <span className="text-black text-md flex">
                                <span className="flex justify-center items-center">
                                  <GiRapidshareArrow className="mr-1" />{" "}
                                  <span className="mx-[3px] text-black">
                                    {comments?.length}{" "}
                                  </span>{" "}
                                  Phản hồi
                                </span>
                              </span>
                            )}
                          </span>

                          {/* </Link> */}
                          {/* <span className="mx-2 top-0 right-0 flex ">
                          {user && user.userId === userId && (
                            <DeleteArticle
                              id={id}
                              imageUrl={userPhotoURL}
                              colDB={colDB}
                            />
                          )}
                        </span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Accordion
                    allowZeroExpanded
                    className="bg-primary  md:m-auto  w-full"
                  >
                    <AccordionItem key={id} className="  bg-white">
                      <AccordionItemHeading>
                        <AccordionItemButton className="flex bg-[#c8eef0] mt-1 p-1 rounded-md text-gray-300">
                          <span className="mr-[6px] text-[#4E9F3D]">
                            Trả lời bình luận của
                          </span>{" "}
                          <span className="md:block hidden text-blue-900">
                            {createdBy}
                          </span>
                          <span className="md:hidden text-blue-900">
                            {createdBy.slice(0, 20)}...
                          </span>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        {" "}
                        <div className={``}>
                          <Comment id={id} colDB={colDB} />
                        </div>
                      </AccordionItemPanel>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            )
          )
        )}
      </div>
      {/* <Article colDB={colDB} /> */}
    </>
  );
}
