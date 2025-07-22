# Card Component

A neo-brutalist card component with different variants and sections.

## Features

- Multiple variants (default, elevated, outlined)
- Support for header, body, and footer sections
- Neo-brutalist styling with bold borders and shadows
- Responsive and bilingual support
- Accessible design
- Built-in vertical spacing between elements

## Usage

```astro
<Card>
  <div slot="header">Card Header</div>
  <p>Card Content</p>
  <div slot="footer">Card Footer</div>
</Card>

<!-- Interactive Card -->
<Card interactive href="/some-page">
  <p>Clickable Card</p>
</Card>

<!-- Elevated Card with Neo-brutalist styling -->
<Card variant="elevated">
  <p>Elevated Card with Shadow</p>
</Card>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'default' \| 'elevated' \| 'outlined' | 'default' | Card variant for different styling |
| padding | 'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Padding size for the card |
| fullWidth | boolean | false | Whether the card should take full width of its container |
| interactive | boolean | false | Whether the card is interactive (clickable) |
| href | string | undefined | URL to navigate to if the card is interactive |
| space | 'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Spacing between elements inside the card |
| class | string | '' | Additional CSS classes |
| id | string | undefined | HTML id attribute |
| aria-label | string | undefined | ARIA label for accessibility |

## Slots

- Default slot: Main content of the card
- `header`: Content for the card header
- `footer`: Content for the card footer

## Examples

### Default Card

```astro
<Card space="md">
  <Heading level={3}>Default Card</Heading>
  <Text>This is a default card with normal styling.</Text>
  <Button>Learn More</Button>
</Card>
```

### Elevated Card with Header and Footer

```astro
<Card variant="elevated" space="md">
  <div slot="header">
    <Heading level={4}>Card with Header</Heading>
  </div>
  <Text>This card demonstrates the use of header and footer slots.</Text>
  <Text>The content area is separate from the header and footer.</Text>
  <div slot="footer">
    <Button fullWidth>Footer Action</Button>
  </div>
</Card>
```

### Interactive Card

```astro
<Card interactive href="/design-system-demo" space="md">
  <Heading level={3}>Interactive Card</Heading>
  <Text>This entire card is clickable and will navigate to the design system demo page.</Text>
</Card>
```

### Customizing Spacing

```astro
<!-- Card with tight spacing -->
<Card space="xs">
  <Heading level={3}>Compact Card</Heading>
  <Text>This card has tighter spacing between elements.</Text>
</Card>

<!-- Card with generous spacing -->
<Card space="lg">
  <Heading level={3}>Spacious Card</Heading>
  <Text>This card has more generous spacing between elements.</Text>
</Card>
```