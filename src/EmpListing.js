import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpListing = () => {
    const [empdata, setEmpdata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchEmployees = async () => {
        try {
            const response = await fetch("https://employee-data-qbmx.onrender.com/employees");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setEmpdata(data);
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const LoadDetail = (id) => {
        navigate(`/employee/detail/${id}`);
    };

    const LoadEdit = (id) => {
        navigate(`/employee/edit/${id}`);
    };

    const Removefunction = async (id) => {
        if (window.confirm('Do you want to remove this employee?')) {
            try {
                const response = await fetch(`https://employee-data-qbmx.onrender.com/employees/${id}`, {
                    method: "DELETE"
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                alert('Employee removed successfully.');
                // Refresh the employee list
                fetchEmployees();
            } catch (err) {
                console.error('Delete error:', err);
                alert(`Failed to delete employee: ${err.message}`);
            }
        }
    };

    if (loading) return <div className="container">Loading...</div>;
    if (error) return <div className="container">Error: {error}</div>;

    return (
        <div className="container">
            <div className="card p-3">
                <div className="card-title">
                    <h2>Employee Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn w-100 d-flex justify-content-end">
                        <Link to="employee/create" className="btn btn-dark">+Add New</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Role</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {empdata.map((item) => (
                                <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button onClick={() => LoadEdit(item._id)} className="btn btn-success m-1">Edit</button>
                                        <button onClick={() => Removefunction(item._id)} className="btn btn-danger m-1">Remove</button>
                                        <button onClick={() => LoadDetail(item._id)} className="btn btn-primary m-1">Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmpListing;