import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import { Box, Button } from "@material-ui/core";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>UAssess Quiz App</title>
      </Helmet>
      <div id="home">
        <section>
          <div className="cube">
            <ViewInArIcon fontSize="25" />
          </div>
          <h1>Quiz App</h1>

          <Box my={2}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              {" "}
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign in now
              </Button>
            </Link>
          </Box>
        </section>
      </div>
    </>
  );
};

export default Home;
