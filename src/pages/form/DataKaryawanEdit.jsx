import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function DataKaryawanEdit() {

    const API_ENDPOINT = 'http://localhost:3000';
    const getToken = localStorage.getItem('token');
    const navigate = useNavigate();
    const { id } = useParams();

    const [form, setForm] = useState({
        nama: "",
        email: "",
        no_handphone: "",
        jabatan: "",
        userId: "",
    });

    //for user
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(API_ENDPOINT+"/auth/users", {
                    headers: {
                        Authorization: `Bearer ${getToken}`,
                    },
                });
                setUsers(res.data.data);
            } catch (error) {
                console.error("Gagal mengambil user", error);
            }
        };

        const fetchKaryawan = async () => {
            try {
            const res = await axios.get(`${API_ENDPOINT}/karyawan/${id}`, {
                headers: { Authorization: `Bearer ${getToken}` }
            });
            setForm(res.data.data);
            } catch (error) {
            console.error("Gagal mengambil data karyawan", error);
            }
        };

        fetchKaryawan();
        fetchUsers();
    }, []);


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm({
            ...form,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            //delete id in body formData
            const formCopy = { ...form };
            delete formCopy.id;

            const dataSend = {
                ...formCopy,
                userId: Number(form.userId),
            };

            await axios.patch(API_ENDPOINT+"/karyawan/"+id, dataSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${getToken}`,
                },
            });

            alert("Data karyawan berhasil diubah!");
            navigate("/admin/karyawan");
        } catch (err) {
            console.error(err);
            alert("Gagal mengubah data karyawan.");
        }
    };

    return (
        <div className="p-4 bg-white rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Ubah Data Karyawan</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold">Nama</label>
                    <input
                        type="text"
                        name="nama"
                        value={form.nama}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold">No HP</label>
                    <input
                        type="text"
                        name="no_handphone"
                        value={form.no_handphone}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold">Jabatan</label>
                    <select
                        name="jabatan"
                        value={form.jabatan}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    >
                        <option value="">-- Pilih Jabatan --</option>
                        <option value="STAFF">STAFF</option>
                        <option value="HRD">SUPERVISOR</option>
                        <option value="MANAGER">MANAGER</option>
                        <option value="MANAGER">DIREKSI</option>
                    </select>
                </div>

                <div>
                    <label className="block font-semibold">User (Login terkait)</label>
                    <select
                        name="userId"
                        value={form.userId}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    >
                        <option value="">-- Pilih User --</option>
                        {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.user} ({user.role})
                        </option>
                        ))}
                    </select>
                    </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Simpan
                </button>
            </form>
        </div>
    );
}
