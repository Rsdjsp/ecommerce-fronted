import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { get, post } from "@/axios";
import { Product } from "@/types/product";

export const fetchProducts = createAsyncThunk(
  "productsSlice/fetchProducts",
  async () => {
    const response = get("http://localhost:8000/products");
    const body = (await response).data;
    return body as Product[];
  }
);

export const fetchProduct = createAsyncThunk(
  "productsSlice/fetchProduct",
  async (id: string) => {
    const response = get(`http://localhost:8000/products/details/${id}`);
    const body = (await response).data;
    return body as Product;
  }
);

interface ProductState {
  loading: boolean;
  products: Product[];
  selectedProduct: Product;
  error: string;
  filter: string;
}

const initialState: ProductState = {
  loading: false,
  products: [],
  selectedProduct: {} as Product,
  error: "",
  filter: "",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterData: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.products = [];
        state.error = "";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = "";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = `Error fetching products: ${action.error.message}`;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.selectedProduct = {} as Product;
        state.error = "";
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
        state.error = "";
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = `Error fetching product: ${action.error.message}`;
      });
  },
});

export const selectProducts = (state: RootState) => state.productSlice;
export const { filterData } = productsSlice.actions;

export default productsSlice.reducer;
