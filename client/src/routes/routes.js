import config from "../config";
import HomePage from "../pages/HomePage.jsx";
import RoomPage from "../pages/Room/RoomPage.jsx";

// Pages

// Public routes
const SignInWithAcc = [{ path: config.routes.home, component: HomePage }];

//Login with Create Acc register
const SignedIn = [{ path: config.routes.home, component: HomePage }];
const NotLoggedIn = [
  { path: config.routes.home, component: HomePage },
  { path: config.routes.Room, component: RoomPage },
  // { path: config.routes.home, component: HomePage },
  // { path: config.routes.home, component: HomePage },
  // { path: config.routes.home, component: HomePage },
  // { path: config.routes.home, component: HomePage },
  // { path: config.routes.home, component: HomePage },
];
const ManagingMotel = [{ path: config.routes.home, component: HomePage }];
export { SignInWithAcc, SignedIn, NotLoggedIn, ManagingMotel };
