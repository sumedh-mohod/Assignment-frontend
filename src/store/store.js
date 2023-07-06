import { configureStore } from "@reduxjs/toolkit";
import amenities from "./reducers/amenities";

export const store = configureStore({
  reducer: { amenities: amenities },
});
