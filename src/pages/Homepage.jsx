import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/FakeAuthContext";

export default function Homepage() {
  const { isAuthenticated } = useAuth();

  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          你留下足跡的地方，就是旅程的開始。
          <br />
          WorldWise 幫你把回憶都裝進地圖裡。
        </h1>
        <h2>
          世界地圖記錄你的足跡，無論你走到哪。
          珍藏每段旅程，也把這份感動帶給你的朋友。
        </h2>
        <Link to={isAuthenticated ? "/app" : "/login"} className="cta">
          冒險啟程
        </Link>
      </section>
    </main>
  );
}
