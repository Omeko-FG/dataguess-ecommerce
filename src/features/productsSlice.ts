import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../models/models";




//! slice state i için bir tür tanımlıyoruz
interface ProductsState {
  loading: boolean;
  error: boolean;
  carts: Product[];
  productsList: Product[];
}

//! burda  başlangıç state i tanımlıyoruz
const initialState: ProductsState = {
  loading:false,
  error:false,
  carts: [],
  productsList:[],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = false;
    },
    getSuccessProduct(state, action: PayloadAction<Product[]>) {
      state.loading = false;
      state.error = false;
      state.productsList = action.payload;
    },
    addCarts(state, action: PayloadAction<Product>) {
      state.carts = [...state.carts, action.payload];
    },
    removeCarts(state, action: PayloadAction<Product[]>) {
      state.carts = action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    fetchFail(state) {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchFail,fetchStart,getSuccessProduct,addCarts,removeCarts } = productsSlice.actions;


export const productsReducer =  productsSlice.reducer;
