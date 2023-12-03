import styles from "./VistaUnMeow.module.css"

const VistaUnMeow = ( {meow} )=>{
    return (
        <div className={styles.container}>

            <p className={styles.user}>USER</p>

            <p className="meow">Lorem ipsum dolor sit, amet consec
               adipisicing elit. Sit, voluptatibus! Lorem ipsum dolor sit
               onsectetur adipisicing elit. Tempore, aliquam.asdad
               asdsad dsadadsa dsadsad dsadsadasdsa d sadsadsadasds
               sadsadsadasdss</p>
            <div className={styles.dateAndViews}>
            <span>11:34 AM 20/11/2023</span><span className="views">Views</span>
            </div>
          
            <div className={styles.stats}>
                <span>💬​Reply</span><span>Repost</span><span>Likes</span>
                <span>View</span><span>Bookmark</span><span>Share</span>
            </div>

            <div className={styles.replies}>
               <textarea name="" id="" cols="50" rows="5" placeholder="Post your reply">sss</textarea>
               <button>Reply</button>
            </div>

        </div>
    )
}

export default VistaUnMeow;