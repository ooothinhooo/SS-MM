import React from "react";

function Button({ color, svg, title, type }) {
  //Outline
  //rounded

  return (
    <div>
      <button class="bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
        {svg}
        <span>{title}</span>
      </button>
    </div>
  );
}

export default Button;
