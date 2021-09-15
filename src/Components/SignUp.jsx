import React, { useContext, useState } from "react";
import { AuthContext } from "./context/AuthProvider";
import { firebaseDB, firebaseStorage } from "../Components/config/firebase";
import {
  Card,
  CardMedia,
  CardContent,
  Container,
  Grid,
  TextField,
  CardActions,
  Button,
  Typography,
} from "@material-ui/core";
import logo from "../logo.png";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const { signUp } = useContext(AuthContext);

  const switchLogin = () => {
    props.history.push("/");
  };

  const handleSignup = async () => {
    try {
      let response = await signUp(email, password);
      let uid = response.user.uid;
      const pictureObj = firebaseStorage
        .ref(`/profilePhotos/${uid}/image.jpg`)
        .put(profilePicture);
      pictureObj.on("state_changed", fn1, fn2, fn3);
      function fn1(snapshot) {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      }
      function fn2(err) {
        console.log(err);
      }
      async function fn3() {
        let profileImageUrl = await pictureObj.snapshot.ref.getDownloadURL();
        let collectionsData = {
          email: email,
          password: password,
          userid: uid,
          profileImageUrl: profileImageUrl,
          postsCreated: [],
          username: userName,
        };
        firebaseDB
          .collection("users")
          .doc(uid)
          .set(collectionsData)
          .then(() => {
            console.log("Documented Added Successfull");
          });
        props.history.push("/");
        setMessage("Welcome");
      }
    } catch (err) {
      setMessage(err.message);
    }
  };
  const handleFileChoose = (e) => {
    let fileObj = e.target.files[0];
    setProfilePicture(fileObj);
  };
  let useStyles = makeStyles({
    mb: {
      marginBottom: "0.5rem",
    },
    centerElement: {
      display: "flex",
      justifyContent: "center",
    },
  });
  let classes = useStyles();

  return (
    <div>
      <Container>
        <Grid container>
          <Grid item sm={3}>
            <Card
              variant="outlined"
              className={[classes.centerElement, classes.mb]}
              style={{ flexDirection: "column", padding: "1rem " }}
            >
              <CardMedia
                image={logo}
                style={{ height: "5rem", backgroundSize: "contain" }}
              ></CardMedia>
              <Typography style={{ color: "darkgray", textAlign: "center" }}>
                SignUp to see photos and videos from your friends.
              </Typography>
              <CardContent>
                <TextField
                  className={classes.mb}
                  label="Username"
                  type="text"
                  variant="outlined"
                  size="small"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                ></TextField>
                <TextField
                  className={classes.mb}
                  label="Email"
                  type="email"
                  variant="outlined"
                  size="small"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></TextField>
                <TextField
                  label="Password"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  variant="outlined"
                  size="small"
                  value={password}
                ></TextField>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.mb}
                  size="small"
                >
                  Upload File
                  <input type="file" onChange={handleFileChoose} />
                </Button>
              </CardActions>
              <Typography style={{ color: "darkgray", textAlign: "center" }}>
                By signing up you agree to our terms,Data Policy, and Cookie
                Policy
              </Typography>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "100%" }}
                  onClick={handleSignup}
                >
                  Signup
                </Button>
              </CardActions>
            </Card>
            <Card variant="outlined">
              <Typography style={{ color: "darkgray", textAlign: "center" }}>
                Have An Account?
                <Link to="/login">Login</Link>
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SignUp;
