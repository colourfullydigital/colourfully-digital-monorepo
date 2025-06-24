# Colourfully Digital Foundation Design System

## Color Palette

### Primary Colors

- `$color-green`: \#76E07F (Vibrant green from logo)  
- `$color-orange`: \#FE6A25 (Vibrant orange)  
- `$color-yellow`: \#FFDA6B (Vibrant yellow from logo)  
- `$color-blue`: \#5B7CFA (Vibrant blue from logo)  
- `$color-black`: \#121212 (Rich black from logo background)  
- `$color-white`: \#FFFFFF (Pure white)

### Secondary Colors

- `$color-green-light`: \#A0EBA6 (Lighter version of primary green)  
- `$color-green-dark`: \#4CB653 (Darker version of primary green)  
- `$color-orange-light`: \#FF8F5A (Lighter version of primary orange)  
- `$color-orange-dark`: \#D44C0A (Darker version of primary orange)  
- `$color-yellow-light`: \#FFE59A (Lighter version of primary yellow)  
- `$color-yellow-dark`: \#E5B83C (Darker version of primary yellow)  
- `$color-blue-light`: \#8A9FFF (Lighter version of primary blue)  
- `$color-blue-dark`: \#3A5AD7 (Darker version of primary blue)

### Neutral Colors

- `$color-background`: \#FFFFFF (Default page background \- light mode)  
- `$color-surface`: \#F5F5F5 (Cards, dialogs, and elevated surfaces \- light mode)  
- `$color-surface-variant`: \#EEEEEE (Alternative surface for variety \- light mode)  
- `$color-border`: \#DDDDDD (Border color for elements \- light mode)

### Text Colors

- `$color-text-primary`: \#121212 (Primary text \- light mode)  
- `$color-text-secondary`: \#555555 (Secondary text, labels \- light mode)  
- `$color-text-hint`: \#888888 (Placeholder text, disabled text \- light mode)  
- `$color-text-on-primary`: \#FFFFFF (Text on primary colored backgrounds)  
- `$color-text-on-dark`: \#FFFFFF (Text on dark backgrounds)

### Feedback Colors

- `$color-success`: \#4BE246 (Success states, completion)  
- `$color-error`: \#F4464F (Error states, destructive actions)  
- `$color-warning`: \#D3BC0E (Warning states, attention needed)  
- `$color-info`: \#097BF4 (Information, help)

## Typography

### Font Stack

- `$font-primary`: 'Montserrat', system-ui, \-apple-system, BlinkMacSystemFont, sans-serif  
- `$font-mono`: 'JetBrains Mono', 'Roboto Mono', 'Courier New', monospace

### Font Scale

- `$font-size-xs`: 0.75rem (12px)  
- `$font-size-sm`: 0.875rem (14px)  
- `$font-size-base`: 1rem (16px)  
- `$font-size-lg`: 1.125rem (18px)  
- `$font-size-xl`: 1.25rem (20px)  
- `$font-size-2xl`: 1.5rem (24px)  
- `$font-size-3xl`: 1.875rem (30px)  
- `$font-size-4xl`: 2.25rem (36px)  
- `$font-size-5xl`: 3rem (48px)  
- `$font-size-6xl`: 3.75rem (60px)  
- `$font-size-7xl`: 4.5rem (72px)

### Font Weights

- `$font-weight-regular`: 400  
- `$font-weight-medium`: 500  
- `$font-weight-semibold`: 600  
- `$font-weight-bold`: 700  
- `$font-weight-black`: 900

### Line Heights

- `$line-height-tight`: 1.1  
- `$line-height-snug`: 1.25  
- `$line-height-normal`: 1.5  
- `$line-height-relaxed`: 1.625  
- `$line-height-loose`: 2

### Text Styles

#### Headings

- `$heading-1`: $font-size-6xl/$line-height-tight, $font-weight-black  
  Primary page headings, hero text  
- `$heading-2`: $font-size-5xl/$line-height-tight, $font-weight-black  
  Section headings, major content divisions  
- `$heading-3`: $font-size-4xl/$line-height-snug, $font-weight-black  
  Subsection headings, card headings  
