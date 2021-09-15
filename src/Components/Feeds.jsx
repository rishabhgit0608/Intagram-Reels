import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthProvider";
import { Button } from "@material-ui/core";
import PhotoIconCamera from "@material-ui/icons/PhotoCamera";
import { firebaseDB, firebaseStorage, timeStamp } from "./config/firebase";
import { uuid } from "uuidv4";
import VideoPosts from "./VideoPosts";
const Feeds = (props) => {
  let { signout } = useContext(AuthContext);
  const { currentUser } = useContext(AuthContext);
  const [videoFile, setVideoFile] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [uploadError, setUploadError] = useState("");
  const handleLogout = () => {
    signout();
    props.history.push("/login");
  };
  const handleOnClick = async () => {
    try {
      if (videoFile.size / 1000000 > 5) {
        setUploadError("Upload ERROR ! Video Size Greater than 5 MB");
        setInterval(() => {
          setUploadError("");
        }, 5000);
        return;
      }
      let uid = currentUser.uid;
      const videoObj = firebaseStorage
        .ref(`/profilePhotos/${uid}/${Date.now()}.mp4`)
        .put(videoFile);
      videoObj.on("state_changed", fn1, fn2, fn3);
      function fn1(snapshot) {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      }
      function fn2(err) {
        console.log(err);
      }
      async function fn3() {
        let videoObjUrl = await videoObj.snapshot.ref.getDownloadURL();
        console.log(videoObjUrl);
        let pid = uuid();
        firebaseDB
          .collection("posts")
          .doc(pid)
          .set({
            pid: pid,
            uid: uid,
            comments: [],
            likes: [],
            videoLink: videoObjUrl,
            createdAt: timeStamp(),
          })
          .then(() => {
            console.log("Post Added");
          });
        let doc = await firebaseDB.collection("users").doc(uid).get();
        let document = doc.data();
        console.log(document);
        document.postsCreated.push(pid);
        await firebaseDB.collection("users").doc(uid).set(document);
      }
      //video file is uploaded and we got the videolink
    } catch (err) {}
  };
  const handleOnChange = (e) => {
    let videoFile = e.target.files[0];
    setVideoFile(videoFile);
  };
  let condition = {
    threshold: 0.9,
    root: null,
  };

  function cb(entries) {
    entries.forEach((entry) => {
      let child = entry.target.children[0];
      child.play().then(() => {
        if (entry.isIntersecting == false) {
          child.pause();
        }
      });
    });
  }
  useEffect(() => {
    firebaseDB
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshots) => {
        let allPosts = snapshots.docs.map((doc) => {
          return doc.data();
        });
        setAllPosts(allPosts);
      });
  }, []);
  useEffect(() => {
    const objObserver = new IntersectionObserver(cb, condition);
    let elements = document.querySelectorAll(".video-container");
    elements.forEach((element) => {
      objObserver.observe(element);
    });
  });

  return (
    <div>
      <h1>Feeds</h1>;<button onClick={handleLogout}>logout</button>
      <div className="uploadVideo">
        <div>
          <input type="file" onChange={handleOnChange} />
          <Button
            onClick={handleOnClick}
            variant="contained"
            color="secondary"
            startIcon={<PhotoIconCamera></PhotoIconCamera>}
          >
            Upload
          </Button>
          <p>{uploadError}</p>
        </div>
        <div className="feeds-video-list" style={{ margin: "auto" }}>
          {allPosts.map((postObj) => {
            return <VideoPosts postObj={postObj}></VideoPosts>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Feeds;
