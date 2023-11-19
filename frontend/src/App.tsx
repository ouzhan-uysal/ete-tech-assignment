import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { useAuth } from "./contexts/AuthContext";

const HOME = lazy(() => import('./pages'));
const WELCOME = lazy(() => import('./pages/welcome'));
const PRODUCTS = lazy(() => import('./pages/products'))
const COMPANIES = lazy(() => import('./pages/companies'))

function App() {
  const { user } = useAuth();
  return user ? (
    <Routes>
      <Route path="/companies" element={<COMPANIES />} />
      <Route path="/products" element={<PRODUCTS />} />
      <Route index path="/dashboard" element={<HOME />} />
      <Route path="*" element={<HOME />} />
    </Routes>
  )
    : (
      <Routes>
        <Route path="/dashboard" element={<HOME />} />
        <Route path="/companies" element={<COMPANIES />} />
        <Route path="/products" element={<PRODUCTS />} />
        <Route index element={<WELCOME />} />
        <Route path="*" element={<WELCOME />} />
      </Routes>
    )
    ;
}

export default App;
