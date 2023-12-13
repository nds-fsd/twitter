import styles from "./Navbar.module.css";
import home from "../assets/hogar.png"
import busqueda from "../assets/busqueda.png"
import campana from "../assets/campana.png"
import marcador from "../assets/marcador.png"
import menu from "../assets/menu.png"
import sobre from "../assets/sobre.png"
import square from "../assets/square.png"
import usuario from "../assets/usuario.png"
import user from "../assets/user.png"


function Navbar() {
    return (
    <div className={styles.container}>
        <img src="" alt="logo" />
        <nav className={styles.navbar}>
            <div className={styles.options}><img src={home} alt="."/><p>Home</p></div>
            {/* <div className={styles.options}><img src={busqueda} alt="."/><p>Explore</p></div>
            <div className={styles.options}><img src={campana} alt="."/><p>Notifications</p></div>
            <div className={styles.options}><img src={sobre} alt="."/><p>Messages</p></div>
            <div className={styles.options}><img src={square} alt="."/><p>Lists</p></div>
            <div className={styles.options}><img src={marcador} alt="."/><p>Booksmarks</p></div> */}
            <div className={styles.options}><img src={usuario} alt="."/><p>Profile</p></div>
            {/* <div className={styles.options}><img src={menu} alt="."/><p>More</p></div> */}
            <button>Post</button>
        </nav>
        <div className={styles.usuario}>
            <img className={styles.user} src={user} alt="." />
            <div>
                <p>nombre</p>
                <p>@usuario.random</p>
            </div>
        </div>
    </div>


  )
}

export default Navbar