import React, { useState } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import { services } from "../../utility/services.js";


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

const SignIn = () => {
  const classes = useStyles();
  
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isRedirect,setIsRedirect] = useState(false);


  const validateInput = () => {
    const error = {};
  
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
    const {error,isValid} =  validateInput();
    setIsLoading(true);

    if(!isValid){
      setErrors(error);
      setIsLoading(false);
      return;
    }
    const body = {
      email,
      password,
    }

    try {
      const result = await axios({
        method: "post",
        url: `${services.link}/user/sign-in`,
        data: body,
      })
      setTimeout(() => {
        localStorage.setItem("zeeweSoft", result.data.token);
        setIsLoading(false);
        setIsRedirect(true);

      },services.LOADER_DELAY)
    } catch (error) {
      console.log("Error: ",error.response);
      setTimeout(()=>{
        setErrors(error.response?.data.errors || {});
        setIsLoading(false);

      },services.LOADER_DELAY)
    }



  }
if(isRedirect){
  return <Redirect to="/profile" />
}
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" className="mt-5">
        <Typography
          component="div"
          style={{ backgroundColor: "#cfe8fc", height: "75vh" }}
        >
          <div>
            <h1>SIGN IN</h1>
            <p>Sign In with your email and password</p>
          </div>
          <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
            <div>
              <TextField
                id="outlined-password-input"
                label="Email"
                required
                type="email"
                variant="outlined"
                value={email}
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
                  {isLoading ? "Loading..." : "SIGN IN"}
                </Button>
              </div>
              <Link to="/signup" className="ml-5">
                Don't have any account
              </Link>
            </div>
          </form>
        </Typography>
      </Container>
    </React.Fragment>
  );
};

export default SignIn;
