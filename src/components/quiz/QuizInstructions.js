import React from "react";
import { Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const QuizInstructions = () => {
  return (
    <>
      <h4 style={{ textAlign: "center", fontWeight: 500, marginTop: "5rem" }}>
        Click Play button to enter
      </h4>
      <Box
        my={2}
        style={{
          textAlign: "center",
          width: "100px",
          margin: "auto",
          marginTop: "10px",
        }}
      >
        <Link to="/play/quiz" style={{ textDecoration: "none" }}>
          {" "}
          <Button
            color="primary"
            size="large"
            type="submit"
            variant="contained"
          >
            Play
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default QuizInstructions;
