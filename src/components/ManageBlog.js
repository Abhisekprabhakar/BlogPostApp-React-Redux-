import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CreateBlog, UpdateBlog } from "../redux/Actions/BlogAction";
import { connect } from "react-redux";
import BlogForm from "./BlogForm";
import ReactLoading from "react-loading";

const Blog = {
  id: null,
  title: "",
  category: "",
  content: "",
  users: [],
};
const Error = {
  titleErr: "",
  categoryErr: "",
  contentErr: "",
};
function ManageBlog(props) {
  const param = useParams();
  const [blog, setBlog] = useState(Blog);
  const [errors, setErrors] = useState(Error);
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("add");
  useEffect(() => {
    if (param.id !== undefined) {
      let Blog = props.blogs.find((b) => b.id === Number(param.id));
      if (Blog === undefined) {
        props.history.push("/error");
      } else {
        setBlog(Blog);
        setType("edit");
      }
    } else {
      let randomId = new Date().valueOf();
      Blog.id = randomId;
      setBlog(Blog);
    }
    setLoading(false);
  }, [param.id, props.blogs, props.history]);

  const FormOperation = {
    onSubmitHandler: (event) => {
      event.preventDefault();
      if (
        errors.titleErr !== "" ||
        errors.categoryErr !== "" ||
        errors.contentErr !== ""
      ) {
        setInvalid(true);
      } else {
        if (type === "add") {
          props.dispatch(CreateBlog(blog));
          props.history.push(`/blog/${blog.id}`);
        } else {
          props.dispatch(UpdateBlog(blog));
          props.history.push(`/blog/${blog.id}`);
        }
      }
    },

    onTitleChange: (event) => {
      setBlog({ ...blog, title: event.target.value });

      if (event.target.value.length < 3) {
        setErrors({
          ...errors,
          titleErr: "Title must be greater than or Equal to 3 letters",
        });
      } else {
        if (event.target.value.length > 50) {
          setErrors({
            ...errors,
            titleErr: "Title must be less than or Equal to 50 letters",
          });
        } else {
          setErrors({ ...errors, titleErr: "" });
        }
      }
    },

    onCategoryChange: (event) => {
      setBlog({ ...blog, category: event.target.value });
      if (event.target.value.length < 3) {
        setErrors({
          ...errors,
          categoryErr: "Category must be greater than or Equal to 3 letters",
        });
      } else if (event.target.value.length > 15) {
        setErrors({
          ...errors,
          categoryErr: "Category must be less than or Equal to 15 letters",
        });
      } else {
        setErrors({ ...errors, categoryErr: "" });
      }
    },

    onContentChange: (event) => {
      setBlog({ ...blog, content: event.target.value });
      if (event.target.value.length < 255) {
        setErrors({
          ...errors,
          contentErr: "Content must be greater than or Equal to 255 letters",
        });
      } else {
        setErrors({ ...errors, contentErr: "" });
      }
    },
  };

  return (
    <div>
      <Navbar page="Manage" />
      {loading ? (
        <div
          style={{
            marginLeft: "45%",
            marginRight: "45%",
            marginTop: "300px",
          }}
        >
          <ReactLoading type="spinningBubbles" color="rgba(131, 24, 160, 1)" />
          Loading...
        </div>
      ) : (
        <>
          <BlogForm
            type={type}
            blog={blog}
            formOperation={FormOperation}
            invalid={invalid}
            errors={errors}
          />
        </>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  };
};
export default connect(mapStateToProps)(ManageBlog);
