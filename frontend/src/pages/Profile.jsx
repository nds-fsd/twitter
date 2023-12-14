import styles from "./Profile.module.css";
import user from "../assets/user.png";
import location from "../assets/location.png";
import calendar from "../assets/calendar.png";
import backgroundProfile from "../assets/backgroundProfile.jpeg";
import Meows from "./Meows";
import Tabs from "../components/Tabs";

function Profile() {
  const tabs = [
    { text: "Posts", href: "/posts" },
    { text: "Respuestas", href: "/respuestas" },
    { text: "Destacados", href: "/destacados" },
    { text: "Fotos y videos", href: "/media" },
    { text: "Me gusta", href: "/likes" },
  ];

  return (
    <div>
      <div className={styles.bigContainer}>
        <div>
          <div>
            <p className={styles.name}>Name Surname</p>
            <p className={styles.grayFont}>Number of posts</p>
          </div>
          <div className={styles.relativeContainer}>
            <img
              src={backgroundProfile}
              alt="user"
              className={styles.imageContainer}
            />
            <div className={styles.photoContainer}>
              <img src={user} alt="user" className={styles.photoProfile} />
              <button className={styles.editProfile}>Editar perfil</button>
            </div>
          </div>
          <div>
            <p className={styles.name}>Name Surname</p>
            <p className={styles.grayFont}>@Account_Name</p>
            <p>
              <br />
              Bla bla bla bla. Bla bla bla bla. Bla bla bla bla.
            </p>
            <br />
            <div className={styles.info}>
              <img src={location} alt="." className={styles.options} />
              <p>Caldes de Malavella</p>
              <img src={calendar} alt="." className={styles.options} />
              <p>Se unió en diciembre de 2013</p>
            </div>
            <div className={styles.info}>
              <p className={styles.grayFont}>
                <span>10 </span>Seguidores
              </p>
              <p className={styles.grayFont}>
                <span>10 </span>Siguiendo
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Tabs tabs={tabs} />
      </div>
      <Meows />
    </div>
  );
}

export default Profile;
