import { Router, Link, Route, Routes } from "react-router-dom";
import styles from "./App.module.scss";
import { HomePage } from "./pages/home.page";
import { HeroesPage } from "./pages/heroes.page";
import { RQHeroesPage } from "./pages/rq-heroes.page";
import { Container } from "./components/Container/Container";

export function App() {
  return (
    <>
      <nav className={styles["navbar"]}>
        <Container>
          <ul className={styles["navbar__menu"]}>
            <li className={styles["navbar__menu-item"]}>
              <Link to="/">Home</Link>
            </li>
            <li className={styles["navbar__menu-item"]}>
              <Link to="/super-heroes">Traditional Super Heroes</Link>
            </li>
            <li className={styles["navbar__menu-item"]}>
              <Link to="/rq-super-heroes">RQ Super Heroes</Link>
            </li>
          </ul>
        </Container>
      </nav>
      <main className={styles["main"]}>
        <Container>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/super-heroes" element={<HeroesPage />} />
            <Route path="/rq-super-heroes" element={<RQHeroesPage />} />
          </Routes>
        </Container>
      </main>
    </>
  );
}
