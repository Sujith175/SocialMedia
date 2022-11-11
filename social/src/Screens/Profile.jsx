import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
const Profile = () => {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:8000/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result.mypost);
      });
  }, []);
  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src="https://images.unsplash.com/photo-1660563115496-8040aa23fc81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4MHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            alt="none"
          />
        </div>
        <div>
          <h4>{state ? state.name : "loading"}</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h6>{mypics.length} posts</h6>
            <h6>{state ? state.followers.length : "Loading"} Followers</h6>
            <h6>{state ? state.following.length : "Loading"} Following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        {mypics.map((data) => (
          <img
            key={data._id}
            alt={data.title}
            className="item"
            src={data.photo}
          />
        ))}
      </div>
    </div>
  );
};
export default Profile;
