import React from "react";
import { useState } from "react";
import { InputGroup, Input, Button } from "reactstrap";

const Home = (props) => {
  const [userName, setUserName] = useState("");

  function handleSendUsername(val) {
    if (userName.length || val) {
      const username = val ? val : userName;
      localStorage.setItem("username", username);
      console.log(props);
      props.allowpermission();
      alert("Now u can chat");
    } else {
      alert("Username cant be empy");
    }
  }

  return (
    <InputGroup className="mb-5 mt-5 w-50 ml-auto mr-auto">
      <Input
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Set your userName or go on as anonym"
      />
      <Button
        type="submit"
        className="ml-3"
        onClick={() => {
          handleSendUsername();
        }}
        color="success"
      >
        Confirm UserName
      </Button>
    </InputGroup>
  );
};

export default Home;
