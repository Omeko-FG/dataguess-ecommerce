import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { useSelector } from "react-redux";

const PriceFilterComponent = ({ handlePriceChange, selectedPrice }) => {
  const productList = useSelector((state) => state.products.productsList);

  const prices = productList.map((item) => item.price);

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // Slider değerlerini state içinde tut
  const [sliderValue, setSliderValue] = React.useState(selectedPrice);

  // Slider değeri değiştikçe state'i güncelle
  const handleChanges = (event, newValue) => {
    setSliderValue(newValue);
  };

  // Slider değeri değiştiğinde ana bileşene iletişim kur
  useEffect(() => {
    handlePriceChange(sliderValue);
  }, [sliderValue, handlePriceChange]);

  return (
    <div className="m-5 w-72 px-10 py-3 bg-white bg-opacity-40 rounded-full">
      <div>
        <h3 className="font-bold text-lg  text-gray-400">Select A Price Range</h3>
        <Slider
          min={minPrice}
          max={maxPrice}
          value={sliderValue}
          onChange={handleChanges}
          valueLabelDisplay="auto"
        />
        <p className="text-center text-lg text-green-600 font-bold">
          {sliderValue[0]}$ - {sliderValue[1]}$
        </p>
      </div>
    </div>
  );
};

export default PriceFilterComponent;
