import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_ENDPOINT = import.meta.env.VITE_API_URL;

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    nama: "",
    email: "",
    no_handphone: "",
    jabatan: "",
    userId: "",
  });

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  // Ambil data karyawan berdasarkan userId
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_ENDPOINT}/karyawan/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data.data;
        setProfile(data);
        setForm({
            nama: data.nama,
            email: data.email,
            no_handphone: data.no_handphone,
            jabatan: data.jabatan
        });
      } catch (err) {
        console.error('Gagal ambil data profil', err);
      }
    };

    if (userId && token) {
      fetchProfile();
    }
  }, [userId, token]);

  // Handle form input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Update profil
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`${API_ENDPOINT}/karyawan/${profile.id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Profil berhasil diperbarui!');
      setProfile(res.data.data);
    } catch (err) {
      console.error('Gagal update profil', err);
      alert('Gagal update profil');
    }
  };

  if (!profile) return <p>Loading profil...</p>;

  return (
    <div className="p-4 bg-white shadow rounded-lg mt-10">
      <h2 className="text-xl font-semibold mb-4">Profil Saya</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Nama</label>
          <input type="text" name="nama" value={form.nama} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block">No Handphone</label>
          <input type="text" name="no_handphone" value={form.no_handphone} onChange={handleChange} className="border p-2 w-full" />
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
            <option value="HRD">HRD</option>
            <option value="SUPERVISOR">SUPERVISOR</option>
            <option value="MANAGER">MANAGER</option>
            <option value="DIREKSI">DIREKSI</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Simpan</button>
      </form>
    </div>
  );
};

export default UserProfile;
