import { Link } from "react-router-dom";
export function ButtonWarning({ label, buttontext, to }) {
  return (
    <div className=" py-2 text-sm flex justify-center ">
      <div>{label}</div>
      <div>
        <Link className="pointer underline pl-2 cursor-pointer" to={to}>
          {buttontext}
        </Link>
      </div>
      <div></div>
    </div>
  );
}
