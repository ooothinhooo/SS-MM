import Login from "../components/Account/Login.jsx";
import config from "../config";
import HomePage from "../pages/HomePage.jsx";
import MotelPage from "../pages/Motel/MotelPage.jsx";
import AddRoomPage from "../pages/Room/AddRoomPage.jsx";
import RoomPage from "../pages/Room/RoomPage.jsx";

// Pages

// Public routes
const SignInWithAcc = [{ path: config.routes.home, component: HomePage }];

//Login with Create Acc register
const SignedIn = [
  { path: config.routes.home, component: HomePage },
  { path: config.routes.Motel, component: MotelPage },
  { path: config.routes.Room, component: RoomPage },
  { path: config.routes.AddRoom, component: AddRoomPage },
];
const NotLoggedIn = [
  { path: config.routes.home, component: HomePage },
  { path: config.routes.Login, component: Login },
  // { path: config.routes.home, component: HomePage },
  // { path: config.routes.home, component: HomePage },
  // { path: config.routes.home, component: HomePage },
];
const ManagingMotel = [{ path: config.routes.home, component: HomePage }];
export { SignInWithAcc, SignedIn, NotLoggedIn, ManagingMotel };
