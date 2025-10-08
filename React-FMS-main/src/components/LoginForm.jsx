import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

function LoginForm() {
	const navigate = useNavigate();
	const [form, setForm] = useState({ email: '', password: '', role: 'FARMER' });
	const [status, setStatus] = useState({ type: '', msg: '' });
	const [loading, setLoading] = useState(false);

	function handleChange(e) {
		const { name, value } = e.target;
		setForm(prev => ({ ...prev, [name]: value }));
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setStatus({ type: '', msg: '' });
		if (!form.email || !form.password || !form.role) {
			setStatus({ type: 'error', msg: 'Please fill all fields' });
			return;
		}
		try {
			setLoading(true);
			const res = await axios.post(`${API}/auth/login`, form);
			if (res.data?.success) {
				const { userId, role, name, email } = res.data;
				localStorage.setItem('userId', String(userId));
				localStorage.setItem('role', role);
				localStorage.setItem('name', name);
				localStorage.setItem('email', email);
				if (role === 'FARMER') navigate('/farmer-dashboard');
				else navigate('/buyer-dashboard');
			} else {
				setStatus({ type: 'error', msg: res.data?.message || 'Invalid credentials' });
			}
		} catch (err) {
			setStatus({ type: 'error', msg: err?.response?.data?.message || err.message || 'Invalid credentials' });
		} finally {
			setLoading(false);
		}
	}

	return (
		<div style={{ maxWidth: 420, margin: '20px auto' }}>
			<h2 style={{ color: '#225c2b' }}>Login</h2>
			<form onSubmit={handleSubmit} style={{ display: 'grid', gap: 10 }}>
				<label>
					Email
					<input type="email" name="email" value={form.email} onChange={handleChange} required style={{ width: '100%' }} />
				</label>
				<label>
					Password
					<input type="password" name="password" value={form.password} onChange={handleChange} required style={{ width: '100%' }} />
				</label>
				<label>
					Role
					<select name="role" value={form.role} onChange={handleChange} required style={{ width: '100%' }}>
						<option value="FARMER">Farmer</option>
						<option value="BUYER">Buyer</option>
					</select>
				</label>
				<button type="submit" disabled={loading} style={{ background: '#2e7d32', color: 'white', border: 0, padding: 10 }}>
					{loading ? 'Logging in...' : 'Login'}
				</button>
			</form>
			{status.msg && <p style={{ color: status.type === 'error' ? '#c62828' : '#2e7d32' }}>{status.msg}</p>}
		</div>
	);
}

export default LoginForm;


