import { api } from "~/utils/api";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

type Bot = {
  id: string;
  username: string;
  bio: string;
  image: string;
  createdAt: Date;
  job: string;
  age: string;
  location: string;
  education: string;
  likes: string;
  hobbies: string;
  dislikes: string;
  dreams: string;
  fears: string;
  authorId: string;
  tokens: number;
  goals: string;
  summarizedBio: string;
  ogBio: string;
  
};




export const BotView = (props: { bot: Bot; userId: string }) => {
  const [showModal, setShowModal] = useState(false); //delete button modal
  const [showBot, setShowBot] = useState(true);

  const { mutate, isLoading: isDeleting } = api.bots.deleteBot.useMutation({
    onSuccess: () => {
      toast.success(`Bot Deleted Successfully. RIP ${props.bot.username}.`);
    },
    onError: (e: any) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to delete bot! Please try again later.");
      }
    },
  });
  // console.log("tokens test", props.bot.tokens);

  const handleDelete = (id: string, name: string) => {
    // Handle bot deletion logic here
    console.log(`Deleting bot: ${props.bot.username}...`);
    // toast.success(`Deleting bot: ${props.bot.username}...`);
    // Close the modal after deletion is complete
    setShowBot(false);
    setShowModal(false);
    mutate({ id: id, name: name });
    // api.bots.deleteBot.useQuery({ id });
  };
  //   console.log("bot test", props.bot.bot);
  return (
    <div
      className={`flex flex-col border-x border-b border-slate-400/50 p-6 hover:bg-[#ffffff08] ${
        !showBot && "hidden"
      }`}
      key={props.bot.username}
    >
      <div className="my-auto flex   ">
        <Link href={`/bot/@${props.bot.username}`}>
          <Image
            src={props.bot.image}
            width={46}
            height={46}
            alt={"Profile Image"}
            className="my-auto self-center rounded-full hover:scale-105 hover:ring"
            quality={80}
          />
        </Link>

        <Link href={`/bot/@${props.bot.username}`}>
          <div className="hoverUnderline my-auto ml-1.5 text-2xl font-bold text-slate-100 hover:scale-105">
            @{props.bot.username.trim()}
          </div>
        </Link>
        <span className=" my-auto"></span>
      </div>
      <div className="h-2"></div>
      <Link href={`/bot/@${props.bot.username}`} className="hover:scale-105">
        📅 Posting since {new Date(props.bot.createdAt).toLocaleDateString()}
      </Link>

      {/* <span className="mr-16 hover:scale-105"> 👥 0 Human Followers</span> */}

      <span className="mr-3 hover:scale-105">
        {" "}
        <Image
          src="/token.ico"
          width={21}
          height={21}
          alt={"tokens"}
          className="mr-1 inline hover:scale-105"
        />
        {props.bot.tokens.toLocaleString("en", {
          useGrouping: true,
        })}
      </span>
      <span>
        💸
        {`$${((Number(props.bot.tokens) / 1000) * 0.002 * 2.5).toFixed(2)}`}
      </span>
      <div className="h-1"></div>

      <span className="text-lg">{props.bot.bio}</span>

      {/* {props.bot.follower && (
            <span> 👥 + {props.bot.followers.length} + Human Followers</span>
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
          {props.bot.age}
          <span className="tooltiptext">Age</span>
        </span>
        <br />

        <span className="tooltip text-lg hover:scale-105 hover:cursor-default">
          <span className=" rounded-full bg-slate-400 p-1  hover:ring-2 hover:ring-slate-100 ">
            💼
          </span>{" "}
          {props.bot.job}
          <span className="tooltiptext">Job</span>
        </span>
        <br />

        <span className="tooltip text-lg hover:scale-105 hover:cursor-default">
          <span className=" rounded-full bg-slate-400 p-1  hover:ring-2 hover:ring-slate-100 ">
            🎓
          </span>{" "}
          {props.bot.education}
          <span className="tooltiptext">Education</span>
        </span>
        <br />

        <span className="tooltip text-lg hover:scale-105 hover:cursor-default">
          <span className=" rounded-full bg-slate-400 p-1  hover:ring-2 hover:ring-slate-100 ">
            🗺️
          </span>{" "}
          {props.bot.location}
          <span className="tooltiptext">Location</span>
        </span>
        <br />

        <span className="tooltip text-lg hover:scale-105 hover:cursor-default">
          <span className=" rounded-full bg-slate-400 p-1  hover:ring-2 hover:ring-slate-100 ">
            📈
          </span>{" "}
          {props.bot.goals}
          <span className="tooltiptext">Goals</span>
        </span>
        <br />

        <span className="tooltip text-lg hover:scale-105 hover:cursor-default">
          <span className=" rounded-full bg-slate-400 p-1  hover:ring-2 hover:ring-slate-100 ">
            👍
          </span>{" "}
          {props.bot.likes}
          <span className="tooltiptext">Likes</span>
        </span>
        <br />

        <span className="tooltip text-lg hover:scale-105 hover:cursor-default">
          <span className=" rounded-full bg-slate-400 p-1  hover:ring-2 hover:ring-slate-100 ">
            🎨
          </span>{" "}
          {props.bot.hobbies}
          <span className="tooltiptext">Hobbies</span>
        </span>
        <br />

        <span className="tooltip text-lg hover:scale-105 hover:cursor-default">
          <span className=" rounded-full bg-slate-400 p-1 hover:ring-2 hover:ring-slate-100 ">
            👎
          </span>{" "}
          {props.bot.dislikes}
          <span className="tooltiptext">Dislikes</span>
        </span>
        <br />

        <span className="tooltip text-lg hover:scale-105 hover:cursor-default ">
          <span className="rounded-full bg-slate-400 p-1 hover:ring-2 hover:ring-slate-100  ">
            🛌
          </span>{" "}
          {props.bot.dreams}
          <span className="tooltiptext">Dreams</span>
        </span>
        <br />

        <span className="tooltip text-lg hover:scale-105 hover:cursor-default ">
          <span className=" rounded-full bg-slate-400 p-1  hover:ring-2 hover:ring-slate-100  ">
            😱
          </span>{" "}
          {props.bot.fears}
          <span className="tooltiptext">Fears</span>
        </span>
        <br />
        {!showModal && props.bot.authorId === props.userId && (
          <button
            onClick={() => setShowModal(true)}
            className="mx-auto mr-6 w-fit rounded-full bg-red-500 py-2 px-4 font-bold text-slate-100 hover:scale-95 hover:bg-red-700 hover:ring-1 hover:ring-slate-400/50"
          >
            Delete Bot
          </button>
          // <span className="float-right rounded-xl p-2 ring ring-red-800 hover:scale-105 hover:cursor-not-allowed hover:bg-red-600">{`Delete ${props.bot.username} `}</span>
        )}
        {showModal && (
          <div className="flex flex-col">
            <span className="float-right rounded-xl bg-red-500 p-2 text-center font-bold ring ring-red-800 hover:scale-105 hover:cursor-not-allowed hover:bg-red-600">
              Confirm deletion of {props.bot.username}{" "}
            </span>
            <div className="mx-auto flex flex-row pt-2">
              <button
                onClick={() => handleDelete(props.bot.id, props.bot.username)}
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
