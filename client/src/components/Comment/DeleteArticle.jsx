import React, { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { MdOutlineDeleteForever } from "react-icons/md";
import { storage, db, auth } from "../../Firebase/firebase.config.js";
export default function DeleteArticle({ id, colDB, description }) {
  const handleDelete = async () => {
    try {
      // Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      const x = await deleteDoc(doc(db, colDB, id));
      console.log(x);
      // const storageRef = ref(storage, id);
      // await deleteObject(storageRef);
      toast("1 Bình luận đã được xoá", { type: "success" });
    } catch (error) {
      // toast("Error deleting article", { type: "error" });
      console.log(error);
    }
  };

  function sw() {
    Swal.fire({
      title: "Bạn muốn xoá bình luận này",
      text: description.substring(0, 50) + "...",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Huỷ",
      confirmButtonText: "Chấp nhận xoá",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
      } else {
      }
    });
  }
  return (
    <div
      onClick={sw}
      className="cursor-pointer z-10 mt-1 flex p-1 text-gray-500 border-2 rounded-full border-black text-xl justify-end"
    >
      {/* <TiDelete className="text-black text-2xl" />
      Xoá */}

      <span className="md:text-2xl   text-lg text-pink-400 cursor-pointer">
        <MdOutlineDeleteForever />
      </span>
    </div>
  );
}
