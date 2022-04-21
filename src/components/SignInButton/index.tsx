import { FaGithub } from "react-icons/fa";
import styles from "./styles.module.scss";

export const SignInButton = () => {
  return (
    <button type="button" className={styles.signInButton}>
      <FaGithub /> Sign in with Github
    </button>
  );
};
