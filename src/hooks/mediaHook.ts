import { useMediaPredicate } from "react-media-hook";

export const device = {
  mobile: "(max-width: 480px)",
  mobileOrTablet: "(max-width: 1024px)",
  tablet: "(min-width: 480px) and (max-width: 1024px)",
  desktop: "(min-width: 1024px)",
  tabletOrDesktop: "(min-width: 480px)",
};
export const useMedia = () => {
  const isMobile = useMediaPredicate(device.mobile);
  const isMobileOrTablet = useMediaPredicate(device.mobileOrTablet);
  const isTablet = useMediaPredicate(device.tablet);
  const isDesktop = useMediaPredicate(device.desktop);
  const isTabletOrDesktop = useMediaPredicate(device.tabletOrDesktop);

  return {
    isMobile,
    isMobileOrTablet,
    isTablet,
    isDesktop,
    isTabletOrDesktop,
  };
};
