import React from 'react';

export default function ControlPanel({ onPlay, onStop, isPlaying, onNext }) {
  return (
    <div className="control-panel">
      <button onClick={onNext}>Next</button>
      {!isPlaying ? (
        <button onClick={onPlay}>Play</button>
      ) : (
        <button onClick={onStop}>Stop</button>
      )}
    </div>
  );
}
