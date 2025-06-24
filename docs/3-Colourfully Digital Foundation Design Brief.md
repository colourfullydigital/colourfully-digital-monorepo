# Core Website Platform Design Brief

## 1. Responsive Layout System

### Desktop Home Screen

#### Default State
* A full-width hero section with an asymmetrical layout featuring bold geometric shapes inspired by the cover-bg1.png
* Background in $color-white with overlapping abstract shapes in $color-green, $color-blue, $color-yellow, and $color-orange
* Main navigation bar at the top with $border-width-thick black border at the bottom
* Logo positioned in the top-left corner with a $shadow-sm offset shadow
* Primary navigation links aligned horizontally with $space-6 between items
* Navigation items use $button-text styling with a subtle underline animation that expands from center on hover
* Hero headline uses $heading-1 with a gradient text effect transitioning from $color-green to $color-blue
* The gradient text has a slight parallax effect, shifting subtly as the user scrolls
* Hero subheading uses $body-lg in $color-text-primary
* Two CTA buttons below the hero text: primary button in $color-green and secondary button with black border
* Buttons have exaggerated hover states with $shadow-md and translateY(-4px) transform
* Content below hero is arranged in a 12-column grid with $layout-gutter spacing
* Featured content cards have thick borders ($border-width-thick) in $color-black with $radius-md corners
* Cards are arranged in groups of 3 on large screens with $space-6 gutters
* Each card has a different accent color background ($color-green-light, $color-yellow-light, $color-blue-light)
* Scroll-triggered animations reveal content blocks as they enter the viewport with a slight stagger effect

#### Scrolled State
* Navigation bar becomes sticky with a subtle background blur effect
* Navigation shrinks slightly in height with a smooth transition
* Logo scales down by 20% with a smooth transition
* A "back to top" button appears in the bottom-right corner when user scrolls past the fold
* The button uses a circular shape with an upward arrow icon and $shadow-sm
* When hovered, the button scales up slightly and shadow increases to $shadow-md

### Mobile Home Screen

#### Default State
* Full-width mobile layout with stacked elements
* Logo centered at the top with $space-4 padding
* Hamburger menu icon in the top-right corner using three horizontal lines with $border-width-normal thickness
* Hero section maintains the abstract geometric shapes but simplified and optimized for mobile viewport
* Hero headline uses $heading-3 with the same gradient effect as desktop
* Hero subheading uses $body with increased line height for better readability
* CTA buttons are full-width and stacked with $space-4 between them
* Content cards are full-width and stacked vertically with $space-6 between them
* Each card maintains its accent color but with increased padding for touch targets

#### Menu Open State
* Hamburger icon animates to an X shape with a smooth 250ms transition
* Full-screen overlay menu slides in from the right with a 300ms ease-out transition
* Menu background in $color-white with the same abstract shape elements as decorative accents
* Navigation links are stacked vertically with $space-8 between items
* Each link has a $border-width-thick bottom border that animates in from left to right on hover
* Language toggle positioned at the bottom of the menu
* Close button (X) has a subtle pulse animation to draw attention

### Wireframe Description - Desktop Home

