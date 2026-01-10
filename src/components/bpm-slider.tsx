import type { ChangeEvent } from 'react';
import { cn } from '../utils/cn';

type BpmSliderProps = {
  handleBpmValue: (event: ChangeEvent<HTMLInputElement>) => void;
  bpmValue: number;
};

export default function BpmSlider(props: BpmSliderProps) {
  const { handleBpmValue, bpmValue } = props;

  return (
    <div className={cn('flex w-full flex-col items-center p-2 text-8xl')}>
      <output htmlFor="bpm">{bpmValue}</output>
      <input
        className={cn('h-15 w-full')}
        onChange={handleBpmValue}
        id="bpm"
        name="bpm-input"
        type="range"
        min={20}
        max={200}
        value={bpmValue}
        step={1}
      />
    </div>
  );
}
