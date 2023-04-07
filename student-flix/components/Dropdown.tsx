import React from "react";

interface DropdownProps {
    id: string;
    onChange: any;
    value: string;
    label: string;
    type?: string;
}

// generic allows for use of specific object type w/i fn
const Input: React.FC<DropdownProps> = ({id, onChange, value, label, type}) => {
  return (
    <div className="relative">
      <input
        id = {id}
        onChange = {onChange}
        value = {value}
        type = {type}

        className="
                block
                rounded-md
                px-6
                pt-6
                pb-1
                w-full
                text-md
                text-white
                bg-neutral-700
                appearance-none
                focus:outline-none
                focus:ring-0
                peer
                "
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="
                absolute
                text-md
                text-zinc-400
                duration-150
                transform
                -translate-y-3
                scale-75
                top-4
                z-10
                origin-[0]
                left-6
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-3
                "
      >
        {label}
      </label>
    </div>
  );
};

// peer allows you to style based on a sibling elemet
export default Input;
