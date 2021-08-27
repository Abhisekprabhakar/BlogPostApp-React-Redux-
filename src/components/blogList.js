import { Link } from "react-router-dom";
import style from "../styles/landing.module.css";
import { connect } from "react-redux";

const BlogList = (props) => {
  return (
    <div className={`${style.blogListContainer} container`}>
      {props.blogs.length <= 0 ? (
        <>
          <div className={style.blogCategory}>No Blogs Available</div>
          <a href="/blogs/add">Add New Blog</a>
        </>
      ) : (
        <>
          {props.blogs
            .map((blog) => {
              return (
                <Link key={blog.id} to={`/blog/${blog.id}`}>
                  <div className={style.blogCard}>
                    <div className="row">
                      <div className="col-md-8">
                        <span className={style.blogTitle}> {blog.title}</span>
                      </div>
                      <div className="col-md-4">
                        <span
                          className={`${style.blogCategory} ${style.rightAlign}`}
                        >
                          /{blog.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
            .reverse()}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  };
};
export default connect(mapStateToProps)(BlogList);
