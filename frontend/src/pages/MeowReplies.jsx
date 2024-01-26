import styles from "./MeowReplies.module.css";
import LikeButton from "../components/LikeButton";
import user from "../assets/user.png";

const MeowReplies = ({ allMeowReplies, dateFormat }) => {
  const meowsToShow = allMeowReplies.map((meow) => {
    const dateString = meow.date;
    const dateObject = dateString ? new Date(dateString) : null;
    const date = dateObject
      ? new Intl.DateTimeFormat("es-ES", dateFormat).format(dateObject)
      : "Fecha no disponible";

    // Devolver el meow con la fecha actualizada
    return {
      ...meow,
      date: date,
    };
  });

  return (
    <>
      {meowsToShow && (
        <div className={styles.bigContainer}>
          {meowsToShow.map((meow) => (
            <div key={meow._id} className={styles.container}>
              <div className={styles.meowsContainer}>
                <div className={styles.userContainer}>
                  <img src={user} alt="user" />
                  <p>{meow.authorUsername}</p>
                </div>
                <p>{meow.text}</p>
              </div>
              <div className={styles.likesContainer}>
                <p>
                  {meow.likes} <LikeButton meow={meow} />
                </p>
                <p>{meow.date.slice(0, -3)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MeowReplies;
