import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import propertyService from "../../../services/propertyService";

const initialState = {
  buyHomes :[]
};

const getBuyHomes = createAsyncThunk(
  "property/getBuyHomes",
  async () => {
    try {
      const data = await propertyService.getBuyHomes();
      return data.payload;
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

export const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBuyHomes.fulfilled, (state, action) => {
      state.buyHomes = action.payload;
    });
    builder.addCase(getBuyHomes.rejected, (state, action) => {
      state.buyHomes = [];
    });
  },
});

export { getBuyHomes };

export default propertySlice.reducer;
