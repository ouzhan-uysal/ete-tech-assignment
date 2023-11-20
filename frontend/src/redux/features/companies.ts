import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICompany } from "../../types/company.interface";

const initialState: { companies: Array<ICompany> } = {
  companies: []
}

const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<Array<ICompany>>) => {
      state.companies = action.payload.sort((a, b) => b.createdAt - a.createdAt);
    },
    addCompany: (state, action: PayloadAction<ICompany>) => {
      state.companies.push(action.payload);
    },
    deleteCompany: (state, action: PayloadAction<{ companyId: string }>) => {
      state.companies = state.companies.filter(company => company._id.toLowerCase() !== action.payload.companyId.toLowerCase())
    },
  }
});

export const { setState, addCompany, deleteCompany } = companySlice.actions;

export default companySlice.reducer;
