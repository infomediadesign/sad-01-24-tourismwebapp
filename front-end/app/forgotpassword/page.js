'use client';

import React from 'react';
import { MdOutlineClose } from "react-icons/md";
import { useState } from 'react';
import axios from 'axios';
import {useRouter } from 'next/navigation';

const ForgetPwd = () => {
    const [email, setEmail] = useState();
    const router = useRouter();
    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:7000/users/forgotpassword', { email })
            .then(res => {
                console.log(res.data);
                router.push('/');
            }).catch(err => console.log(err));
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 w-96">
                <div className="flex justify-end">
                    <button className="text-gray-500 hover:text-gray-700">
                        <MdOutlineClose />
                    </button>
                </div>
                <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 p-2 w-full border rounded-md"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {/* Add password input and other necessary fields here */}
                    <div className="mb-6">
                        <button
                            type="submit"
                            className="bg-green-500 text-white p-2 w-full rounded-md hover:bg-green-700"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgetPwd;
