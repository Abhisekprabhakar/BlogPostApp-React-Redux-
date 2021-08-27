import { React } from "react";
import BlogForm from "./components/BlogForm";
import { shallow } from "enzyme";

function renderBlogForm(args) {
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
  const formOperation = {
    onSubmitHandler: () => {},
    onTitleChange: () => {},
    onCategoryChange: () => {},
    onContentChange: () => {},
  };
  const defaultProps = {
    type: "add",
    blog: { ...Blog },
    formOperation: { ...formOperation },
    invalid: false,
    errors: { ...Error },
  };

  const props = { ...defaultProps, ...args };
  return shallow(<BlogForm {...props} />);
}

it("renders form", () => {
  const wrapper = renderBlogForm();
  expect(wrapper.find("form").length).toBe(1);
});

it("renders Add form", () => {
  const wrapper = renderBlogForm();
  expect(wrapper.find(".title").text()).toBe(" Add New Blog ");
});

it("renders Edit form", () => {
  const wrapper = renderBlogForm({ type: "edit" });
  expect(wrapper.find(".title").text()).toBe(" Edit Blog ");
});
