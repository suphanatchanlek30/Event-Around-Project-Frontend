// components/public-section/navbar/types.ts

import { IconType } from 'react-icons';

export interface NavItem {
  label: string;
  href: string;
}

export interface NavbarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export interface NavbarMenuProps {
  isActive?: (href: string) => boolean;
  className?: string;
}

export interface NavbarProfileProps {
  className?: string;
}

export interface NavbarMobileProps {
  isOpen: boolean;
  onToggle: () => void;
}

export interface NavbarBottomMobileItemProps {
  href: string;
  label: string;
  icon: IconType;
  isActive: boolean;
}
