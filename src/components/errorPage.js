import Navbar from "./Navbar";
import style from "../styles/landing.module.css";
import { Link } from "react-router-dom";
function ErrorPage() {
  return (
    <div>
      <Navbar page="Error"></Navbar>
      <div className={style.blogContainerTitle}>
        ERROR 404: OOPS ! The Resoure You are looking for is Unavailable.
        <br />
        <Link to="/">Go To Home</Link>
      </div>
    </div>
  );
}

export default ErrorPage;
