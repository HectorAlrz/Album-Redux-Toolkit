import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:3005/users");

  // developer purposes only
  await pause(2000);

  return response.data;
});

// DEVELOPER PURPOSES ONLY

const pause = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

export { fetchUsers };
