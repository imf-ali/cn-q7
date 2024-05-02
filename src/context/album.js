import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAlbumThunk = createAsyncThunk('getAlbumThunk', async (args, thunkApi) => {
  try {
    thunkApi.dispatch(setIsLoading(true));
    const res = await axios.get('https://jsonplaceholder.typicode.com/albums');
    thunkApi.dispatch(setAlbums(res.data));
  } catch (err) {
    thunkApi.dispatch(setIsError());
    console.log('Something went wrong');
  }
})

export const addAlbumThunk = createAsyncThunk('addAlbumThunk', async (args, thunkApi) => {
  try {
    thunkApi.dispatch(setIsLoading(true));
    const res = await axios({
      method: 'POST',
      url: 'https://jsonplaceholder.typicode.com/albums',
      data: {
        userId: 1,
        title: args.title,
      }
    });
    thunkApi.dispatch(addAlbum(res.data));
  } catch (err) {
    setIsError(true);
    console.log('Something went wrong');
  }
})

export const updateAlbumThunk = createAsyncThunk('updateAlbumThunk', async (args, thunkApi) => {
  try {
    thunkApi.dispatch(setIsLoading(true));
    const res = await axios({
      method: 'PATCH',
      url: `https://jsonplaceholder.typicode.com/albums/${args.id}`,
      data: {
        userId: 1,
        title: args.title,
        id: args.id,
      }
    });
    thunkApi.dispatch(updateAlbum(res.data));
  } catch (err) {
    setIsError(true);
    console.log('Something went wrong');
  }
})

export const deleteAlbumThunk = createAsyncThunk('deleteAlbumThunk', async (args, thunkApi) => {
  try {
    thunkApi.dispatch(setIsLoading(true));
    await axios({
      method: 'DELETE',
      url: `https://jsonplaceholder.typicode.com/albums/${args.id}`,
      data: {
        userId: 1,
        id: args.id,
      }
    });
    thunkApi.dispatch(deleteAlbum({ id: args.id }));
  } catch (err) {
    setIsError(true);
    console.log('Something went wrong');
  }
})

const albums = createSlice({
  name: 'albums',
  initialState: {
    albums: [],
    isLoading: false,
    isError: false,
  },
  reducers: {
    setAlbums: (state, action) => {
      state.albums = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    setIsLoading: (state, action) => {
      state.isError = false;
      state.isLoading = true;
    },
    setIsError: (state, action) => {
      state.isError = true;
      state.isLoading = false;
    },
    addAlbum: (state, action) => {
      state.albums.push(action.payload);
    },
    updateAlbum: (state, action) => {
      state.albums = state.albums.map((album) => {
        if(album.id === action.payload.id)
          album.title = action.payload.title;
        return album;
      })
    },
    deleteAlbum: (state, action) => {
      state.albums = state.albums.filter((album) => album.id!== action.payload.id);
    }
  }
});

const albumReducer = albums.reducer;
export const { setAlbums, setIsError, setIsLoading, addAlbum, updateAlbum, deleteAlbum } = albums.actions;
export const albumState = (state) => state.albumReducer;

export default albumReducer;