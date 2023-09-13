import React from 'react'
import { Product } from '../models/models'
 
interface ICard {
    item: Product;
    text: string;
    handleFunc: (item:Product) => void
}

const Card:React.FC<ICard> = ({item,handleFunc,text}) => {
//! ürünün ratingine göre renklendirme
const getVoteClass = (rating: number) => {
  if (rating >= 4.8) {
    return "bg-green-500"; // Green background
  } else if (rating >= 4.5) {
    return "bg-orange-500"; // Yellow background
  } else {
    return "bg-red-500"; // Red background
  }
};

  return (
    <div className="w-10/12 sm:w-6/12 md:w-4/12 lg:w-3/12 flex flex-col justify-between bg-white rounded-lg">
      <div className=" rounded-md overflow-hidden shadow-lg hover:scale-105 transition duration-500 cursor-pointer">
      <div className='flex justify-center'>
        <img className=' min-h-[150px] max-h-[150px] ' src={item.images[0]} alt={item.title} />
      </div>
      <div className="py-4 px-4 bg-white">
        <h3 className="text-lg font-semibold text-gray-600 line-clamp-1 hover:line-clamp-none transition duration-600">{item.title}</h3>
        <h5 className="text-base font-medium text-gray-600 line-clamp-2 hover:line-clamp-none hover:transition hover:duration-800">{item.description}</h5>
        <div className='mt-6 flex justify-between items-center'>
        <p className="text-lg text-red-500">$ {item.price}</p>
        <div className={`${getVoteClass(item.rating)} tag`}>
            {item.rating.toFixed(1)}
        </div>
        <button
          onClick={() => handleFunc(item)}
          className="text-white rounded-full p-2 text-base  bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
          >
          {text}
        </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Card