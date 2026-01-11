import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { sound } from '../utils/sound';
import BpmSlider from './bpm-slider';
import { cn } from '../utils/cn';
import useDebounce from '../hooks/useDebounce';
import Controls from './controls';
import PlayButton from './play-button';

export default function SoundPlayer() {
  const [isPlayed, setIsPlayed] = useState(false);
  const intervalRef = useRef<number>(null);

  const beatRef = useRef<HTMLDivElement>(null);

  const [bpmValue, setBpmValue] = useState(100);

  const delayedBpmValue = useDebounce(bpmValue, 350);

  const handleBpmValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setBpmValue(+event.target.value);
  }, []);

  const substract = useCallback(() => {
    setBpmValue((prev) => {
      if (prev === 20) return prev;
      return (prev -= 1);
    });
  }, []);

  const add = useCallback(() => {
    setBpmValue((prev) => {
      if (prev === 200) return prev;
      return (prev += 1);
    });
  }, []);

  const playPause = useCallback(() => {
    if (!isPlayed) {
      setIsPlayed(true);
      return;
    }

    setIsPlayed(false);
  }, [isPlayed]);

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

      <PlayButton isPlayed={isPlayed} playPause={playPause} />
    </div>
  );
}
