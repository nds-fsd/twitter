import styles from "./MeowView.module.css";
import general from "./MeowsFormat.module.css";
import MeowReplies from "./MeowReplies";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { meowApi, notificationApi } from "../../functions/apiWrapper";
import { getUserSession } from "../../functions/localStorage";
import { ArrowLeft } from "lucide-react";
import { formatDate } from "../../functions/dateFormat";
import PhotoUserProfile from "../Profile/PhotoUserProfile";
import AllMeowButtons from "../Buttons/AllMeowButtons";
import { handleResize } from "../../functions/responsiveFunctions";

const MeowView = () => {
  function handleKeyDown(e) {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

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
  const photoStyle = "meow";

  useEffect(() => {
    const cleanup = handleResize(setPantallaPequena);
    return cleanup;
  }, []);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await meowApi().patch(id, { $inc: { views: 1 } });
        const parentMeowToShow = formatDate(res.data.meowUpdated);
        setParentMeow(parentMeowToShow);
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

  useEffect(() => {
    const getReplies = async () => {
      try {
        const res = await meowApi().get(`replies/${id}`);
        setAllMeowReplies(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getReplies();
  }, []);

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
          _id: res.data.meowToSave._id,
          likes: 0,
        },
        ...allMeowReplies,
      ]);

      setMeowReply("");
      setReplyCounter(replyCounter + 1);
      if (res.status === 201) {
        if (parentMeowUsername === loggedInUser.username) {
          return;
        }
        const dataNotification = {
          recipient: parentMeowUsername,
          sender: username,
          action: "replie",
          post: res.data.meowToSave._id,
        };
        const notification = await notificationApi().post(
          `/`,
          dataNotification
        );
        if (notification.status === 201) {
        } else {
          throw new Error(notification.data.error);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    parentMeow && (
      <>
        <div className={styles.viewContainer}>
          <div className={styles.firstContainer}>
            <div className={styles.backContainer}>
              <div className={styles.back}>
                <ArrowLeft absoluteStrokeWidth />
                <p onClick={() => navigate("/home")}>Post</p>
              </div>
            </div>
          </div>
          <div className={styles.container}>
            <div className={general.userContainer}>
              <PhotoUserProfile
                photoStyle={photoStyle}
                usernamePhoto={parentMeowUsername}
              />
              <div className={general.infoUserContainer}>
                <div className={general.userData}>
                  <p
                    onClick={() => navigate("/user/" + parentMeowUsername)}
                    className={general.nameSurname}
                  >
                    {parentMeowName} {parentMeowSurname}
                  </p>
                  <p className={general.username}>@{parentMeowUsername}</p>
                </div>
                <div>
                  <p className={general.dateFormat}>{parentMeow.date}</p>
                </div>
              </div>
            </div>
            <div className={general.postContainerInView}>
              <p className={general.meow}>{parentMeow.text}</p>
            </div>
            <div className={general.iconsContainer}>
              <AllMeowButtons meow={parentMeow} authorUsername={username} />
            </div>
          </div>
          <div className={styles.replies}>
            <PhotoUserProfile
              photoStyle={photoStyle}
              usernamePhoto={username}
            />
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
              className={styles.replyButton}
            >
              Reply
            </button>
          </div>
        </div>
        {allMeowReplies && (
          <MeowReplies
            replyCounter={replyCounter}
            setReplyCounter={setReplyCounter}
            allMeowReplies={allMeowReplies}
            setAllMeowReplies={setAllMeowReplies}
          />
        )}
      </>
    )
  );
};
export default MeowView;