```
┌─────────────────────────────────────────────────────────────────┐
│ LOGO          NAV ITEM   NAV ITEM   NAV ITEM   NAV ITEM   LANG  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│    ⭐                                                           │
│        HEADLINE WITH GRADIENT                      🔵          │
│    Subheadline text goes here                                   │
│                                                                 │
│    [PRIMARY CTA]  [SECONDARY CTA]                               │
│                                                    🟢           │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ┌─────────────┐    ┌─────────────┐    ┌─────────────┐          │
│ │             │    │             │    │             │          │
│ │  CARD ONE   │    │  CARD TWO   │    │ CARD THREE  │          │
│ │             │    │             │    │             │          │
│ │ Green bg    │    │ Yellow bg   │    │ Blue bg     │          │
│ │             │    │             │    │             │          │
│ │ [BUTTON]    │    │ [BUTTON]    │    │ [BUTTON]    │          │
│ └─────────────┘    └─────────────┘    └─────────────┘          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Wireframe Description - Mobile Home

```
┌─────────────────────────┐
│ LOGO             ☰      │
├─────────────────────────┤
│                         │
│      ⭐                 │
│  HEADLINE WITH GRADIENT │
│                         │
│  Subheadline text here  │
│                         │
│     [PRIMARY CTA]       │
│                         │
│    [SECONDARY CTA]      │
│                         │
├─────────────────────────┤
│ ┌─────────────────────┐ │
│ │                     │ │
│ │      CARD ONE       │ │
│ │                     │ │
│ │      Green bg       │ │
│ │                     │ │
│ │      [BUTTON]       │ │
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │                     │ │
│ │      CARD TWO       │ │
│ │                     │ │
│ │      Yellow bg      │ │
│ │                     │ │
│ │      [BUTTON]       │ │
│ └─────────────────────┘ │
│                         │
└─────────────────────────┘
```

### Wireframe Description - Mobile Menu Open

```
┌─────────────────────────┐
│ LOGO             ✕      │
├─────────────────────────┤
│                         │
│                         │
│      NAV ITEM           │
│      ──────────         │
│                         │
│      NAV ITEM           │
│      ──────────         │
│                         │
│      NAV ITEM           │
│      ──────────         │
│                         │
│      NAV ITEM           │
│      ──────────         │
│                         │
│                         │
│                         │
│                         │
│                         │
│      EN | FR            │
│                         │
└─────────────────────────┘
```

## 2. Bilingual Support

### Desktop Language Toggle

#### Default State
* Language toggle positioned in the top-right corner of the navigation bar
* Toggle displays "EN | FR" with the current language in $color-text-primary and inactive language in $color-text-secondary
* Current language has a $border-width-normal bottom border in $color-green
* Toggle has a subtle hover effect with background changing to $color-surface

#### Hover State
* Inactive language text transitions to $color-text-primary
* Background transitions to $color-surface with a 150ms ease-out animation
* Cursor changes to pointer

#### Active State
* When clicked, a subtle ripple effect emanates from the click point
* Page content fades out with a 200ms transition
* Loading indicator appears briefly in the center of the screen using the logo colors in a rotating animation
* New language content fades in with a 300ms transition
* URL updates to reflect the new language prefix (/en/ or /fr/)

### Mobile Language Toggle

#### Default State
* Language toggle positioned at the bottom of the mobile menu
* Toggle displays "EN | FR" with the current language in $color-text-primary and inactive language in $color-text-secondary
* Current language has a $border-width-normal bottom border in $color-green
* Toggle has increased touch target area (minimum 44px height)

#### Active State
* When tapped, a 40ms feedback animation slightly scales the toggle down and then back up
* Mobile menu closes with a slide-out animation
* Loading indicator appears briefly in the center of the screen
* New language content fades in with a 300ms transition
* URL updates to reflect the new language prefix

### Wireframe Description - Desktop Language Toggle

```
┌─────────────────────────────────────────────────────────────────┐
│ LOGO          NAV ITEM   NAV ITEM   NAV ITEM   NAV ITEM   EN|FR │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
```

### Wireframe Description - Language Toggle Hover

```
┌─────────────────────────────────────────────────────────────────┐
│ LOGO          NAV ITEM   NAV ITEM   NAV ITEM   NAV ITEM  ┌────┐ │
│                                                          │EN|FR│ │
├─────────────────────────────────────────────────────────┴────┴─┤
│                                                                 │
```

## 3. Accessibility Implementation

### Skip to Content Link

#### Default State
* Skip to content link is visually hidden but accessible to screen readers
* Link is positioned at the top of the page, before the navigation
* Link uses $body styling with $color-text-primary

#### Focus State
* When tabbed to, the link becomes visible with a smooth fade-in animation (150ms)
* Link appears at the top center of the viewport with $space-4 padding
* Background color is $color-white with $border-width-thick $color-black border
* Text is $color-text-primary with $button-text styling
* Link has $shadow-sm offset shadow
* Focus ring uses $border-width-normal in $color-green with 2px offset

### High Contrast Mode

#### Default State
* All text maintains minimum 4.5:1 contrast ratio against backgrounds
* Interactive elements maintain minimum 3:1 contrast ratio
* Focus states are clearly visible with $border-width-normal outlines
* All functionality is accessible via keyboard navigation

#### High Contrast Active State
* When system high contrast mode is detected, borders increase to $border-width-thick
* Color contrasts are maximized with simplified color palette
* Background patterns and decorative elements are simplified or removed
* Focus indicators become more prominent with $border-width-brutalist outlines

### Screen Reader Optimizations

#### Default State
* All images have descriptive alt text
* SVG elements have appropriate ARIA labels
* Interactive elements have clear accessible names
* Landmark regions are properly defined (header, main, footer, etc.)
* ARIA attributes supplement HTML semantics where needed
* Focus order follows a logical sequence

### Wireframe Description - Skip to Content (Focus State)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    ┌─────────────────────┐                      │
│                    │   SKIP TO CONTENT   │                      │
│                    └─────────────────────┘                      │
│                                                                 │
│ LOGO          NAV ITEM   NAV ITEM   NAV ITEM   NAV ITEM   LANG  │
├─────────────────────────────────────────────────────────────────┤
```

