import SignInButton from "../SignInButton";
import styles from "./styles.module.scss";

import { ActiveLink } from "../ActiveLink";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <picture>
          <source srcSet="/images/logo.svg" type="image/svg" />
          <img src="/images/logo.svg" alt="Ignews" />
        </picture>
        <nav className={styles.header__container__nav}>
          <ul>
            <li>
              <ActiveLink href="/" activeClassName={styles.active}>
                <a>Home</a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/posts" activeClassName={styles.active}>
                <a>Posts</a>
              </ActiveLink>
            </li>
          </ul>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
