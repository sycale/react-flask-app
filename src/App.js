import React, { useEffect, useState } from "react";

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
    setUpdate(needUpdate + 1);
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
      if (response.status !== 200) {
        console.log(response);
      }
    });
  }
  function handleClearDb() {
    setUpdate(needUpdate + 1);
    fetch("/api/posts/clear", {
      method: "POST",
      credentials: "include",
      cache: "no-cache",
      headers: new Headers({
        "content-type": "application/json",
      }),
    }).then((response) => {
      if (response.status !== 200) {
        console.log(response);
      }
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
      <div>
        {posts
          ? posts.map((post, i) => {
              return (
                <div key={i}>
                  <div>
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
                  <div>
                    <button onClick={() => handleClearDb()}>
                      Очистить таблицу
                    </button>
                  </div>
                </div>
              );
            })
          : "Loading..."}
      </div>
    </div>
  );
}

export default App;