- `$heading-4`: $font-size-3xl/$line-height-snug, $font-weight-black  
  Minor headings, list titles  
- `$heading-5`: $font-size-2xl/$line-height-normal, $font-weight-bold  
  Small headings, emphasized text  
- `$heading-6`: $font-size-xl/$line-height-normal, $font-weight-bold  
  The smallest heading style

#### Body Text

- `$body-lg`: $font-size-lg/$line-height-relaxed, $font-weight-regular  
  Featured content, introductory paragraphs  
- `$body`: $font-size-base/$line-height-relaxed, $font-weight-regular  
  Standard body text for main content  
- `$body-sm`: $font-size-sm/$line-height-normal, $font-weight-regular  
  Supporting text, notes, secondary information

#### Utility Text

- `$caption`: $font-size-xs/$line-height-normal, $font-weight-medium  
  Captions, timestamps, metadata  
- `$overline`: $font-size-xs/$line-height-normal, $font-weight-bold, uppercase, letter-spacing: 0.1em  
  Labels, categories, tags  
- `$button-text`: $font-size-base/$line-height-tight, $font-weight-bold  
  Text for buttons and interactive elements  
- `$link`: $font-size-base/$line-height-normal, $font-weight-medium, text-decoration: underline  
  Hyperlinks and interactive text  
- `$code`: $font-size-sm/$line-height-normal, $font-weight-regular, $font-mono  
  Code snippets and technical content

## Spacing System

### Base Unit

- `$space-unit`: 0.25rem (4px)

### Spacing Scale

- `$space-0`: 0  
- `$space-1`: 0.25rem (4px)  
- `$space-2`: 0.5rem (8px)  
- `$space-3`: 0.75rem (12px)  
- `$space-4`: 1rem (16px)  
- `$space-5`: 1.5rem (24px)  
- `$space-6`: 2rem (32px)  
- `$space-8`: 2.5rem (40px)  
- `$space-10`: 3rem (48px)  
- `$space-12`: 4rem (64px)  
- `$space-16`: 6rem (96px)  
- `$space-20`: 8rem (128px)

### Layout Spacing

- `$layout-gutter`: 1rem (16px) on small screens, 2rem (32px) on larger screens  
- `$container-padding`: $space-4 on small screens, $space-10 on larger screens  
- `$section-spacing`: $space-8 on small screens, $space-16 on larger screens

## Borders & Radius

### Border Widths

- `$border-width-thin`: 1px  
- `$border-width-normal`: 2px  
- `$border-width-thick`: 4px  
- `$border-width-brutalist`: 8px

### Border Radius

- `$radius-none`: 0  
- `$radius-sm`: 4px  
- `$radius-md`: 8px  
- `$radius-lg`: 12px  
- `$radius-xl`: 16px  
- `$radius-2xl`: 24px  
- `$radius-full`: 9999px (fully rounded, for pills and circles)

## Shadows & Elevation

### Shadow Levels

- `$shadow-none`: none (Neo-brutalism often uses no shadows)  
- `$shadow-sm`: 4px 4px 0 0 rgba(0, 0, 0, 0.9) (Brutalist offset shadow)  
- `$shadow-md`: 8px 8px 0 0 rgba(0, 0, 0, 0.9) (Brutalist offset shadow)  
- `$shadow-lg`: 12px 12px 0 0 rgba(0, 0, 0, 0.9) (Brutalist offset shadow)  
- `$shadow-inner`: inset 4px 4px 0 0 rgba(0, 0, 0, 0.1) (Subtle inner shadow)

## Component Styling

### Buttons

#### Primary Button

- Background: $color-green  
- Text: $color-text-on-primary  
- Height: 3rem (48px)  
- Padding: $space-4 $space-6  
- Border: $border-width-thick $color-black  
- Border Radius: $radius-md  
- Box Shadow: $shadow-sm  
- Font: $button-text  
- Hover State: Transform: translateY(-4px); Box Shadow: $shadow-md  
- Active State: Transform: translateY(0); Box Shadow: $shadow-sm  
- Focus Ring: $border-width-thick $color-black, outline-offset: 4px

#### Secondary Button

