import React from "react";
import LikeButton from "./LikeButton";
import RepostButton from "./RepostButton";
import BookmarkButton from "./BookmarkButton";
import Views from "./Views";
import ShareButton from "./ShareButton";
import RepliesButton from "./RepliesButton";

const AllMeowButtons = ({
  meow,
  authorUsername,
  setReloadProfilePage,
  reloadProfilePage,
}) => {
  return (
    <>
      <RepliesButton meow={meow} />
      <LikeButton meow={meow} authorUsername={authorUsername} />
      <RepostButton
        meow={meow}
        authorUsername={authorUsername}
        setReloadProfilePage={setReloadProfilePage}
        reloadProfilePage={reloadProfilePage}
      />
      <BookmarkButton meow={meow} authorUsername={authorUsername} />
      <Views meow={meow} />
      <ShareButton meow={meow} />
    </>
  );
};

export default AllMeowButtons;
