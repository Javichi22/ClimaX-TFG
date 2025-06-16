import styles from '../../styles/Home.module.css';

type ErrorMessageProps = {
    message: string;
};

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return (
        <div className={styles.errorMessage}>
            {message}
        </div>
    );
};