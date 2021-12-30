<<<<<<< HEAD
import React from "react";

import NavBar from "../../components/NavBar";
import { Box, styled, CardMedia, Grid, Paper } from "@mui/material";

const Poster = styled(Grid)({
  background: `url("https://github.com/manikmmalhotra/slack-clone/blob/master/Rectangle%202.png?raw=true")
    no-repeat top center fixed`,
  backgroundSize: "100% 68%",
  height: "220px",
});

const LandingPage = () => {
  return (
    <>
      <NavBar loggedIn={false} />
      <Poster
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        columns={{ xs: 1, sm: 1, md: 2 }}>
        <Grid item >
          <CardMedia
            component='img'
            image='https://github.com/manikmmalhotra/slack-clone/blob/master/apartment%20(1)%201.png?raw=true'
            sx={{ width: "180px", height: "116px" }}
          />
        </Grid>
        <Grid item >
         
        </Grid>
      </Poster>
    </>
  );
};
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
=======
const LandingPage = () => {
  return <div>Landing Page</div>;
};

>>>>>>> f67ce2adee1d02a3b2053ca4f320965e07c8f0ae
export default LandingPage;
