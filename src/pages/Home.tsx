import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import {addCarts,fetchFail,fetchStart, getSuccessProduct,} from "../features/productsSlice";
import { EventFunc, Product, Products } from "../models/models";
import axios from "axios";

import { toastSuccessNotify, toastWarnNotify } from "../helper/ToastNotify";
import Card from "../components/Card";

import SearchComp from "../components/FilterComponents/SearchComp";
import BrandsFilterComponents from "../components/FilterComponents/BrandsFilterComponents";
import CategoryFilterComponents from "../components/FilterComponents/CategoryFilterComponents";
import PriceFilterComponent from "../components/FilterComponents/PriceFilterComponent";
import PriceSort from "../components/FilterComponents/PriceSort.jsx";
import RatingSort from "../components/FilterComponents/RatingSort";

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();
  const { loading, error, productsList, carts } = useAppSelector(
    (state) => state.products
  );

  //! filtrelenmiş ÜRÜNLERİNİ saklamak için state atıyoruz
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  //! filtreleme SEÇENEKLERİNİ saklamak için state kullanıyoruz
  const [filters, setFilters] = useState({
    selectedBrand: "",
    selectedCategory: "",
    minPrice: 0, 
    maxPrice: 1749, 
    selectedRating: "",
    selectedPriceSort: "",
  });

  const getData = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.get<Products>(
        `https://dummyjson.com/products/search?q=${search}`
      );
      console.log(data.products);
      dispatch(getSuccessProduct(data.products));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  //! Sayfa yüklendiğinde ve arama kriterleri değiştiğinde verileri al
  useEffect(() => {
    getData();
  }, [search]);

  const handleAdd = (productsList: Product) => {
    if(carts.filter(item => item.id === productsList.id).length ===0){
      dispatch(addCarts(productsList))
      toastSuccessNotify("Product added Cart !")
    }else {
      toastWarnNotify("Already added to Cart!")
    }
  }

  //! tüm filtrelemeleri temizlemek için
  const clearFilter = () => {
    setFilters({
      selectedBrand: "",
      selectedCategory: "",
      minPrice: 0,
      maxPrice: 1749,
      selectedRating: "",
      selectedPriceSort: "",
    });
  };
  
  //! arama kutusundaki değeri güncelle
  const handleSearchChange: EventFunc = (e) => {
    setSearch(e.target.value);
  };

  //! Marka filtresini güncelle
  const handleBrandChange = (selectedBrand: string) => {
    setFilters({ ...filters, selectedBrand });
  };

  //! kategori filtresini güncelle
  const handleCategoryChange = (selectedCategory: string) => {
    setFilters({ ...filters, selectedCategory });
  };

  //! fiyat filtresini güncelle
  const handlePriceChange = (newValue: number[]) => {
    setFilters({ ...filters, minPrice: newValue[0], maxPrice: newValue[1] });
  };

  //! Rating-sort filtresini güncelle
  const handleSortChange = (newSort: string) => {
    if (newSort === "highToLow") {
      setFilters({ ...filters, selectedRating: "highToLow" });
    } else if (newSort === "lowToHigh") {
      setFilters({ ...filters, selectedRating: "lowToHigh" });
    }
  }
  //! Price-sort filtresini güncelle
  const handlePriceSortChange = (newSort: string) => {
    if (newSort === "highToLow") {
      setFilters({ ...filters, selectedPriceSort: "highToLow" });
    } else if (newSort === "lowToHigh") {
      setFilters({ ...filters, selectedPriceSort: "lowToHigh" });
    }
   }

  //! TÜM FİLTRELEMEYİ UYGULA
  useEffect(() => {
    let filtered = [...productsList];

    if (filters.selectedBrand) {
      filtered = filtered.filter(
        (product) => product.brand === filters.selectedBrand
      );
    }

    if (filters.selectedRating) {
      if (filters.selectedRating === "highToLow") {
        filtered.sort((a, b) => b.rating - a.rating);
      } else if (filters.selectedRating === "lowToHigh") {
        filtered.sort((a, b) => a.rating - b.rating);
      }
    }

    if (filters.selectedPriceSort) {
      if (filters.selectedPriceSort === "highToLow") {
        filtered.sort((a, b) => b.price - a.price);
      } else if (filters.selectedPriceSort === "lowToHigh") {
        filtered.sort((a, b) => a.price - b.price);
      }
    }

    if (filters.selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === filters.selectedCategory
      );
    }

    if (filters.minPrice > 0 || filters.maxPrice > 0) {
      filtered = filtered.filter(
        (product) =>
          product.price >= filters.minPrice && product.price <= filters.maxPrice
      );
    }

    setFilteredProducts(filtered);
  }, [filters, productsList]);

  //! PROPSLARDAN ALDIĞIMIZ BİLGİLERLE FİLTRELENEN DATAYI CARD A ATIYORUZ
  return (
    <div>
      <SearchComp handleChange={handleSearchChange} />
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <BrandsFilterComponents onBrandChange={handleBrandChange} />
        <CategoryFilterComponents onCategoryChange={handleCategoryChange} />
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <RatingSort onSortChange={handleSortChange} />
        <PriceSort handlePriceSortChange={handlePriceSortChange} />
      </div>
      <div className="flex justify-center mb-4">
        <PriceFilterComponent handlePriceChange={handlePriceChange} selectedPrice={[filters.minPrice, filters.maxPrice]}/>
      </div>
      <div className="flex justify-center mb-8"><button onClick={clearFilter} type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Filtre Sıfırla</button></div>
      
      {loading ? (
        <div className="mt-52">
          <p className="text-center text-red-600">Products loading...</p>
        </div>
      ) : error ? (
        <div className="mt-52">
          <p className="text-center text-red-600">Something went wrong...</p>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-wrap gap-5">
          {filteredProducts.map((item: Product) => (
            <Card key={item.id} item={item} text="Sepete Ekle" handleFunc={handleAdd}/>
          ))}
        </div>
      )}
    </div>
  );
};
export default Home;
