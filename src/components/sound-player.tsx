import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { sound } from '../utils/sound';
import BpmSlider from './bpm-slider';
import { cn } from '../utils/cn';
import useDebounce from '../hooks/useDebounce';

export default function SoundPlayer() {
  const [isPlayed, setIsPlayed] = useState(false);
  const intervalRef = useRef<number>(null);

  const beatRef = useRef<HTMLDivElement>(null);

  const [bpmValue, setBpmValue] = useState(60);

  const delayedBpmValue = useDebounce(bpmValue, 350);

  function handleBpmValue(event: ChangeEvent<HTMLInputElement>) {
    setBpmValue(+event.target.value);
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
      className={cn('m-auto flex min-h-75 max-w-4xl min-w-90 flex-col items-center justify-center')}
    >
      <BpmSlider handleBpmValue={handleBpmValue} bpmValue={bpmValue} />

      <div className={cn('relative')}>
        <div
          ref={beatRef}
          className={cn('absolute inset-0 rounded-xl', isPlayed && 'metronome-pulse')}
        ></div>

        <button
          className={cn(
            'relative w-50 rounded-xl border-2 px-5 py-3 text-center text-2xl hover:cursor-pointer',
          )}
          onClick={playPause}
        >
          {isPlayed ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
}
