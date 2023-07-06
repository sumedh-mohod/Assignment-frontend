import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  FormControl,
  InputLabel,
  TextField,
  Typography,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { postAmenity } from "../store/reducers/amenities";
import { getAmenities } from "../store/reducers/amenities";
import { useNavigate } from "react-router-dom";

const AmenitiesForm = () => {
  const [bookingPrice, setbookingPrice] = useState("");
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { amenities, isLoadingRequest, error } = useSelector(
    (state) => state.amenities
  );

  useEffect(() => {
    dispatch(getAmenities());
  }, []);

  const handleChange = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData(formData);
    console.log(event.target.value);
    let start = parseInt(formData.start_time);
    let end = parseInt(formData.end_time);
    let res = end - start;

    let morningSlot = [10, 11, 12, 13, 14, 15];
    if (morningSlot.includes(start)) {
      setbookingPrice(res * 100);
    } else {
      setbookingPrice(res * 500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkBooking = amenities.map((val, index) => {
      if (
        val?.date == formData?.date ||
        val?.start_time == formData?.start_time
      ) {
        return true;
      } else {
        return false;
      }
    });
    console.log("checkBooking", checkBooking.includes(true));
    if (checkBooking.includes(true)) {
      navigate(`/bookedslot`, { state: { checkBooking } });
      console.log("failsed to book");
    } else {
      dispatch(postAmenity(formData));
      navigate(`/bookedslot`, { state: { bookingPrice } });
    }
  };

  return (
    <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
      <Box sx={{ padding: 5 }}>
        {/*========================================= Form Title =======================================*/}
        <Typography variant="h4" gutterBottom sx={{ paddingBottom: 5 }}>
          Book Amenities slot
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/*==================================== Name input field =======================================*/}
            <Grid item xs={12} sm={6}>
              <TextField
                id="name"
                name="name"
                // value={values.name}
                label="Name"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>

            {/*===================================== Amenities input field ==================================*/}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="amenities-label">Amenities</InputLabel>
                <Select
                  labelId="amenities-label"
                  id="amenities-select"
                  name="amenities"
                  // value={values.amenities}
                  label="Amenities"
                  onChange={handleChange}
                >
                  {["Clubhouse", "Tennis Court"]?.map((item) => (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/*=================================== Time and Date input field=================================== */}
            <Grid item xs={12} sm={6}>
              <input
                type="text"
                placeholder="Please Enter Date"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                name="date"
                onChange={handleChange}
                style={{
                  width: "100%",
                  height: "36px",
                  borderRadius: "3px",
                  borderColor: "#C4C4C4",
                }}
              />
            </Grid>

            {/*============================= Time and Date input field===================================== */}
            <Grid item xs={12} sm={6}>
              <input
                type="text"
                placeholder="Please Enter Start Time"
                onFocus={(e) => (e.target.type = "time")}
                onBlur={(e) => (e.target.type = "text")}
                name="start_time"
                min="10:00"
                max="22:00"
                onChange={handleChange}
                style={{
                  width: "100%",
                  height: "36px",
                  borderRadius: "3px",
                  borderColor: "#C4C4C4",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <input
                type="text"
                placeholder="Please Enter End Time"
                onFocus={(e) => (e.target.type = "time")}
                onBlur={(e) => (e.target.type = "text")}
                name="end_time"
                min="11:00"
                max="22:00"
                onChange={handleChange}
                style={{
                  width: "100%",
                  height: "36px",
                  borderRadius: "3px",
                  borderColor: "#C4C4C4",
                }}
              />
            </Grid>
            {/*===================================Save Button input field===================================== */}
            <Grid item xs={12} sm={12}>
              <Button type="submit" variant="contained" sx={{ color: "white" }}>
                Submit
              </Button>
            </Grid>
            {/*====================================Save Button input field===================================== */}
          </Grid>
        </form>
      </Box>
    </Paper>
  );
};

export default AmenitiesForm;
