import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProducts } from "../../interfaces/product.interface";

const initialState: IProducts = {
  name: "",
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<IProducts>) => { },
    remove: (state) => { },
  }
});

export const { add, remove } = productSlice.actions;

export default productSlice.reducer;
