import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardUser() {
    const navigate = useNavigate();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Dashboard User</h1>

            <div class="flex space-x-1 bg-gray-100 p-4 rounded-lg shadow-md">
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
                <div className="bg-white p-4 shadow rounded-xl">
                    <h2 className="text-xl font-semibold mb-2">Profile</h2>
                    <p className="text-gray-600">User bisa melihat dan update profil pribadi.</p>
                </div>

                <div className="bg-white p-4 shadow rounded-xl">
                    <h2 className="text-xl font-semibold mb-2">Absensi</h2>
                    <p className="text-gray-600">Fitur absensi harian user.</p>
                </div>

                <div className="bg-white p-4 shadow rounded-xl">
                    <h2 className="text-xl font-semibold mb-2">Summary</h2>
                    <p className="text-gray-600">Ringkasan kehadiran atau absensi bulanan.</p>
                </div>
            </div>
        </div>
    );
};

