import styles from './Preloader.module.css'

export default function Preloader() {
    return (
        <div className={styles.lds_hourglass}></div>
    )
}
