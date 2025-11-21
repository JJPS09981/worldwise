import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/product">產品</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">價格</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            登入
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
