import { cn } from '../utils/cn';

type ControlsProps = {
  substract: () => void;
  add: () => void;
};

export default function Controls(props: ControlsProps) {
  const { substract, add } = props;

  return (
    <div className={cn('flex h-12.5 w-full items-center justify-between')}>
      <button className={cn('absolute left-6 hover:cursor-pointer')} onClick={substract}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48px"
          viewBox="0 -960 960 960"
          width="48px"
          fill="oklch(0.488 0.243 264.376)"
        >
          <path d="M280-453h400v-60H280v60ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Z" />
        </svg>
      </button>

      <button className={cn('absolute right-6 hover:cursor-pointer')} onClick={add}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48px"
          viewBox="0 -960 960 960"
          width="48px"
          fill="oklch(0.488 0.243 264.376)"
        >
          <path d="M453-280h60v-166h167v-60H513v-174h-60v174H280v60h173v166Zm27.27 200q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Z" />
        </svg>
      </button>
    </div>
  );
}
