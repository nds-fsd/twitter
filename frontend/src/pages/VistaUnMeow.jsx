import styles from "./VistaUnMeow.module.css"

const VistaUnMeow = ( {meow, user} )=>{
    
    function handleKeyDown(e) {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
    }


    return (
        <div className={styles.container}>

             <img src="https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg" alt="" />     <p className={styles.user}>USER.name</p>

            <p className={styles.meow}>Lorem ipsum dolor sit, amet consec
               adipisicing elit. Sit, voluptatibus! Lorem ipsum dolor sit
               onsectetur adipisicing elit. Tempore, aliquam.asdad
               asdsad dsadadsan dsadsad dsadsadasdsa d sadsadsadasds
               sadsadsadasdss</p>
            <div className={styles.dateAndViews}>
            <span>11:34 AM 20/11/2023</span><span className="views">Views</span>
            </div>
          
            <div className={styles.stats}>
                <span>💬​Reply</span><span>🔁Repost</span><span>❤️Likes</span>
                <span>🔖Bookmark</span><span>🔗Share</span>
            </div>

            <div className={styles.replies}>
               <textarea onChange={handleKeyDown} style={{fontSize: "20px"}} name="" id="" cols="50" rows="5" placeholder="Post your reply"></textarea>
               <button>Reply</button>
            </div>
            </div>
    )
}

export default VistaUnMeow;