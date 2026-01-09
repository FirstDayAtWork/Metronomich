import type { ChangeEvent } from 'react';

type BpmSliderProps = {
  handleBpmValue: (event: ChangeEvent<HTMLInputElement>) => void;
  bpmValue: number;
};

export default function BpmSlider(props: BpmSliderProps) {
  const { handleBpmValue, bpmValue } = props;

  return (
    <div>
      <output htmlFor="bpm">{bpmValue}</output>
      <input
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