- Background: $color-white  
- Text: $color-black  
- Border: $border-width-thick $color-black  
- Height: 3rem (48px)  
- Padding: $space-4 $space-6  
- Border Radius: $radius-md  
- Box Shadow: $shadow-sm  
- Font: $button-text  
- Hover State: Background: $color-surface; Transform: translateY(-4px); Box Shadow: $shadow-md  
- Active State: Background: $color-surface-variant; Transform: translateY(0); Box Shadow: $shadow-sm

#### Text Button

- Text: $color-black  
- Background: transparent  
- Height: 2.5rem (40px)  
- Padding: $space-2 $space-4  
- Border: none  
- Font: $button-text  
- Text Decoration: underline  
- Hover State: Text Decoration: none; Background: $color-surface  
- Active State: Background: $color-surface-variant

#### Accent Buttons

- Orange Button: Same as Primary Button but with Background: $color-orange  
- Yellow Button: Same as Primary Button but with Background: $color-yellow and Text: $color-black  
- Blue Button: Same as Primary Button but with Background: $color-blue

### Cards

#### Standard Card

- Background: $color-white  
- Border: $border-width-thick $color-black  
- Border Radius: $radius-md  
- Padding: $space-6  
- Box Shadow: $shadow-sm  
- Hover State: Transform: translateY(-4px); Box Shadow: $shadow-md

#### Featured Card

- Background: $color-yellow-light  
- Border: $border-width-thick $color-black  
- Border Radius: $radius-md  
- Padding: $space-6  
- Box Shadow: $shadow-sm  
- Hover State: Transform: translateY(-4px); Box Shadow: $shadow-md

#### Accent Cards

- Green Card: Same as Standard Card but with Background: $color-green-light  
- Orange Card: Same as Standard Card but with Background: $color-orange-light  
- Blue Card: Same as Standard Card but with Background: $color-blue-light

### Form Elements

#### Text Input

- Height: 3rem (48px)  
- Border: $border-width-thick $color-black  
- Border Radius: $radius-md  
- Padding: $space-3 $space-4  
- Background: $color-white  
- Box Shadow: $shadow-sm  
- Font: $body  
- Text Color: $color-text-primary  
- Placeholder Color: $color-text-hint  
- Focus Border: $border-width-thick $color-green  
- Error Border: $border-width-thick $color-error

#### Checkbox & Radio

- Size: 1.5rem (24px)  
- Border: $border-width-normal $color-black  
- Border Radius: $radius-sm (checkbox), $radius-full (radio)  
- Background: $color-white  
- Checked Background: $color-green  
- Checked Border: $border-width-normal $color-black  
- Focus Ring: $border-width-normal $color-green, outline-offset: 2px

#### Select Input

- Height: 3rem (48px)  
- Border: $border-width-thick $color-black  
- Border Radius: $radius-md  
- Padding: $space-3 $space-4  
- Background: $color-white  
- Box Shadow: $shadow-sm  
- Font: $body  
- Text Color: $color-text-primary  
- Focus Border: $border-width-thick $color-green  
- Dropdown Icon: Custom chevron in $color-black

### Overlays & Modals

#### Modal

- Background: $color-white  
- Border: $border-width-thick $color-black  
- Border Radius: $radius-lg  
- Box Shadow: $shadow-lg  
- Padding: $space-6  
- Backdrop: rgba(0, 0, 0, 0.7)

#### Tooltip

- Background: $color-black  
- Text: $color-white  
- Border Radius: $radius-sm  
- Padding: $space-2 $space-3  
- Font: $caption  
- Box Shadow: $shadow-sm

## Breakpoints

### Screen Sizes

- `$breakpoint-xs`: 0  
- `$breakpoint-sm`: 640px  
- `$breakpoint-md`: 768px  
- `$breakpoint-lg`: 1024px  
- `$breakpoint-xl`: 1280px  
- `$breakpoint-2xl`: 1536px

## Grid System

### Container

- `$container-sm`: 640px  
- `$container-md`: 768px  
- `$container-lg`: 1024px  
- `$container-xl`: 1280px  
- `$container-2xl`: 1536px

### Grid

- Columns: 12 (default)  
- Gutter: $layout-gutter

## Animation & Transitions

### Duration

