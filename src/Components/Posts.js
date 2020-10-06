import React, { useState, useEffect } from "react";
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

function b64EncodeUnicode(str) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(
      match,
      p1
    ) {
      return String.fromCharCode("0x" + p1);
    })
  );
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}

export default function Posts() {
  const [message, setMessage] = useState(null);
  const [posts, setPosts] = useState(null);

  function receiveData() {
    fetch("/api/posts")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const _data_ = data.posts.map((e) => JSON.parse(e));
        setPosts(_data_);
        setTimeout(receiveData, 2000);
      });
  }

  useEffect(() => {
    receiveData();
  }, []);

  function handlePostData() {
    const dataToSend = {
      comment: b64EncodeUnicode(message),
      username: localStorage.getItem("username"),
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
                <Card key={i} className="container mb-3">
                  <CardBody>
                    <CardTitle>
                      <b>{post.userName}</b>
                    </CardTitle>
                    <CardText>{b64DecodeUnicode(post.comment)}</CardText>
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
          <UncontrolledAlert className="container" color="info">
            No messages yet...
          </UncontrolledAlert>
        )}
      </div>
    </div>
  );
}
