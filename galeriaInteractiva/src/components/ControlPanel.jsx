import React from 'react';

export default function ControlPanel({ onPlay, onStop, isPlaying, onNext, totalLikes, onSetSize, currentSize }) {
  return (
    <div className="control-panel">
      <button onClick={onNext}>Next</button>
      {!isPlaying ? (
        <button onClick={onPlay}>Play</button>
      ) : (
        <button onClick={onStop}>Stop</button>
      )}

      <span style={{ marginLeft: 12 }}>Total Likes: <strong>{totalLikes}</strong></span>

      <span style={{ marginLeft: 12 }}>
        Size:
        <button disabled={currentSize === "small"} onClick={() => onSetSize("small")}>S</button>
        <button disabled={currentSize === "medium"} onClick={() => onSetSize("medium")}>M</button>
        <button disabled={currentSize === "large"} onClick={() => onSetSize("large")}>L</button>
      </span>
    </div>
  );
}
