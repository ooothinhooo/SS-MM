import Login from "../components/Account/Login.jsx";
import UpdateMember from "../components/Member/UpdateMember.jsx";
import config from "../config";
import LoginPage from "../pages/Account/LoginPage.jsx";
import SignUpPage from "../pages/Account/SignUpPage.jsx";
import BillPage from "../pages/Billing/BillPage.jsx";
import UpdateBillPage from "../pages/Billing/UpdateBillPage.jsx";
import DashboardPage from "../pages/Dashboard/DashboardPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import MainPage from "../pages/Mainpage/MainPage.jsx";
import MemberPage from "../pages/Members/MemberPage.jsx";
import UpdateMemberPage from "../pages/Members/UpdateMemberPage.jsx";
import ViewMemberPage from "../pages/Members/ViewMemberPage.jsx";
import MotelPage from "../pages/Motel/MotelPage.jsx";
import PaymentsPage from "../pages/Paymentslips/PaymentsPage.jsx";
import PrintPayPage from "../pages/Paymentslips/PrinPayPage.jsx";
import CreatePostPage from "../pages/Post/CreatePostPage.js";

import RoomPage from "../pages/Room/RoomPage.jsx";
import ViewRoomPage from "../pages/Room/ViewRoomPage.jsx";
import ServicePage from "../pages/Service/ServicePage.jsx";

// Pages

// Public routes
const SignInWithAcc = [
  { path: config.routeSocial.home, component: HomePage },
  { path: config.routeSocial.Motel, component: MotelPage },
];

//Login with Create Acc register
const SignedIn = [
  { path: config.routeSocial.home, component: MainPage },
  { path: config.routeSocial.Motel, component: MotelPage },
  { path: config.routeSocial.CreatePost, component: CreatePostPage },
];
const NotLoggedIn = [
  { path: config.routes.home, component: LoginPage },
  { path: config.routes.Login, component: LoginPage },
  { path: config.routes.Register, component: SignUpPage },
  // { path: config.routes.home, component: HomePage },
  // { path: config.routes.home, component: HomePage },
];
const ManagingMotel = [
  { path: config.routesManagingMotel.home, component: HomePage },
  { path: config.routesManagingMotel.Dashboard, component: DashboardPage },
  { path: config.routesManagingMotel.Room, component: RoomPage },
  { path: config.routesManagingMotel.ViewRoom, component: ViewRoomPage },
  { path: config.routesManagingMotel.Member, component: MemberPage },
  { path: config.routesManagingMotel.ViewMember, component: ViewMemberPage },
  {
    path: config.routesManagingMotel.UpdateMember,
    component: UpdateMemberPage,
  },
  { path: config.routesManagingMotel.Billing, component: BillPage },
  { path: config.routesManagingMotel.UpdateBill, component: UpdateBillPage },
  { path: config.routesManagingMotel.Payment, component: PaymentsPage },
  { path: config.routesManagingMotel.PrintPayment, component: PrintPayPage },
  { path: config.routesManagingMotel.Service, component: ServicePage },
];
export { SignInWithAcc, SignedIn, NotLoggedIn, ManagingMotel };
