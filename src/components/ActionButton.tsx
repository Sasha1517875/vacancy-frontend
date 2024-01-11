import React from "react";

type ActionButtonProps = {
  label: string;
  onClick: () => void;
};

const ActionButton = ({ label, onClick }: ActionButtonProps) => {
  return (
    <button
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ActionButton;
