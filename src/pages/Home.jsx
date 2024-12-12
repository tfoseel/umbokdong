import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const Home = () => {
    const [center, setCenter] = useState({
        lat: 36.36850987877855,  // Default latitude (KAIST E3)
        lng: 127.36568225918361  // Default longitude (KAIST E3)
    });

    const [markers, setMarkers] = useState([
        { lat: 36.36850, lng: 127.36523, label: 'Bike1' },
        { lat: 36.36860, lng: 127.36562, label: 'Bike2' },
        { lat: 36.36855, lng: 127.36543, label: 'Bike3' },
        { lat: 36.36854, lng: 127.36554, label: 'Bike4' },
        { lat: 36.36821, lng: 127.36532, label: 'Bike5' },
        { lat: 36.36840, lng: 127.36536, label: 'Bike6' },
    ]);

    const [isVisible, setIsVisible] = useState(true); // Toggle for bike information section

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCenter({ lat: 36.36850987877855, lng: 127.36568225918361 });
                },
                (error) => {
                    console.error("Error fetching location", error);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }, []);

    const mapContainerStyle = {
        width: '100%',
        height: '85vh',
    };

    return (
        <div className="w-full h-screen bg-white">
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={18}
                >
                    {markers.map((marker, index) => (
                        <MarkerF
                            key={index}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            icon={{
                                url: 'https://maps.google.com/mapfiles/kml/shapes/cycling.png', // Marker icon for bikes
                                scaledSize: { width: 40, height: 40 }
                            }}
                        />
                    ))}
                    <MarkerF
                        position={center}
                        icon={{
                            url: 'https://maps.google.com/mapfiles/kml/shapes/man.png', // Marker icon for user location
                            scaledSize: { width: 40, height: 40 }
                        }}
                    />
                </GoogleMap>
            </LoadScript>

            {isVisible && (
                <div className="p-4 bg-white rounded-t-3xl shadow-lg -mt-6 relative">
                    <h2 className="text-2xl font-bold">Scanned Bike</h2>
                    <div className="flex items-center space-x-4 mt-4">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Bike"
                            className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                            <p className="bg-green-100 p-2 rounded-md text-sm">
                                <strong>ucsa**:</strong> This bike is so good
                            </p>
                            <p className="bg-green-100 p-2 rounded-md text-sm mt-2">
                                <strong>arron**:</strong> This bike is so bad
                            </p>
                            <button className="text-blue-500 text-sm mt-2">view more.</button>
                        </div>
                    </div>

                    <div className="flex items-center mt-4">
                        <div className="text-yellow-400">⭐⭐⭐⭐☆</div>
                    </div>

                    <button
                        onClick={() => alert('Bike rented successfully!')}
                        className="w-full py-3 mt-6 bg-green-500 text-white text-lg rounded-lg shadow hover:bg-green-600 transition"
                    >
                        Rent It
                    </button>
                </div>
            )}

            <div className="absolute bottom-0 w-full bg-white py-4 shadow-lg">
                <div className="flex justify-center mb-2">
                    <button
                        className="py-3 px-6 bg-blue-500 text-white text-lg rounded-lg shadow hover:bg-blue-600 transition"
                        onClick={() => alert('QR Scanner activated!')}
                    >
                        Scan QR Code
                    </button>
                </div>
                <div className="flex justify-around">
                    <button className="flex flex-col items-center text-green-500">
                        <span className="text-2xl">🚲</span>
                        <span className="text-xs">Rent Bikes</span>
                    </button>
                    <button className="flex flex-col items-center text-gray-500">
                        <span className="text-2xl">💳</span>
                        <span className="text-xs">Payments</span>
                    </button>
                    <button className="flex flex-col items-center text-gray-500">
                        <span className="text-2xl">🛠️</span>
                        <span className="text-xs">Manage Bikes</span>
                    </button>
                    <button className="flex flex-col items-center text-gray-500">
                        <span className="text-2xl">⚙️</span>
                        <span className="text-xs">Settings</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;