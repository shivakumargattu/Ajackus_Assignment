import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {
    const { empid } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        role: '',
        active: true
    });
    const [validation, setValidation] = useState(false);
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
                setFormData({
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    active: data.active || true
                });
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [empid]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name) {
            setValidation(true);
            return;
        }

        try {
            const response = await fetch(`https://employee-data-qbmx.onrender.com/employees/${empid}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            alert('Saved successfully.');
            navigate('/');
        } catch (err) {
            console.error('Update error:', err);
            alert(`Failed to save: ${err.message}`);
        }
    };

    if (loading) return <div className="container">Loading...</div>;
    if (error) return <div className="container">Error: {error}</div>;

    return (
        <div className="container">
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form onSubmit={handleSubmit}>
                        <div className="card" style={{ textAlign: "left" }}>
                            <div className="card-title">
                                <h2>Employee Edit</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input 
                                                name="id"
                                                value={formData.id} 
                                                disabled 
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input 
                                                name="name"
                                                required 
                                                value={formData.name} 
                                                onMouseDown={() => setValidation(true)} 
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                            {!formData.name && validation && (
                                                <span className="text-danger">Enter the name</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input 
                                                name="email"
                                                type="email"
                                                value={formData.email} 
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Role</label>
                                            <input 
                                                name="role"
                                                value={formData.role} 
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-check">
                                            <input 
                                                name="active"
                                                type="checkbox"
                                                checked={formData.active} 
                                                onChange={handleChange}
                                                className="form-check-input"
                                            />
                                            <label className="form-check-label">Is Active</label>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">Save</button>
                                            <Link to="/" className="btn btn-danger ms-2">Back</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmpEdit;