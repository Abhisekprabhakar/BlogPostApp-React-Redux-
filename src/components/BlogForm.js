import style from "../styles/pages.module.css";
import { Link } from "react-router-dom";

const BlogForm = ({ blog, formOperation, invalid, errors, type }) => {
  return (
    <div className={style.formBlogPage}>
      <div className={style.title}>
        {" "}
        {type === "add" ? "Add New" : "Edit"} Blog{" "}
      </div>
      <hr />

      <div className="container">
        <form onSubmit={formOperation.onSubmitHandler}>
          <div className="form-group">
            <label>Title:</label>
            <br />
            <input
              type="text"
              name="title"
              id="title"
              value={blog.title}
              className="form-control"
              placeholder="title"
              onChange={formOperation.onTitleChange}
              required
            />
            {errors.titleErr && (
              <div className={style.errorMessage}>{errors.titleErr}</div>
            )}
          </div>
          <div className="form-group">
            <label>Category:</label>
            <input
              type="text"
              name="category"
              id="category"
              value={blog.category}
              className="form-control"
              placeholder="category"
              onChange={formOperation.onCategoryChange}
              required
            />
            {errors.categoryErr && (
              <div className={style.errorMessage}>{errors.categoryErr}</div>
            )}
          </div>
          <div className="form-group">
            <label>Content:</label>
            <br />
            <textarea
              name="content"
              id="content"
              placeholder="content"
              className="form-control"
              value={blog.content}
              rows="15"
              cols="100"
              onChange={formOperation.onContentChange}
              required
            ></textarea>
            {errors.contentErr && (
              <div className={style.errorMessage}>{errors.contentErr}</div>
            )}
          </div>
          <div className="form-group">
            {invalid && (
              <div className={style.errorMessage}>Please Enter Valid Data</div>
            )}
            {type === "add" ? (
              <>
                <button className={style.btn1}>Add</button>
                <Link to="/#blogs" className={style.btn2}>
                  cancel
                </Link>
              </>
            ) : (
              <>
                <button className={style.btn1}>Save</button>
                <Link to={`/blog/${blog.id}`} className={style.btn2}>
                  cancel
                </Link>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default BlogForm;
