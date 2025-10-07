import { useState, useRef, useEffect } from 'react';
import ControlPanel from './ControlPanel';

export default function Carrousel(){
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const intervalRef = useRef(null);

    const next = () => {
      setIndex(i => (i < catList.length - 1 ? i + 1 : 0));
    };

    const play = (ms = 2000) => {
      if (intervalRef.current !== null) return;
      intervalRef.current = setInterval(() => {
        setIndex(i => (i < catList.length - 1 ? i + 1 : 0));
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
          {catList.map((cat, i) => (
            <li key={cat.id}>
              <img
                className={index === i ? 'active' : ''}
                src={cat.imageUrl}
                alt={'Cat #' + cat.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const catCount = 10;
const catList = new Array(catCount);
for (let i = 0; i < catCount; i++) {
  const bucket = Math.floor(Math.random() * catCount) % 2;
  let imageUrl = '';
  switch (bucket) {
    case 0: {
      imageUrl = "https://placecats.com/neo/250/200";
      break;
    }
    case 1: {
      imageUrl = "https://placecats.com/millie/250/200";
      break;
    }
    case 2:
    default: {
      imageUrl = "https://placecats.com/bella/250/200";
      break;
    }
  }
  catList[i] = {
    id: i,
    imageUrl,
  };
}
