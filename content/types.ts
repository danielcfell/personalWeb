// Shared content types. The design layer (components) consumes these;
// it never defines copy. Edit content under content/, not in .tsx files.

export type Cta = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type Metric = {
  value: string;
  label: string;
};
