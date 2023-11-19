import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const WELCOME = lazy(() => import('./pages/welcome'));
const HOME = lazy(() => import('./pages'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <WELCOME />
  },
  {
    path: '/home',
    element: <HOME />
  },
]);
