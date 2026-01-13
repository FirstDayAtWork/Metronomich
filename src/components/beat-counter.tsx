import { useEffect } from 'react';
import { cn } from '../utils/cn';
import type { SignatureList } from '../utils/time-singature-list';

type BeatCounterProps = {
  timeSignature: SignatureList;
  beatCount: () => number;
};

export default function BeatCounter(props: BeatCounterProps) {
  const { timeSignature, beatCount } = props;

  const isActiveBeat = 0;

  useEffect(() => {
    console.log(beatCount());
  }, [beatCount]);

  const array = Array(timeSignature.topNum).fill(0);

  return (
    <div className={cn('flex gap-4')}>
      {array.map((item, index) => (
        <div
          key={item + index}
          className={cn(`badge ${isActiveBeat && 'badge-outline'} badge-accent`)}
        ></div>
      ))}
    </div>
  );
}
