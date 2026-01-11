import type { ChangeEvent } from 'react';
import { cn } from '../utils/cn';

type BpmSliderProps = {
  handleBpmValue: (event: ChangeEvent<HTMLInputElement>) => void;
  bpmValue: number;
};

export default function BpmSlider(props: BpmSliderProps) {
  const { handleBpmValue, bpmValue } = props;

  return (
    <div
      className={cn(
        'justify-centerust relative flex w-[65%] flex-col items-center rounded-2xl text-8xl',
      )}
    >
      <output className={cn('text-primary pointer-events-none')} htmlFor="bpm">
        {bpmValue}
      </output>
      <input
        className={cn(
          'absolute z-1 h-full w-full opacity-0 [direction:rtl] [writing-mode:vertical-lr] hover:cursor-ns-resize',
        )}
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
