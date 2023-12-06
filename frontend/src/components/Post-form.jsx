import styles from "./Post-form.module.css";
import image from './assets/Elon-Musk.jpg';

function PostForm () {

    return (
        <div className={styles.container}>
            <div className={styles.containerPost}>
                <img className={styles.accountImage} src={image} alt="Profile Photo" />
                {/* <input className={styles.postInput} type="text" name="post" id="post" minLength="1" maxLength="240" placeholder="What is on your mind?"/> */}
                <textarea className={styles.postInput} name="text" id="text" cols="30" rows="1" placeholder="What is on your mind?"></textarea>
            </div>
            <div className={styles.containerButtons}>
                <div>
                    <p>text</p>
                </div>                
                <button className={styles.postButton}>Post</button>
            </div>
        </div>
    )
}

export default PostForm