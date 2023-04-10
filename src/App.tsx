import { Router, Link, Route, Routes } from "react-router-dom";
import styles from "./App.module.scss";
import { HomePage } from "./pages/home.page";
import { HeroesPage } from "./pages/heroes.page";
import { HeroPage } from "./pages/hero.page";
import { Container } from "./components/Container/Container";
import { DynamicParallelQueriesPage } from "./pages/dynamic-parallel-queries.page";
import { DependentQueriesPage } from "./pages/dependent-queries.page";

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
              <Link to="/heroes">Heroes</Link>
            </li>
            <li className={styles["navbar__menu-item"]}>
              <Link to="/parallel">Dynamic Parallel</Link>
            </li>
            <li className={styles["navbar__menu-item"]}>
              <Link to="/dependent">Dependent Parallel</Link>
            </li>
          </ul>
        </Container>
      </nav>
      <main className={styles["main"]}>
        <Container>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/heroes" element={<HeroesPage />} />
            <Route path="/hero/:id" element={<HeroPage />} />
            <Route
              path="/parallel"
              element={<DynamicParallelQueriesPage heroIDs={["1", "2"]} />}
            />
            <Route
              path="/dependent"
              element={<DependentQueriesPage email="vishwas@example.com" />}
            />
          </Routes>
        </Container>
      </main>
    </>
  );
}
