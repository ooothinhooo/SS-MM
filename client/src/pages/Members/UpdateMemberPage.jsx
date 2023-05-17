import React from "react";
import UpdateMember from "../../components/Member/UpdateMember.jsx";
import { useParams } from "react-router-dom";

function UpdateMemberPage({ user }) {
  let { id } = useParams();
  console.log("memberid", id);
  return (
    <div>
      <div className="mt-20 mr-20 w-full">
        <>
          <div className="w-full flex justify-center items-center my-4">
            <div className="w-[90%] shadow-lg shadow-indigo-500/40 bg-indigo-100 rounded-lg px-4 py-2 ">
              CẬP NHẬT THÀNH VIÊN
            </div>
          </div>
          <UpdateMember user={user} memberId={id} />
        </>
      </div>
    </div>
  );
}

export default UpdateMemberPage;
