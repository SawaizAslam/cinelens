import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { RefreshCw, Check } from 'lucide-react';

interface CameraCaptureProps {
    onCapture: (imageSrc: string) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture }) => {
    const webcamRef = useRef<Webcam>(null);
    const [imgSrc, setImgSrc] = useState<string | null>(null);

    const capture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                setImgSrc(imageSrc);
            }
        }
    }, [webcamRef]);

    const retake = () => {
        setImgSrc(null);
    };

    const confirm = () => {
        if (imgSrc) {
            onCapture(imgSrc);
        }
    };

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    return (
        <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-white/10 flex flex-col items-center justify-center">
            {imgSrc ? (
                <img src={imgSrc} alt="Captured" className="w-full h-full object-cover" />
            ) : (
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    className="w-full h-full object-cover"
                />
            )}

            <div className="absolute bottom-6 flex gap-4">
                {!imgSrc ? (
                    <button
                        onClick={capture}
                        className="w-16 h-16 rounded-full border-4 border-white/80 bg-red-600 hover:bg-red-500 hover:scale-105 transition-all shadow-lg shadow-red-900/50"
                    ></button>
                ) : (
                    <>
                        <button
                            onClick={retake}
                            className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium hover:bg-white/20 transition-all flex items-center gap-2"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Retake
                        </button>
                        <button
                            onClick={confirm}
                            className="px-6 py-2 rounded-full bg-primary text-white font-medium hover:bg-indigo-500 transition-all flex items-center gap-2 shadow-lg shadow-primary/30"
                        >
                            <Check className="w-4 h-4" />
                            Use Photo
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default CameraCapture;
