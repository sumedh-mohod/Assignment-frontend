import React, { useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  FormControl,
  FormLabel,
  InputLabel,
  TextField,
  Typography,
  MenuItem,
  Card,
  Paper,
  Select,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useLocation, Link } from "react-router-dom";

const SlotBooked = () => {
  const { state } = useLocation();
  const { bookingPrice, checkBooking } = state || {};

  return (
    <div>
      <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
        {bookingPrice && (
          <Box sx={{ padding: 5 }}>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              You Booked the slot Successfully with Rs{" "}
              <strong>{bookingPrice}</strong>
            </Alert>
            <Link to={"/"}>Go Back to Book Another Slot</Link>
          </Box>
        )}

        {checkBooking && (
          <Box sx={{ padding: 5 }}>
            <Alert severity="error">
              <AlertTitle>Failed</AlertTitle>
              You Booking Failed Please try another Slot
              <strong>{bookingPrice}</strong>
            </Alert>
            <Link to={"/"}>Go Back to Book Another Slot</Link>
          </Box>
        )}
      </Paper>
    </div>
  );
};

export default SlotBooked;
