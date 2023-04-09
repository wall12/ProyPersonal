import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import tareaService from "./tareaService";


const initialState = {
  tareas: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Get user's tareas
export const getTareas = createAsyncThunk(
  "tareas/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await tareaService.getTareas(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create a tarea
export const createTarea = createAsyncThunk(
  "tareas/create",
  async (tareaData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await tareaService.createTarea(token, tareaData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete a tarea
export const deleteTarea = createAsyncThunk(
  "tareas/delete",
  async (tareaId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await tareaService.deleteTarea(token, tareaId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update a tarea
export const updateTarea = createAsyncThunk(
  "tareas/update",
  async (tareaData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await tareaService.updateTarea(token, tareaData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const tareaSlice = createSlice({
  name: "tarea",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Get tareas
      .addCase(getTareas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTareas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tareas = action.payload;
      })
      .addCase(getTareas.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //-------------------------------------------------
      // Create a tarea
      .addCase(createTarea.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTarea.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tareas.push(action.payload);
      })
      .addCase(createTarea.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //-------------------------------------------------
      // Delete a tarea
      .addCase(deleteTarea.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTarea.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tareas = state.tareas.filter((tarea) => {
          return tarea._id !== action.payload.id;
        });
      })
      .addCase(deleteTarea.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //-------------------------------------------------
      // Update a tarea
      .addCase(updateTarea.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTarea.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tareas = state.tareas.map((tarea) => {
          return tarea._id === action.payload.id ? action.payload : tarea;
        });
      })
      .addCase(updateTarea.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = tareaSlice.actions;
export default tareaSlice.reducer;
