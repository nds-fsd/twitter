import styles from './Public-home.module.css'
import Cat from '../assets/Cat.png'
const PublicHome = ( ) => {
    return(
        <div className={styles.container}>
            <img src={Cat} />
            <div className={styles.right}>
            <h1>Happening now</h1>
            <button>Create account</button>
            <p>Or</p>
            <button>Login</button>

            </div>
           

        </div>
    )
}

export default PublicHome;