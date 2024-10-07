import React, { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const Home = () => {
    const [center, setCenter] = useState({
        lat: 37.5665,  // Default latitude (Seoul)
        lng: 126.9780  // Default longitude (Seoul)
    });

    const handleRentBike = () => {
        alert('Bike rented successfully!');
    };

    return (
        <div className="relative w-full h-screen">
            {/* Kakao Map */}
            <Map
                center={center}
                style={{ width: '100%', height: '100%' }}  // Full-screen map
                level={3} // Zoom level
            >
                {/* Marker at the center */}
                <MapMarker position={center}>
                    <div style={{ color: '#000' }}>Seoul</div>
                </MapMarker>
            </Map>

            {/* Rent a Bike Button */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 sm:w-1/2">
                <button
                    onClick={handleRentBike}
                    className="w-full py-3 bg-indigo-600 text-white text-lg rounded-lg shadow-lg hover:bg-indigo-700 transition"
                >
                    Rent a Bike
                </button>
            </div>
        </div>
    );
};

export default Home;
