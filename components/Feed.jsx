"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return <div className=" prompt_layout mt-16">
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
      
  </div>;
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [post, setPost] = useState([]);
  const handleSearchText = () => {};
  useEffect(() => {
     const fetchPosts = async () => {
        const response = await fetch('/api/prompt');
        const data = await response.json();
        // console.log(data);
        if (Array.isArray(data)) {
          setPost(data);
        } else {
          console.error("Fetched data is not an array");
        }
        // setPost(data);
     }
     fetchPosts();
  },[])
  return (
    <section className=" feed">
      <form className=" relative w-full flex flex-center">
        <input
          value={searchText}
          type="text"
          required
          onChange={handleSearchText}
          placeholder="Search for a tag or a username"
          className="search_input peer"
        />
      </form>
      <PromptCardList data={post} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
