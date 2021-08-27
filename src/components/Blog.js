import style from "../styles/pages.module.css";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUserSession } from "../userContext";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import {
  BlogLikeByID,
  BlogUnLikeByID,
  BlogDeleteByID,
} from "../redux/Actions/BlogAction";

function Blog(props) {
  const { user, isSignedIn } = useUserSession();
  const [blog, setBlog] = useState("");
  const [Liked, setLiked] = useState(true);
  const params = useParams();
  useEffect(() => {
    let Blog = props.blogs.find((b) => b.id === Number(params.id));
    if (Blog === undefined) {
      props.history.push("/error");
    } else {
      setTimeout(() => {
        setBlog(Blog);
      }, 1000);
      if (user !== undefined && user !== null) {
        if (Blog.users.includes(user.googleId)) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      }
    }
  }, [user, params.id, props.blogs, props.history]);

  const onLikeHandle = () => {
    props.dispatch(BlogLikeByID(params.id, user.googleId));
    setLiked(true);
  };
  const onUnLikeHandle = () => {
    props.dispatch(BlogUnLikeByID(params.id, user.googleId));
    setLiked(false);
  };
  const onDeleteHandle = () => {
    props.dispatch(BlogDeleteByID(params.id));
    props.history.push("/");
  };

  if (blog === undefined) {
    props.history.push("/error");
    return <></>;
  } else {
    return (
      <div>
        <Navbar></Navbar>
        <div className={style.blogPage}>
          {blog === "" ? (
            <div
              style={{
                marginLeft: "50%",
                marginRight: "50%",
                marginTop: "300px",
              }}
            >
              <ReactLoading
                type="spinningBubbles"
                color="rgba(131, 24, 160, 1)"
              />
              Loading...
            </div>
          ) : (
            <>
              <div className={style.blogContainer}>
                <div className="row">
                  <div className="col-md-7">
                    <div className={style.title}> {blog.title} </div>
                    <Link type="button" to="/#blogs" className={style.btn1}>
                      <i className="fa fa-arrow-left"></i> Back
                    </Link>
                  </div>
                  <div className="col-md-5">
                    {isSignedIn && (
                      <div className={style.rightAlign}>
                        {Liked || blog.users.includes(user.googleId) ? (
                          <button
                            type="button"
                            onClick={onUnLikeHandle}
                            className={style.btn2}
                          >
                            Unlike
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={onLikeHandle}
                            className={style.btn2}
                          >
                            Like
                          </button>
                        )}

                        <Link
                          to={`/manageblog/${blog.id}`}
                          type="button"
                          className={style.btn1}
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            if (
                              window.confirm("Do you want to delete this Blog")
                            )
                              onDeleteHandle();
                          }}
                          className={style.btn2}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <hr />
                {isSignedIn && (
                  <>
                    <div className="row" style={{ paddingLeft: "20px" }}>
                      {blog.users.includes(user.googleId) ? (
                        blog.users.length > 1 ? (
                          <div>
                            <i
                              className="fa"
                              style={{
                                color: "rgba(131,24,160,1)",
                                fontSize: "25px",
                              }}
                            >
                              &#xf087;{" "}
                            </i>{" "}
                            You and {blog.users.length - 1} users liked this!
                          </div>
                        ) : (
                          <div>
                            <i
                              className="fa"
                              style={{
                                color: "rgba(131,24,160,1)",
                                fontSize: "25px",
                              }}
                            >
                              &#xf087;{" "}
                            </i>{" "}
                            you liked this!
                          </div>
                        )
                      ) : blog.users.length > 0 ? (
                        <div>
                          <i
                            className="fa"
                            style={{
                              color: "rgba(131,24,160,1)",
                              fontSize: "25px",
                            }}
                          >
                            &#xf087;{" "}
                          </i>{" "}
                          {blog.users.length} users liked this!
                        </div>
                      ) : (
                        <div>
                          <i
                            className="fa"
                            style={{
                              color: "rgba(131,24,160,1)",
                              fontSize: "25px",
                            }}
                          >
                            &#xf087;{" "}
                          </i>{" "}
                          Be the first one to like this!
                        </div>
                      )}
                    </div>
                    <hr />
                  </>
                )}
                <div className={style.content}>{blog.content}</div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  };
};
export default connect(mapStateToProps)(Blog);
