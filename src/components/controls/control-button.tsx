import { memo } from 'react';
import { cn } from '../../utils/cn';

type ControlButtonProps = {
  callback: () => void;
  imgSrc: string;
  altName: string;
  position: string;
  diff: boolean;
};

function ControlButton(props: ControlButtonProps) {
  const { callback, imgSrc, altName, position, diff } = props;

  return (
    <button
      disabled={diff}
      className={cn(
        `absolute ${position} hover:cursor-pointer disabled:opacity-40 disabled:brightness-80 disabled:grayscale-80`,
      )}
      onClick={callback}
    >
      <img src={'./' + imgSrc} alt={altName} />
    </button>
  );
}

export default memo(ControlButton);
