import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, MarkerF, Polygon } from '@react-google-maps/api';
import { CSSTransition } from 'react-transition-group';
import './App.css'; // Ensure this file contains animations for .slide and .fade classes

const myLat = 36.36850987877855;
const myLong = 127.36568225918361;

const invalidLat = 36.36400697221015;
const invalidLong = 127.35876131821506;

const validLat = 36.36380482324071;
const validLong = 127.35930636177613;

const restrictedAreaCoordinates = [{ lat: 36.36657751063519, lng: 127.3572772150631 },
    { lat: 36.36338952655999, lng: 127.359357937968 },
    { lat: 36.36202557971129, lng: 127.35761295161434 },
    { lat: 36.36541525685342, lng: 127.354163142408 },
    { lat: 36.36657751063519, lng: 127.3572772150631 }];


const Renting = () => {
    const [center, setCenter] = useState({
        lat: myLat,  // Default latitude (KAIST E3)
        lng: myLong  // Default longitude (KAIST E3)
    });

    const [markers, setMarkers] = useState([
        { lat: 36.36842, lng: 127.36523, label: 'Bike1' },
        { lat: 36.36860, lng: 127.36562, label: 'Bike2' },
        { lat: 36.36855, lng: 127.36543, label: 'Bike3' },
        { lat: 36.36854, lng: 127.36554, label: 'Bike4' },
        { lat: 36.36821, lng: 127.36532, label: 'Bike5' },
        { lat: 36.36840, lng: 127.36536, label: 'Bike6' },
        { lat: 36.364003614672725, lng: 127.35912899882564, label: 'Bike7' },
        { lat: 36.36393808790216, lng: 127.35919276591893, label: 'Bike8' },
    ]);

    const [isVisible, setIsVisible] = useState(true); // Toggle for bike information section
    const [selectedBike, setSelectedBike] = useState({ lat: 36.36842, lng: 127.36523, label: 'Bike1' }); // Track selected bike for details
    const [elapsedTime, setElapsedTime] = useState(0); // Elapsed time in minutes
    const [distance, setDistance] = useState(0); // Distance in kilometers
    const [modalMessage, setModalMessage] = useState(null); // Modal message for invalid region
    const [currentFee, setCurrentFee] = useState(0);
    const navigate = useNavigate(); // For navigation
    const [mapLoaded, setMapLoaded] = useState(false);

    const onLoad = () => {
        setMapLoaded(true);
    };

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

    useEffect(() => {
        if (isVisible) {
            const timer = setInterval(() => {
                setDistance((prev) => prev + 0.1); // Simulate distance increment
            }, 60000); // Increment every minute

            return () => clearInterval(timer);
        }
    }, [isVisible]);

    const mapContainerStyle = {
        width: '100%',
        height: '85vh',
    };

    const handleReturnBike = () => {
        // Display "Requesting return..." toast message
        setModalMessage("Requesting return...");
    
        // Simulate a delay of 1 second before showing the final result
        setTimeout(() => {
            if (center.lat === 36.36400697221015 && center.lng === 127.35876131821506) {
                setModalMessage("Invalid region: Bike cannot be returned here.");
            } else {
                setModalMessage("Bike returned successfully!");
            }
        }, 1000); // 1-second delay
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

    const progressPercentage = (elapsedTime / 60) * 100;

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
                            fillColor: 'rgba(255, 0, 0, 0.4)', // Semi-transparent red
                            fillOpacity: 0.5,
                            strokeColor: 'red',
                            strokeOpacity: 1,
                            strokeWeight: 2,
                        }}
                    />
                )}                
                maps.event.trigger(map, 'resize')
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
                    <button className="flex flex-col items-center text-green-500" onClick={() => {
                        setCenter({lat: myLat, lng: myLong});
                        setDistance(0);
                        setElapsedTime(0);
                        setCurrentFee(0);
                    }}>
                        <span className="text-2xl">🚲</span>
                        <span className="text-xs">Rent Bikes</span>
                    </button>
                    <button className="flex flex-col items-center text-gray-500" onClick={() => {
                        setCenter({lat: invalidLat, lng: invalidLong});
                        setDistance(0.3);
                        setElapsedTime(10);
                        setCurrentFee(85);
                    }}>
                        <span className="text-2xl">💳</span>
                        <span className="text-xs">Payments</span>
                    </button>
                    <button className="flex flex-col items-center text-gray-500" onClick={() => {
                        setCenter({lat: validLat, lng: validLong});
                        setDistance(0.4);
                        setElapsedTime(12);
                        setCurrentFee(100);
                    }}>
                        <span className="text-2xl">🛠️</span>
                        <span className="text-xs">Manage Bikes</span>
                    </button>
                    <button className="flex flex-col items-center text-gray-500">
                        <span className="text-2xl">⚙️</span>
                        <span className="text-xs">Settings</span>
                    </button>
                </div>
            </div>

            <CSSTransition
                in={isVisible}
                timeout={300}
                classNames="slide"
                unmountOnExit
            >
                <div className="p-6 bg-white rounded-t-3xl shadow-lg absolute bottom-16 left-0 w-full z-50">
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold mb-4" style={{ fontSize: '1.5rem' }}>Rental Status</h2>
                        <p className="text-lg font-semibold" style={{ fontSize: '1.5rem' }}>Bike Name: {selectedBike?.label}</p>
                    </div>
                    <div className="mb-4">
                        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                            <div
                                className="bg-blue-500 h-4"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2" style={{ fontSize: '1rem' }}>Elapsed Time: {elapsedTime} minutes</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-lg font-semibold" style={{ fontSize: '1.5rem' }}>Current Fee: {currentFee} P</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-lg font-semibold" style={{ fontSize: '1.5rem' }}>Distance: {distance.toFixed(2)} km</p>
                    </div>
                    <div className="mt-4 space-y-4">
                        <button
                            className="w-full py-2 px-4 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                            style={{ fontSize: '1.5rem' }}
                            onClick={handleReturnBike}
                        >
                            Return this bike
                        </button>
                        <button
                            className="w-full py-2 px-4 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
                            style={{ fontSize: '1.5rem' }}
                            onClick={handleReturnBike}
                        >
                            Report defects
                        </button>
                    </div>
                </div>
            </CSSTransition>
            {modalMessage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-lg font-semibold mb-4">{modalMessage}</p>
                        <button
                            style={{width: "100%"}}
                            className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                            onClick={() => setModalMessage(null)}
                        >
                            {modalMessage === "Bike returned successfully!" ? "End rent & Write a review" : "Close"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Renting;