import Image from 'next/image';
import { useContext } from 'react';
import { ModeContext } from '@contexts/modeContext';

const manageStatusInfo = () => {
  const { state } = useContext(ModeContext);
  const statusInfo = {
    text: '',
    image: null
  };

  if(state.mode === 'focus') {
    statusInfo.text = 'Stay Focused';
    statusInfo.image = <Image src="/assets/icons/dart.svg" alt="dart icon" width={35} height={35} />;
  }
  else if(state.mode === 'short-break') {
    statusInfo.text = 'Short Break';
    statusInfo.image = <Image src="/assets/icons/coffee-break.svg" alt="coffee-break icon" width={35} height={35} />;
  }
  else {
    statusInfo.text = 'Long Break';
    statusInfo.image = <Image src="/assets/icons/gaming.svg" alt="joystick icon" width={35} height={35} />;
  }

  return statusInfo;
}

export default manageStatusInfo;
