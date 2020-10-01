import React, { useEffect, useState } from "react";
import {
  InputGroup,
  Input,
  Button,
  Card,
  CardTitle,
  CardText,
} from "reactstrap";
import CardBody from "reactstrap/lib/CardBody";
import UncontrolledAlert from "reactstrap/lib/UncontrolledAlert";

export default function Posts() {
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
    <div className="d-flex flex-column">
      <InputGroup className="mb-5 mt-5 w-50 align-self-center d-flex justify-between">
        <Input onInput={(e) => setTitle(e.target.value)} />
        <Input onInput={(e) => setMessage(e.target.value)} />
        <Button
          type="submit"
          onClick={() => {
            handlePostData();
          }}
          color="success"
        >
          Send data
        </Button>
      </InputGroup>
      <div>
        {posts && posts.length > 0 ? (
          <div>
            {posts.map((post, i) => {
              return (
                <Card key={i} className="container">
                  <CardBody>
                    <CardTitle>
                      <b>Title:</b> {post.title}
                    </CardTitle>
                    <CardText>
                      <b>Comment:</b> {post.comment}
                    </CardText>
                  </CardBody>
                </Card>
              );
            })}
            <div className="d-flex justify-content-center">
              <Button
                onClick={() => handleClearDb()}
                color="danger"
                className="mt-5"
              >
                Очистить таблицу
              </Button>
            </div>
          </div>
        ) : (
          <UncontrolledAlert color="info">No posts yet...</UncontrolledAlert>
        )}
      </div>
    </div>
  );
}
