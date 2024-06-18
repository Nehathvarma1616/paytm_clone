import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import SubHeading from "../components/SubHeading";
import { ButtonWarning } from "../components/ButtonWarning"; // we can also import file wihtout "default export" by destructuring

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex justify-center bg-slate-300 h-screen ">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center py-4 h-max px-4">
          <Heading lable={"Signin"} />
          <SubHeading label={"Enter your information to create account"} />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            label={"Email"}
            placeholder={"abc@gmail.com"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
            placeholder={"12345"}
          />
          <div className="pt-4 text-center">
            <Button
              label={"Sign in"}
              onClick={async () => {
                const getToken = () => localStorage.getItem("token");
                const getAuthorization = `Bearer ${getToken()}`;
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signin",
                  {
                    username,
                    password,
                  },
                  {
                    headers: {
                      "X-Custom-Header": "value",
                      Authorization: getAuthorization,
                    },
                  }
                );
                navigate("/dashboard");
              }}
            />
          </div>
          <ButtonWarning
            label={"Don't have an account"}
            buttontext={"sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
