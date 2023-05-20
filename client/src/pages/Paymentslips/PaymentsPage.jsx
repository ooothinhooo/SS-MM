import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";
import React, { useEffect, useState } from "react";
import { LIST_ROOM } from "../../API/Motels/ListRoom.api.js";
import { NavLink } from "react-router-dom";
import {
  AiFillDelete,
  AiOutlineEdit,
  AiOutlineFileAdd,
  AiOutlineFolderView,
  AiOutlineFundView,
} from "react-icons/ai";
import PaymemtsForm from "../../components/Paymentslips/PaymemtsForm.jsx";
import PrintPay from "../../components/Paymentslips/PrintPay.jsx";

export default function PaymentsPage({ user }) {
  return (
    <div className="mt-20 mr-20 w-full ">
      <PaymemtsForm user={user} />
      {/* <PrintPay /> */}
    </div>
  );
}
