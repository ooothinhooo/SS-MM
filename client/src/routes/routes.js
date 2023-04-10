import config from "../config";
import HomePage from "../pages/HomePage.jsx";

// Pages

// Public routes
const SignInWithAcc = [{ path: config.routes.home, component: HomePage }];

//Login with Create Acc register
const SignedIn = [{ path: config.routes.home, component: HomePage }];
const NotLoggedIn = [{ path: config.routes.home, component: HomePage }];
export { SignInWithAcc, SignedIn, NotLoggedIn };
