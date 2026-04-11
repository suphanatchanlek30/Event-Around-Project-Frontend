// components/public-section/navbar/types.ts

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
