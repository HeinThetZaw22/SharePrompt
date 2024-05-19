"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className=" prompt_layout mt-16">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [post, setPost] = useState([]);
  //for search handling
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchTimeOut, setSearchTimeOut] = useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      // console.log(data);
      if (Array.isArray(data)) {
        setPost(data);
      } else {
        console.error("Fetched data is not an array");
      }
      // setPost(data);
    };
    fetchPosts();
  }, []);
  const filterPrompts = (searchtext) => {
    const regexp = new RegExp(searchtext, "i");
    return post.filter(
      (item) =>
        regexp.test(item.creater.username) ||
        regexp.test(item.prompt) ||
        regexp.test(item.tag)
    );
  };
  const handleSearchText = (e) => {
    clearTimeout(searchTimeOut);
    setSearchText(e.target.value);
    setSearchTimeOut(
      setTimeout(() => {
        const searchOutput = filterPrompts(e.target.value);
        setSearchResult(searchOutput);
      }, 500)
    );
  };

  const handleTagClick = (tagname) => {
    setSearchText(tagname);
    const tagResult = filterPrompts(tagname);
    setSearchResult(tagResult)
  }

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
      {searchText ? (
        <PromptCardList data={searchResult} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={post} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
