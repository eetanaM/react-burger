import styles from './Preloader.module.css'

export default function Preloader() {
    return (
        <div className={styles.preloader_container}>
            <div className={styles.lds_hourglass}></div>
        </div>
    )
}
