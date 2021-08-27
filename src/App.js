import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Context config
import { userSession } from "./userContext";

//blog intial data
import { state } from "./redux/data";
//redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import blogReducer from "./redux/Reducers/BlogReducer";
import { devToolsEnhancer } from "redux-devtools-extension";

//components
import Landing from "./components/landing";
import Blog from "./components/Blog";
import ErrorPage from "./components/errorPage";
import ManageBlog from "./components/ManageBlog";

//helper components
import { ProtectedRoute } from "./components/protected";
import ScrollToTop from "./components/scrollToTop";

//Redux store
const store = createStore(blogReducer, state, devToolsEnhancer());

function App() {
  const [user, setUser] = useState();
  const [isSignedIn, setIsSignedIn] = useState();

  useEffect(() => {
    let u = JSON.parse(localStorage.getItem("user"));
    if (u != null) {
      setUser(u);
      setIsSignedIn(Boolean(localStorage.getItem("isSignedIn")));
    } else {
      setUser(null);
      setIsSignedIn(false);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsSignedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isSignedIn", true);
  };

  const logout = () => {
    setUser(null);
    setIsSignedIn(false);
    localStorage.setItem("user", JSON.stringify(null));
    localStorage.setItem("isSignedIn", false);
  };

  return (
    <div>
      <Provider store={store}>
        <userSession.Provider value={{ user, isSignedIn, login, logout }}>
          <Router>
            <ScrollToTop>
              <Switch>
                <Route path="/" component={Landing} exact></Route>
                <Route path="/blog/:id" component={Blog} exact></Route>
                <ProtectedRoute
                  path="/manageblog/:id"
                  component={ManageBlog}
                  exact
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/manageblog"
                  component={ManageBlog}
                  exact
                ></ProtectedRoute>
                <Route exact path="*" component={ErrorPage} />
              </Switch>
            </ScrollToTop>
          </Router>
        </userSession.Provider>
      </Provider>
    </div>
  );
}

export default App;
