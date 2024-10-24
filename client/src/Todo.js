import React, { useEffect, useState } from 'react'
import axios from 'axios'



const Todo = () => {

    const [tasks, setTasks] = useState([])

    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    const [editId, setEditId] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");


    // Fetch all tasks
    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/get`);
            console.log(response.data.data);
            setTasks(response.data.data);
        } catch (error) {
            setError("Failed to fetch tasks");
            // console.error("Error fetching tasks:", error);
        }
    };


    // Add a new task
    const addTask = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/add`, { name, age });
            setName("");
            setAge("");
            fetchTasks(); // Refresh task list
        } catch (error) {
            setError("Failed to add task");
        }
    };



    const updateTask = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/update/${editId}`, { name, age });
            setEditId(null);
            setName("");
            setAge("");
            fetchTasks();
        } catch (error) {
            console.log("Error updating task", error);
        }
    };

    // Delete a task
    const deleteTask = async (id) => {
        // Show a confirmation dialog
        const confirmed = window.confirm("Are you sure you want to delete this task?");

        // If the user confirms, proceed with the delete operation
        if (confirmed) {
            try {
                await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/delete/${id}`);
                fetchTasks(); // Refresh task list
            } catch (error) {
                console.log("Error deleting task", error);
            }
        }
    };



    // Handle form submission for adding/updating
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            updateTask();
        } else {
            addTask();
        }
    };


    useEffect(() => {

        fetchTasks()

    }, [])


    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>



                    {/* Task Form */}
                    <form onSubmit={handleSubmit} className="mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                placeholder="Enter task name"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Age
                            </label>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                placeholder="Enter age"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                            {editId ? "Update Task" : "Add Task"}
                        </button>

                        {editId && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditId(null);
                                    setName("");
                                    setAge("");
                                }}
                                className="ml-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none"
                            >
                                Cancel
                            </button>
                        )}
                    </form>




                    {/* Loading Spinner */}
                    {isLoading ? (
                        <p className="text-center">Loading tasks...</p>
                    ) : (
                        <ul className="space-y-2">
                            {tasks.map((task) => (

                                <li key={task._id} className="flex justify-between items-center bg-gray-100 p-3 rounded-md"  >

                                    <div>
                                        <span className="font-bold">{task.name}</span> - {task.age} years old
                                    </div>

                                    <div>
                                        <button
                                            onClick={() => {
                                                setEditId(task._id);
                                                setName(task.name);
                                                setAge(task.age);
                                            }}
                                            className="text-yellow-500 mr-3"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => deleteTask(task._id)}
                                            className="text-red-500"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                </div>
            </div>
        </>
    )
}

export default Todo