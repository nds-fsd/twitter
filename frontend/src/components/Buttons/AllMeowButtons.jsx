import React from "react";
import LikeButton from "./LikeButton";
import RepostButton from "./RepostButton";
import BookmarkButton from "./BookmarkButton";
import Views from "./Views";
import ShareButton from "./ShareButton";
import RepliesButton from "./RepliesButton";

const AllMeowButtons = ({ meow }) => {
  return (
    <>
      <RepliesButton meow={meow} />
      <LikeButton meow={meow} />
      <RepostButton meow={meow} />
      <BookmarkButton meow={meow} />
      <Views meow={meow} />
      <ShareButton meow={meow} />
    </>
  );
};

export default AllMeowButtons;