## 4. Information Architecture

### Desktop Navigation

#### Default State
* Primary navigation uses a horizontal layout with clear visual hierarchy
* Navigation items use $button-text styling with $space-6 between items
* Current page is indicated with a $border-width-normal bottom border in $color-green
* Dropdown menus are indicated with a small chevron icon
* Navigation is organized by user goals rather than organizational structure
* Secondary navigation appears in the footer with less visual prominence

#### Dropdown State
* Dropdown menus appear with a smooth slide-down and fade-in animation (200ms)
* Dropdown background is $color-white with $border-width-thick $color-black border
* Dropdown has $shadow-md offset shadow
* Menu items are arranged vertically with $space-4 between items
* Each item has a subtle hover effect with background changing to $color-surface
* Dropdown closes when user clicks outside or presses Escape key

### Mobile Navigation

#### Default State
* Primary navigation is hidden behind hamburger menu
* Most important links are prioritized at the top of the mobile menu
* Navigation items are arranged vertically with generous spacing for touch targets
* Current page is indicated with a $border-width-normal bottom border in $color-green
* Secondary navigation is included at the bottom of the mobile menu

### Breadcrumbs

#### Default State
* Breadcrumbs appear below the main navigation on deep pages (not on homepage)
* Breadcrumbs use $body-sm styling with $color-text-secondary
* Separator between items is a small custom chevron icon in $color-text-hint
* Current page is displayed in $color-text-primary without a link
* Breadcrumbs are responsive, showing fewer levels on smaller screens
* On mobile, breadcrumbs collapse to show only parent page and current page

### Search Function

#### Default State
* Search icon appears in the navigation bar
* Icon is a simple magnifying glass in $color-text-primary
* Icon has a subtle hover effect with color changing to $color-green

#### Active State
* When clicked, search bar expands with a smooth animation (250ms)
* Search input uses the text input styling from the design system
* Input receives focus automatically
* Placeholder text provides search instructions
* Close button (X) appears to dismiss the search

#### Results State
* Search results appear in a dropdown panel below the search input
* Results are categorized by content type (pages, programs, resources)
* Each result shows title and brief excerpt
* Results highlight matching search terms
* Panel has a "View all results" link at the bottom
* No results state provides helpful suggestions and alternative searches

### Wireframe Description - Desktop Navigation with Dropdown

```
┌─────────────────────────────────────────────────────────────────┐
│ LOGO          HOME    PROGRAMS▼   VOLUNTEER   ABOUT US    LANG  │
├─────────────────────────────────────────────────────────────────┤
│               ┌─────────────────┐                               │
│               │ Program Type 1  │                               │
│               │ Program Type 2  │                               │
│               │ Program Type 3  │                               │
│               │ All Programs    │                               │
│               └─────────────────┘                               │
│                                                                 │
```

### Wireframe Description - Breadcrumbs

```
┌─────────────────────────────────────────────────────────────────┐
│ LOGO          NAV ITEM   NAV ITEM   NAV ITEM   NAV ITEM   LANG  │
├─────────────────────────────────────────────────────────────────┤
│ Home > Programs > Program Type > Current Page                   │
├─────────────────────────────────────────────────────────────────┤
```

### Wireframe Description - Search Active

