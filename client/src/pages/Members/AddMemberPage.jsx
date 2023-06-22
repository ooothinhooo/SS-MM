import React from "react";
import AddMember from "../../components/Member/AddMember.jsx";

function AddMemberPage({ user }) {
  return (
    <div>
      <AddMember user={user} />
    </div>
  );
}

export default AddMemberPage;
