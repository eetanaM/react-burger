import { combineSlices } from "@reduxjs/toolkit";

import { ingredientsSlice } from "./burger-ingredients/slice";
import { constructorSlice } from "./burger-constructor/slice";
import { orderDetailsSlice } from "./order-details/slice";
import { profileSlice } from "./profile/slice";
import { ordersSlice } from "./feed/slice";
import { profileOrdersSlice } from "./profile-feed/slice";


export const rootReducer = combineSlices(ingredientsSlice, constructorSlice, orderDetailsSlice, profileSlice, ordersSlice, profileOrdersSlice);
