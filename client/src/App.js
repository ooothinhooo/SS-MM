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
import NoLoginLayout from "./Layout/DefaultLayout/NoLoginLayout.jsx";

function App() {
  const { setUser, user, social, setSocial } = useContext(ProductContext);
  console.log(user);
  const Fun_ManagingMotel = () => {
    return (
      <Router>
        <div className="App">
          <Routes>
            {ManagingMotel.map((route, index) => {
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
                      <Page user={user} setUser={setUser} />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    );
  };
  const Fun_NotLoggedIn = () => {
    return (
      <Router>
        <div className="App">
          <Routes>
            {NotLoggedIn.map((route, index) => {
              const Page = route.component;
              let Layout = NoLoginLayout;
              if (route.layout) Layout = route.layout;
              else if (route.layout === null) Layout = Fragment;

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page user={user} setUser={setUser} />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    );
  };
  const Fun_SignInWithAcc = () => {
    return (
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
                      <Page user={user} setUser={setUser} />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    );
  };
  const Fun_SignedIn = () => {
    return (
      <Router>
        <div className="App">
          <Routes>
            {SignedIn.map((route, index) => {
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
                      <Page user={user} setUser={setUser} />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    );
  };

  return (
    <>
      {user && user ? (
        <>
          {Boolean(social) ? (
            <>
              {!user?.Motel ? (
                <>
                  <Fun_SignedIn />
                </>
              ) : (
                <>
                  <Fun_ManagingMotel />
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <Fun_NotLoggedIn />
        </>
      )}
    </>
  );
}

export default App;
