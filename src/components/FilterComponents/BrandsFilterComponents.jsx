import { useSelector } from "react-redux";
import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const BrandsFilterComponents = ({ onBrandChange }) => { // onBrandChange prop'unu ekledik

  const [selectedBrand, setSelectedBrand] = useState("");
  const productList = useSelector((state) => state.products.productsList);
  const uniqueBrands = [...new Set(productList.map(item => item.brand))];
  const [selected, setSelected] = useState(uniqueBrands[0]);
  
  useEffect(() => {
    onBrandChange(selected);
  }, [selected, onBrandChange]);
  
  const handleBrandSelect = (brand) => {
    if (brand !== selectedBrand) {
      setSelectedBrand(brand);
    }
  };

  const filterProductsByBrand = (brand) => {
    setSelectedBrand(brand);
    const filtered = productList.filter(item => item.brand === brand);
    // Filtrelenmiş ürünleri almak yerine, seçilen markayı sadece seçili hale getiriyoruz.
    setSelected(brand);
    handleBrandSelect(brand); // Filtreleme işlemi tamamlandığında seçilen markayı iletmek için
  };

  return (
    <div className="flex justify-center">
      <Listbox value={selected} onChange={filterProductsByBrand}>
        <div className="my-5 w-72">
          <Listbox.Button className="h-10 w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className={`block truncate ${selected ? 'font-medium':'font-normal text-gray-400'}`}>{selected || "Select A Brand ..."}</span>
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
            <Listbox.Options className="absolute mt-1 max-h-60  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-40">
              {uniqueBrands.map((brand, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={brand}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {brand}
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

export default BrandsFilterComponents;
