import "./App.css";
import { Fragment, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./Layout/DefaultLayout/ManagingLayout.jsx";
import ViewLayout from "./Layout/DefaultLayout/ViewLayout.jsx";
import {
  ManagingMotel,
  NotLoggedIn,
  SignInWithAcc,
  SignedIn,
} from "./routes/routes.js";
import { ProductContext } from "./contexts/ProductContextProvider.jsx";

function App() {
  const { user, isConvert } = useContext(ProductContext);
  // console.log(user, isConvert);
  return (
    <>
      {isConvert ? (
        <>
          {user && user?.userId ? (
            <>
              {user?.form !== "LRO" ? (
                <>
                  <Router>
                    <div className="App">
                      <Routes>
                        {SignedIn.map((route, index) => {
                          const Page = route.component;
                          let Layout = DefaultLayout;
                          if (route.layout) Layout = route.layout;
                          else if (route.layout === null) Layout = Fragment;

                          return (
                            <Route
                              key={index}
                              path={route.path}
                              element={
                                <Layout>
                                  <Page user={user} />
                                </Layout>
                              }
                            />
                          );
                        })}
                      </Routes>
                    </div>
                  </Router>
                </>
              ) : (
                <>
                  <Router>
                    <div className="App">
                      <Routes>
                        {SignInWithAcc.map((route, index) => {
                          const Page = route.component;
                          let Layout = DefaultLayout;
                          if (route.layout) Layout = route.layout;
                          else if (route.layout === null) Layout = Fragment;

                          return (
                            <Route
                              key={index}
                              path={route.path}
                              element={
                                <Layout>
                                  <Page user={user} />
                                </Layout>
                              }
                            />
                          );
                        })}
                      </Routes>
                    </div>
                  </Router>
                </>
              )}
            </>
          ) : (
            <>
              <Router>
                <div className="App">
                  <Routes>
                    {NotLoggedIn.map((route, index) => {
                      const Page = route.component;
                      let Layout = DefaultLayout;
                      if (route.layout) Layout = route.layout;
                      else if (route.layout === null) Layout = Fragment;

                      return (
                        <Route
                          key={index}
                          path={route.path}
                          element={
                            <Layout>
                              <Page user={user} />
                            </Layout>
                          }
                        />
                      );
                    })}
                  </Routes>
                </div>
              </Router>
            </>
          )}
        </>
      ) : (
        <>
          <Router>
            <div className="App">
              <Routes>
                {ManagingMotel.map((route, index) => {
                  const Page = route.component;
                  let Layout = ViewLayout;
                  if (route.layout) Layout = route.layout;
                  else if (route.layout === null) Layout = Fragment;

                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <Layout>
                          <Page user={user} />
                        </Layout>
                      }
                    />
                  );
                })}
              </Routes>
            </div>
          </Router>
        </>
      )}
    </>
  );
}

export default App;
