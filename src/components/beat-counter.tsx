import { memo } from 'react';
import { cn } from '../utils/cn';
import type { SignatureList } from '../utils/time-singature-list';

type BeatCounterProps = {
  timeSignature: SignatureList;
  currentBeat: number;
  isPlayed: boolean;
};

function BeatCounter(props: BeatCounterProps) {
  const { timeSignature, currentBeat, isPlayed } = props;

  const array = Array(timeSignature.topNum).fill(0);

  return (
    <div className={cn('flex gap-4')}>
      {array.map((item, index) => {
        const isCurrentBeat = isPlayed && currentBeat === index;
        return (
          <div key={item + index} className={cn('relative')}>
            <div className={cn(`badge ${!isCurrentBeat && 'badge-outline'} badge-accent`)}></div>

            {isCurrentBeat && (
              <span className="bg-accent absolute left-0 h-full w-full animate-ping rounded-full opacity-75"></span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default memo(BeatCounter);
