
import React, { useEffect } from "react";
import { Container, Stack, Box, Button, Rating } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import { useParams } from "react-router-dom"; // @ts-ignore
import { FreeMode, Navigation, Thumbs } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";

import { setChosenProduct, setRestaurant } from "./slice";
import { retriveChosenProduct, retriveRestaurant } from "./selector";

import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";

import { Product } from "../../../lib/types/product";
import { Member } from "../../../lib/types/member";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";

// Redux Actions
const actionDispatch = (dispatch: Dispatch) => ({
  setRestaurant: (data: Member) => dispatch(setRestaurant(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

// Selectors
const chosenProductRetriever = createSelector(
  retriveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  }),
);

const restaurantRetriever = createSelector(retriveRestaurant, (restaurant) => ({
  restaurant,
}));


interface ChosenProductProps{
  onAdd:(item:CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductProps) {
  const {onAdd} = props;
  const { productId } = useParams<{ productId: string }>();
  const { setRestaurant, setChosenProduct } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { restaurant } = useSelector(restaurantRetriever);

  useEffect(() => {
    console.log(productId);
    if (!productId) return;

    const productService = new ProductService();

    productService
      .getProduct(productId)
      .then((data) => setChosenProduct(data))
      .catch(console.log);

    const memberService = new MemberService();

    memberService
      .getRestaurant()
      .then((data) => setRestaurant(data))
      .catch(console.log);
  }, [productId, setChosenProduct, setRestaurant]);

  if (!chosenProduct) return null;

  return (
    <div className="chosen-product">
      <Box className="title">Product Detail</Box>

      <Container className="product-container">
        <Stack className="chosen-product-slider">
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area"
          >
            {chosenProduct.productImages?.map(
              (image: string, index: number) => (
                <SwiperSlide key={index}>
                  <img
                    className="slider-image"
                    src={`${serverApi}/${image}`}
                    alt={chosenProduct.productName}
                  />
                </SwiperSlide>
              ),
            )}
          </Swiper>
        </Stack>

        <Stack className="chosen-product-info">
          <Box className="info-box">
            <strong className="product-name">
              {chosenProduct.productName}
            </strong>

            <span className="resto-name">{restaurant?.memberNick}</span>

            <span className="resto-name">{restaurant?.memberPhone}</span>

            <Box className="rating-box">
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />

              <div className="evaluation-box">
                <div className="product-view">
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>{chosenProduct.productViews}</span>
                </div>
              </div>
            </Box>

            <p className="product-desc">
              {chosenProduct.productDesc || "No Description"}
            </p>

            <Divider height="1" width="100%" bg="#000000" />

            <div className="product-price">
              <span>Price:</span>
              <span>${chosenProduct.productPrice}</span>
            </div>

            <div className="button-box">
              <Button variant="contained"
               onClick={(e)=> {
                            onAdd({
                              _id: chosenProduct._id,
                              quantity: 1,
                              name: chosenProduct.productName,
                              price: chosenProduct.productPrice,
                              image: chosenProduct.productImages[0],
                            });
                            e.stopPropagation()
                          }}
              >Add To Basket</Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}