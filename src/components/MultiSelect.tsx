import React from "react";
import SelectButton from "./SelectButton";

type MultiSelectProps = {
  options: string[];
  label: string;
  selected: string[];
  onChange: (value: string[]) => void;
};

// Компонент для множественного выбора\
const MultiSelect = ({
  options,
  label,
  selected,
  onChange,
}: MultiSelectProps) => {
  const handleSelect = (state: boolean, value: string) => {
    const newSelected = state
      ? [...selected, value]
      : selected.filter((item) => item !== value);
    onChange(newSelected);
  };

  return (
    <div className="mb-4 w-full">
      <label className="mb-2 text-xl font-bold text-gray-700">{label}</label>
      <div className="flex space-x-2">
        {options.map((option) => (
          <SelectButton
            state = {selected.includes(option)}
            onToggled={handleSelect}
            text={option}
            key={option}
          />
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;
