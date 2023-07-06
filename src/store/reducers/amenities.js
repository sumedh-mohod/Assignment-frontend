import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { axios } from "react-axios";
import axios, { Axios } from "axios";
import { actionTypes } from "../actionTypes";

const url = "http://127.0.0.1:8000/api/amenities";
export const postAmenity = createAsyncThunk(
  "ADD_AMENITY",
  async (params, { rejectWithValues }) => {
    try {
      const response = await axios.post(url, params);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAmenities = createAsyncThunk(
  "GET_AMENITY",
  async (_, { rejectWithValues }) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  amenities: "",
  isLoadingRequest: false,
  error: false,
};

export const amenities = createSlice({
  name: "amenities",
  initialState,
  extraReducers: (builder) => {
    // post amenities
    builder.addCase(postAmenity.pending, (state, { type, payload }) => {
      state.isLoadingRequest = true;
    });
    builder.addCase(postAmenity.fulfilled, (state, { type, payload }) => {
      console.log("response in create slice", payload);
      state.amenities = payload;
      state.isLoadingRequest = false;
      state.error = false;
    });
    builder.addCase(postAmenity.rejected, (state, { type, payload }) => {
      state.isLoadingRequest = false;
      // state.error = true;
    });

    // get Amenities
    builder.addCase(getAmenities.pending, (state, { type, payload }) => {
      state.isLoadingRequest = true;
    });
    builder.addCase(getAmenities.fulfilled, (state, { type, payload }) => {
      state.amenities = payload;
      state.isLoadingRequest = false;
    });
    builder.addCase(getAmenities.rejected, (state, { type, payload }) => {
      state.isLoadingRequest = false;
    });
  },
});
export default amenities.reducer;
