import { Switch, Route } from "react-router-dom";
import Authentication from "../pages/Authentication";
import { MainLayout, DashboardLayout } from "../components";
import Home from "../pages/Home";
import Wallet from "../pages/Wallet";
import Profile from "../pages/Profile";
import Sample from "../pages/Sample";
import AuthLayout from "../components/layouts/AuthLayout";

const Router = (props) => {
  return (
    <Switch>
      <Route exact path="/login" component={Authentication} />
      <Route exact path="/sample" component={Sample} />
      <Route
        path="/dashboard"
        component={(props) => (
          <DashboardLayout {...props}>
            <AuthLayout>
              <Switch>
                <Route exact path="/dashboard" component={Profile} />
                <Route exact path="/dashboard/wallet" component={Wallet} />
              </Switch>
            </AuthLayout>
          </DashboardLayout>
        )}
      />
      <Route
        path="/"
        component={(props) => (
          <MainLayout {...props}>
            <AuthLayout>
              <Route exact path="/" component={Home} />
            </AuthLayout>
          </MainLayout>
        )}
      />
    </Switch>
  );
};

export default Router;
