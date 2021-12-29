import React from "react";

import { Box, Link, Grid } from "@mui/material";

import Logo from "../Logo";
import styled from "@emotion/styled";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Icon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid black;
  text-align: center;
  padding-top: 5px;
`;
const IconsWrapper = styled.div`
  width: 180px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Content = styled.div`
  width: 281px;
  color: #828282;
  font-size: 16px;
  letter-spacing: 0.15px;
`;

const Footer = () => {
  return (
    <>
      <Box sx={{ mt: "30px" }}>
        <Grid container spacing={2} columns={{ xs: 2 }} sx={{ mb: "30px" }}>
          <Grid
            container
            item
            sx={{ width: "40%" }}
            >
            <Grid item sx={{ width: "100%", pl:'100px' }} >
              <Logo size={40} />
            </Grid>
            <Grid item sx={{ width: "100%", pl:'100px' }}>
              <Content>
                We build relationships that last a lifetime and help you get the
                best real estate deals in Mumbai.
              </Content>
            </Grid>
          </Grid>
          <Grid
            container
            item
            sx={{ width: "60%" }}
            display='flex'
            justifyContent='center'
            columns={{ xs: 3 }}>
            <Grid container item sx={{ width: "33.33%" }}>
              <Grid item xs={12} sx={{ fontSize: "20px", mb: "10px" }}>
                Links
              </Grid>
              <Grid item xs={12} sx={{ mt: "15px" }}>
                <Link
                  sx={{
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "#828282",
                    fontSize: "15px",
                  }}>
                  Projects
                </Link>
              </Grid>
              <Grid item xs={12} sx={{ mt: "15px" }}>
                <Link
                  sx={{
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "#828282",
                    fontSize: "15px",
                  }}>
                  Resale Homes
                </Link>
              </Grid>
              <Grid item xs={12} sx={{ mt: "15px" }}>
                <Link
                  sx={{
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "#828282",
                    fontSize: "15px",
                  }}>
                  Rent/Lease
                </Link>
              </Grid>
            </Grid>
            <Grid container item sx={{ width: "33.33%" }}>
              <Grid item xs={12} sx={{ fontSize: "20px", mb: "10px" }}>
                Legal
              </Grid>
              <Grid item xs={12} sx={{ mt: "15px" }}>
                <Link
                  sx={{
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "#828282",
                    fontSize: "15px",
                  }}>
                  Terms of Use
                </Link>
              </Grid>
              <Grid item xs={12} sx={{ mt: "15px" }}>
                <Link
                  sx={{
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "#828282",
                    fontSize: "15px",
                  }}>
                  Privacy Policy
                </Link>
              </Grid>
              <Grid item xs={12} sx={{ mt: "15px" }}>
                <Link
                  sx={{
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "#828282",
                    fontSize: "15px",
                  }}>
                  About
                </Link>
              </Grid>
            </Grid>
            <Grid container item sx={{ width: "33.33%" }}>
              <Grid item xs={12} sx={{ fontSize: "20px", mb: "10px" }}>
                Contact
              </Grid>
              <Grid item xs={12} sx={{ mt: "15px" }}>
                <Link
                  sx={{
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "#828282",
                    fontSize: "15px",
                  }}>
                  +91-1234567890
                </Link>
              </Grid>
              <Grid item xs={12} sx={{ mt: "15px" }}>
                <Link
                  sx={{
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "#828282",
                    fontSize: "15px",
                  }}>
                  email@jaiambe.com
                </Link>
              </Grid>
              <Grid item xs={12} sx={{ mt: "15px" }}>
                <IconsWrapper>
                  <FaFacebook size={30} />
                  <Icon>
                    <FaInstagram />
                  </Icon>
                  <Icon>
                    <FaTwitter />
                  </Icon>
                  <Icon>
                    <FaLinkedinIn />
                  </Icon>
                </IconsWrapper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box
          component='div'
          sx={{
            height: "30px",
            width: "100%",
            backgroundColor: "#E85D04",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "12px",
          }}>
          Created with love ♥ by Zenoholics. © 2021 All Rights Reserved
        </Box>
      </Box>
    </>
  );
};

export default Footer;
