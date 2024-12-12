import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, MarkerF, Polygon } from '@react-google-maps/api';
import { CSSTransition } from 'react-transition-group';
import './App.css'; // Ensure this file contains animations for .slide and .fade classes

const myLat = 36.36850987877855;
const myLong = 127.36568225918361;

const restrictedAreaCoordinates = [{ lat: 36.36657751063519, lng: 127.3572772150631 },
    { lat: 36.36338952655999, lng: 127.359357937968 },
    { lat: 36.36202557971129, lng: 127.35761295161434 },
    { lat: 36.36541525685342, lng: 127.354163142408 },
    { lat: 36.36657751063519, lng: 127.3572772150631 }];

const Home = () => {
    const [center, setCenter] = useState({
        lat: myLat,  // Default latitude (KAIST E3)
        lng: myLong  // Default longitude (KAIST E3)
    });

    const [mapLoaded, setMapLoaded] = useState(false);

    const onLoad = () => {
        setMapLoaded(true);
    };


    const [markers, setMarkers] = useState([
        { lat: 36.36842, lng: 127.36523, label: 'Bike1' },
        { lat: 36.36860, lng: 127.36562, label: 'Bike2' },
        { lat: 36.36855, lng: 127.36543, label: 'Bike3' },
        { lat: 36.36854, lng: 127.36554, label: 'Bike4' },
        { lat: 36.36821, lng: 127.36532, label: 'Bike5' },
        { lat: 36.36840, lng: 127.36536, label: 'Bike6' },
    ]);

    const [isVisible, setIsVisible] = useState(false); // Toggle for bike information section
    const [selectedBike, setSelectedBike] = useState(null); // Track selected bike for details

    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCenter({ lat: myLat, lng: myLong });
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

    const handleMarkerClick = (marker) => {
        console.log('Marker clicked:', marker); // Debugging statement
        if (selectedBike && selectedBike.label === marker.label) {
            setIsVisible(!isVisible); // Toggle visibility if the same marker is clicked
        } else {
            setSelectedBike(marker);
            setIsVisible(true); // Show details for the newly selected bike
        }
    };

    return (
        <div className="w-full h-screen bg-white relative">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={18}
                onLoad={onLoad}
            >
                {mapLoaded && (
                    <Polygon
                        paths={restrictedAreaCoordinates}
                        options={{
                            fillColor: 'rgba(255, 0, 0, 0.4)',
                            strokeColor: 'red',
                            strokeWeight: 2,
                        }}
                    />
                )}
                {markers.map((marker, index) => (
                    <MarkerF
                        key={index}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={{
                            url: 'https://maps.google.com/mapfiles/kml/shapes/cycling.png', // Marker icon for bikes
                            scaledSize: { width: 32, height: 32 }
                        }}
                        onClick={() => handleMarkerClick(marker)}
                    />
                ))}
                <MarkerF
                    position={center}
                    icon={{
                        url: 'https://maps.google.com/mapfiles/kml/shapes/man.png', // Marker icon for user location
                        scaledSize: { width: 32, height: 32 }
                    }}
                />
            </GoogleMap>

            <CSSTransition
                in={isVisible}
                timeout={300}
                classNames="slide"
                unmountOnExit
            >
                <div className="p-6 bg-white rounded-t-3xl shadow-lg -mt-6 absolute bottom-0 left-0 w-full z-50">
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold">{selectedBike?.label}</h2>
                        <p className="text-green-600 font-semibold">Available</p>
                    </div>
                    <div className="flex items-center mb-4">
                        <div className="text-yellow-400 text-lg">⭐⭐⭐⭐☆</div>
                    </div>
                    <div className="flex items-center mb-4">
                        <img
                            src="https://via.placeholder.com/50"
                            alt="Host"
                            className="w-12 h-12 object-cover rounded-full mr-4"
                        />
                        <p className="font-semibold">Host: JohnDoe123</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Reviews:</h3>
                        <ul className="space-y-2">
                            <li className="bg-gray-100 p-2 rounded-md">
                                <strong>ucsa**:</strong> This bike is excellent!
                            </li>
                            <li className="bg-gray-100 p-2 rounded-md">
                                <strong>arron**:</strong> Smooth ride, highly recommend!
                            </li>
                            <li className="bg-gray-100 p-2 rounded-md">
                                <strong>jessy**:</strong> Good for short distances.
                            </li>
                        </ul>
                    </div>
                </div>
            </CSSTransition>

            <div className="absolute bottom-0 w-full bg-white py-4 shadow-lg z-40">
                <div className="flex justify-center mb-2">
                    <button
                        className="py-3 px-6 bg-blue-500 text-white text-lg rounded-lg shadow hover:bg-blue-600 transition"
                        onClick={() => navigate('/qr-scanner')}
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