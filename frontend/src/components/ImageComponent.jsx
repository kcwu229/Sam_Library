import React, { useState, useEffect } from "react";

const ImageComponent = ({ imageUrl }) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const loadImage = async () => {
      try {
        const src = await fetchImage(imageUrl);
        setImageSrc(src);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    loadImage();
  }, [imageUrl]);

  return (
    <div>
      {imageSrc ? (
        <img src={imageSrc} alt="Fetched from proxy" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ImageComponent;
