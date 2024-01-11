import React, { useState } from "react";

type SalaryRangeInputProps = {
  min: number | "";
  max: number | "";
  onMinChange: (min: number | "") => void;
  onMaxChange: (max: number | "") => void;
};

const SalaryRangeInput = ({ min, max, onMinChange, onMaxChange }: SalaryRangeInputProps) => {
  const handleMinInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value == "" ? "" :parseInt(event.target.value) ;
    onMinChange(value);
  };

  const handleMaxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value == "" ? "" :parseInt(event.target.value);
    onMaxChange(value);
  };

  return (
    <div className="flex gap-2">
      <div>
        <input
          type="number"
          name="min"
          value={min}
          min={1}
          placeholder="Мин. з/п"
          onChange={handleMinInputChange}
          className="h-full focus:shadow-outline text-lg w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        />
      </div>
      <div>
        <input
          type="number"
          name="max"
          value={max}
          min={1}
          placeholder="Макс. з/п"
          onChange={handleMaxInputChange}
          className="h-full focus:shadow-outline text-lg w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        />
      </div>
    </div>
  );
};
export default SalaryRangeInput;
