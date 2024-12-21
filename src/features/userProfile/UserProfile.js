import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch user profile
export const fetchUserProfile = createAsyncThunk(
    "userProfile/fetchUserProfile",
    async (_, { rejectWithValue }) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            if (!userInfo) throw new Error("userInfo not found");
            console.log(":userInfo", userInfo);
            // Send userInfo in the Authorization header
            const response = await axios.get("http://localhost:5000/api/v1/user/profile", {
                headers: {
                    Authorization: `Bearer ${userInfo?.data?.token}`,
                },
            });
            return response.data.data; // Return the user data
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch profile");
        }
    }

);

// Update user profile
export const updateUserProfile = createAsyncThunk(
    "userProfile/updateUserProfile",
    async (userData, { rejectWithValue }) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            if (!userInfo) throw new Error("userInfo not found");
            const token = userInfo?.data?.token;
            console.log(":userInfo", userInfo);

            const response = await axios.put(
                "http://localhost:5000/api/v1/user/profile",
                userData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.data; // Return updated user data
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update profile");
        }
    }
);

const userProfileSlice = createSlice({
    name: "userProfile",
    initialState: {
        user: null,
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch user profile
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; // Store user data in state
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update user profile
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; // Update the user data in state
                state.successMessage = "Profile updated successfully!";
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userProfileSlice.reducer;
