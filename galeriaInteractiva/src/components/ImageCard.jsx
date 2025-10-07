import { useContext, useCallback, useMemo} from "react";
import ImageSizeContext from "../context/context";
export default function ImageCard({ image }) {
  return (
    <div>
      <img
        src={image.url}
        alt={image.title}
        width="200"
      />
      <p>{image.title}</p>
    </div>
  );
}
