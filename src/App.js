import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [title, setTitle] = useState(null);
  const [message, setMessage] = useState(null);
  const [posts, setPosts] = useState(null);
  const [needUpdate, setUpdate] = useState(null);

  useEffect(() => {
    fetch("/api/posts")
      .then((response) => response.json())
      .then((data) => {
        const _data_ = data.posts.map((e) => JSON.parse(e));
        setPosts(_data_);
      });
  }, [needUpdate]);

  function handlePostData() {
    setUpdate(1);
    const dataToSend = {
      title: title,
      comment: message,
    };
    fetch("/api/add", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(dataToSend),
      cache: "no-cache",
      headers: new Headers({
        "content-type": "application/json",
      }),
    }).then((response) => {
      console.log(response);
    });
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <input type="text" onInput={(e) => setTitle(e.target.value)} />
        <input type="text" onInput={(e) => setMessage(e.target.value)} />
        <button
          type="submit"
          onClick={() => {
            handlePostData();
          }}
        >
          Send data
        </button>
      </div>
      {posts
        ? posts.map((post, i) => {
            return (
              <div key={i}>
                <span>
                  <h1>Title:</h1>
                  <br></br>
                  {post.title}
                </span>
                <span>
                  <h1>Comment:</h1>
                  <br></br>
                  {post.comment}
                </span>
              </div>
            );
          })
        : "Loading..."}
    </div>
  );
}

export default App;
