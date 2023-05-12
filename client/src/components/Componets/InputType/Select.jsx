import React from "react";

function Select() {
  return (
    <div>
      <select data-te-select-init>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
        <option value="4">Four</option>
        <option value="5">Five</option>
      </select>
      <label data-te-select-label-ref>Example label</label>
    </div>
  );
}

export default Select;
