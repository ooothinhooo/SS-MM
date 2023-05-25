import Login from "../components/Account/Login.jsx";
import UpdateMember from "../components/Member/UpdateMember.jsx";
import config from "../config";
import LoginPage from "../pages/Account/LoginPage.jsx";
import SignUpPage from "../pages/Account/SignUpPage.jsx";
import BillPage from "../pages/Billing/BillPage.jsx";
import UpdateBillPage from "../pages/Billing/UpdateBillPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import MemberPage from "../pages/Members/MemberPage.jsx";
import UpdateMemberPage from "../pages/Members/UpdateMemberPage.jsx";
import MotelPage from "../pages/Motel/MotelPage.jsx";
import PaymentsPage from "../pages/Paymentslips/PaymentsPage.jsx";
import PrintPayPage from "../pages/Paymentslips/PrinPayPage.jsx";

import RoomPage from "../pages/Room/RoomPage.jsx";
import ViewRoomPage from "../pages/Room/ViewRoomPage.jsx";
import ServicePage from "../pages/Service/ServicePage.jsx";

// Pages

// Public routes
const SignInWithAcc = [{ path: config.routes.home, component: HomePage }];

//Login with Create Acc register
const SignedIn = [
  { path: config.routes.home, component: HomePage },
  { path: config.routes.Motel, component: MotelPage },
  { path: config.routes.Room, component: RoomPage },
  { path: config.routes.ViewRoom, component: ViewRoomPage },
  { path: config.routes.Member, component: MemberPage },
  { path: config.routes.UpdateMember, component: UpdateMemberPage },
  { path: config.routes.Billing, component: BillPage },
  { path: config.routes.UpdateBill, component: UpdateBillPage },
  { path: config.routes.Payment, component: PaymentsPage },
  { path: config.routes.PrintPayment, component: PrintPayPage },
  { path: config.routes.Service, component: ServicePage },
];
const NotLoggedIn = [
  // { path: config.routes.home, component: HomePage },
  { path: config.routes.Login, component: LoginPage },
  { path: config.routes.Register, component: SignUpPage },
  // { path: config.routes.home, component: HomePage },
  // { path: config.routes.home, component: HomePage },
];
const ManagingMotel = [{ path: config.routes.home, component: HomePage }];
export { SignInWithAcc, SignedIn, NotLoggedIn, ManagingMotel };
