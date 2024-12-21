import { useForm } from "react-hook-form";

const AddStudentModal = ({ isVisible, onClose, onSubmit }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleFormSubmit = async (data) => {
        try {
            await onSubmit(data);
            reset();
            onClose();
        } catch (err) {
            console.error("Failed to add student:", err);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-700">Add a Student</h3>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                        &#x2715;
                    </button>
                </div>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Student Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Student email is required" })}
                            placeholder="Enter student email"
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Add Student
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudentModal;
