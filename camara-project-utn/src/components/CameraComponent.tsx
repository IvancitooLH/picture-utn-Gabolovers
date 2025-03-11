import { useRef, useState, useEffect } from "react";

const CameraComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      streamRef.current = mediaStream;
    } catch (error) {
      console.error("Error al acceder a la cámara:", error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const takePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.translate(canvas.width, 0); // Mover el origen al otro lado
        ctx.scale(-1, 1); // Reflejar horizontalmente

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setPhoto(canvas.toDataURL("image/png"));
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-xl font-bold">Cámara Virtual en React</h1>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="border rounded-lg shadow-lg w-full max-w-md transform scale-x-[-1]"
      />
      <button
        onClick={takePhoto}
        className="px-4 py-2 text-white bg-blue-500 rounded-md"
      >
        Capturar Foto
      </button>

      <button
        onClick={stopCamera}
        className="px-4 py-2 text-white bg-red-500 rounded-md"
      >
        Detener Cámara
      </button>
      <button
        onClick={startCamera}
        className="px-4 py-2 text-white bg-red-500 rounded-md"
      >
        Iniciar Cámara
      </button>
      <canvas ref={canvasRef} className="hidden" />
      {photo && (
        <img
          src={photo}
          alt="Captura"
          className="w-full max-w-md border rounded-lg shadow-lg"
        />
      )}
    </div>
  );
};

export default CameraComponent;
