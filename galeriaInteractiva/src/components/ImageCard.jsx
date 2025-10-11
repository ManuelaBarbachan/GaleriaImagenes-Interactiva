import React, { useContext, useCallback, useMemo} from "react";
import ImageSizeContext from "../context/context";

function ImageCard({ image, onLike }) {
  const { size } = useContext(ImageSizeContext);

  const handleLike = useCallback(() => {
    onLike(image.id);
  }, [onLike, image.id]);

  const sizeStyles = {
    small: { width: 120, height: 90 },
    medium: { width: 200, height: 150 },
    large: { width: 320, height: 240 },
  };

  const styles = sizeStyles[size] || sizeStyles.medium;

  const derived = useMemo(() => {
    let acc = 0;
    for (let i = 0; i < 10000; i++) acc += (image.id + i) % 5;
    return acc;
  }, [image.id]);

  return (
    <div className="image-card">
      <img src={image.imageUrl} alt={`img-${image.id}`} style={styles} />
      <div className="info">
        <button onClick={handleLike}>❤️ {image.likes}</button>
        <small style={{ alignSelf: "center" }}>#{derived}</small>
      </div>
    </div>
  );
}

export default React.memo(ImageCard);