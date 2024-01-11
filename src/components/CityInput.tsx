import React, { useState } from "react";

type InputCityProps = {
  city: string;
  onCityChange: (city: string) => void;
};

const CityInput = ({ city, onCityChange }: InputCityProps) => {
  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onCityChange(value);
  };

  return (
    <div className="">
      <input
        type="text"
        value={city}
        placeholder="Город"
        onChange={handleCityChange}
        className="h-full focus:shadow-outline min-w-[40px] appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none text-lg"
      />
    </div>
  );
};

export default CityInput;
