import * as React from "react";
import { useNavigate } from "react-router-dom";
import { PostCard } from "../Component/PostCard";
import { PostTextBox } from "../Component/PostTextBox";
import { PostButtons } from "../Component/PostButtons";
import { AppBarComponent } from "../../CommonComponents/AppBar";
import { ImageDialog } from "../Component/ImageDialog";
import { getLocalUser } from "../../AWS/route";

import { Box, Button, Divider } from "@mui/material";

const HomePage = ({ loggedInUser, onLogout }) => {
  const [post, setPost] = React.useState("");
  const [refreshId, setRefreshId] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [openImageDialog, setOpenImageDialog] = React.useState(false);
  const navigate = useNavigate();

  let loginInfo = getLocalUser();

  let lastPostId = window.localStorage.getItem("lastPostId");
  if (lastPostId == null) {
    lastPostId = 1;
  } else {
    lastPostId = Number(lastPostId);
  }

  let postIds = window.localStorage.getItem("postIds");
  if (postIds == null) {
    postIds = [];
  } else {
    postIds = JSON.parse(postIds);
  }

  function handleHomePage() {
    navigate("/homepage");
  }

  function handleProfilePage() {
    navigate("/profilepage");
  }

  function handleImageDialogOpen() {
    setOpenImageDialog(true);
  }

  function handleImageDialogClose() {
    setOpenImageDialog(false);
  }

  function addPost(event) {
    event.preventDefault();

    // Trim the post text.
    const postTrimmed = post.trim();

    if (postTrimmed === "") {
      setErrorMessage("A post cannot be empty.");
      return;
    }

    if (postTrimmed.length > 250) {
      setErrorMessage("A post cannot more than 250 characters long.");
      return;
    }

    lastPostId++;
    window.localStorage.setItem("lastPostId", lastPostId + "");

    postIds.push(lastPostId);
    window.localStorage.setItem("postIds", JSON.stringify(postIds));

    let imageURL = window.localStorage.getItem("tempURL");
    imageURL = JSON.parse(imageURL);

    let newPost;

    if (imageURL) {
      newPost = {
        id: lastPostId,
        username: loginInfo.user_name,
        post: postTrimmed,
        img: imageURL,
        comment: [],
      };
    } else {
      newPost = {
        id: lastPostId,
        username: loginInfo.user_name,
        post: postTrimmed,
        comment: [],
      };
    }

    window.localStorage.removeItem("tempURL");

    window.localStorage.setItem("post_" + lastPostId, JSON.stringify(newPost));

    loginInfo.userPostIds.push("post_" + lastPostId);

    window.localStorage.setItem(loggedInUser, JSON.stringify(loginInfo));

    // Reset post content.
    setPost("");
    setErrorMessage("");
  }

  function clearPost() {
    // Reset post content.
    setPost("");
    setErrorMessage("");
  }

  function handleLogout() {
    onLogout();
    navigate("/");
  }

  function attachImage(url) {
    if (url) {
      window.localStorage.setItem("tempURL", JSON.stringify(url));
    }
  }

  function onDelete(postId) {
    window.localStorage.removeItem("post_" + postId);

    let idx = postIds.indexOf(postId);
    let newPostIds = [...postIds];
    newPostIds.splice(idx, 1);
    window.localStorage.setItem("postIds", JSON.stringify(newPostIds));

    let userPostIds = loginInfo.userPostIds;
    let userPostIdx = userPostIds.indexOf("post_" + postId);
    let newUserPostIds = [...userPostIds];
    newUserPostIds.splice(userPostIdx, 1);
    loginInfo.userPostIds = newUserPostIds;
    window.localStorage.setItem(loggedInUser, JSON.stringify(loginInfo));

    setPost("");
    setRefreshId(refreshId + 1);
  }

  function onEdit(idx, editedPost) {
    let postInfo = window.localStorage.getItem("post_" + idx);
    postInfo = JSON.parse(postInfo);
    postInfo.post = editedPost;

    window.localStorage.removeItem("post_" + idx);
    window.localStorage.setItem("post_" + idx, JSON.stringify(postInfo));
    setPost("");
  }

  return (
    <>
      <AppBarComponent
        onHomeClick={handleHomePage}
        onProfileClick={handleProfilePage}
        onLogoutClick={handleLogout}
        userName={loginInfo.user_name}
      />
      <div style={{ paddingLeft: 100, paddingRight: 100 }}>
        <Box style={{ padding: 10, paddingTop: 30 }}>
          <PostTextBox
            post={post}
            setPost={setPost}
            onImageDialogOpen={handleImageDialogOpen}
          />
          {errorMessage !== null && (
            <div>
              <span style={{ color: "red" }}> {errorMessage} </span>
            </div>
          )}
          <PostButtons addPost={addPost} clearPost={clearPost} />
          <Divider style={{ padding: 5 }} />
        </Box>
        <ImageDialog
          onClose={handleImageDialogClose}
          open={openImageDialog}
          handlePhoto={attachImage}
        />
        <Box>
          <h2 style={{ paddingLeft: 20 }}> Posts </h2>
          {postIds.length === 0 ? (
            <span className='text-muted'> No posts have been submitted. </span>
          ) : (
            postIds.map((postId, idx) => (
              <div style={{ whiteSpace: "pre-wrap" }}>
                <PostCard
                  postId={postId}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  firstName={loginInfo.user_name}
                />
              </div>
            ))
          )}
        </Box>
      </div>
    </>
  );
};

export { HomePage };
