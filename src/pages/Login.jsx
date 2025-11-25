import Button from "../components/Button";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("123@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, isAuthenticated } = useAuth();

  function handleLogin(e) {
    e.preventDefault();

    if (email && password) login(email, password);
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">密碼</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">登入</Button>
        </div>
      </form>
    </main>
  );
}
