# Design System Explorer

A comprehensive design system builder for creating and managing design tokens (colors, typography, spacing, shadows, and more).

## Features

- 🎨 **Color Management**: Create unlimited custom colors with live preview
- 📝 **Typography System**: Configure font sizes with automatic scaling
- 📏 **Spacing Scale**: Define consistent spacing tokens
- 🔲 **Border Radius**: Set up rounded corner scales
- 🌓 **Shadows**: Create elevation systems
- 👁️ **Opacity Scale**: Standard opacity values
- 📊 **Line Heights**: Typography line spacing
- 💾 **Save & Load**: Store color palettes locally
- 🔄 **Version History**: Track design system changes
- 📤 **Export Options**:
  - CSS Custom Properties
  - Figma Tokens (Tokens Studio format)
- 🎭 **Live Preview**: See your design system in action with 20+ UI components

## Tech Stack

- React + TypeScript
- Tailwind CSS
- shadcn/ui components
- Parcel bundler

## Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm installed (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

### Development

```bash
# Run dev server (http://localhost:1234)
pnpm dev
```

### Building

```bash
# Create production build
pnpm build

# Create single-file HTML artifact
bash /path/to/bundle-artifact.sh
```

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import repository in Vercel
3. Vercel auto-detects React/Parcel
4. Deploy!

Your live URL: `your-project.vercel.app`

## Usage

### Creating Design Tokens

1. **Colors Tab**: Add/edit/remove colors, generate random palettes
2. **Typography Tab**: Set base size and scale ratio
3. **Spacing Tab**: Configure spacing scale and base unit
4. **Other Tabs**: Set up radius, shadows, opacity, line heights
5. **Preview Tab**: See all tokens in action
6. **Version History**: Save versions and compare changes

### Exporting

#### CSS Export
- Click "Export CSS" button
- Copy generated CSS custom properties
- Paste into your stylesheet

#### Figma Export
- Click "Export Figma" button
- JSON file downloads automatically
- Import into Figma using Tokens Studio plugin

### Importing to Figma

1. Install "Tokens Studio for Figma" plugin
2. Click "Export Figma" to download JSON
3. In Figma: Plugins → Tokens Studio → Load from file
4. Select downloaded JSON
5. All tokens imported as Figma variables!

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT

## Created By

Built with Claude
