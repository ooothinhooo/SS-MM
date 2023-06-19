export const routes = {
  home: "/*",

  Login: "/login",
  Register: "/register",
};

export const routesManagingMotel = {
  Dashboard: "/dashboard*",
  Mainpage: "/main",

  Room: "/room",
  Member: "/member",
  UpdateMember: "/member/:id",
  ViewMember: "/member/view/:id",
  ViewRoom: "/room/view/:id",
  Service: "/service",
  ElectricityStats: "/electricity",
  WaterStats: "/water",
  Invoices: "/invoices",
  Billing: "/bill",
  UpdateBill: "/bill/:id/:roomCode",
  Payment: "/payment",
  PrintPayment: "/payment/print",
  ExportPayment: "/payment/export",
  Reports: "/reports",
};

export const routeSocial = {
  home: "/*",
  Motel: "/motel",
  Post: "/post",
  CreatePost: "/post/create",
  ViewPost: "/post/view/:id",
  UpdatePost: "/post/update/:id",
  Info: "/u/:id",
  UpdateUser: "/u/edit/:id",
  Pass: "/u/pass/:id",
  Dash: "/u/dash/:id",
  Search: "/search/:q",
};
