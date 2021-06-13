import { Switch, Route } from "react-router-dom";
import Authentication from "../pages/Authentication";
import { MainLayout } from "../components";
import Home from "../pages/Home";

const Router = (props) => {
  return (
    <Switch>
      <Route exact path="/login" component={Authentication} />
      <Route
        path="/"
        component={(props) => (
          <MainLayout {...props}>
            <Route exact path="/" component={Home} />
          </MainLayout>
        )}
      />
    </Switch>
  );
};

export default Router;
