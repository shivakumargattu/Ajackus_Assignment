import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EmpDetail = () => {
    const { empid } = useParams();
    const [empdata, setEmpdata] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`https://employee-data-qbmx.onrender.com/employees/${empid}`);
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

        fetchEmployee();
    }, [empid]);

    if (loading) return <div className="container">Loading...</div>;
    if (error) return <div className="container">Error: {error}</div>;
    if (!empdata) return <div className="container">No employee data found</div>;

    return (
        <div className="container">
            <div className="card row" style={{ textAlign: "left" }}>
                <div className="card-title">
                    <h2>Employee Details</h2>
                </div>
                <div className="card-body">
                    <div>
                        <h2>The Employee name is: <b>{empdata.name}</b> ({empdata._id})</h2>
                        <h3>Contact Details</h3>
                        <h5>Email is: {empdata.email}</h5>
                        <h5>Role is: {empdata.role}</h5>
                        <h5>Status: {empdata.active ? 'Active' : 'Inactive'}</h5>
                        <Link className="btn btn-danger" to="/">Back to Listing</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmpDetail;