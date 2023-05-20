const routes = {
  home: "/*",
  Mainpage: "/main",
  Motel: "/motel",
  Room: "/room",
  Member: "/member",
  UpdateMember: "/member/:id",
  ViewRoom: "/room/view/:id",
  Service: "/service",
  ElectricityStats: "/electricity",
  WaterStats: "/water",
  Invoices: "/invoices",
  Billing: "/bill",
  UpdateBill: "/bill/:id/:roomCode",
  Payment: "/payment",
  PrintPayment: "/payment/print",
  Reports: "/reports",
  Login: "/login",
  Register: "/register",
};

export default routes;
