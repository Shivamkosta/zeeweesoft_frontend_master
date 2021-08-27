import React, { useState,useEffect } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import DefaultProfile from "../../assets/default_profile.jpg";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { services } from "../../utility/services.js";


 

const Profile = () => {
 

  const [image, setImage] = useState(DefaultProfile);
  const [isRedirect,setIsRedirect] = useState(false);
  const [name,setName] = useState("");


  
 // Similar to componentDidMount and componentDidUpdate:
 useEffect(() => {
  // Update the document title using the browser API
  const result = axios({
    method: "get",
    url: `${services.link}/user/get-user-details`,
    headers: { Authorization: `Bearer ${localStorage.getItem("zeeweSoft")}` }
    
  })
  .then(response => {
    console.log("Response",response);
    setName(response.data.user.name);
    setImage(response.data.user.profileImg);
  })
  .catch(err => console.log("Error: ",err));
  
  
});
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    setIsRedirect(true);

  }

  if(isRedirect){
    return <Redirect to="/" />
  }
console.log("ing: ", image)
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" className="mt-5">
        <Typography
          component="div"
          style={{ backgroundColor: "#cfe8fc", height: "75vh" }}
        >
          <div className="mt-4">
            <h1>USER PROFILE</h1>
          </div>
          <form onSubmit={handleLogout}>
            <h3>Hii,{name}</h3>
            <div className="select-image">
              <img
                src={image}
                alt=""
                style={{ width: "150px", height: "150px" }}
              />
            </div>
            <Button variant="outlined" type="submit" color="primary" className="w-75 mt-5">
              LOGOUT
            </Button>
          </form>
        </Typography>
      </Container>
    </React.Fragment>
  );
};

export default Profile;
