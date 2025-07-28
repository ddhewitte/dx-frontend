import { useState } from "react";

export default function AuthForm({ onLogin }){

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const submitProcess = async (e) => {
        e.preventDefault();
        onLogin({ user, password });
    };

    return(
        <div className="flex items-center h-screen w-full">
            <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
            <span className="block w-full text-xl uppercase font-bold mb-4">Login</span>      
                <form className="mb-4" onSubmit={submitProcess}>
                <div className="mb-4 md:w-full">
                    <label htmlFor="email" className="block text-xs mb-1">Username</label>
                    <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="text" name="user" id="user" placeholder="Username" value={user} onChange={(e) => setUser(e.target.value)} required/>
                </div>
                <div className="mb-6 md:w-full">
                    <label htmlFor="password" className="block text-xs mb-1">Password</label>
                    <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="password" name="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">Login</button>
                </form>
                <span>you can login as HR admin or user</span>
            </div>
        </div>
    )
}