import Login from "../components/Account/Login.jsx";
import UpdateMember from "../components/Member/UpdateMember.jsx";
import config from "../config";
import LoginPage from "../pages/Account/LoginPage.jsx";
import SignUpPage from "../pages/Account/SignUpPage.jsx";
import BillPage from "../pages/Billing/BillPage.jsx";
import UpdateBillPage from "../pages/Billing/UpdateBillPage.jsx";
import ViewBillPage from "../pages/Billing/ViewBillPage.jsx";
import DashboardPage from "../pages/Dashboard/DashboardPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import ChangPassPage from "../pages/Info/ChangPassPage.jsx";
import DashContentPage from "../pages/Info/DashContentPage.jsx";
import InfoPage from "../pages/Info/InfoPage.jsx";
import UpdateUserPage from "../pages/Info/UpdateUserPage.jsx";
import MainPage from "../pages/Mainpage/MainPage.jsx";
import AddMemberPage from "../pages/Members/AddMemberPage.jsx";
import MemberPage from "../pages/Members/MemberPage.jsx";
import UpdateMemberPage from "../pages/Members/UpdateMemberPage.jsx";
import ViewMemberPage from "../pages/Members/ViewMemberPage.jsx";
import MotelPage from "../pages/Motel/MotelPage.jsx";
import ExportPayPage from "../pages/Paymentslips/ExportPayPage.jsx";
import PaymentsPage from "../pages/Paymentslips/PaymentsPage.jsx";
import PrintPayPage from "../pages/Paymentslips/PrinPayPage.jsx";
import CreatePostPage from "../pages/Post/CreatePostPage.js";
import ViewPostPage from "../pages/Post/ViewPostPage.jsx";

import RoomPage from "../pages/Room/RoomPage.jsx";
import ViewRoomPage from "../pages/Room/ViewRoomPage.jsx";
import SearchPage from "../pages/Search/SearchPage.jsx";
import ServicePage from "../pages/Service/ServicePage.jsx";

// Pages

// Public routes
const SignInWithAcc = [
  { path: config.routeSocial.home, component: HomePage },
  { path: config.routeSocial.Motel, component: MotelPage },

  { path: config.routesManagingMotel.ViewBIll, component: ViewBillPage },
];

//Login with Create Acc register
const SignedIn = [
  { path: config.routeSocial.home, component: MainPage },
  { path: config.routeSocial.Motel, component: MotelPage },
  { path: config.routeSocial.CreatePost, component: CreatePostPage },
  { path: config.routeSocial.ViewPost, component: ViewPostPage },
  { path: config.routeSocial.Info, component: InfoPage },
  { path: config.routeSocial.UpdateUser, component: UpdateUserPage },
  { path: config.routeSocial.Pass, component: ChangPassPage },
  { path: config.routeSocial.Dash, component: DashContentPage },
  { path: config.routeSocial.Search, component: SearchPage },

  { path: config.routeSocial.ViewBIll, component: ViewBillPage },
];
const NotLoggedIn = [
  { path: config.routes.home, component: LoginPage },
  { path: config.routes.Login, component: LoginPage },
  { path: config.routes.Register, component: SignUpPage },
  { path: config.routes.ViewBIll, component: ViewBillPage },

  // { path: config.routes.home, component: HomePage },
  // { path: config.routes.home, component: HomePage },
];
const ManagingMotel = [
  { path: config.routesManagingMotel.home, component: HomePage },
  { path: config.routesManagingMotel.Dashboard, component: DashboardPage },
  { path: config.routesManagingMotel.Room, component: RoomPage },
  { path: config.routesManagingMotel.ViewRoom, component: ViewRoomPage },
  { path: config.routesManagingMotel.Member, component: MemberPage },
  { path: config.routesManagingMotel.AddMember, component: AddMemberPage },
  { path: config.routesManagingMotel.ViewMember, component: ViewMemberPage },
  {
    path: config.routesManagingMotel.UpdateMember,
    component: UpdateMemberPage,
  },
  { path: config.routesManagingMotel.Billing, component: BillPage },
  { path: config.routesManagingMotel.UpdateBill, component: UpdateBillPage },
  { path: config.routesManagingMotel.Payment, component: PaymentsPage },
  { path: config.routesManagingMotel.PrintPayment, component: PrintPayPage },
  { path: config.routesManagingMotel.ExportPayment, component: ExportPayPage },
  { path: config.routesManagingMotel.Service, component: ServicePage },

  { path: config.routesManagingMotel.ViewBIll, component: ViewBillPage },
];
export { SignInWithAcc, SignedIn, NotLoggedIn, ManagingMotel };
