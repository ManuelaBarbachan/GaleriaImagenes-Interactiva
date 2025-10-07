import { useState, useRef, useEffect } from 'react';
import ControlPanel from './ControlPanel';

export default function Carrousel(){
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const intervalRef = useRef(null);

    const next = () => {
      setIndex(i => (i < imageList.length - 1 ? i + 1 : 0));
    };

    const play = (ms = 2000) => {
      if (intervalRef.current !== null) return;
      intervalRef.current = setInterval(() => {
        setIndex(i => (i < imageList.length - 1 ? i + 1 : 0));
      }, ms);
      setIsPlaying(true);
    };

    const stop = () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsPlaying(false);
    };

    useEffect(() => {
      return () => {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }, []);

    return (
    <>
      <ControlPanel onPlay={() => play(2000)} onStop={stop} isPlaying={isPlaying} onNext={next} />
      <nav>
        <button onClick={next}>Next</button>
      </nav>
      <div>
        <ul>
          {imageList.map((image, i) => (
            <li key={image.id}>
              <img
                className={index === i ? 'active' : ''}
                src={image.imageUrl}
                alt={'Imagen #' + image.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const imageCount = 10;
const imageList = new Array(imageCount);
for (let i = 0; i < imageCount; i++) {
  const bucket = Math.floor(Math.random() * imageCount) % 2;
  let imageUrl = '';
  switch (bucket) {
    case 0: {
      imageUrl = "https://media.istockphoto.com/id/2207483178/es/foto/vista-trasera-hombre-chino-asi%C3%A1tico-que-mira-a-jabal-alfil-roca-del-elefante-en-el-paisaje-del.jpg?s=612x612&w=0&k=20&c=tS900eDojnt548fxB0KL4DoN15dnDoWYrhR65pGpfDA=";
      break;
    }
    case 1: {
      imageUrl = "https://media.istockphoto.com/id/2169995482/es/foto/paisaje-de-la-cumbre-de-roys-peak-con-monta%C3%B1a-brumosa-y-turista-disfrutando-en-oto%C3%B1o-en-nueva.jpg?s=612x612&w=0&k=20&c=uhZDzuuPblvtxO3tB7lZotlph-WlxsZ6RpGLUvGvPcE=";
      break;
    }
    case 2:
    default: {
      imageUrl = "https://media.istockphoto.com/id/2192719994/es/foto/hawaii-aerial-seascape.jpg?s=612x612&w=0&k=20&c=PkG01ejGr3g1Aivg_QF32Sd0KxFdXiO_tTd1zJJ2lEY=";
      break;
    }
  }
  imageList[i] = {
    id: i,
    imageUrl,
  };
}
