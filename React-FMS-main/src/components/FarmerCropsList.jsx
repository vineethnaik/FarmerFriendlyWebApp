import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

function FarmerCropsList({ farmerId }) {
	const [crops, setCrops] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		async function fetchCrops() {
			if (!farmerId) {
				setError('Missing farmerId');
				return;
			}
			setLoading(true);
			setError('');
			try {
				const res = await axios.get(`${API_BASE_URL}/farmers/${farmerId}/crops`);
				setCrops(res.data || []);
			} catch (err) {
				const msg = err?.response?.data?.message || err.message || 'Failed to load crops.';
				setError(msg);
			} finally {
				setLoading(false);
			}
		}
		fetchCrops();
	}, [farmerId]);

	async function handleDelete(id) {
		if (!window.confirm('Delete this crop?')) return;
		try {
			await axios.delete(`${API_BASE_URL}/crops/${id}`);
			setCrops(prev => prev.filter(c => c.id !== id));
		} catch (err) {
			alert('Failed to delete.');
		}
	}

	if (loading) return <p>Loading...</p>;
	if (error) return <p style={{ color: 'red' }}>{error}</p>;

	return (
		<div style={{ maxWidth: 900, margin: '20px auto' }}>
			<h2>Your Crops</h2>
			{crops.length === 0 ? (
				<p>No crops yet.</p>
			) : (
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
					{crops.map(crop => (
						<div key={crop.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
							{crop.imageUrl && (
								<img
									src={crop.imageUrl}
									alt={crop.cropName}
									style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 6, marginBottom: 8 }}
								/>
							)}
							<h3 style={{ margin: '4px 0' }}>{crop.cropName}</h3>
							<p style={{ margin: '4px 0', color: '#666' }}>{crop.cropType}</p>
							<p style={{ margin: '4px 0' }}><strong>Qty:</strong> {crop.quantity}</p>
							<p style={{ margin: '4px 0' }}><strong>Price:</strong> ₹{crop.price}</p>
							<p style={{ margin: '4px 0' }}><strong>Harvest:</strong> {crop.harvestDate}</p>
							<p style={{ margin: '4px 0' }}>{crop.location}</p>
							<p style={{ margin: '4px 0', color: '#555' }}>{crop.description}</p>
							<button onClick={() => handleDelete(crop.id)} style={{ marginTop: 8, background: '#c62828', color: 'white' }}>
								Delete
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default FarmerCropsList;


