import React, { useState } from "react";

import {
  Box,
  Typography,
  Card,
  Tabs,
  Tab,
  IconButton,
  Button,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import NavBar from "../../components/NavBar";

const SearchCard = styled(Card)({
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  maxWidth: "650px",
  borderRadius: "10px",
  height: "150px",
  margin: "40px auto 0",
});

const Input = styled("input")({
  border: "none",
  boxSizing: "border-box",
  borderRadius: "10px",
  fontSize: "15px",
  width: "100%",
  maxWidth: "300px",
  padding: "0 15px",
  outline: "none",
  color: "#6c757d",
  "&::placeholder": {
    color: "#6c757d",
    fontFamily: "Sen",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "15px",
    letterSpacing: "0.15px",
  },
});

const BuyHomes = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = ["PROJECTS", "RESALE HOMES"].map((l) => (
    <Tab label={l} id='simple-tab-0' sx={{ fontWeight: "bold" }} />
  ));

  return (
    <>
      <NavBar loggedIn={false} />
      <Box sx={{ pt: "30px" }}>
        <Typography variant='h3' color='grey.700' align='center'>
          Buy Homes
        </Typography>
        <Typography variant='body1' color='primary' align='center'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique est
          congue integer integer at quis ac. Sed egestas pellentesque lectus
          amet ac id viverra.
        </Typography>
        <SearchCard>
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <Tabs value={value} onChange={handleChange} centered>
              {tabs}
            </Tabs>
          </Box>

          <Box display='flex' justifyContent='center' width='100%' mt='30px'>
            <IconButton sx={{ pr: "10px" }}>
              <SearchIcon sx={{ color: "#6C757D", fontSize: "30px" }} />
            </IconButton>
            <Input placeholder='Enter Locality' />
            <Button
              size='small'
              variant='contained'
              sx={{
                width: "100px",
                height: "35px",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                },
              }}>
              SEARCH
            </Button>
          </Box>
        </SearchCard>
      </Box>
    </>
  );
};

export default BuyHomes;
