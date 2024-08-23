import { createAsyncThunk } from "@reduxjs/toolkit"

import { getIngredients } from "../../utils/api"

export const loadIngredients = createAsyncThunk("burger-ingredients/loadIngredients", getIngredients)
