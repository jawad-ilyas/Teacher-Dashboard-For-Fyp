import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import { addModule } from "../features/module/ModuleSlice";
import { addStudentToCourse } from "../features/course/CourseSlice";
import { useNavigate } from "react-router-dom";
import ModuleModal from "./ModuleModel";
import AddStudentModal from "./AddStudentModal";

const Card = ({ title, category, image, onEdit, onDelete, courseId }) => {
    const dispatch = useDispatch();
    const [isModuleModalVisible, setIsModuleModalVisible] = useState(false);
    const [isAddStudentModalVisible, setIsAddStudentModalVisible] = useState(false);
    const navigate = useNavigate();

    const handleAddModule = (moduleData) => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        const payload = {
            ...moduleData,
            courseId,
            teacherId: userInfo?.data?._id,
        };

        dispatch(addModule(payload));
        setIsModuleModalVisible(false);
    };

    const handleAddStudent = async (studentData) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));

            const payload = {
                ...studentData,
                courseId,
                teacherId: userInfo?.data?._id,
            };

            await dispatch(addStudentToCourse(payload)).unwrap();
            setIsAddStudentModalVisible(false);
        } catch (error) {
            console.error("Failed to add student:", error);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
                src={image}
                alt={title}
                className="w-full h-32 object-cover cursor-pointer"
                onClick={() => navigate(`/courses/${courseId}`)}
            />

            <div className="p-4 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                    <p className="text-gray-600 text-sm">Category: {category}</p>
                </div>
                <div className="flex space-x-3">
                    <FaEdit
                        onClick={onEdit}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        title="Edit Course"
                    />
                    <FaTrash
                        onClick={onDelete}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                        title="Delete Course"
                    />
                </div>
            </div>

            <div className="p-4 border-t">
                <button
                    onClick={() => setIsModuleModalVisible(true)}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 mb-2"
                >
                    Add Module
                </button>
                <button
                    onClick={() => setIsAddStudentModalVisible(true)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 mb-2"
                >
                    Add a Student
                </button>
                <button
                    onClick={() => navigate(`/courses/${courseId}/enrolled-students`)}
                    className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
                >
                    Enrolled Students
                </button>
            </div>

            {isModuleModalVisible && (
                <ModuleModal
                    isVisible={isModuleModalVisible}
                    onClose={() => setIsModuleModalVisible(false)}
                    onSubmit={handleAddModule}
                />
            )}

            {isAddStudentModalVisible && (
                <AddStudentModal
                    isVisible={isAddStudentModalVisible}
                    onClose={() => setIsAddStudentModalVisible(false)}
                    onSubmit={handleAddStudent}
                />
            )}
        </div>
    );
};

export default Card;
