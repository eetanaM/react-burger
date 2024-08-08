import { combineSlices } from "@reduxjs/toolkit";

import { ingredientsSlice } from "./burger-ingredients/reducer";
import { constructorSlice } from "./burger-constructor/reducer";
import { ingredientDetailsSlice } from "./ingredient-details/reducer";
import { orderDetailsSlice } from "./order-details/reducer";


export const rootReducer = combineSlices(ingredientsSlice, constructorSlice, ingredientDetailsSlice, orderDetailsSlice);
