import React, { useState } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";
import { fileToBase64 } from "../../utility/baseTobase64";
import DefaultProfile from "../../assets/default_profile.jpg";
import { Redirect,Link } from "react-router-dom";

import axios from "axios";
import { services } from "../../utility/services";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "50ch",
    },
  },
  input: {
    display: "none",
  },
}));

const SignUp = () => {
  const classes = useStyles();

  const [image, setImage] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isRedirect,setIsRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const imageChange = async (e) => {
    const newFileBase64 = await fileToBase64(e.target.files[0]);
    setImage(newFileBase64);
  };
  const validateInput = () => {
    const error = {};
    if (!image) {
      error.image = "image is required";
    }
    if (!name) {
      error.name = "name is required";
    }
    if (!email) {
      console.log("eror", error);
      error.email = "email is required";
    }
    if (!password) {
      error.password = "password is required";
    }

    return {
      error,
      isValid: !Object.keys(error).length,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);
    const { error, isValid } = validateInput();
    if (!isValid) {
      setIsLoading(false);
      setErrors(error);
      return;
    }
    const body = {
      name,
      email,
      password,
      profileImage: image.split(",")[1],
    };
    try {
      const result = await axios({
        method: "post",
        url: `${services.link}/user/sign-up`,
        data: body,
      });
      setTimeout(() => {
        localStorage.setItem("zeeweSoft", result.data.token);
        setIsLoading(false);
        setIsRedirect(true)
      }, services.LOADER_DELAY);
    } catch (error) {
      console.log(error, error.response);
      setTimeout(() => {
        setErrors(error.response?.data.errors || {});
        setIsLoading(false);
      }, services.LOADER_DELAY);
    }
  };
 if(isRedirect){
   return <Redirect to="/profile" />
 }
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" className="mt-5">
        <Typography
          component="div"
          style={{ backgroundColor: "#cfe8fc", height: "85vh" }}
        >
          <div>
            <h1>SIGN UP</h1>
            <p>Sign Up with your email and password</p>
          </div>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div>
              <div className="select-image">
                <img
                  src={image || DefaultProfile}
                  alt=""
                  style={{ width: "150px", height: "150px" }}
                />
              </div>
              <div>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="icon-button-file"
                  type="file"
                  onChange={imageChange}
                />

                <label htmlFor="icon-button-file">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </div>
              <TextField
                id="outlined-password-input"
                label="Name"
                type="text"
                required
                variant="outlined"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
              <p style={{color:"red"}}>{errors.name}</p>
              <TextField
                id="outlined-password-input"
                label="Email"
                required
                type="email"
                variant="outlined"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <p style={{color:"red"}}>{errors.email}</p>
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                required
                variant="outlined"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p style={{color:"red"}}>{errors.password}</p>
              <div className="flex">
                <Button
                  variant="outlined"
                  type="submit"
                  color="primary"
                  className="w-25 p-3"
                  disabled={isLoading}
                  onClick={handleSubmit}
                >
                  {isLoading ? "Loading..." : "SIGN UP"}
                </Button>
              </div>
              <Link to="/" className="ml-5">
                Already have an account?
              </Link>
            </div>
          </form>
        </Typography>
      </Container>
    </React.Fragment>
  );
};

export default SignUp;
