import React from "react";
import { useState } from "react";
import {
  InputGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const Home = (props) => {
  const [userName, setUserName] = useState("");
  const [modal, setModal] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);
  const [password, setPassword] = useState("");

  const toggle = () => setModal(!modal);
  const changeUnmountOnClose = (e) => {
    let value = e.target.value;
    setUnmountOnClose(JSON.parse(value));
  };

  const handleSendUsername = () => {
    if (userName === "admin") {
      setModal(true);
    } else if (userName.length) {
      const username = userName;
      localStorage.setItem("username", username);
      props.allowpermission();
      alert("Охуеть, проходи, приятной беседы");
      window.location.pathname = "/posts";
    } else {
      alert("Йоу, бруда, давай еще раз по-новому");
    }
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      handleSendUsername();
    }
  };

  const checkAdminPass = () => {
    toggle();
    if (password === "yanormpacan") {
      localStorage.setItem("username", "admin");
      props.allowpermission();
      alert("Охуеть, уважаемый человек");
      window.location.pathname = "/posts";
    } else {
      alert("Ты выдаешь себя за другого, иди нахуй");
    }
  };

  return (
    <>
      <InputGroup className="mb-5 mt-5 w-50 ml-auto mr-auto">
        <Input
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Set your userName or go on as anonym"
          onKeyPress={(e) => handleEnterPress(e)}
        />
        <Button
          className="ml-3"
          onClick={() => {
            handleSendUsername();
          }}
          color="success"
        >
          Confirm UserName
        </Button>
      </InputGroup>
      <div>
        <Modal isOpen={modal} toggle={toggle} unmountOnClose={unmountOnClose}>
          <ModalHeader toggle={toggle}>Докажи, что ты вертухай</ModalHeader>
          <ModalBody>
            <Input
              type="text"
              placeholder="Введи парольчик, братик"
              rows={1}
              style={{ overflowY: "none" }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={checkAdminPass}>
              Подтверждаю
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Выйди мне нахуй отсюдова блять
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default Home;
