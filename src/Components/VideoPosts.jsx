import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Card,
  CardMedia,
  CardActions,
  CardHeader,
  Typography,
  Avatar,
  TextField,
  Button,
} from "@material-ui/core";
import { firebaseDB } from "./config/firebase";
import { AuthContext } from "./context/AuthProvider";
import { Favorite, FavoriteBorder } from "@material-ui/icons";

function Video(props) {
  return (
    <video
      style={{
        height: "80vh",
        border: "1px solid black",
      }}
      className="video-styles"
      controls
      muted={true}
      loop="true"
    >
      <source src={props.src}></source>
    </video>
  );
}

const VideoPosts = (props) => {
  const [pfp, setPfp] = useState("");
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [pfpC, setPfpC] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(null);

  const toggleLike = async () => {
    if (isLiked) {
      let postObj = props.postObj;
      let filteredLikes = props.postObj.likes.filter((uid) => {
        if (uid == currentUser.uid) {
          return false;
        } else {
          return true;
        }
      });
      postObj.likes = filteredLikes;
      await firebaseDB.collection("posts").doc(postObj.pid).set(postObj);
      setIsLiked(false);
      likesCount == 1 ? setLikesCount(null) : setLikesCount(likesCount - 1);
    } else {
      let postObj = props.postObj;
      postObj.likes.push(currentUser.uid);
      await firebaseDB.collection("posts").doc(postObj.pid).set(postObj);
      setIsLiked(true);
      likesCount == null ? setLikesCount(1) : setLikesCount(likesCount + 1);
    }
  };
  let { currentUser } = useContext(AuthContext);
  let loggedInUser = currentUser._delegate.uid;

  const handlePost = async () => {
    let doc = await (
      await firebaseDB.collection("posts").doc(props.postObj.pid).get()
    ).data();
    doc.comments.push({
      comment: comment,
      uid: loggedInUser,
    });
    await firebaseDB.collection("posts").doc(props.postObj.pid).set(doc);
    setTimeout(() => {
      setComment("");
    }, 1000);

    setCommentList([...commentList, { comment: comment, profilePic: pfpC }]);
  };

  useEffect(async () => {
    let doc = await firebaseDB.collection("users").doc(props.postObj.uid).get();
    let likes = props.postObj.likes;
    let document = doc.data();
    setPfp(document.profileImageUrl);
    setUsername(document.username);
    let commentsList = props.postObj.comments;
    let updatedCommentList = [];
    for (let i = 0; i < commentsList.length; i++) {
      let commentObj = commentsList[i];
      // console.log(commentObj.uid);
      let doc = await firebaseDB.collection("users").doc(commentObj.uid).get();

      let commentUserPic = doc.data().profileImageUrl;
      setPfpC(commentUserPic);
      // console.log(pfpC);
      updatedCommentList.push({
        profilePic: commentUserPic,
        comment: commentObj.comment,
      });
    }

    if (likes.includes(currentUser.uid)) {
      setIsLiked(true);
      setLikesCount(likes.length);
    } else {
      if (likes.length) {
        setLikesCount(likes.length);
      }
    }

    setCommentList(updatedCommentList);
  }, []);

  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          // height: "80vh",
          width: "400px",
          margin: "auto",
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        <Avatar src={pfp ? pfp : ""}></Avatar>
        <Typography>{username ? username : ""}</Typography>
        <div className="video-container">
          <Video src={props.postObj.videoLink}></Video>
        </div>
        <div>
          {isLiked ? (
            <Favorite
              onClick={toggleLike}
              style={{ color: "red", pointer: "cursor" }}
            ></Favorite>
          ) : (
            <FavoriteBorder onClick={toggleLike}></FavoriteBorder>
          )}
        </div>
        {likesCount && (
          <div>
            <Typography variant="p">
              Liked by {likesCount} individual
            </Typography>
          </div>
        )}
        <Typography variant="p">Comments</Typography>
        <TextField
          variant="outlined"
          label="comment"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        ></TextField>
        <Button onClick={handlePost} variant="contained" color="secondary">
          Post
        </Button>
        {commentList.map((commentObj) => {
          return (
            <>
              <Avatar src={commentObj.profilePic}></Avatar>
              <Typography variant="p">{commentObj.comment}</Typography>
            </>
          );
        })}
      </Card>
    </Container>
  );
};

export default VideoPosts;
