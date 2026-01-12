import { memo } from 'react';
import { cn } from '../utils/cn';

type PlayButtonProps = {
  isPlayed: boolean;
  playPause: () => void;
};

function PlayButton(props: PlayButtonProps) {
  const { isPlayed, playPause } = props;

  return (
    <div className={cn('relative')}>
      <button className={cn('hover:cursor-pointer')} onClick={playPause}>
        {isPlayed ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="88px"
            viewBox="0 -960 960 960"
            width="88px"
            fill="oklch(0.645 0.246 16.439)"
          >
            <path d="M330-330h300v-300H330v300ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="88px"
            viewBox="0 -960 960 960"
            width="88px"
            fill="oklch(0.696 0.17 162.48)"
          >
            <path d="m383-310 267-170-267-170v340Zm97 230q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Z" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default memo(PlayButton);
