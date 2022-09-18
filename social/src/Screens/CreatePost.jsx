import React, { useEffect, useState } from "react";
import M from "materialize-css";
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (url) {
      fetch("http://localhost:8000/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: "#d32f2f red darken-2" });
          } else {
            M.toast({
              html: "Posted Successfully",
              classes: "#757575 grey darken-1",
            });
            navigate("/");
          }
        });
    }
  }, [url]);

  const postDetails = () => {
    console.log("okey");
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="card input-field"
      style={{
        margin: "30px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <div className="file-field input-field">
        <div className="btn">
          <span>Upload Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        className="btn waves-effect waves-light #26a69a teal darken-1"
        onClick={() => postDetails()}
      >
        submit Post
      </button>
    </div>
  );
};

export default CreatePost;
