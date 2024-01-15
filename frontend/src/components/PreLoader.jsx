import "./preloader.css";
import { useEffect } from "react";
import { preLoaderAnim } from "./PreLoaderAnimation";

const PreLoader = () => {
  useEffect(() => {
    preLoaderAnim();
  }, []);
  return (
    <div className="preloader">
      <div className="texts-container">
        <span>Welcome</span>
        <span>to</span>
        <span>Meower!</span>
      </div>
    </div>
  );
};

export default PreLoader;
