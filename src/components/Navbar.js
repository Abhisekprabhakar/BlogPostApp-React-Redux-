import style from "../styles/landing.module.css";
import { useUserSession } from "../userContext";
import { Link } from "react-router-dom";
const Navbar = (props) => {
  const { user, isSignedIn, logout } = useUserSession();
  return (
    <nav className={`navbar, ${style.navHeader} sticky-top`} id="nav">
      <Link to="/#blogs" className={style.navText}>
        BlogPost App
      </Link>

      {props.page === undefined &&
        (isSignedIn ? (
          <div className={style.rightAlign}>
            <span className={style.navUser}>Hi! {user.givenName}</span>
            <Link type="button" to="/manageblog" className={style.navBtn}>
              <i className="fa fa-plus" style={{ fontSize: "20px" }}>
                {" "}
              </i>{" "}
              New
            </Link>
            <button type="button" onClick={logout} className={style.navBtn}>
              LogOut
            </button>
          </div>
        ) : (
          <div className={style.rightAlign}>
            <a type="button" href="/#page-top" className={style.navBtn}>
              <i className="fa fa-plus" style={{ fontSize: "20px" }}>
                {" "}
              </i>{" "}
              New
            </a>
          </div>
        ))}
    </nav>
  );
};
export default Navbar;
