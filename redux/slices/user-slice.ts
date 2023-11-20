import { get, post } from "@/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "@/types/user";
import { Product } from "@/types/product";

export const logIn = createAsyncThunk(
  "userSlice/login",
  async (credentials: { email: string; password: string }) => {
    const response = await post("http://localhost:8000/auth/login", {
      email: credentials.email,
      password: credentials.password,
    });
    return response.data.data;
  }
);
export const signUp = createAsyncThunk(
  "userSlice/signUp",
  async (credentials: { email: string; password: string; name: string }) => {
    const response = await post("http://localhost:8000/auth/signup", {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
    });
    return response.data.data;
  }
);

export const fetchCart = createAsyncThunk(
  "userSlice/fetchCart",
  async (id: string) => {
    const response = get(`http://localhost:8000/products/cart/${id}`);
    const body = (await response).data;
    return body.products as Product[];
  }
);

export const addCart = createAsyncThunk(
  "userSlice/addCart",
  async (data: { userId: string; productId: string }) => {
    const response = post(`http://localhost:8000/products/addCart`, data);
    const body = (await response).data;
    return body;
  }
);
export const removeCart = createAsyncThunk(
  "userSlice/removeCart",
  async (data: { userId: string; productId: string }) => {
    const response = post(`http://localhost:8000/products/removeCart`, data);
    const body = (await response).data;
    return body;
  }
);

interface UserState {
  loading: boolean;
  user: User;
  error: string;
  logged: boolean;
  cart: Product[];
}

const initialState: UserState = {
  logged: false,
  user: {} as User,
  error: "",
  loading: false,
  cart: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    validateSession: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.logged = true;
        state.user = action.payload;
      })
      .addCase(logIn.rejected, (state) => {
        state.loading = false;
        state.error = "Error logIn";
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.logged = true;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = "Error signUp";
      })
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.cart = [];
        state.error = "";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.error = "";
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = `Error fetching cart: ${action.error.message}`;
      })
      .addCase(addCart.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(addCart.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(addCart.rejected, (state) => {
        state.loading = false;
        state.error = `Error adding Cart`;
      })
      .addCase(removeCart.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(removeCart.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(removeCart.rejected, (state) => {
        state.loading = false;
        state.error = `Error remove Cart`;
      });
  },
});

export const getUser = (state: RootState) => state.userSlice;
export const { validateSession } = userSlice.actions;

export default userSlice.reducer;
