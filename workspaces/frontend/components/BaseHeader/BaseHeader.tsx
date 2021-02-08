import Link from "next/link";
import styles from "./BaseHeader.module.scss";
import { useAuth } from "../UserProvider/UserProvider";

export const BaseHeader = () => {
  const { logout, user } = useAuth();

  return (
    <>
      <nav className={`${styles.navbarFix} navbar navbar-expand-lg bg-white`}>
        <div>
          <a className="navbar-brand py-1 px-3" href="/">
            <img
              src="https://d19m59y37dris4.cloudfront.net/directory/1-6/img/logo.svg"
              className="px-3"
              alt="Directory logo"
            />
          </a>
        </div>
        {!user ? (
          <div>
            <ul className="nav-item navbar-nav px-3">
              <li>
                <Link href="/login">
                  <a className="nav-link">Entrar</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/signup">
                  <a className="nav-link">Registrarse</a>
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <ul className="nav-item navbar-nav px-3">
              <li className="nav-link px-4">{user.email}</li>
              <button
                className="btn btn-primary btn-block mr-3"
                onClick={() => {
                  logout();
                }}
              >
                Log out
              </button>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};
