import React,{ useState, useRef, useEffect, useCallback, useMemo } from 'react';
import ControlPanel from './ControlPanel';
import ImageSizeContext from '../context/context';
import ImageCard from './ImageCard';

const listaDeImagenes = (() => {
    const lista = [];
    const urls = [
        "https://media.istockphoto.com/id/2207483178/es/foto/vista-trasera-hombre-chino-asi%C3%A1tico-que-mira-a-jabal-alfil-roca-del-elefante-en-el-paisaje-del.jpg?s=612x612&w=0&k=20&c=tS900eDojnt548fxB0KL4DoN15dnDoWYrhR65pGpfDA=",
        "https://media.istockphoto.com/id/2169995482/es/foto/paisaje-de-la-cumbre-de-roys-peak-con-monta%C3%B1a-brumosa-y-turista-disfrutando-en-oto%C3%B1o-en-nueva.jpg?s=612x612&w=0&k=20&c=uhZDzuuPblvtxO3tB7lZotlph-WlxsZ6RpGLUvGvPcE=",
        "https://media.istockphoto.com/id/2166651330/es/foto/grand-teton-mountains-from-oxbow-bend-on-the-snake-river-at-sunrise-grand-teton-national-park.jpg?s=612x612&w=0&k=20&c=HDL76pKh-qduE86kX8fzd8uKhtyk5lSqN-d8JL0FVvY=",
        "https://media.istockphoto.com/id/2192719994/es/foto/hawaii-aerial-seascape.jpg?s=612x612&w=0&k=20&c=PkG01ejGr3g1Aivg_QF32Sd0KxFdXiO_tTd1zJJ2lEY=",
        "https://media.istockphoto.com/id/2170441276/es/foto/chaqueta-amarilla-de-excursionista-femenino-de-la-cabeza-india-del-oto%C3%B1o-%C3%A9pico-de-la-cabeza.jpg?s=612x612&w=0&k=20&c=UKC_6BE78pJX1ywD2dp3K9gTnpFL7szd94iqE8BRWnU="
    ];
    for (let i = 0; i < 3; i++) {
    lista.push({
      id: i,
      imageUrl: urls[i],
      likes: 0,
    });
    }
    return lista;
})();

export default function Gallery(){
    const [images, setImages] = useState(listaDeImagenes);
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const intervalRef = useRef(null);
    const [size, setSize] = useState("medium"); //Tamaño global
    
    const handleLike = useCallback((id) => {
        setImages(imgs => imgs.map(img => img.id === id ? {...img, likes: img.likes + 1} : img));
    }, []);

    const totalLikes = useMemo(() => {
        let sum = 0;
        for (let i=0; i < images.length; i++) {
            sum += images[i].likes;
        }
        return sum;
    }, [images]);
    
    const next = useCallback(() => {
      setIndex(i => (i < images.length - 1 ? i + 1 : 0));
    }, [images.length]);

    const play = useCallback((ms = 2000) => {
      if (intervalRef.current !== null) return;
      intervalRef.current = setInterval(() => {
        setIndex(i => (i < images.length - 1 ? i + 1 : 0));
      }, ms);
      setIsPlaying(true);
    }, []);

    const stop = useCallback(() => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsPlaying(false);
    }, []);

    //Limpia todo.
    useEffect(() => {
      return () => {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }, []);

    return (
    <ImageSizeContext.Provider value={{ size, setSize }}>
      <div>
        <ControlPanel
          onPlay={() => play(2000)}
          onStop={stop}
          isPlaying={isPlaying}
          onNext={next}
          totalLikes={totalLikes}
          onSetSize={setSize}
          currentSize={size}
        />

        <div style={{ marginBottom: 12 }}>
          <div>
            <h4>Galería</h4>
            <div>
              <img
                src={images[index].imageUrl}
                alt={`main-${images[index].id}`}
                style={{ width: 500, height: 350, objectFit: "cover" }}
              />
            </div>
          </div>
        </div>

        <div>
          <h4>Imagenes</h4>
          <div>
            {images.map(img => (
              <ImageCard key={img.id} image={img} onLike={handleLike} />
            ))}
          </div>
        </div>
      </div>
    </ImageSizeContext.Provider>
  );
}

