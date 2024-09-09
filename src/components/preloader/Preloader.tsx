import styles from './Preloader.module.css'

const Preloader = (): React.JSX.Element => {
    return (
        <div className={styles.lds_hourglass}></div>
    )
}

export default Preloader
