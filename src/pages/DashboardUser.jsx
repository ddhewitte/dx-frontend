import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

export default function DashboardUser() {
    const navigate = useNavigate();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Dashboard User | <small>Dexa Group</small></h1>

            <div class="flex space-x-1 bg-gray-100 p-4 rounded-lg shadow-md mb-6">
                <button class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-100 hover:text-gray-600 transition">
                    Beranda
                </button>
                <button class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-100 hover:text-gray-600 transition">
                    Profile
                </button>
                <button class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-100 hover:text-gray-600 transition">
                    Absensi
                </button>
                <button class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-100 hover:text-gray-600 transition">
                    Summary Absensi
                </button>
                <button class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-100 hover:text-gray-600 transition" onClick={() => navigate('/logout')}>
                    Logout
                </button>
            </div>

            <div className="grid gap-4">
                <Outlet />
            </div>
        </div>
    );
};

