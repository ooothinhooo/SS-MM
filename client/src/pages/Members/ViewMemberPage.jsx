import React from "react";
import InfoMember from "../../components/Member/InfoMember.jsx";
import { useParams } from "react-router-dom";
function ViewMemberPage({ user }) {
  let { id } = useParams();
  return (
    <div>
      <InfoMember user={user} memberId={id} />
    </div>
  );
}

export default ViewMemberPage;
