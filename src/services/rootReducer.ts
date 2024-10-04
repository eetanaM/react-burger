import { combineSlices } from "@reduxjs/toolkit";

import { ingredientsSlice } from "./burger-ingredients/slice";
import { constructorSlice } from "./burger-constructor/slice";
import { orderDetailsSlice } from "./order-details/slice";
import { profileSlice } from "./profile/slice";
import { feedSlice } from "./feed/slice";
import { profileFeedSlice } from "./profile-feed/slice";


export const rootReducer = combineSlices(ingredientsSlice, constructorSlice, orderDetailsSlice, profileSlice, feedSlice, profileFeedSlice);
