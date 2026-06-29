import React from "react";
import { Container, Stack, Box, Typography, Button } from "@mui/material";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import { AboutPage } from "./screens/aboutPage";
import  UsersPage  from "./screens/usersPage";
import  OrdersPage  from "./screens/ordersPage";
import  ProductsPage  from "./screens/productPage";
import  HomePage  from "./screens/homePage";
import  OtherNavbar  from "./components/headers/OtherNavbar";
import  HomeNavbar  from "./components/headers/HomeNavbar/homeNavbar";
import  Footer  from "./components/footer";
import "../css/app.css";
import "../css/navbar.css"
import "../css/footer.css"

function App() {
  const location = useLocation()

  return (
    <>
    {location.pathname === "/" ? <HomeNavbar/> : <OtherNavbar/>}
      <Switch>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/member-page">
          <UsersPage />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/produts">
          <ProductsPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer/>
    </>

  );
}


export default App;