import { useRef, useState, useEffect } from "react";

const CameraComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera(); // Detener cámara al desmontar
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
    } catch (error) {
      console.error("Error al acceder a la cámara:", error);
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
        ctx.drawImage(video, 0, 0);
        console.log(canvas.toDataURL("image/png"));
        setPhoto(canvas.toDataURL("image/png"));
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

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
        <img
          src={photo}
          alt="Captura"
          className="border rounded-lg shadow-lg w-full max-w-md"
        />
      )}
    </div>
  );
};

export default CameraComponent;
