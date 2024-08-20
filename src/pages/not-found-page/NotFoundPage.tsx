import styles from './NotFoundPage.module.css'
import smile from '../../images/sad-svgrepo-com.svg'

export default function NotFoundPage() {
    return (
        <>
            <div className={`${styles.not_found_container}`}>
                <img className={styles.sad_smile} src={smile} alt="sad smile" />
                <h1 className="text text_type_digits-large">404</h1>
                <h2 className='text text_type_main-medium'>Page Not Found</h2>
            </div>
        </>
    )
}
