import React from "react";
import { useParams } from "react-router-dom";

function ViewBillPage() {
  let { id, month } = useParams();

  return <div>ViewBillPage</div>;
}

export default ViewBillPage;