```
┌─────────────────────────────────────────────────────────────────┐
│ LOGO          NAV ITEM   NAV ITEM   NAV ITEM   ┌───────────┐ LG │
│                                                │🔍 Search  ✕│    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
```

### Wireframe Description - Search Results

```
┌─────────────────────────────────────────────────────────────────┐
│ LOGO          NAV ITEM   NAV ITEM   NAV ITEM   ┌───────────┐ LG │
│                                                │🔍 coding  ✕│    │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ PAGES                                                       │ │
│ │ > Coding Workshops for Youth                                │ │
│ │ > Summer Coding Camp 2025                                   │ │
│ │                                                             │ │
│ │ PROGRAMS                                                    │ │
│ │ > Intro to Coding (Ages 8-12)                               │ │
│ │ > Advanced Coding (Ages 13-18)                              │ │
│ │                                                             │ │
│ │ RESOURCES                                                   │ │
│ │ > Coding Resources for Parents                              │ │
│ │                                                             │ │
│ │                View all 12 results for "coding"             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
```

## 5. Performance Optimization

### Image Loading

#### Initial Load State
* Low-resolution placeholder images load first (LQIP - Low Quality Image Placeholders)
* Placeholders have a subtle blur effect and are tinted with the brand colors
* Placeholders maintain the same aspect ratio as the final images
* A subtle pulse animation indicates loading state

#### Progressive Loading State
* High-resolution images load progressively, starting from the viewport
* Images outside the viewport are loaded only when user scrolls near them
* As images load, they fade in smoothly over the placeholders (300ms transition)
* Once loaded, images are cached for future visits

### Content Loading

#### Initial Load State
* Critical content (navigation, hero section) loads first
* Content skeleton screens show layout structure while content loads
* Skeleton elements pulse subtly with a gradient animation
* Page becomes interactive before all content is loaded (Time to Interactive optimization)

#### Progressive Loading State
* Below-the-fold content loads progressively as user scrolls
* Content sections fade in with a subtle slide-up animation (300ms)
* Animations are staggered for a more natural feel
* Loading is triggered when elements are 200px below the viewport

### Offline Support

#### Online State
* Content is cached using service workers for faster subsequent loads
* Static assets (CSS, JS, images) are cached with appropriate strategies
* API responses are cached with appropriate TTL (Time To Live)

#### Offline State
* When offline, a subtle indicator appears in the header
* Previously visited pages remain accessible
* Forms can be filled out offline and submitted when connection returns
* Custom offline page provides helpful information and cached content

### Wireframe Description - Image Loading States

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────┐  │
│  │                 │    │                 │    │             │  │
│  │  BLURRED LQIP   │    │  PARTIAL LOAD   │    │ FINAL IMAGE │  │
│  │  WITH PULSE     │    │  PROGRESSIVE    │    │ FULLY LOADED│  │
│  │                 │    │                 │    │             │  │
│  └─────────────────┘    └─────────────────┘    └─────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Wireframe Description - Content Skeleton Loading

