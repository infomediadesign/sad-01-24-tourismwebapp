'use client';
import React from 'react'
import LoginAdmin from '../components/LoginAdmin'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function page() {
    const [role, setRole] = useState(null);
    const [status, setStatus] = useState(null);
    const router = useRouter();

    if (status === "successful") {
        if (role === "admin") {
            router.push('/admin/getCountry');
        } else {
            alert("You are not an admin!")
        }
    }

    return (
        <div>
            <LoginAdmin setRole={setRole} setStatus={setStatus}/>
        </div>
    )
}
