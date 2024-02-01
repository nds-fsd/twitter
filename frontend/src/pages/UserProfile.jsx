import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./UserProfile.module.css";
import user from "../assets/user.png";
import backgroundProfile from "../assets/backgroundProfile.jpeg";
import MeowsFiltered from "./Meows";
import TabsProfile from "../components/TabsProfile";
import { userApi } from "../apis/apiWrapper";
import FollowButton from "../components/FollowButton";
import { getUserSession } from "../local-storage.js";
import EditProfileForm from "../components/EditProfileForm.jsx";
import { MapPin, CalendarDays } from "lucide-react";

function UserProfile() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [town, setTown] = useState("");
  const [dateOfRegister, setDateOfRegister] = useState("");
  const [meowCounter, setMeowCounter] = useState(0);
  const [followingCounter, setFollowingCounter] = useState(0);
  const [followerCounter, setFollowerCounter] = useState(0);

  const { username: urlUsername } = useParams();
  const loggedInUser = getUserSession();
  const isOwnProfile = loggedInUser && urlUsername === loggedInUser.username;

  const dataUserToEdit = { name, surname, description, town };

  const [popUpEditProfile, setPopUpEditProfile] = useState(false);
  const handlePopUpEditProfileClick = () => {
    setPopUpEditProfile(!popUpEditProfile);
  };

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setPopUpEditProfile(false);
    }
  });

  useEffect(() => {
    userApi()
      .get(`/${urlUsername}`)
      .then((response) => {
        const user = response.data;
        setName(user.name);
        setSurname(user.surname);
        setUsername(user.username);
        setDescription(user.description);
        setTown(user.town);
        setDateOfRegister(user.dateOfRegister);
        setMeowCounter(user.meowCounter);
        setFollowingCounter(user.followingCounter);
        setFollowerCounter(user.followerCounter);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleEditProfileSubmit = (data) => {
    setPopUpEditProfile(false);
    setName(data.name || name);
    setSurname(data.surname || surname);
    setDescription(data.description || description);
    setTown(data.town || town);
  };

  const tabs = [
    { text: "Meows", href: "/meows" },
    { text: "Replies", href: "/replies" },
    { text: "Photos and videos", href: "/media" },
    { text: "Likes", href: "/likes" },
  ];

  const [color, setColor] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 70) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  return (
    <>
      <div>
        <div className={styles.bigContainer}>
          <div>
            <div
              className={
                color ? styles.nameContainerScroll : styles.nameContainer
              }
            >
              <p className={styles.name}>
                {name} {surname}
              </p>
              <p className={styles.grayFont}>{meowCounter} posts</p>
            </div>
            <div className={styles.relativeContainer}>
              <img
                src={backgroundProfile}
                alt="user"
                className={styles.imageContainer}
              />
              <div className={styles.photoContainer}>
                <img src={user} alt="user" className={styles.photoProfile} />
                {isOwnProfile ? (
                  <button
                    className={styles.editProfile}
                    onClick={handlePopUpEditProfileClick}
                  >
                    Edit profile
                  </button>
                ) : (
                  <FollowButton username={urlUsername} />
                )}
              </div>
            </div>
            <div className={styles.profileInfo}>
              <p className={styles.name}>
                {name} {surname}
              </p>
              <p className={styles.grayFont}>@{username}</p>
              <p>
                <br />
                {description}
              </p>

              <br />
              <div className={styles.info}>
                <MapPin />
                <p>{town}</p>
                <CalendarDays />
                <p>Joined on {dateOfRegister}</p>
              </div>
              <div className={styles.info}>
                <p className={styles.grayFont}>
                  <span>{followingCounter} </span>Following
                </p>
                <p className={styles.grayFont}>
                  <span>{followerCounter} </span>Followers
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <TabsProfile tabs={tabs} />
        </div>
        <MeowsFiltered username={urlUsername} />
      </div>

      {popUpEditProfile && (
        <div
          className={`${styles.overlay} ${
            popUpEditProfile ? styles.active : ""
          }`}
        >
          <EditProfileForm
            close={() => setPopUpEditProfile(!popUpEditProfile)}
            username={urlUsername}
            dataUserToEdit={dataUserToEdit}
            onSubmitSuccess={handleEditProfileSubmit}
          />
        </div>
      )}
    </>
  );
}

export default UserProfile;