- `$duration-faster`: 100ms  
- `$duration-fast`: 150ms  
- `$duration-normal`: 200ms  
- `$duration-slow`: 300ms  
- `$duration-slower`: 500ms

### Easing

- `$ease-linear`: linear  
- `$ease-in`: cubic-bezier(0.4, 0, 1, 1\)  
- `$ease-out`: cubic-bezier(0, 0, 0.2, 1\)  
- `$ease-in-out`: cubic-bezier(0.4, 0, 0.2, 1\)  
- `$ease-bounce`: cubic-bezier(0.175, 0.885, 0.32, 1.275)

### Common Transitions

- Default: $duration-normal $ease-out  
- Entrance: $duration-normal $ease-out  
- Exit: $duration-fast $ease-in  
- Emphasis: $duration-slow $ease-bounce  
- Button Hover: transform $duration-fast $ease-out, box-shadow $duration-fast $ease-out

## Dark Mode Values

### Dark Colors

- `$dark-color-background`: \#121212 (Default page background \- dark mode)  
- `$dark-color-surface`: \#1E1E1E (Cards, dialogs, and elevated surfaces \- dark mode)  
- `$dark-color-surface-variant`: \#2A2A2A (Alternative surface for variety \- dark mode)  
- `$dark-color-border`: \#333333 (Border color for elements \- dark mode)

### Dark Text Colors

- `$dark-color-text-primary`: \#FFFFFF (Primary text \- dark mode)  
- `$dark-color-text-secondary`: \#BBBBBB (Secondary text, labels \- dark mode)  
- `$dark-color-text-hint`: \#888888 (Placeholder text, disabled text \- dark mode)

### Dark Primary Colors

- `$dark-color-green`: \#76E07F (Same as light mode)  
- `$dark-color-green-light`: \#A0EBA6 (Same as light mode)  
- `$dark-color-green-dark`: \#4CB653 (Same as light mode)  
- `$dark-color-orange`: \#FE6A25 (Same as light mode)  
- `$dark-color-yellow`: \#FFDA6B (Same as light mode)  
- `$dark-color-blue`: \#5B7CFA (Same as light mode)

### Dark Shadows

- `$dark-shadow-sm`: 4px 4px 0 0 rgba(0, 0, 0, 0.9) (Same as light mode)  
- `$dark-shadow-md`: 8px 8px 0 0 rgba(0, 0, 0, 0.9) (Same as light mode)  
- `$dark-shadow-lg`: 12px 12px 0 0 rgba(0, 0, 0, 0.9) (Same as light mode)

## Neo-Brutalist Design Elements

### Geometric Shapes

- Use bold geometric shapes as decorative elements  
- Implement irregular grid layouts with intentional asymmetry  
- Apply thick borders to create visual separation

### Typography Treatment

- Implement dramatic size contrasts between headings and body text  
- Use Montserrat Black for maximum impact on headings  
- Apply text highlighting with primary colors for emphasis

### Interactive Elements

- Implement exaggerated hover states with significant movement  
- Use obvious state changes for interactive elements  
- Apply "digital physicality" through shadows and transforms

### Layout Approach

- Embrace asymmetrical layouts with intentional imbalance  
- Use overlapping elements to create depth  
- Implement grid-breaking elements for visual interest

### Decorative Elements

- Use bold, thick lines as separators  
- Implement pixelated or "digital" decorative elements  
- Apply color blocks as section dividers

## Accessibility Considerations

### Color Contrast

- All text meets WCAG 2.1 AA contrast requirements (4.5:1 for normal text, 3:1 for large text)  
- Interactive elements have sufficient contrast against backgrounds (3:1 minimum)  
- Focus states are clearly visible with high contrast

### Typography Accessibility

- Text can scale up to 200% without loss of content or functionality  
- Line heights are sufficient for readability  
- Font weights maintain legibility at all sizes

### Interactive Element Accessibility

- All interactive elements are keyboard accessible  
- Focus states are clearly visible  
- Touch targets are at least 44px × 44px for mobile  
- Hover/focus states don't rely solely on color changes

### Screen Reader Support

- All images have appropriate alt text  
- Form elements have associated labels  
- ARIA attributes are used where appropriate  
- Semantic HTML is used throughout