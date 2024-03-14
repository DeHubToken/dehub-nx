import { Button } from 'primereact/button';
import { useCallback, useState } from 'react';

interface SwitchIconButtonProps {
  onSwitch?: () => void;
}

const SwitchIconButton = ({ onSwitch }: SwitchIconButtonProps) => {
  const [hover, setHover] = useState(false);
  const toggleHover = useCallback(() => setHover(!hover), [setHover, hover]);

  return (
    <Button
      icon={
        !hover ? 'fa-solid fa-arrow-down' : 'fa-solid fa-arrow-down-arrow-up'
      }
      className="p-button-rounded p-button-outlined border-full border-none text-500"
      aria-label="Submit"
      onClick={onSwitch}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    />
  );
};

export default SwitchIconButton;
