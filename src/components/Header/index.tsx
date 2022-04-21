import styles from "./styles.module.scss";

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <a>Home</a>
          <a>Posts</a>
        </nav>
      </div>
    </header>
  );
};
