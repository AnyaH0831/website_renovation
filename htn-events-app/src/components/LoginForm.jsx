import {useState} from 'react'

function LoginForm({onLogin}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const success = onLogin(username, password);

        if (success) {
            setUsername('');
            setPassword('');
            setError('');
        }else{
            setError('Invalid username or password');
        }

    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-ultrasonic-blue border-2 border-electric-sapphire rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-sky-aqua">Login to View Private Events</h2>
        
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label className="block text-white mb-2">Username</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            </div>

            <div className="mb-4">
            <label className="block text-white mb-2">Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
            type="submit"
            className="w-full bg-neon-pink text-white py-2 rounded-md hover:bg-raspberry-plum"
            >
            Login
            </button>
        </form>
        </div>
    );
}

export default LoginForm;