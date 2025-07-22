/**
 * Component type definitions
 * This file helps TypeScript understand the structure of our Astro components
 */

// Layout Components
export interface StackProps {
  space?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  recursive?: boolean;
  splitAfter?: number;
  class?: string;
}

export interface BoxProps {
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  border?: 'none' | 'thin' | 'normal' | 'thick' | 'brutalist';
  background?: 'none' | 'surface' | 'surface-variant' | 'primary' | 'secondary';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  class?: string;
  as?: keyof HTMLElementTagNameMap;
}

export interface ClusterProps {
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  wrap?: boolean;
  class?: string;
}

export interface GridProps {
  columns?: number | string;
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  class?: string;
}

export interface SidebarProps {
  side?: 'left' | 'right';
  sideWidth?: string;
  contentMin?: string;
  space?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  noStretch?: boolean;
  class?: string;
}

// Typography Components
export interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  class?: string;
}

export interface TextProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  class?: string;
  as?: keyof HTMLElementTagNameMap;
}

export interface LinkProps {
  href: string;
  external?: boolean;
  underline?: boolean;
  class?: string;
}

// Interactive Components
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  class?: string;
  id?: string;
  'aria-label'?: string;
}

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  name: string;
  id?: string;
  value?: string | number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  class?: string;
  'aria-label'?: string;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}

export interface SelectProps {
  name: string;
  id?: string;
  options: (SelectOption | SelectOptionGroup)[];
  value?: string;
  required?: boolean;
  disabled?: boolean;
  class?: string;
  'aria-label'?: string;
}

export interface CheckboxProps {
  name: string;
  id?: string;
  checked?: boolean;
  required?: boolean;
  disabled?: boolean;
  class?: string;
  'aria-label'?: string;
}

export interface RadioProps {
  name: string;
  value: string;
  id?: string;
  checked?: boolean;
  required?: boolean;
  disabled?: boolean;
  class?: string;
  'aria-label'?: string;
}

// Structural Components
export interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  interactive?: boolean;
  href?: string;
  class?: string;
  id?: string;
  'aria-label'?: string;
}