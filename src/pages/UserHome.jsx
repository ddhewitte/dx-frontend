export default function UserHome() {
    return (
        <>
            <div className="bg-white p-4 shadow rounded-xl">
                <h2 className="text-xl font-semibold mb-2">Profile</h2>
                <p className="text-gray-600">Atur Profile anda disini</p>
            </div>

            <div className="bg-white p-4 shadow rounded-xl">
                <h2 className="text-xl font-semibold mb-2">Data Absensi</h2>
                <p className="text-gray-600">User bisa mengisi absensi.</p>
            </div>

             <div className="bg-white p-4 shadow rounded-xl">
                <h2 className="text-xl font-semibold mb-2">Data Summary</h2>
                <p className="text-gray-600">User bisa melihat semua data summarynya.</p>
            </div>
        </>

    )
}