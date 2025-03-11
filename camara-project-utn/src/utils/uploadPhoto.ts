const uploadPhoto = async (photo: string, setUploading: (state: boolean) => void) => {
    setUploading(true);
    const cloudinaryURL = "https://api.cloudinary.com/v1_1/{CLOUD_NAME}/image/upload"; // Reemplaza {CLOUD_NAME}
    const formData = new FormData();
    formData.append("file", photo);
    formData.append("upload_preset", "your_upload_preset"); // Reemplaza con tu preset
  
    try {
      const response = await fetch(cloudinaryURL, { method: "POST", body: formData });
      const data = await response.json();
      console.log("Imagen subida con éxito:", data);
      alert("Imagen subida con éxito: " + data.secure_url);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    } finally {
      setUploading(false);
    }
  };
  
  export default uploadPhoto;
  