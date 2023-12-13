import styles from "./Buscador.module.css";

function Buscador() {
    return (
        <input className={styles.buscador} placeholder="Search" type="text"></input>
    )
}

export default Buscador