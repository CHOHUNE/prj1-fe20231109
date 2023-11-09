import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { BoardWrite } from "./page/BoardWrite";
import { HomeLayout } from "./layout/HomeLayout";
import { BoardList } from "./page/BoardList";
import { BoardView } from "./page/BoardView";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path={"/"} element={<HomeLayout />}>
      <Route index element={<BoardList />} />
      <Route path={"write"} element={<BoardWrite />} />
      <Route path="board/:id" element={<BoardView />} />
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
