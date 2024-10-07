import React, { useState } from 'react';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('guest'); // Default role is 'guest'

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle sign-up logic here (e.g., form validation, API call)
        console.log('Email:', email, 'Password:', password, 'Confirm Password:', confirmPassword, 'Role:', role);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-xs sm:max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirm-password" className="block text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                            placeholder="Confirm your password"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Select Role</label>
                        <div className="mt-1 flex space-x-4">
                            <div>
                                <input
                                    type="radio"
                                    id="guest"
                                    name="role"
                                    value="guest"
                                    checked={role === 'guest'}
                                    onChange={() => setRole('guest')}
                                    className="mr-2"
                                />
                                <label htmlFor="guest">Guest (Rent Bikes)</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="host"
                                    name="role"
                                    value="host"
                                    checked={role === 'host'}
                                    onChange={() => setRole('host')}
                                    className="mr-2"
                                />
                                <label htmlFor="host">Host (Lend Bikes)</label>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <p className="mt-6 text-center text-gray-600">
                    Already have an account? <a href="/umbokdong/signin" className="text-indigo-600 hover:underline">Sign In</a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
