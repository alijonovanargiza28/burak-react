import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectOredrsPage = (state: AppRootState) => state.ordersPage;

export const retrivePausedOrders = createSelector(
  selectOredrsPage,
  (OrdersPage) => OrdersPage.pausedOrders,
);

export const retriveProcessOrders = createSelector(
  selectOredrsPage,
  (OrdersPage) => OrdersPage.processOrders,
);

export const retriveFinishedOrders = createSelector(
  selectOredrsPage,
  (OrdersPage) => OrdersPage.finishedOrders,
);
