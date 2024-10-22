import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { albumsAPI } from "./apis/albumsAPI";
import { photosAPI } from "./apis/photosAPI";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsAPI.reducerPath]: albumsAPI.reducer,
    [photosAPI.reducerPath]: photosAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsAPI.middleware)
      .concat(photosAPI.middleware);
  },
});

setupListeners(store.dispatch);

export * from "./thunks/fetchUser";
export * from "./thunks/addUser";
export * from "./thunks/removeUser";
export {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} from "./apis/albumsAPI";
export {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} from "./apis/photosAPI";
