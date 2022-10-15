import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Component = this.props.component;
    return (
      <Route>
        {() =>
          this.props.isLogged ? <Component {...this.props} /> : <Redirect to="/sign-in" />
        }
      </Route>
    );
  }
}

export default withRouter(ProtectedRoute);
