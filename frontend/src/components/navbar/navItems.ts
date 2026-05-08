export type NavItem = {
  name: string;
  href: string;
};

export const publicNavItems: NavItem[] = [
  { name: "Beranda", href: "/" },
  { name: "Dokter", href: "/doctor" },
];

export const authenticatedNavItems: NavItem[] = [
  ...publicNavItems,
  { name: "Booking Saya", href: "/booking" },
];
