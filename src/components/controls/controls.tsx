import { memo } from 'react';
import { cn } from '../../utils/cn';
import ControlButton from './control-button';

type ControlsProps = {
  substract: () => void;
  add: () => void;
  bpmValue: number;
};

function Controls(props: ControlsProps) {
  const { substract, add, bpmValue } = props;

  return (
    <div className={cn('flex h-12.5 w-full items-center justify-between')}>
      <ControlButton
        callback={substract}
        imgSrc={'minus.svg'}
        altName={'minus-button'}
        position={'left-6'}
        diff={bpmValue === 20}
      />

      <ControlButton
        callback={add}
        imgSrc={'plus.svg'}
        altName={'plus-button'}
        position={'right-6'}
        diff={bpmValue === 200}
      />
    </div>
  );
}

export default memo(Controls);
