import { memo } from 'react';
import { cn } from '../utils/cn';

type ControlButtonProps = {
  callback: () => void;
  imgSrc: string;
  altName: string;
  diff: boolean;
};

function ControlButton(props: ControlButtonProps) {
  const { callback, imgSrc, altName, diff } = props;

  return (
    <button
      disabled={diff}
      className={cn(
        `hover:cursor-pointer hover:opacity-85 disabled:opacity-40 disabled:brightness-80 disabled:grayscale-80`,
      )}
      onClick={callback}
    >
      <img src={'./' + imgSrc} alt={altName} width={48} height={48} />
    </button>
  );
}

export default memo(ControlButton);
