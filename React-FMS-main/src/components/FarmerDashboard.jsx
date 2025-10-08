import React from 'react';
import AddCropForm from './AddCropForm';
import FarmerCropsList from './FarmerCropsList';

function FarmerDashboard({ farmerId }) {
	return (
		<div style={{ padding: 20 }}>
			<h1>Farmer Dashboard</h1>
			<AddCropForm farmerId={farmerId} />
			<FarmerCropsList farmerId={farmerId} />
		</div>
	);
}

export default FarmerDashboard;


