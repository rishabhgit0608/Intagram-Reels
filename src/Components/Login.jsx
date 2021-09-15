import React, { useContext, useState } from "react";
import { AuthContext } from "./context/AuthProvider";
import {
  TextField,
  Grid,
  Button,
  Paper,
  Card,
  CardContent,
  CardActions,
  Container,
  CardMedia,
  Typography,
  makeStyles,
} from "@material-ui/core";
import logo from "../logo.png";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext);
console.log("b");
  const handleSubmit = async () => {
    try {
      let response = await login(email, password);
      props.history.push("/");
    } catch (err) {
      setMessage(err.message);
      setEmail("");
      setPassword("");
    }
  };

  let useStyles = makeStyles({
    centerDivs: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      width: "100vw",
    },
    carousel: {
      height: "10rem",
      background: "lightgray",
    },
    mb: {
      marginBottom: "1rem",
    },
    alignCenter: {
      justifyContent: "center",
    },
    padding: {
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
    },
    centerElements: {
      display: "flex",
      flexDirection: "column",
    },
    fullWidth: {
      width: "100%",
    },
  });
  let classes = useStyles();

  return (
    <div>
      <Container>
        <Grid container spacing={2}>
          <Grid item sm={5}>
            <Paper className={classes.carousel}>Carousel</Paper>
          </Grid>
          <Grid item sm={3}>
            <Card className={classes.mb} variant="outlined">
              <CardMedia
                image={logo}
                style={{ height: "5rem", backgroundSize: "contain" }}
              ></CardMedia>
              <CardContent classes={classes.centerElements}>
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
                  className={classes.mb}
                  label="Password"
                  type="password"
                  variant="outlined"
                  size="small"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></TextField>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  className={classes.fullWidth}
                >
                  Login
                </Button>
              </CardActions>
            </Card>
            <Card variant="outlined" className={classes.padding}>
              <Typography style={{ textAlign: "center" }}>
                Don't have an account ?<Link to="/signup"> SignUp</Link>
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
