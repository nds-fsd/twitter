import styles from "./Navbar.module.css";
import home from "./assets/hogar.png"

function Navbar() {
    return (
    <div className={styles.container}>
        <img src="" alt="logo" />
        <nav className={styles.navbar}>
            <div className={styles.options}><img src={home} alt="."/><p>Home</p></div>
            <div className={styles.options}><img src="" alt="."/><p>Explore</p></div>
            <div className={styles.options}><img src="" alt="."/><p>Notifications</p></div>
            <div className={styles.options}><img src="" alt="."/><p>Messages</p></div>
            <div className={styles.options}><img src="" alt="."/><p>Lists</p></div>
            <div className={styles.options}><img src="" alt="."/><p>Booksmarks</p></div>
            <div className={styles.options}><img src="" alt="."/><p>Profile</p></div>
            <div className={styles.options}><img src="" alt="."/><p>More</p></div>
            <button>Post</button>
        </nav>
        <div className={styles.usuario}>
            <img src="" alt="." />
            <div>
                <p>nombre</p>
                <p>@usuario.random</p>
            </div>
        </div>
    </div>


  )
}

export default Navbar