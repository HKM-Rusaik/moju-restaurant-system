import React, { useState, useEffect } from "react";
import Layout from "layouts/AdminLayouts";
import axios from "axios";
import SuccessPopUp from "components/customer-components/SuccessPopUp";

const EmployeeDetails = () => {
  const [showForm, setShowForm] = useState(false);
  const [staffName, setStaffName] = useState("");
  const [NIC, setNIC] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [role, setRole] = useState("Waiter");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [createStaff, setCreateStaff] = useState(false);
  const [updateStaff, setUpdateStaff] = useState(false);
  const [deleteStaff, setDeleteStaff] = useState(false);

  const [errors, setErrors] = useState({
    staffName: "",
    NIC: "",
    mobileNo: "",
  });

  // Function to fetch employees from the server
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/staffs");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Function to handle the click event of the "Add Employee" button
  const handleAddEmployeeClick = () => {
    setShowForm(true); // Show the popup form
    setSelectedEmployee(null); // Clear selected employee for editing
  };

  // Function to handle the close button click event
  const handleCloseForm = () => {
    setShowForm(false); // Hide the popup form
  };

  // Function to handle form submission for adding/editing employee
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    let formIsValid = true;
    const newErrors = { staffName: "", NIC: "", mobileNo: "" };

    if (!staffName) {
      newErrors.staffName = "Staff name is required";
      formIsValid = false;
    }

    if (!NIC) {
      newErrors.NIC = "NIC is required";
      formIsValid = false;
    } else if (!/^\d{9,13}[vVxX]?$/.test(NIC)) {
      newErrors.NIC = "Invalid NIC format";
      formIsValid = false;
    }

    if (!mobileNo) {
      newErrors.mobileNo = "Mobile number is required";
      formIsValid = false;
    } else if (!/^\d{10}$/.test(mobileNo)) {
      newErrors.mobileNo = "Invalid mobile number format";
      formIsValid = false;
    }

    if (!formIsValid) {
      setErrors(newErrors);
      return;
    }
    try {
      let response;
      if (selectedEmployee) {
        // If editing an existing employee
        response = await axios.put(
          `http://localhost:5000/admin/staff/update/${selectedEmployee.NIC}`,
          {
            staffName,
            NIC,
            mobileNo,
            role,
          }
        );
        setUpdateStaff(true);

        setStaffName("");
        setNIC("");
        setMobileNo("");
        setErrors("");
        console.log("Employee saved successfully:", response.data);
        setShowForm(false); // Hide the popup form
        setTimeout(() => {
          fetchEmployees(); // Refresh employee list
          setUpdateStaff(false);
        }, 3000);
        // alert("You have successfully edited your profile");
      } else {
        // If adding a new employee
        response = await axios.post("http://localhost:5000/admin/staff", {
          staffName,
          NIC,
          mobileNo,
          role,
        });
        setCreateStaff(true);
      }
      setStaffName("");
      setNIC("");
      setMobileNo("");
      setErrors("");
      console.log("Employee saved successfully:", response.data);
      setShowForm(false); // Hide the popup form
      setTimeout(() => {
        fetchEmployees(); // Refresh employee list
        setCreateStaff(false);
      }, 3000);
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  // Function to handle delete confirmation
  const handleDeleteConfirmation = (employee) => {
    setSelectedEmployee(employee); // Set selected employee for deletion
    setShowDeleteConfirmation(true); // Show delete confirmation popup
  };

  // Function to handle delete action
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/admin/staff/${selectedEmployee.NIC}`
      );
      setDeleteStaff(true);
      console.log("Employee deleted successfully");
      setShowDeleteConfirmation(false);
      // setTimeout(() => {
      //   setShowDeleteConfirmation(false); // Hide delete confirmation popup
      // }, 2000);
      setTimeout(() => {
        fetchEmployees(); // Refresh employee list
        setDeleteStaff(false);
      }, 3000);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // Function to handle edit action
  const handleEdit = (employee) => {
    setSelectedEmployee(employee); // Set selected employee for editing
    setStaffName(employee.staffName);
    setNIC(employee.NIC);
    setMobileNo(employee.mobileNo);
    setRole(employee.role);
    setShowForm(true); // Show the popup form
  };

  return (
    <Layout>
      <div className="m-4">
        {/* <SuccessPopUp load="Creating staff" finish="successfully created!" /> */}
        {createStaff && (
          <SuccessPopUp
            load={"Creating staff"}
            finish={"successfully created!"}
          />
        )}
        {updateStaff && (
          <SuccessPopUp
            load={"Updating details"}
            finish={"successfully updated!"}
          />
        )}
        {deleteStaff && (
          <SuccessPopUp
            load={"Deleting staff"}
            finish={"successfully deleted!"}
          />
        )}
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-blue-600">
            Employee Details
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleAddEmployeeClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              +Add Employee
            </button>
          </div>
        </div>
        <div>
          <table className="w-[90%] mx-auto mt-8 border rounded-lg shadow-lg">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="p-4">NIC No</th>
                <th className="p-4">Staff Name</th>
                <th className="p-4">Mobile No</th>
                <th className="p-4">Role</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {employees.map((employee) => (
                <tr key={employee.NIC}>
                  <td className="p-4">{employee.NIC}</td>
                  <td className="p-4">{employee.staffName}</td>
                  <td className="p-4">{employee.mobileNo}</td>
                  <td className="p-4">{employee.role}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleEdit(employee)}
                      className="bg-green-500 px-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteConfirmation(employee)}
                      className="ml-2 bg-red-500 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Delete confirmation popup */}
        {showDeleteConfirmation && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-xl font-bold mb-4">Delete Employee</p>
              <p className="mb-4">
                Are you sure you want to delete this employee?
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowDeleteConfirmation(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Render the popup form if showForm state is true */}
        {showForm && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <form
              className="flex flex-col bg-white p-8 rounded-lg"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Staff Name"
                className={`mt-2 p-2 border rounded-lg ${
                  errors.staffName && "border-red-500"
                }`}
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
              />
              {errors.staffName && (
                <span className="text-red-500 text-sm">{errors.staffName}</span>
              )}
              {/* Render NIC field conditionally based on whether it's a new or existing employee */}
              {!selectedEmployee && (
                <input
                  type="text"
                  placeholder="NIC"
                  className={`mt-2 p-2 border rounded-lg ${
                    errors.NIC && "border-red-500"
                  }`}
                  value={NIC}
                  onChange={(e) => setNIC(e.target.value)}
                />
              )}
              <input
                type="text"
                placeholder="Mobile No"
                className={`mt-2 p-2 border rounded-lg ${
                  errors.mobileNo && "border-red-500"
                }`}
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
              {errors.mobileNo && (
                <span className="text-red-500 text-sm">{errors.mobileNo}</span>
              )}
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-2 p-2 border rounded-lg"
              >
                <option value="Waiter">Waiter</option>
                <option value="Delivery Staff">Delivery Staff</option>
                <option value="Kitchen Staff">Kitchen Staff</option>
              </select>
              <button
                type="submit"
                className="mt-4  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
              {/* Close button for the popup form */}
              <button
                onClick={handleCloseForm}
                className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EmployeeDetails;
