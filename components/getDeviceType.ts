'use sever'
import { headers } from 'next/headers'
export const getDevicePixels = async () => {
  const headersList = headers();
  const userAgent = headersList.get('user-agent');

  const deviceType = userAgent!.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  )
    ? 'mobile'
    : 'desktop';

  const pixelValues = {
    mobile: 500,
    tablet: 700,
    desktop: 1100,
  };

  return pixelValues[deviceType];
};