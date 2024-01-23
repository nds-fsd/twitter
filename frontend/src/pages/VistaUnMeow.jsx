import styles from "./VistaUnMeow.module.css";
import userpic from "../assets/user.png";
import flecha from "../assets/flecha-izquierda.png";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import LikeButton from "../components/LikeButton";

import { useParams } from "react-router-dom";
import { useEffect, useContext, useState, useRef } from "react";
import { meowApi, userApi } from "../apis/apiWrapper";

const VistaUnMeow = () => {
  function handleKeyDown(e) {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  const [pantallaPequena, setPantallaPequena] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const esPantallaPequena = window.matchMedia(
        "(max-width: 1000px)"
      ).matches;
      setPantallaPequena(esPantallaPequena);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [meow, setMeow] = useState("");
  const [userName, setUserName] = useState("");
  const textareaRef = useRef(null);

  const { id } = useParams();

  useEffect(() => {
    const getDetails = async () => {
      const meowRes = await meowApi.get(id);
      const userRes = await userApi.get(`id/${meowRes.data.author}`);
      setMeow(meowRes.data);
      setUserName(userRes.data.username);
    };

    getDetails();
  }, []);

  const opcionesDeFormato = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  };

  const dateString = meow.date;
  console.log(meow);

  const dateObject = dateString ? new Date(dateString) : null;

  const date = dateObject
    ? new Intl.DateTimeFormat("es-ES", opcionesDeFormato).format(dateObject)
    : "Fecha no disponible";
  return (
    meow && (
      <div className={styles.container}>
        <div className={styles.firstContainer}>
          <div className={styles.postContainer}>
            <div className={styles.post}>
              <img src={flecha} alt="flecha" />
              <p>Post</p>
            </div>
          </div>
        </div>

        <div className={styles.username}>
          <img src={userpic} alt="user" />
          <p className={styles.user}>{userName}</p>
        </div>

        <p className={styles.meow}>{meow.text}</p>
        <div className={styles.dateAndViews}>
          <span>{date.slice(0, -3)}</span>
          <span>{meow.views} Views</span>
        </div>

        <div className={styles.stats}>
          <span
            onClick={() => {
              textareaRef.current.focus();
            }}
            data-tooltip-id="Replies"
            data-tooltip-content="Replies"
            data-tooltip-place="top"
            className={`${styles.statsSpan} ${
              pantallaPequena ? styles.statsSpanSmallScreen : ""
            }`}
          >
            💬{meow.replies}
            <Tooltip id="Replies" />
          </span>
          <span
            data-tooltip-id="Reposts"
            data-tooltip-content="Reposts"
            data-tooltip-place="top"
            className={`${styles.statsSpan} ${
              pantallaPequena ? styles.statsSpanSmallScreen : ""
            }`}
          >
            🔁{meow.reposts}
            <Tooltip id="Reposts" />
          </span>

          <span
            data-tooltip-id="Likes"
            data-tooltip-content="Likes"
            data-tooltip-place="top"
            className={`${styles.statsSpan} ${
              pantallaPequena ? styles.statsSpanSmallScreen : ""
            }`}
          >
            <LikeButton meow={meow} />
            <Tooltip id="Likes" />
          </span>
          <span
            data-tooltip-id="Bookmark"
            data-tooltip-content="Bookmark"
            data-tooltip-place="top"
            className={`${styles.statsSpan} ${
              pantallaPequena ? styles.statsSpanSmallScreen : ""
            }`}
          >
            🔖0
            <Tooltip id="Bookmark" />
          </span>
          <span
            data-tooltip-id="Share"
            data-tooltip-content="Share"
            data-tooltip-place="top"
            className={`${styles.statsSpan} ${
              pantallaPequena ? styles.statsSpanSmallScreen : ""
            }`}
          >
            🔗
            <Tooltip id="Share" />
          </span>
        </div>

        <div className={styles.replies}>
          <img src={userpic} alt="" />
          <textarea
            ref={textareaRef}
            onChange={handleKeyDown}
            className={styles.textarea}
            placeholder="Post your reply"
          ></textarea>
          <button>Reply</button>
        </div>
      </div>
    )
  );
};

export default VistaUnMeow;
