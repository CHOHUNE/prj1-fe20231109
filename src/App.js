import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { BoardWrite } from "./page/BoardWrite";
import { HomeLayout } from "./layout/HomeLayout";
import { BoardList } from "./page/BoardList";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path={"/"} element={<HomeLayout />}>
      <Route index element={<BoardList />} />
      <Route path={"write"} element={<BoardWrite />} />
    </Route>,
  ),
);

function App(props) {
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
