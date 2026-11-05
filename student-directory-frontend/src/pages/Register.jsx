import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.status === 409) {
                setError("wait... dis email is already in the system. u trynna steal someone's identity??");
                return;
            }

            if (!response.ok) {
                setError(data.error?.toLowerCase() || 'register failed... neco arc is disappointed /ᐠ ╥ ˕ ╥マ');
                return;
            }

            navigate('/login');
        } catch (err) {
            setError("heh sorryyy server kinda cooked rn :3 (or maybe network is being silly)");
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
            <h2 style={{ color: '#db7093', marginTop: 0 }}>buranyaaa</h2>

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
                        minLength={8}
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
                    Register
                </button>
            </form>

            <div style={{ margin: '15px 0' }}>
                <img 
                    src="https://media.tenor.com/hn3MPRW90DUAAAAj/neco-arc.gif" 
                    alt="neco arc" 
                    style={{ width: '100px', borderRadius: '15px' }}
                />
            </div>

            <p style={{ marginTop: '15px', color: '#c71585', fontSize: '14px' }}>
                already have an account?{' '}
                <Link to="/login" style={{ color: '#db7093', fontWeight: 'bold' }}>
                    then lets go scuba :D
                </Link>
            </p>
        </div>
    );
};