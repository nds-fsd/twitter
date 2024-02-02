import styles from "./VistaUnMeow.module.css";
import userpic from "../assets/user.png";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import LikeButton from "../components/LikeButton";
import MeowReplies from "./MeowReplies";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { meowApi } from "../apis/apiWrapper";
import { getUserSession, getUserToken } from "../local-storage";
import { ArrowLeft } from "lucide-react";

const VistaUnMeow = () => {
  function handleKeyDown(e) {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }
  // -----------------------------------variables------------------------------------------------------------------------
  const navigate = useNavigate();
  const { id } = useParams();

  const textareaRef = useRef(null);
  const { username, name, surname } = getUserSession();
  const [pantallaPequena, setPantallaPequena] = useState(false);
  const [parentMeow, setParentMeow] = useState("");
  const [parentMeowUsername, setParentMeowUsername] = useState("");
  const [parentMeowName, setParentMeowName] = useState("");
  const [parentMeowSurname, setParentMeowSurname] = useState("");
  const [meowReply, setMeowReply] = useState("");
  const [replyCounter, setReplyCounter] = useState(parentMeow.replies);
  const [allMeowReplies, setAllMeowReplies] = useState([]);
  console.log(getUserSession());
  console.log(getUserToken());

  // ----------------------------------Funciones para hacer la pantala responsive-------------------------------------

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
  // ----------------------------------------GET parentMeow---------------------------------------------------------------------
  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await meowApi().patch(id, { $inc: { views: 1 } });
        console.log(res);
        setParentMeow(res.data.meowUpdated);
        setParentMeowName(res.data.userFound.name);
        setParentMeowSurname(res.data.userFound.surname);
        setParentMeowUsername(res.data.userFound.username);
        setReplyCounter(res.data.meowUpdated.replies);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };
    getDetails();
  }, [id]);
  // ------------------------------GET REQUEST de las Replies del Meow-----------------------------------------------------
  useEffect(() => {
    const getReplies = async () => {
      try {
        const res = await meowApi().get(`replies/${id}`);
        setAllMeowReplies(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getReplies();
  }, []);
  // --------------------------------------POST Request para postear una respuesta-------------------------------------
  const postReply = async () => {
    const newReply = {
      meow: meowReply,
      date: Date.now(),
      parentMeow: parentMeow._id,
    };
    try {
      const res = await meowApi().post("/", newReply);
      setAllMeowReplies([
        {
          text: meowReply,
          authorUsername: username,
          authorName: name,
          authorSurname: surname,
          date: Date.now(),
          parentMeow: parentMeow._id,
          _id: res.data._id,
          likes: 0,
        },
        ...allMeowReplies,
      ]);

      setMeowReply("");
      setReplyCounter(replyCounter + 1);

      console.log(allMeowReplies);
    } catch (err) {
      console.log(err);
    }
  };
  // --------------------------------------------------Funciones para las dates personalizadas---------------------------------------
  const dateFormat = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  };
  const dateString = parentMeow.date;
  const dateObject = dateString ? new Date(dateString) : null;
  const date = dateObject
    ? new Intl.DateTimeFormat("es-ES", dateFormat).format(dateObject)
    : "Fecha no disponible";
  // .................................................................................................................
  return (
    parentMeow && (
      <>
        <div className={styles.container}>
          <div className={styles.firstContainer}>
            <div className={styles.postContainer}>
              <div className={styles.post}>
              <ArrowLeft absoluteStrokeWidth />
                <p onClick={() => navigate("/home")}>Post</p>
              </div>
            </div>
          </div>

          <div className={styles.username}>
            <img src={userpic} alt="user" />
            <p
              className={styles.userInfo}
              onClick={() => navigate("/user/" + parentMeowUsername)}
            >
              {" "}
              {parentMeowName} {parentMeowSurname}
            </p>
            <p className={styles.usernameInfo}>@{parentMeowUsername}</p>
          </div>

          <p className={styles.meow}>{parentMeow.text}</p>
          <div className={styles.dateAndViews}>
            <span>{date.slice(0, -3)}</span>
            <span>{parentMeow.views} Views</span>
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
              💬{replyCounter}
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
              🔁{parentMeow.reposts}
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
              <LikeButton meow={parentMeow} />
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
              0 🔖
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
              value={meowReply}
              onChange={(e) => {
                setMeowReply(e.target.value);
                handleKeyDown(e);
              }}
              ref={textareaRef}
              className={styles.textarea}
              placeholder="Post your reply"
            ></textarea>
            <button
              onClick={() => {
                postReply();
              }}
            >
              Reply
            </button>
          </div>
        </div>
        {allMeowReplies && (
          <MeowReplies
            allMeowReplies={allMeowReplies}
            dateFormat={dateFormat}
          />
        )}
      </>
    )
  );
};
export default VistaUnMeow;
