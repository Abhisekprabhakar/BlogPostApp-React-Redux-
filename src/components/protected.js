import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUserSession } from "../userContext";


export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
    const {isSignedIn} = useUserSession();
        if (isSignedIn !== false) {
             return (
                <Route
                      {...rest}
                                 render={props => {
                                                    return <Component {...props} />;
                                                }}
                />
                );   
            }  
        else{                                       
          return (
              <Route
                    {...rest}
             render={props => { return <Redirect to={{
                                                    pathname: "/",
                                                    state:{target:props.location}
                                                    }}
            />;
        }}/>
          );
    }
}             