import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Mockup login logic
        if (email === 'umbokdong@kaist.ac.kr' && password === '11111111') {
            navigate('/home');
        } else {
            alert('Invalid email or password');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="w-full max-w-sm">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full">
                        <span className="text-2xl font-bold">U</span>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-center mb-6">Umbokdong</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="relative">
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg hover:from-blue-500 hover:to-purple-600"
                    >
                        Sign in
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Don't have an account? <Link to="/signup" className="text-indigo-600 hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
