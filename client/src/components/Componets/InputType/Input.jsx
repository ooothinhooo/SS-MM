import React from "react";

function Input({
  name,
  type,
  placeholder,
  labelText,
  value,
  handleInputState,
  ...rest
}) {
  return (
    <div>
      <div>
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-first-name"
        >
          {labelText}
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="grid-first-name"
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={(e) => handleInputState(name, e.target.value)}
          {...rest}
        />
        {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
      </div>
    </div>
  );
}

export default Input;
