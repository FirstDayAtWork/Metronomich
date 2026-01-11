import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { sound } from '../utils/sound';
import BpmSlider from './bpm-slider';
import { cn } from '../utils/cn';
import useDebounce from '../hooks/useDebounce';
import Controls from './controls';

export default function SoundPlayer() {
  const [isPlayed, setIsPlayed] = useState(false);
  const intervalRef = useRef<number>(null);

  const beatRef = useRef<HTMLDivElement>(null);

  const [bpmValue, setBpmValue] = useState(100);

  const delayedBpmValue = useDebounce(bpmValue, 350);

  function handleBpmValue(event: ChangeEvent<HTMLInputElement>) {
    setBpmValue(+event.target.value);
  }

  function substract() {
    if (bpmValue === 20) return;
    setBpmValue((prev) => (prev -= 1));
  }

  function add() {
    if (bpmValue === 200) return;
    setBpmValue((prev) => (prev += 1));
  }

  function playPause() {
    if (!isPlayed) {
      setIsPlayed(true);
      return;
    }

    setIsPlayed(false);
  }

  useEffect(() => {
    if (!isPlayed) {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }

      sound.pause();
      sound.currentTime = 0;
      return;
    }

    function repeat() {
      sound.pause();
      sound.currentTime = 0;

      if (beatRef.current) {
        beatRef.current.style.animationDuration = `${60000 / delayedBpmValue}ms`;
      }

      sound.play();
      intervalRef.current = setTimeout(repeat, 60000 / delayedBpmValue);
    }

    repeat();

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [delayedBpmValue, isPlayed]);

  return (
    <div
      className={cn(
        'bg-dark border-border relative m-auto flex h-full max-h-77.5 min-h-77.5 w-full max-w-77.5 min-w-77.5 flex-col items-center justify-center rounded-full border-5 font-mono',
      )}
    >
      <div
        ref={beatRef}
        className={cn('absolute inset-0 rounded-full', isPlayed && 'metronome-pulse')}
      ></div>

      <BpmSlider handleBpmValue={handleBpmValue} bpmValue={bpmValue} />

      <Controls substract={substract} add={add} />

      <div className={cn('relative')}>
        <button className={cn('hover:cursor-pointer')} onClick={playPause}>
          {isPlayed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="88px"
              viewBox="0 -960 960 960"
              width="88px"
              fill="oklch(0.645 0.246 16.439)"
            >
              <path d="M330-330h300v-300H330v300ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="88px"
              viewBox="0 -960 960 960"
              width="88px"
              fill="oklch(0.696 0.17 162.48)"
            >
              <path d="m383-310 267-170-267-170v340Zm97 230q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
