"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const {data: session} = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-3">
        <div className=" flex-1 flex justify-start items-center gap-2">
          <Image
            src={post.creater.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full cursor-pointer object-contain"
          />
          <div className="flex flex-col">
            <h3 className=" font-satoshi font-semibold text-gray-900">
              {post.creater.username}
            </h3>
            <p className="font-inter text-gray-500">{post.creater.email}</p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            alt="copy-icon"
            width={12}
            height={12}
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
          />
        </div>
      </div>
      <p className=" my-4 font-satosho text-gray-700">{post.prompt}</p>
      <p
        onClick={() => {
          handleTagClick && handleTagClick(post.tag);
        }}
        className=" font-inter text-sm blue_gradient cursor-pointer"
      >
        #{post.tag}
      </p>
      {session?.user.id === post.creater._id && pathName === '/profile' && (
        <div className="flex-center gap-4 mt-4 border-t pt-4">
          <p onClick={handleEdit}  className="font-inter text-sm blue_gradient cursor-pointer">Edit</p>
          <p onClick={handleDelete} className="font-inter text-sm orange_gradient cursor-pointer">Delete</p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
