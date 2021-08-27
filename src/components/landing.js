import style from "../styles/landing.module.css";
import BlogList from "./blogList";
import Navbar from "./Navbar";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";
import { useUserSession } from "../userContext";

const Landing = () => {
  const { isSignedIn, login } = useUserSession();
  const responseGoogle = (response) => {
    login(response.profileObj);
  };
  return (
    <>
      <div className={style.landing} id="page-top">
        <section>
          <div className={style.headerContent}>
            <h2>BlogPost App</h2>
            <p>Read and share new perspectives on just about any topic.</p>
            {isSignedIn ? (
              <div>
                <Link to="/manageblog" className={style.btn}>
                  Create New
                </Link>
              </div>
            ) : (
              <GoogleLogin
                clientId="686175213995-mv311ktuil2the3h9v4bqedrgu4r1trd.apps.googleusercontent.com"
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className={style.btn}
                  >
                    Login With Google
                  </button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            )}
          </div>
        </section>

        <a href="#blogs" className={style.sd}>
          <p>
            <i
              className="fa fa-angle-double-up"
              style={{ fontSize: "20px", marginLeft: "35px" }}
            ></i>
          </p>
          Read Blogs
        </a>
      </div>
      <div className="blogs" id="blogs">
        <Navbar></Navbar>
        <div className={style.blogsContainer}>
          <div className={style.blogContainerTitle}>
            DISCOVER MORE OF WHAT MATTERS TO YOU
          </div>
          <hr />
          <BlogList></BlogList>
        </div>
      </div>
    </>
  );
};

export default Landing;
