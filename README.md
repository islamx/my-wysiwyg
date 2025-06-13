# WYSIWYG Editor Component

A modern, reusable WYSIWYG editor component built with React and Draft.js. This component supports both controlled and uncontrolled modes, with a customizable toolbar and modern styling.

## Features

- ✨ Controlled and uncontrolled modes
- 🎨 Customizable toolbar
- 💅 Modern styling with CSS variables
- 📝 Basic formatting (bold, italic, underline)
- 🔄 Async content loading/saving
- 🎯 TypeScript support

## Installation

```bash
npm install
npm run dev
```

## Usage

### Basic Usage

```tsx
import WysiwygEditor from './components/WysiwygEditor';
import { EditorState } from 'draft-js';

// Controlled mode
const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

<WysiwygEditor
  value={editorState}
  onChange={setEditorState}
  minHeight={400}
/>

// Uncontrolled mode
<WysiwygEditor
  onContentChange={(state) => console.log(state)}
  minHeight={400}
/>
```

### Custom Toolbar

```tsx
const CustomToolbar = ({ editorState, onChange }) => (
  <div className="my-toolbar">
    {/* Your custom toolbar buttons */}
  </div>
);

<WysiwygEditor
  renderToolbar={(props) => <CustomToolbar {...props} />}
  minHeight={400}
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| value | EditorState | No | - | Editor state for controlled mode |
| onChange | (state: EditorState) => void | No | - | Called when content changes in controlled mode |
| onContentChange | (state: EditorState) => void | No | - | Called when content changes in uncontrolled mode |
| minHeight | number | No | 400 | Minimum height of the editor in pixels |
| className | string | No | - | Additional CSS class name |
| style | CSSProperties | No | - | Additional inline styles |
| renderToolbar | (props: ToolbarProps) => ReactNode | No | - | Custom toolbar render function |

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── WysiwygEditor/
│   │   ├── index.tsx              # Main component
│   │   ├── styles.module.scss     # Editor styles
│   │   ├── Toolbar/              # Toolbar component
│   │   └── types.ts              # Type definitions
│   └── Button/                   # Button component
├── styles/                       # Global styles
├── utils/                        # Utility functions
└── app/                         # Demo application
```

## License

MIT
