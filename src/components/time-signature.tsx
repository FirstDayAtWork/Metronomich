import { memo } from 'react';
import type { ChangeEvent } from 'react';
import { cn } from '../utils/cn';
import type { SignatureList } from '../utils/time-singature-list';

type TimeSignatureProps = {
  signatureList: SignatureList[];
  timeSignature: SignatureList;
  handleSignatureChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

function TimeSignature(props: TimeSignatureProps) {
  const { signatureList, timeSignature, handleSignatureChange } = props;

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Time Signature</legend>
      <select
        className={cn('select bg-dark text-primary w-25 text-xl')}
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
    </fieldset>
  );
}

export default memo(TimeSignature);
