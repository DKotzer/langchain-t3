import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import Image from "next/image";
import { LoadingPage, LoadingSpinner } from "~/components/loading";
// import { PostView } from "~/components/postview";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { useState } from "react";
// import { UserButton, useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

type Bot = {
  bot: {
    bot: {
      id: string;
      username: string;
      bio: string;
      image: string;
      createdAt: Date;
      job: string;
      age: string;
      location: string;
      education: string;
      religion: string;
      likes: string;
      hobbies: string;
      dislikes: string;
      dreams: string;
      fears: string;
      authorId: string;
      tokens: number;
    };
  };
};

//Type '{ bot: Bot; author: { username: string; id: string; profileImageUrl: string; externalUsername: string | null; }; }' is not assignable to type '{ bot: { id: string; username: string; bio: string; image: string; createdAt: string; job: string; age: string; location: string; education: string; religion: string; likes: string; hobbies: string; dislikes: string; dreams: string; fears: string; externalUsername: string; }; }'.
//   Types of property 'bot' are incompatible.
// Property 'externalUsername' is missing in type 'Bot' but required in type '{ id: string; username: string; bio: string; image: string; createdAt: string; job: string; age: string; location: string; education: string; religion: string; likes: string; hobbies: string; dislikes: string; dreams: string; fears: string; externalUsername: string; }'.

// const useDeleteBot = (id:string) => {
//      api.bots.deleteBot.mutate({id});

// };

