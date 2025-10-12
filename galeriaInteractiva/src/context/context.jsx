import { createContext } from "react";

const ImageSizeContext = createContext({ size: "medium", setSize: () => {} });

export default ImageSizeContext;