import { memo, type ChangeEvent } from 'react';
import { cn } from '../utils/cn';
import ControlButton from './control-button';

type BpmSliderProps = {
  handleBpmValue: (event: ChangeEvent<HTMLInputElement>) => void;
  bpmValue: number;
  substract: () => void;
  add: () => void;
};

function BpmSlider(props: BpmSliderProps) {
  const { handleBpmValue, bpmValue, substract, add } = props;

  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-center justify-center gap-5 rounded-2xl text-9xl',
      )}
    >
      <output className={cn('text-primary pointer-events-none')} htmlFor="bpm">
        {bpmValue}
      </output>

      <div className={cn('relative flex w-full items-center justify-center')}>
        <ControlButton
          callback={substract}
          imgSrc={'minus.svg'}
          altName={'minus-button'}
          diff={bpmValue === 20}
        />

        <input
          className={cn('accent-chart-1 m-4 max-h-12 w-full')}
          onChange={handleBpmValue}
          id="bpm"
          name="bpm-input"
          type="range"
          min={20}
          max={200}
          value={bpmValue}
          step={1}
        />

        <ControlButton
          callback={add}
          imgSrc={'plus.svg'}
          altName={'plus-button'}
          diff={bpmValue === 200}
        />
      </div>
    </div>
  );
}

export default memo(BpmSlider);
