import React from "react";
import { Routes, Route } from "react-router-dom";

// layouts
import NonAuthLayout from "../layouts/NonAuth/index";
import DefaultLayout from "../layouts/Auth/index";

// Private route
import PrivateRoute from "./private/private.route";

// routes data
import { publicRoutes, privateRoutes, RouteElement } from "./routes";
import NotFound from "../pages/404";

const Router = (props: any) => {
  return (
    <React.Fragment>
      <Routes>
        <Route>
          {publicRoutes.map(({ path, Element }: RouteElement, idx: number) => (
            <Route
              path={path}
              element={
                <NonAuthLayout>
                  <Element />
                </NonAuthLayout>
              }
              key={idx}
            />
          ))}
        </Route>

        <Route>
          {privateRoutes.map(({ path, Element }: RouteElement, idx) => (
            <Route
              path={path}
              element={
                <PrivateRoute>
                  <Element />
                </PrivateRoute>
              }
              key={idx}
              // exact={true}
            />
          ))}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
};

export default Router;
