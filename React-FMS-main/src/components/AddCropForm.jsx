import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

const initialForm = {
	cropName: '',
	cropType: '',
	quantity: '',
	price: '',
	harvestDate: '',
	location: '',
	description: '',
	image: null
};

function AddCropForm({ farmerId }) {
	const [form, setForm] = useState(initialForm);
	const [status, setStatus] = useState({ type: '', msg: '' });
	const [submitting, setSubmitting] = useState(false);

	function handleChange(e) {
		const { name, value, files } = e.target;
		if (name === 'image') {
			setForm(prev => ({ ...prev, image: files && files[0] ? files[0] : null }));
		} else {
			setForm(prev => ({ ...prev, [name]: value }));
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setStatus({ type: '', msg: '' });
		if (!farmerId) {
			setStatus({ type: 'error', msg: 'Missing farmerId' });
			return;
		}
		try {
			setSubmitting(true);
			const data = new FormData();
			data.append('cropName', form.cropName);
			data.append('cropType', form.cropType);
			data.append('quantity', form.quantity);
			data.append('price', form.price);
			data.append('harvestDate', form.harvestDate);
			data.append('location', form.location);
			data.append('description', form.description);
			if (form.image) data.append('image', form.image);

			const url = `${API_BASE_URL}/farmers/${farmerId}/crops`;
			await axios.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } });
			setStatus({ type: 'success', msg: 'Crop added successfully!' });
			setForm(initialForm);
		} catch (err) {
			const msg = err?.response?.data?.message || err.message || 'Failed to add crop.';
			setStatus({ type: 'error', msg });
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<div style={{ maxWidth: 640, margin: '20px auto' }}>
			<h2>Add Crop</h2>
			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: 10 }}>
					<label>Crop Name</label>
					<input name="cropName" value={form.cropName} onChange={handleChange} required style={{ width: '100%' }} />
				</div>
				<div style={{ marginBottom: 10 }}>
					<label>Crop Type</label>
					<input name="cropType" value={form.cropType} onChange={handleChange} required style={{ width: '100%' }} />
				</div>
				<div style={{ display: 'flex', gap: 10 }}>
					<div style={{ flex: 1 }}>
						<label>Quantity</label>
						<input type="number" name="quantity" value={form.quantity} onChange={handleChange} required style={{ width: '100%' }} />
					</div>
					<div style={{ flex: 1 }}>
						<label>Price</label>
						<input type="number" step="0.01" name="price" value={form.price} onChange={handleChange} required style={{ width: '100%' }} />
					</div>
				</div>
				<div style={{ margin: '10px 0' }}>
					<label>Harvest Date</label>
					<input type="date" name="harvestDate" value={form.harvestDate} onChange={handleChange} required style={{ width: '100%' }} />
				</div>
				<div style={{ marginBottom: 10 }}>
					<label>Location</label>
					<input name="location" value={form.location} onChange={handleChange} required style={{ width: '100%' }} />
				</div>
				<div style={{ marginBottom: 10 }}>
					<label>Description</label>
					<textarea name="description" value={form.description} onChange={handleChange} rows={4} style={{ width: '100%' }} />
				</div>
				<div style={{ marginBottom: 10 }}>
					<label>Image</label>
					<input type="file" name="image" accept="image/*" onChange={handleChange} />
				</div>
				<button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Add Crop'}</button>
			</form>
			{status.msg && (
				<p style={{ color: status.type === 'error' ? 'red' : 'green' }}>{status.msg}</p>
			)}
		</div>
	);
}

export default AddCropForm;


