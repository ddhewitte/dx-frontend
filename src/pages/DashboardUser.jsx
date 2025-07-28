import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

export default function DashboardUser() {
    const navigate = useNavigate();
    const getUser = localStorage.getItem('user');

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Dashboard User (Dexa Group) | <small>Selamat Datang, { getUser ?? 'user' }</small></h1>

            <div className="flex space-x-1 bg-gray-100 p-4 rounded-lg shadow-md mb-6">
                <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-100 hover:text-gray-600 transition"  onClick={() => navigate('/user')}>
                    Beranda
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-100 hover:text-gray-600 transition"  onClick={() => navigate('/user/profile')}>
                    Profile
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-100 hover:text-gray-600 transition" onClick={() => navigate('/user/absensi')}>
                    Absensi
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-100 hover:text-gray-600 transition" onClick={() => navigate('/user/summary')}>
                    Summary Absensi
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-100 hover:text-gray-600 transition" onClick={() => navigate('/logout')}>
                    Logout
                </button>
            </div>

            <div className="grid gap-4">
                <Outlet />
            </div>
        </div>
    );
};

