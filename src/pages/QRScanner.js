import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// Styles
import "./QRScanner.css";

// Qr Scanner
import QrScanner from "qr-scanner";
import QrFrame from "../assets/qr-frame.svg";

const QrReader = () => {
    // QR States
    const scanner = useRef();
    const videoEl = useRef(null);
    const qrBoxEl = useRef(null);
    const [qrOn, setQrOn] = useState(true);
    const [scannedResult, setScannedResult] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();


    const [cameraStatus, setCameraStatus] = useState('unknown');

    const requestCameraAccess = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setCameraStatus('granted');
            console.log('Camera access granted:', stream);
        } catch (error) {
            setCameraStatus('denied');
            console.error('Error accessing the camera:', error);
        }
    };

    const checkPermission = () => {
        navigator.permissions.query({ name: 'camera' }).then((result) => {
            setCameraStatus(result.state);
        }).catch((error) => {
            console.error('Permission API not supported', error);
        });
    };
    
    // Success
    const onScanSuccess = (result) => {
        console.log(result);
        setScannedResult(result?.data);
        setIsModalVisible(true); // Show modal
    };

    // Fail
    const onScanFail = (err) => {
        console.log(err);
    };

    useEffect(() => {
        let videoElCurrent = videoEl?.current;
        if (videoEl?.current && !scanner.current) {
            // 👉 Instantiate the QR Scanner
            scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
                onDecodeError: onScanFail,
                preferredCamera: "environment",
                highlightScanRegion: true,
                highlightCodeOutline: true,
                overlay: qrBoxEl?.current || undefined,
            });

            // 🚀 Start QR Scanner
            scanner?.current
                ?.start()
                .then(() => setQrOn(true))
                .catch((err) => {
                    if (err) setQrOn(false);
                });
        }

        // 🧹 Clean up on unmount.
        return () => {
            if (!videoElCurrent) {
                scanner?.current?.stop();
            }
        };
    }, []);

    useEffect(() => {
        if (!qrOn)
            alert(
                "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
            );
    }, [qrOn]);

    return (
        <div className="qr-reader" style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
            <video ref={videoEl} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}></video>
            <div
                ref={qrBoxEl}
                className="qr-box"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                }}
            >
                <img
                    src={QrFrame}
                    alt="Qr Frame"
                    width={256}
                    height={256}
                    className="qr-frame"
                />
            </div>

            {isModalVisible && (
                <div
                    className="modal"
                    style={{
                        position: "fixed",
                        width: "80%",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1000,
                        backgroundColor: "white",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <div className="modal-content" style={{ textAlign: "center", fontSize: '1.5rem' }}>
                        <p><strong>Bike Name:</strong> Bike1</p>
                        <p style={{ color: "green", fontWeight: "bold" }}>Status: Available</p>
                        <p><strong>Rental Fee:</strong> 500 P/hour</p>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "10px 0" }}>
                            <img
                                src="https://via.placeholder.com/50"
                                alt="Host Profile"
                                style={{ borderRadius: "50%", marginRight: "10px" }}
                            />
                            <span><strong>Host:</strong> JohnDoe123</span>
                            <br></br>
                        </div>
                        <p className="mb-2">⭐⭐⭐⭐☆</p>
                        <button
                            onClick={() => navigate("/renting")}
                            className="confirm-button"
                            style={{
                                margin: "10px",
                                padding: "10px 20px",
                                backgroundColor: "green",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Confirm
                        </button>
                        <button
                            onClick={() => setIsModalVisible(false)}
                            className="close-button"
                            style={{
                                margin: "10px",
                                padding: "10px 20px",
                                backgroundColor: "red",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QrReader;