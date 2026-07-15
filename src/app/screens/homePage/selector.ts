import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectHomePage =(state: AppRootState)=>state.homepage

export const retrivePopularDishes = createSelector(
    selectHomePage,
    (HomePage)=>HomePage.popularDishes
)
export const retriveNewDishes = createSelector(
  selectHomePage,
  (HomePage) => HomePage.NewDishes,
);
export const retriveTopDishes = createSelector(
  selectHomePage,
  (HomePage) => HomePage.topUsers,
);
