import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const Base_URL = "https://hospitall-management.onrender.com/wards";

const initialState = {
  wards: [],
  status: "idle",
  error: null,
};

export const fetchWards = createAsyncThunk("wards/fetchWards", async () => {
  try {
    const response = await fetch(Base_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch wards");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
});

export const addWard = createAsyncThunk("wards/addWard", async (wardData) => {
  try {
    const response = await fetch(Base_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wardData),
    });
    if (!response.ok) {
      throw new Error("Failed to add a ward");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
});

export const deleteWardById = createAsyncThunk(
  "wards/deleteWard",
  async (wardId) => {
    try {
      const response = await fetch(`${Base_URL}/${wardId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete ward with ID ${wardId}`);
      }
      return wardId;
    } catch (error) {
      throw error;
    }
  }
);

export const updateWardById = createAsyncThunk(
  "wards/updateWard",
  async ({ wardId, wardData }) => {
    try {
      const response = await fetch(`${Base_URL}/${wardId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wardData),
      });
      if (!response.ok) {
        throw new Error(`Failed to update ward with ID ${wardId}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const wardsSlice = createSlice({
  name: "wards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.wards = action.payload.data; // Assuming action.payload is an array of wards
      })
      .addCase(fetchWards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addWard.fulfilled, (state, action) => {
        state.wards.push(action.payload.data); // Assuming action.payload is a new ward
      })
      .addCase(deleteWardById.fulfilled, (state, action) => {
        state.wards = state.wards.filter((ward) => ward._id !== action.payload); // Assuming action.payload is the deleted ward ID
      })
      .addCase(updateWardById.fulfilled, (state, action) => {
        state.wards = action.payload.data;
      });
  },
});

export default wardsSlice.reducer;
