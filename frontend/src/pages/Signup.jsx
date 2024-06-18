import React from "react";
import { useState } from "react";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import SubHeading from "../components/SubHeading";
import { ButtonWarning } from "../components/ButtonWarning"; // we can also import file wihtout "default export" by destructuring
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // first define it to a variable
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center ">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading lable={"Signup"} />
          <SubHeading label={"Enter your information to create account"} />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            label={"First Name"}
            placeholder={"Nehath"}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            label={"Last Name"}
            placeholder={"Varma"}
          />
          <InputBox
            onChange={(e) => {
              setEmail(e.target.value);
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
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    username: username,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
                // we cannot use useNavigate hook directly it throws error
                // if u want to know the error use the useNavigate hook directly
              }}
              label={"Sign Up"}
            />
          </div>
          <ButtonWarning
            label={"Already have an account"}
            buttontext={"sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
