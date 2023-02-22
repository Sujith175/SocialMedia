import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
const Profile = () => {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
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
  useEffect(() => {
    if (image) {
      const data = new FormData(); //to upload file need to create form data
      data.append("file", image);
      data.append("upload_preset", "instaClone");
      data.append("cloud_name", "sujith101");
      fetch("https://api.cloudinary.com/v1_1/sujith101/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUrl(data.url);
          console.log(data);
          localStorage.setItem(
            "user",
            JSON.stringify({ ...state, pic: data.url })
          );
          dispatch({ type: "UPDATEPIC", payload: data.url });
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);
  const updatePhoto = (file) => {
    setImage(file);
  };
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

          <div style={{ padding: "10px" }} className="file-field input-field">
            <div className="btn" style={{ borderRadius: "20px" }}>
              <span>Update Picture</span>
              <input
                type="file"
                onChange={(e) => updatePhoto(e.target.files[0])}
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
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
