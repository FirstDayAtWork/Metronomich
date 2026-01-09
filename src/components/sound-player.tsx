import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { sound } from '../utils/sound';
import BpmSlider from './bpm-slider';

export default function SoundPlayer() {
  const [isPlayed, setIsPlayed] = useState(false);
  const intervalRef = useRef<number>(null);

  const [bpmValue, setBpmValue] = useState(60);

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

    const repeat = () => {
      sound.pause();
      sound.currentTime = 0;
      sound.play();
      intervalRef.current = setTimeout(repeat, 60000 / bpmValue);
    };

    repeat();

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [bpmValue, isPlayed]);

  return (
    <>
      <BpmSlider handleBpmValue={handleBpmValue} bpmValue={bpmValue} />
      <button onClick={playPause}>{isPlayed ? 'Pause' : 'Play'}</button>
    </>
  );
}
