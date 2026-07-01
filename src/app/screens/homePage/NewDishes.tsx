import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { CssVarsProvider, Card, CardOverflow, AspectRatio } from "@mui/joy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";

const newDishes = [
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
];

export default function NewDishes() {
  return (
    <div className="new-product-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Fresh Menu</Box>

          <Stack className="cards-frame" direction="row" spacing={2}>
            <CssVarsProvider>
              {newDishes.length !== 0 ? (
                newDishes.map((ele, index) => (
                  <Card key={index} variant="outlined" className="card">
                    <CardOverflow>
                      <div className="product-sale">Normal size</div>

                      <AspectRatio ratio="1">
                        <img src={ele.imagePath} alt={ele.productName} />
                      </AspectRatio>
                    </CardOverflow>

                    <CardOverflow variant="soft" className="product-detail">
                      <Stack className="info">
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Typography className="title">
                            {ele.productName}
                          </Typography>

                          <Divider
                            width="2"
                            height="24"
                            bg="#d9d9d9"
                          />

                          <Typography className="price">$12</Typography>
                        </Stack>

                        <Typography
                          className="views"
                          display="flex"
                          alignItems="center"
                        >
                          20
                          <VisibilityIcon
                            sx={{
                              fontSize: 20,
                              marginLeft: "5px",
                            }}
                          />
                        </Typography>
                      </Stack>
                    </CardOverflow>
                  </Card>
                ))
              ) : (
                <Box className="no-data">No products found!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
