import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { IProduct } from "../../types";
import axios from "axios";
const initialState: IProduct = {
    id:'',
    name:'',
    price: null,
    description:'',
    img:'',
    typeId:'',
    categoryId:'',
    IsPopular:'',
}
  