import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import errorImg from "../assets/404.webp";
import { queryParser } from "../utils/QueryBuilder";

type ErrorProps = {
  message: string;
  path: string;
};

const Error = ({ message, path }: ErrorProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessge, seterrorMessge] = useState("");

  useEffect(() => {
    if (location.search.includes("?")) {
      const eror = (queryParser(location.search) as any).error;
      seterrorMessge(eror);
    }
  }, []);

  return (
    <div className="text-gray-400 flex flex-col items-center justify-center gap-10">
      <div className="w-[500px] h-[500px]">
        <img src={errorImg} alt="Error Image" />
      </div>

      <p className="tracking-widest text-xl font-bold">
        {errorMessge ? errorMessge : message}
      </p>

      <button
        onClick={() => navigate(path)}
        className="outline-none font-bold px-4 py-2 bg-[#673981] rounded-md hover:bg-[#8954a9] transition-all ease-in-out duration-200 min-w-[200px]"
      >
        Go Back
      </button>
    </div>
  );
};

export default Error;