```
┌─────────────────────────────────────────────────────────────────┐
│ ████          ████    ████    ████    ████              ████    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│    ████████████████                                             │
│    ████████                                                     │
│                                                                 │
│    ████    ████                                                 │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ┌─────────────┐    ┌─────────────┐    ┌─────────────┐          │
│ │             │    │             │    │             │          │
│ │  ████████   │    │  ████████   │    │ ████████    │          │
│ │             │    │             │    │             │          │
│ │ ████████    │    │ ████████    │    │ ████████    │          │
│ │             │    │             │    │             │          │
│ │ ████        │    │ ████        │    │ ████        │          │
│ └─────────────┘    └─────────────┘    └─────────────┘          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Animation and Interaction Details

### Navigation Interactions

* **Hover Animation**: Navigation items have a subtle underline animation that expands from center outward (150ms ease-out)
* **Dropdown Animation**: Dropdown menus slide down and fade in (200ms ease-out)
* **Mobile Menu Animation**: Mobile menu slides in from right with a slight bounce at the end (300ms ease-out-back)
* **Hamburger to X Animation**: Three lines morph into X shape with a smooth transition (250ms ease-in-out)

### Button Interactions

* **Hover Animation**: Buttons translate upward by 4px and shadow increases (150ms ease-out)
* **Click Animation**: Buttons scale down slightly (95%) on click and return to normal (100ms ease-out)
* **Focus Animation**: Focus ring appears with a subtle pulse animation (200ms)
* **Loading State**: Button text fades to a loading spinner that rotates (infinite animation)

### Scroll Interactions

* **Scroll-Triggered Animations**: Content elements slide up and fade in as they enter viewport (300ms ease-out)
* **Parallax Effect**: Background shapes move at different speeds relative to scroll position
* **Sticky Navigation**: Navigation smoothly transitions to sticky state as user scrolls past hero (200ms ease-out)
* **Back-to-Top Button**: Button fades in when user scrolls past fold, with a slight bounce effect (250ms ease-out-back)

### Microinteractions

* **Form Field Focus**: Input fields have a subtle expansion effect when focused (150ms ease-out)
* **Toggle Switches**: Toggle switches have a sliding animation with a slight bounce (200ms ease-out-back)
* **Error States**: Form errors shake slightly horizontally to draw attention (300ms ease-out)
* **Success States**: Success messages fade in with a slight scale-up effect (250ms ease-out)
* **Card Hover**: Cards lift slightly and shadow increases on hover (150ms ease-out)

### Page Transitions

* **Page Load**: Content fades in with a staggered effect from top to bottom (400ms ease-out)
* **Page Exit**: Content fades out smoothly before navigation (200ms ease-out)
* **Language Switch**: Content crossfades between languages with a brief loading state (300ms ease-in-out)

## Responsive Behavior Details

### Breakpoint Transitions

* **Mobile to Tablet**: Single column layout expands to 2-column grid at 640px
* **Tablet to Desktop**: 2-column grid expands to 3-column grid at 1024px
* **Desktop to Large Desktop**: Content width caps at 1280px with increased margins at 1536px

### Component Adaptations

* **Navigation**: Horizontal navigation collapses to hamburger menu below 768px
* **Typography**: Font sizes scale down proportionally on smaller screens using fluid typography
* **Buttons**: Full-width buttons on mobile, inline buttons on larger screens
* **Cards**: Stacked vertically on mobile, horizontal grid on larger screens
* **Images**: Art direction changes at breakpoints to show optimized crops for each screen size

### Touch Optimizations

* **Touch Targets**: All interactive elements have minimum 44px × 44px touch area
* **Swipe Support**: Carousels and galleries support swipe gestures on touch devices
* **Hover Alternatives**: Hover states have tap equivalents on touch devices
* **Touch Feedback**: Visual feedback on tap with subtle scale or color change (100ms)

## Neo-Brutalist Style Implementation

### Typography Treatment

* **Gradient Headlines**: Section headlines use gradient text effects transitioning between brand colors
* **Dramatic Size Contrast**: Extreme size difference between headlines ($heading-1) and body text ($body)
* **Weight Variation**: Heavy black weight (900) for headlines contrasted with regular weight (400) for body text
* **Intentional Misalignment**: Text blocks occasionally break grid alignment for visual interest

### Geometric Elements

* **Bold Shapes**: Abstract geometric shapes from cover-bg1.png used as decorative elements
* **Thick Borders**: All containers use $border-width-thick or $border-width-brutalist black borders
* **Offset Shadows**: Elements use brutalist offset shadows ($shadow-sm, $shadow-md) instead of traditional drop shadows
* **Grid-Breaking Elements**: Some elements intentionally break the grid, extending beyond container boundaries

### Color Application

* **Color Blocking**: Bold color blocks used to separate content sections
* **Strategic Accent Colors**: Vibrant accent colors used sparingly for maximum impact
* **High Contrast**: Strong contrast between elements for visual impact
* **Textured Backgrounds**: Subtle noise texture applied to color blocks for added depth

### Interactive Elements

* **Exaggerated States**: Interactive elements have dramatic state changes (significant movement, color changes)
* **Physical Metaphors**: Buttons appear to physically move when interacted with (pressing down, lifting up)
* **Playful Animations**: Animations have slightly exaggerated, playful qualities while maintaining professionalism
* **Digital Artifacts**: Occasional "digital" elements like pixel patterns or glitch effects used sparingly

## Related documents
* [Design System Documentation](./3-Colourfully%20Digital%20Foundation%20Design%20System.md)