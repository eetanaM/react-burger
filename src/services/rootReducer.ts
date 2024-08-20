import { combineSlices } from "@reduxjs/toolkit";

import { ingredientsSlice } from "./burger-ingredients/reducer";
import { constructorSlice } from "./burger-constructor/reducer";
import { orderDetailsSlice } from "./order-details/reducer";
import { profileSlice } from "./profile/reducer";


export const rootReducer = combineSlices(ingredientsSlice, constructorSlice, orderDetailsSlice, profileSlice);
