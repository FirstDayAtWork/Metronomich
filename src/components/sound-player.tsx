import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { sound } from '../utils/sound';
import BpmSlider from './bpm-slider';
import { cn } from '../utils/cn';
import useDebounce from '../hooks/useDebounce';
import PlayButton from './play-button';
import { signatureList } from '../utils/time-singature-list';
import TimeSignature from './time-signature/time-signature';

export default function SoundPlayer() {
  const [isPlayed, setIsPlayed] = useState(false);
  const [bpmValue, setBpmValue] = useState(100);
  const [timeSignature, setTimeSignature] = useState(signatureList[3]);

  const intervalRef = useRef<number>(null);
  const beatRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<number>(0);

  const delayedBpmValue = useDebounce(bpmValue, 350);

  const handleSignatureChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const target = signatureList.find((item) => item.name === event.target.value);

    if (target) {
      setTimeSignature(target);
    }
  }, []);

  const handleBpmValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setBpmValue(+event.target.value);
  }, []);

  const substract = useCallback(() => {
    setBpmValue((prev) => prev - 1);
  }, []);

  const add = useCallback(() => {
    setBpmValue((prev) => prev + 1);
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
      counterRef.current = 0;
      return;
    }

    function repeat() {
      sound.pause();
      sound.currentTime = 0;

      if (beatRef.current) {
        beatRef.current.style.animationDuration = `${60000 / delayedBpmValue}ms`;
      }

      sound.playbackRate = counterRef.current % timeSignature.topNum === 0 ? 1.2 : 1;
      sound.volume = counterRef.current % timeSignature.topNum === 0 ? 1 : 0.5;

      sound.play();
      counterRef.current += 1;
      intervalRef.current = setTimeout(repeat, 60000 / delayedBpmValue);
    }

    repeat();

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [delayedBpmValue, isPlayed, timeSignature.topNum]);

  return (
    <div
      className={cn(
        'bg-dark border-border relative m-auto flex h-full max-h-150 min-h-77.5 w-full max-w-3xl min-w-77.5 flex-col items-center justify-evenly rounded-4xl border-5 p-10 font-mono max-md:max-h-full max-md:rounded-none max-md:border-none',
      )}
    >
      <div
        ref={beatRef}
        className={cn('absolute inset-0 rounded-4xl', isPlayed && 'metronome-pulse')}
      ></div>

      <TimeSignature
        signatureList={signatureList}
        timeSignature={timeSignature}
        handleSignatureChange={handleSignatureChange}
      />

      <BpmSlider
        handleBpmValue={handleBpmValue}
        bpmValue={bpmValue}
        substract={substract}
        add={add}
      />

      <PlayButton isPlayed={isPlayed} playPause={playPause} />
    </div>
  );
}
