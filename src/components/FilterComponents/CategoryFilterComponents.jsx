import { useSelector } from "react-redux";
import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const CategoryFilterComponents = ({ onCategoryChange }) => { // onCategoryChange prop'unu ekledik

  const [selectedCategory, setSelectedCategory] = useState("");
  const productList = useSelector((state) => state.products.productsList);
  const uniqueCategoryies = [...new Set(productList.map(item => item.category))];
  const [selected, setSelected] = useState(uniqueCategoryies[0]);
  
  useEffect(() => {
    onCategoryChange(selected);
  }, [selected, onCategoryChange]);
  
  const handleCategoryieselect = (category) => {
    if (category !== selectedCategory) {
      setSelectedCategory(category);
    }
  };

  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);
    const filtered = productList.filter(item => item.category === category);
    // Filtrelenmiş ürünleri almak yerine, seçilen markayı sadece seçili hale getiriyoruz.
    setSelected(category);
    handleCategoryieselect(category); // Filtreleme işlemi tamamlandığında seçilen markayı iletmek için
  };

  return (
    <div className="flex justify-center">
      <Listbox value={selected} onChange={filterProductsByCategory}>
        <div className=" sm:mt-5 w-72">
          <Listbox.Button className="h-10 w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className={`block truncate ${selected ? 'font-medium':'font-normal text-gray-400'}`}>{selected || "Select A Category ..."}</span>
            {/* <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span> */}
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-30">
              {uniqueCategoryies.map((category, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={category}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {category}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CategoryFilterComponents;