export const BotView = (props: Bot, userId: string) => {
  const [showModal, setShowModal] = useState(false); //delete button modal
  const [showBot, setShowBot] = useState(true);

  

  const { user, isSignedIn, isLoaded } = useUser();

  const { mutate, isLoading: isDeleting } = api.bots.deleteBot.useMutation({
    onSuccess: () => {
      toast.success("Deleted Successfully!");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to delete bot! Please try again later.");
      }
    },
  });
  // console.log("tokens test", props.bot.bot.tokens);

  const handleDelete = (id: string, name: string) => {
    // Handle bot deletion logic here
    console.log(`Deleting bot...`);
    // Close the modal after deletion is complete
    setShowBot(false);
    setShowModal(false);
    mutate({ id: id, name: name });
    // api.bots.deleteBot.useQuery({ id });
  };
  //   console.log("bot test", props.bot.bot);
  return (
    <div
      className={`flex flex-col border-x border-b border-slate-400/50 p-6 ${
        !showBot && "hidden"
      }`}
      key={props.bot.bot.username}
    >
      <div className="my-auto flex   ">
        <Link href={`/bot/@${props.bot.bot.username}`}>
          <Image
            src={props.bot.bot.image}
            width={46}
            height={46}
            alt={"Profile Image"}
            className="my-auto self-center rounded-full hover:scale-105 hover:ring"
            quality={80}
          />
        </Link>

        <Link href={`/bot/@${props.bot.bot.username}`}>
          <div className="my-auto ml-1.5 text-3xl hover:scale-105">
            @{props.bot.bot.username.trim()}
          </div>
        </Link>
        <span className=" my-auto"></span>
      </div>
      <div className="h-2"></div>
      <Link
        href={`/bot/@${props.bot.bot.username}`}
        className="hover:scale-105"
      >
        📅 Posting since{" "}
        {new Date(props.bot.bot.createdAt).toLocaleDateString()}
      </Link>
      {true && (
        <span className="mr-16 hover:scale-105"> 👥 0 Human Followers</span>
      )}
      <span className="mr-3 hover:scale-105">
        {" "}
        {(
          <Image
            src="/token.ico"
            width={21}
            height={21}
            alt={"tokens"}
            className="mr-1 inline hover:scale-105"
          />
        ) || "🪙"}
        {props.bot.bot.tokens.toLocaleString("en", {
          useGrouping: true,
        })}
        💸{`$${((Number(props.bot.bot.tokens) / 1000) * 0.002 ).toFixed(3)}`}
      </span>
      <div className="h-1"></div>

      <span className="text-lg">{props.bot.bot.bio}</span>

      {/* {props.bot.bot.follower && (
            <span> 👥 + {props.bot.bot.followers.length} + Human Followers</span>
          )} */}

      {/* <span className="tooltip text-lg hover:scale-105 hover:cursor-default">
            <span className=" rounded-full bg-slate-400  ">👥 </span> 0 Human
            Followers
            <span className="tooltiptext">0 Human Followers</span>
          </span> */}
      <div className="h-3"></div>

      <div className="flex flex-col gap-1">
        <span className="tooltip text-lg hover:scale-105 hover:cursor-default">
          <span className=" rounded-full bg-slate-400 p-1 hover:ring-2 hover:ring-slate-100  ">
            🎂
          </span>{" "}
          {props.bot.bot.age}
          <span className="tooltiptext">Age</span>
        </span>
        <br />

        <span className="tooltip text-lg hover:scale-105 hover:cursor-default">
          <span className=" rounded-full bg-slate-400 p-1  hover:ring-2 hover:ring-slate-100 ">
            💼
          </span>{" "}
          {props.bot.bot.job}
          <span className="tooltiptext">Job</span>
        </span>
        <br />

        <span className="tooltip text-lg hover:scale-105 hover:cursor-default">
          <span className=" rounded-full bg-slate-400 p-1  hover:ring-2 hover:ring-slate-100 ">
            🎓
          </span>{" "}
          {props.bot.bot.education}
          <span className="tooltiptext">Education</span>
        </span>
        <br />

        <span className="tooltip text-lg hover:scale-105 hover:cursor-default">
          <span className=" rounded-full bg-slate-400 p-1  hover:ring-2 hover:ring-slate-100 ">
            🗺️
          </span>{" "}
          {props.bot.bot.location}
          <span className="tooltiptext">Location</span>
        </span>
        <br />

        <span className="tooltip text-lg hover:scale-105 hover:cursor-default">
          <span className=" rounded-full bg-slate-400 p-1  hover:ring-2 hover:ring-slate-100 ">
            🛐
          </span>{" "}
          {props.bot.bot.religion}
          <span className="tooltiptext">Religion</span>
        </span>
        <br />

        <span className="tooltip text-lg hover:scale-105 hover:cursor-default">
          <span className=" rounded-full bg-slate-400 p-1  hover:ring-2 hover:ring-slate-100 ">
            👍
          </span>{" "}
          {props.bot.bot.likes}
          <span className="tooltiptext">Likes</span>
        </span>
        <br />

        <span className="tooltip text-lg hover:scale-105 hover:cursor-default">
          <span className=" rounded-full bg-slate-400 p-1  hover:ring-2 hover:ring-slate-100 ">
            🎨
          </span>{" "}
          {props.bot.bot.hobbies}
          <span className="tooltiptext">Hobbies</span>
        </span>
        <br />

        <span className="tooltip text-lg hover:scale-105 hover:cursor-default">
          <span className=" rounded-full bg-slate-400 p-1 hover:ring-2 hover:ring-slate-100 ">
            👎
          </span>{" "}
          {props.bot.bot.dislikes}
          <span className="tooltiptext">Dislikes</span>
        </span>
        <br />

        <span className="tooltip text-lg hover:scale-105 hover:cursor-default ">
          <span className="rounded-full bg-slate-400 p-1 hover:ring-2 hover:ring-slate-100  ">
            🛌
          </span>{" "}
          {props.bot.bot.dreams}
          <span className="tooltiptext">Dreams</span>
        </span>
        <br />

        <span className="tooltip text-lg hover:scale-105 hover:cursor-default ">
          <span className=" rounded-full bg-slate-400 p-1  hover:ring-2 hover:ring-slate-100  ">
            😱
          </span>{" "}
          {props.bot.bot.fears}
          <span className="tooltiptext">Fears</span>
        </span>
        <br />
        {!showModal && props.bot.bot.authorId === user?.id && (
          <button
            onClick={() => setShowModal(true)}
            className="float-right mr-6 rounded-full bg-red-500 py-2 px-4 font-bold text-slate-100 hover:bg-red-700 hover:scale-95 hover:ring-1 hover:ring-red-400"
          >
            Delete Bot
          </button>
          // <span className="float-right rounded-xl p-2 ring ring-red-800 hover:scale-105 hover:cursor-not-allowed hover:bg-red-600">{`Delete ${props.bot.bot.username} `}</span>
        )}
        {showModal && (
          <div className="flex flex-col">
            <span className="float-right rounded-xl bg-red-500 p-2 text-center font-bold ring ring-red-800 hover:scale-105 hover:cursor-not-allowed hover:bg-red-600">
              Are you sure you want to delete {props.bot.bot.username}{" "}
            </span>
            <div className="mx-auto flex flex-row pt-2">
              <button
                onClick={() =>
                  handleDelete(props.bot.bot.id, props.bot.bot.username)
                }
                className="rounded-full bg-red-500 py-2 px-4 font-bold text-slate-100 hover:bg-red-700"
              >
                Delete
              </button>{" "}
              <button
                onClick={() => setShowModal(false)}
                className="rounded-full bg-blue-500 py-2 px-4 font-bold text-slate-100 hover:bg-blue-700"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BotView;
