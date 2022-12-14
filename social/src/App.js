import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./Screens/Home";
import Profile from "./Screens/Profile.jsx";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import { Routes, Route, useNavigate } from "react-router-dom";
import CreatePost from "./Screens/CreatePost";
import { useEffect, createContext, useReducer } from "react";
import { reducer, initialState } from "./reducers/userreducer";
import Cart from "./Screens/cart/Cart";
import UserProfile from "./Screens/UserProfile";
import SubscribedUserPost from "./Screens/SubscribedUserPost";
export const UserContext = createContext();

const App = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
      // navigate("/");
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="signup" element={<Signup />} />
            <Route exact path="profile" element={<Profile />} />
            <Route path="login" element={<Login />} />
            <Route path="newpost" element={<CreatePost />} />
            <Route path="myfollowingposts" element={<SubscribedUserPost />} />
            <Route path="cart" element={<Cart />} />
            <Route path="profile/:userid" element={<UserProfile />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </>
  );
};

export default App;
