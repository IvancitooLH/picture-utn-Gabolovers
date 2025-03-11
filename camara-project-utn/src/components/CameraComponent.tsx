import { useRef, useState } from "react";
import useCamera from "../hooks/useCamera";
import uploadPhoto from "../utils/uploadPhoto";

const CameraComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { startCamera, stopCamera, takePhoto, photo, stream } = useCamera(
    videoRef,
    canvasRef
  );
  const [uploading, setUploading] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-xl font-bold">Cámara Virtual en React</h1>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="border rounded-lg shadow-lg w-full max-w-md"
      />
      <button
        onClick={startCamera}
        className="px-4 py-2 bg-green-500 text-white rounded-md"
      >
        Iniciar Cámara
      </button>
      <button
        onClick={takePhoto}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Capturar Foto
      </button>
      <button
        onClick={stopCamera}
        className="px-4 py-2 bg-red-500 text-white rounded-md"
      >
        Detener Cámara
      </button>
      <canvas ref={canvasRef} className="hidden" />
      {photo && (
        <>
          <img
            src={photo}
            alt="Captura"
            className="border rounded-lg shadow-lg w-full max-w-md"
          />
          <button
            onClick={() => uploadPhoto(photo, setUploading)}
            disabled={uploading}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            {uploading ? "Subiendo..." : "Subir a Cloudinary"}
          </button>
        </>
      )}
    </div>
  );
};

export default CameraComponent;
