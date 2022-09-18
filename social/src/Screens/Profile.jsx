import React, { useEffect } from "react";

const Profile = () => {
  // useEffect(() => {
  //   fetch("http://localhost:8000/mypost", {
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("jwt"),
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //     });
  // }, []);
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
          <h4>sujith kumar R</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h6>40 posts</h6>
            <h6>40 followers</h6>
            <h6>40 following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        <img
          alt=""
          className="item"
          src="https://images.unsplash.com/photo-1660563115496-8040aa23fc81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4MHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
        />
        <img
          alt=""
          className="item"
          src="https://images.unsplash.com/photo-1660563115496-8040aa23fc81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4MHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
        />
        <img
          alt=""
          className="item"
          src="https://images.unsplash.com/photo-1660563115496-8040aa23fc81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4MHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
        />
        <img
          alt=""
          className="item"
          src="https://images.unsplash.com/photo-1660563115496-8040aa23fc81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4MHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
        />
        <img
          alt=""
          className="item"
          src="https://images.unsplash.com/photo-1660563115496-8040aa23fc81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4MHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
        />
        <img
          alt=""
          className="item"
          src="https://images.unsplash.com/photo-1660563115496-8040aa23fc81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4MHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
        />
      </div>
    </div>
  );
};
export default Profile;
