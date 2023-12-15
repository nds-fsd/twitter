import styles from "./Buscador.module.css";

function Buscador() {
    return (
        <div className={styles.search}>
            <input className={styles.buscador} placeholder="Search" type="text"></input>
        </div>
        
    )
}

export default Buscador