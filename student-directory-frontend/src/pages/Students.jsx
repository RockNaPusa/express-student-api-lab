import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Students = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/students', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('failed to fetch student directory');
                }

                const data = await response.json();
                setStudents(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [token]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div style={{
            maxWidth: '600px',
            margin: '40px auto',
            padding: '30px',
            backgroundColor: '#ffe4e1',
            border: '2px solid #ffb6c1',
            borderRadius: '25px',
            boxShadow: '0 8px 16px rgba(255, 182, 193, 0.4)',
            fontFamily: 'sans-serif'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ color: '#db7093', margin: 0 }}>Student Directory</h2>
                <button 
                    onClick={handleLogout}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#ffb6c1',
                        color: '#8b4513',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    Logout
                </button>
            </div>

            {loading && <p style={{ color: '#c71585' }}>loading students...</p>}
            {error && <p style={{ color: '#d87093', fontWeight: 'bold' }}>{error}</p>}

            {!loading && !error && (
                <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px' }}>
                    {students.length === 0 ? (
                        <p style={{ color: '#c71585' }}>no students found in database.</p>
                    ) : (
                        students.map((student) => (
                            <li key={student._id || student.id} style={{
                                padding: '12px',
                                backgroundColor: '#fff0f5',
                                border: '1px solid #ffb6c1',
                                borderRadius: '12px',
                                marginBottom: '10px',
                                color: '#8b4513'
                            }}>
                                <strong>{student.name}</strong> - {student.email}
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};