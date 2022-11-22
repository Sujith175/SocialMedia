import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";
import { useEffect } from "react";
const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState(undefined);
  const [image, setImage] = useState("");
  useEffect(() => {
    if (url) {
      uploadFeilds();
    }
  }, [url]);
  const uploadProfilePic = () => {
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
  const uploadFeilds = () => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      M.toast({ html: "Invalid Email", classes: "#d32f2f red darken-2" });
      return;
    }
    fetch("http://localhost:8000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#d32f2f red darken-2" });
        } else {
          M.toast({ html: data.message, classes: "#388e3c green darken-2 " });
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const postData = () => {
    if (image) {
      uploadProfilePic();
    } else {
      uploadFeilds();
    }
  };

  return (
    <div className="my-card">
      <div className="card auth-card">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="file-field input-field">
          <div className="btn">
            <span>Upload Profile Pic</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>

        <button
          className="btn waves-effect waves-light #26a69a teal darken-1"
          onClick={() => postData()}
        >
          SignUp
        </button>
        <h5 className="router-link">
          <Link to="/login">Already have an account?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
