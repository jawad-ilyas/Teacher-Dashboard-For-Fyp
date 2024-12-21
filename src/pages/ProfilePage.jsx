import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile, updateUserProfile } from "../features/userProfile/UserProfile";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // For navigation
    const { user, loading, error, successMessage } = useSelector((state) => state.userProfile);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        // Fetch user profile data on page load
        dispatch(fetchUserProfile());
    }, [dispatch]);

    useEffect(() => {
        // Populate the form fields with user data when fetched
        if (user) {
            reset({
                name: user.name,
                email: user.email,
                password: "",
            });
        }
    }, [user, reset]);

    const onSubmit = (data) => {
        const updatedData = {
            name: data.name,
            password: data.password || undefined, // Only send password if it's provided
        };

        dispatch(updateUserProfile(updatedData));
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <button
                onClick={() => navigate(-1)} // Navigate back to the previous page
                className="mb-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
                Back
            </button>

            <h1 className="text-2xl font-semibold text-gray-700 mb-6">My Profile</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name Field */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Name</label>
                    <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Enter your name"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}
                </div>

                {/* Email Field */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Email</label>
                    <input
                        type="email"
                        {...register("email")}
                        className="w-full border rounded-lg px-4 py-2 bg-gray-100"
                        readOnly
                    />
                </div>

                {/* Password Field */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">New Password</label>
                    <input
                        type="password"
                        {...register("password", {
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Enter a new password (optional)"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-300"
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfilePage;
