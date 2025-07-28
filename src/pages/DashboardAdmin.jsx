import React from "react";
import { useNavigate } from 'react-router-dom';

export default function DashboardAdmin() {
    const navigate = useNavigate();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Dashboard Admin / HR</h1>

            <div class="flex space-x-1 bg-gray-100 p-4 rounded-lg shadow-md">
                <button class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-100 hover:text-gray-600 transition">
                    Beranda
                </button>
                <button class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-100 hover:text-gray-600 transition">
                    Data Karyawan
                </button>
                <button class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-100 hover:text-gray-600 transition">
                    Data Absensi
                </button>
                <button class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-100 hover:text-gray-600 transition" onClick={() => navigate('/logout')}>
                    Logout
                </button>
            </div>


            <div className="grid gap-4">
                <div className="bg-white p-4 shadow rounded-xl">
                    <h2 className="text-xl font-semibold mb-2">Data Karyawan</h2>
                    <p className="text-gray-600">Fitur CRUD data karyawan akan ditampilkan di sini.</p>
                </div>

                <div className="bg-white p-4 shadow rounded-xl">
                    <h2 className="text-xl font-semibold mb-2">Data Absensi</h2>
                    <p className="text-gray-600">Admin bisa melihat semua data absensi karyawan.</p>
                </div>
            </div>
        </div>
    )
}