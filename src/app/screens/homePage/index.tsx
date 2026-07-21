import React from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setPopularDishes } from "./slice";
import { retrivePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";

// REDCE SLICE & SELECTOR
const actionDispatch =(dispatch:Dispatch)=>({
  setPopularDishes:(data:Product[])=>dispatch(setPopularDishes(data)),
})
const PopularDishesRetriever = createSelector(
  retrivePopularDishes,
  (popularDishes)=>({popularDishes})
)

console.log(process.env.REACT_APP_API_URL)

export default function HomePage() {
  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
