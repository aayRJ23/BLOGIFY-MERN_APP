import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [username, setUsername] = useState(null);
  //BAD PRACTICE -> so we have to use user context

  //run everytime , whenever this component mount
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUsername(userInfo.username);
      });
    });
  }, []);

  function logout(){
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method:'POST',
    }).then(()=>{
      setUsername(null);
    })
  }

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create New Post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}

        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
