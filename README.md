# WYSIWYG Editor Demo

A Next.js application showcasing a WYSIWYG editor with both controlled and uncontrolled modes, featuring live content preview.

## Features

- ✨ Dual Mode Support:
  - Controlled Mode: Editor state is managed by the parent component
  - Uncontrolled Mode: Editor manages its own internal state
- 🎨 Integrated formatting toolbar
- 💅 Modern design with dark mode support
- 📝 Text formatting (bold, italic, underline)
- 🔄 Asynchronous content saving and loading
- 👁️ Live content preview
- 🎯 TypeScript support

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Usage

You can switch between control modes using the toggle button at the top of the application:

### Controlled Mode
- Editor state is managed by the parent component
- Content can be saved and loaded from a mock API
- Preview reflects changes in real-time

### Uncontrolled Mode
- Editor manages its own internal state
- Content can be saved and loaded from a mock API
- Preview reflects changes in real-time

## Project Structure

```
src/
├── app/                         # Next.js application
│   ├── page.tsx                # Main page
│   └── page.module.scss        # Page styles
├── components/
│   ├── WysiwygEditor/         # Editor component
│   │   ├── index.tsx          # Main component
│   │   ├── styles.module.scss # Editor styles
│   │   ├── Toolbar/          # Toolbar component
│   │   └── types.ts          # TypeScript definitions
│   └── Button/               # Button component
├── styles/                    # Global styles
│   ├── _variables.scss       # CSS variables
│   └── _mixins.scss         # SCSS mixins
└── utils/                    # Utility functions
    ├── editorUtils.ts       # Editor utilities
    └── fakeApi.ts          # Mock API
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## License

MIT
