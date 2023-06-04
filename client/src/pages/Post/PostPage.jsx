import React from "react";
import BoxPost from "../../components/Post/BoxPost.jsx";

function PostPage() {
  const arr = [1, 1, 1, 1, 1, 1];
  return (
    <div>
      {/* xl:grid-cols-3 */}
      <ul class="grid grid-cols-1  gap-y-10 gap-x-6 items-start justify-start text-left p-8">
        {arr.map((i) => {
          return <BoxPost />;
        })}
      </ul>
    </div>
  );
}

export default PostPage;
