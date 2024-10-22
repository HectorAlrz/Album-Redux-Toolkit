import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUser";
import { addUser } from "../thunks/addUser";
import { removeUser } from "../thunks/removeUser";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    /*
  When we create the Thunk, we can use fetchUsers.pending,
  fetchUsers.fulfilled, and fetchUsers.rejected as the action types
  for the pending, fulfilled, and rejected states, respectively.
   We can use these action types to create cases in the extraReducers() method of the slice.
   */
    // users/fetch/pending REQUEST JUST STARTED
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    // users/fetch/fulfilled REQUEST SUCCESS
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    // users/fetch/rejected REQUEST FAILED
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // addUsers thunks
    builder.addCase(addUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // removeUser thunks
    builder.addCase(removeUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter((user) => {
        return user.id !== action.payload.id;
      });
      // FIX ME!!
      console.log("fix me", action);
    });
    builder.addCase(removeUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const usersReducer = usersSlice.reducer;
