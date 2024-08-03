import { combineSlices } from "@reduxjs/toolkit";

import { ingredientsSlice } from "./burger-ingredients/reducer";
import { constructorSlice } from "./burger-constructor/reducer";


export const rootReducer = combineSlices(ingredientsSlice, constructorSlice);
