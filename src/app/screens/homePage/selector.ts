import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrivePopularDishes = createSelector(
  selectHomePage,
  (homePage) => homePage.popularDishes,
);

export const retriveNewDishes = createSelector(
  selectHomePage,
  (homePage) => homePage.newDishes,
);

export const retriveTopUsers = createSelector(
  selectHomePage,
  (homePage) => homePage.topUsers,
);
