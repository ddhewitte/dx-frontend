export default function AdminHome() {
    return (
        <>
            <div className="bg-white p-4 shadow rounded-xl">
                <h2 className="text-xl font-semibold mb-2">Data Karyawan</h2>
                <p className="text-gray-600">Fitur CRUD data karyawan akan ditampilkan di sini.</p>
            </div>

            <div className="bg-white p-4 shadow rounded-xl">
                <h2 className="text-xl font-semibold mb-2">Data Absensi</h2>
                <p className="text-gray-600">Admin bisa melihat semua data absensi karyawan.</p>
            </div>
        </>

    )
}