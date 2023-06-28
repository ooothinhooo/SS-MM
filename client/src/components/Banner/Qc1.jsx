import React from "react";

function Qc1({ img }) {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[98%]  border rounded-md ">
        <img className="w-full " src={img} alt="" />
      </div>
    </div>
  );
}

export default Qc1;
