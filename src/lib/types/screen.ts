import { Member } from "./member";
import { Product } from "./product";

// REACT APP STATE
export interface AppRootState {
  homePage: HomePageState;
}

// HOMEPAGE
export interface HomePageState {
  popularDishes: Product[];
  NewDishes: Product[];
  topUsers: Member[];
}

// PRODUCT PAGE

// ORDERS PAGE
