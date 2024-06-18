import { useEffect, useState } from "react";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function Userscomponent() {
  const [data, setData] = useState([]); // make sure this as array
  const [filter, setFilter] = useState("");
  console.log("nehath");

  useEffect(() => {
    axios // using const response = await axios.get..... is not working in useeffect hook
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then((response) => {
        setData(response.data.users);
      });
  }, [filter]);
  return (
    <div>
      <InputBox
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        lable={"Users"}
        placeholder={"search users..."}
      />
      <div>
        {data.map((usersdataone) => (
          <Users userData={usersdataone} />
        ))}
      </div>
    </div>
  );

  function Users({ userData }) {
    const navigate = useNavigate();
    return (
      <>
        <div className="flex justify-between">
          <div className="flex ">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
              <div className="flex flex-col justify-center h-full text-xl">
                {userData.firstName[0]}
              </div>
            </div>
            <div className="flex flex-col justify-center h-full mr-4">
              {userData.firstName} {userData.lastName}
            </div>
          </div>

          <div className=" mt-2 mr-2">
            <Button
              onClick={() => {
                navigate(
                  "/send?id=" + userData._id + "&name=" + userData.firstName
                );
              }}
              label={"send"}
            />
          </div>
        </div>
      </>
    );
  }
}
