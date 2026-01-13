import { memo } from 'react';
import type { ChangeEvent } from 'react';
import { cn } from '../../utils/cn';
import type { SignatureList } from '../../utils/time-singature-list';

type TimeSignatureProps = {
  signatureList: SignatureList[];
  timeSignature: SignatureList;
  handleSignatureChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

function TimeSignature(props: TimeSignatureProps) {
  const { signatureList, timeSignature, handleSignatureChange } = props;

  return (
    <select
      className={cn('bg-dark text-primary border-border z-20 border-2 text-xl')}
      name="time-signature"
      id="time-signature"
      value={timeSignature.name}
      onChange={handleSignatureChange}
    >
      {signatureList.map((item) => (
        <option key={item.name} value={item.name}>
          {item.name}
        </option>
      ))}
    </select>
  );
}

export default memo(TimeSignature);
