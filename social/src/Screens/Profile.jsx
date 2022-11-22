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
            src={state ? state.pic : "Loading"}
            alt="none"
          />
        </div>
        <div>
          <h4>{state ? state.name : "loading"}</h4>
          <h5>{state ? state.email : "loading"}</h5>
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
