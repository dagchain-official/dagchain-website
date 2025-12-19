# DAGChain Landing Page

A visually stunning, pixel-perfect landing page for DAGChain - an Ethereum Layer 1 blockchain project focused on Agentic AI and no-code/vibe coding user onboarding.

## Features

- 🎨 **Ultra-modern UI** with glassmorphism effects and premium animations
- 🌈 **Beautiful gradients** with deep purple (#6C38FF) accent colors
- ✨ **Smooth animations** powered by Framer Motion
- 📱 **Fully responsive** design with mobile-first approach
- ♿ **Accessible** with ARIA attributes and keyboard navigation
- 🚀 **Performance optimized** with Next.js 14 and TypeScript
- 🎭 **Premium typography** using Sora and Inter fonts from Google Fonts

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Sora & Inter)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
dag2/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with fonts and metadata
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   └── button.tsx    # Animated button component
│   ├── navbar.tsx        # Navigation with glassmorphism
│   └── hero.tsx          # Hero section with animations
├── lib/                  # Utility functions
│   └── utils.ts          # Common utilities (cn, etc.)
├── styles/               # Global styles
│   └── globals.css       # Tailwind + custom CSS
└── public/               # Static assets
```

## Key Components

### Navbar
- Transparent background with frosted glass blur
- Sticky behavior with shadow on scroll
- Animated navigation links with purple glow effects
- Prominent "Connect Wallet" button with gradient and glow
- Mobile-responsive with animated hamburger menu

### Hero Section
- Full viewport height with centered content
- Animated gradient text highlights on key words
- Floating glassmorphic purple blobs with parallax motion
- Call-to-action buttons with hover animations
- Scroll indicator with bounce animation
- Mouse-following gradient overlay effect

## Customization

### Colors
The primary purple color scheme can be customized in `tailwind.config.js`:

```javascript
primary: {
  DEFAULT: "#6C38FF",
  // ... other shades
}
```

### Animations
Custom animations are defined in the Tailwind config and can be extended:

```javascript
keyframes: {
  "custom-animation": {
    // ... keyframe definitions
  }
}
```

### Typography
Font families are configured in `app/layout.tsx` and can be changed by updating the Google Fonts imports.

## Performance

- **Optimized fonts** with `display: swap` for better loading
- **Efficient animations** using CSS transforms and Framer Motion
- **Responsive images** and lazy loading where applicable
- **Minimal bundle size** with tree-shaking and code splitting

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please contact the DAGChain team or create an issue in the repository.

---

Built with ❤️ by the DAGChain team
