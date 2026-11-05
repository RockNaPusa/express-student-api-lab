import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/students');
        } catch (err) {
            if (err.message === 'Invalid credentials' || err.message.includes('401')) {
                setError("invalid credentials...one of us is having a memory lapse(it's you) :D");
            } else {
                setError("server is disconnected..i think(?) - no scuba for u until we fix it");
            }
        }
    };

    return (
        <div style={{
            maxWidth: '400px',
            margin: '40px auto',
            padding: '30px',
            backgroundColor: '#ffe4e1',
            border: '2px solid #ffb6c1',
            borderRadius: '25px',
            boxShadow: '0 8px 16px rgba(255, 182, 193, 0.4)',
            textAlign: 'center',
            fontFamily: 'sans-serif'
        }}>
            <h2 style={{ color: '#db7093', marginTop: 0 }}>lawg in</h2>

            {error && (
                <div style={{
                    backgroundColor: '#fff0f5',
                    border: '1px solid #ffb6c1',
                    padding: '10px',
                    borderRadius: '12px',
                    marginBottom: '15px'
                }}>
                    <p style={{ color: '#d87093', fontWeight: 'bold', margin: 0, fontSize: '13px', lineHeight: '1.4' }}>
                        {error}
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ color: '#c71585', fontWeight: 'bold' }}>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginTop: '5px',
                            borderRadius: '10px',
                            border: '1px solid #ffb6c1',
                            backgroundColor: '#fff0f5',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ color: '#c71585', fontWeight: 'bold' }}>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginTop: '5px',
                            borderRadius: '10px',
                            border: '1px solid #ffb6c1',
                            backgroundColor: '#fff0f5',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>
                <button type="submit" style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#ffb6c1',
                    color: '#8b4513',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }}>
                    lawg in
                </button>
            </form>

            <p style={{ marginTop: '20px', color: '#c71585', fontSize: '14px' }}>
                u no hav account? dats sad.. no scuba :(
            </p>

            <div style={{ margin: '15px 0' }}>
                <img 
                    src="https://media1.tenor.com/m/rg_CfttQ3egAAAAd/scuba-cat.gif" 
                    alt="scuba cat" 
                    style={{ width: '120px', borderRadius: '15px' }}
                />
            </div>

            <Link to="/register" style={{ 
                color: '#db7093', 
                fontWeight: 'bold', 
                textDecoration: 'underline' 
            }}>
                scuba? register here :D
            </Link>
        </div>
    );
};