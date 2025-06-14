# WYSIWYG Editor

A modern rich text editor built with draft-js and Next.js, supporting both controlled and uncontrolled modes.

## 🚀 Live Demo

Check out the live demo at [https://my-wysiwyg.vercel.app/](https://my-wysiwyg.vercel.app/)

## Features

- ✨ Dual Mode Support:
  - Controlled Mode: Editor state is managed by the parent component
  - Uncontrolled Mode: Editor manages its own internal state
- 🎨 Text Formatting Toolbar:
  - Basic formatting: bold, italic, underline
  - Text case transformation: uppercase
- 📝 Built with draft-js for robust text editing
- 🔄 Asynchronous content saving and loading
- 👁️ Live content preview
- 🎯 TypeScript support
- 🛠️ Customizable toolbar through renderToolbar prop

## Installation

```bash
# Install dependencies
npm install

# Run development server
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
  minHeight={200}
/>

// Uncontrolled mode
<WysiwygEditor
  onContentChange={handleContentChange}
  minHeight={200}
/>
```

### Custom Toolbar
The editor supports a custom toolbar through the `renderToolbar` prop. This allows you to:
- Replace the default toolbar with your own implementation
- Add custom formatting options
- Modify the toolbar's appearance and behavior

Example of a custom toolbar (TextFormattingToolbar):
```tsx
import { TextFormattingToolbar } from './components/TextFormattingToolbar';

// Use the custom toolbar
<WysiwygEditor
  value={editorState}
  onChange={setEditorState}
  renderToolbar={(props) => <TextFormattingToolbar {...props} />}
/>
```

The `ToolbarProps` interface provides:
- `editorState`: The current state of the editor
- `onChange`: Callback to update the editor state

### Editor Modes

#### Controlled Mode
- Editor state is managed by the parent component
- Content can be saved and loaded from a mock API
- Preview reflects changes in real-time
- Full control over the editor's state

#### Uncontrolled Mode
- Editor manages its own internal state
- Content can be saved and loaded from a mock API
- Preview reflects changes in real-time
- Simpler implementation for basic use cases

### Text Formatting Features
- **Basic Formatting**:
  - Bold (Ctrl/Cmd + B)
  - Italic (Ctrl/Cmd + I)
  - Underline (Ctrl/Cmd + U)
- **Text Transformation**:
  - Convert selected text to uppercase

## Project Structure

```
src/
├── app/                         # Next.js application
│   ├── page.tsx                # Main page with mode toggle
│   └── page.module.scss        # Page styles
├── components/
│   ├── WysiwygEditor/         # Editor component
│   │   ├── index.tsx          # Main component
│   │   ├── styles.module.scss # Editor styles
│   │   ├── Toolbar/          # Default toolbar
│   │   └── types.ts          # TypeScript definitions
│   ├── TextFormattingToolbar/ # Custom toolbar with formatting features
│   │   ├── index.tsx         # Toolbar implementation
│   │   └── styles.module.scss # Toolbar styles
│   └── Button/               # Reusable button component
├── styles/                    # Global styles
│   ├── _variables.scss       # CSS variables
│   └── _mixins.scss         # SCSS mixins
└── utils/                    # Utility functions
    ├── editorUtils.ts       # Editor utilities
    └── fakeApi.ts          # Mock API for content saving/loading
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

## Dependencies
- Next.js: React framework
- draft-js: Rich text editor framework
- TypeScript: Type safety
- SCSS Modules: Styling

## License

MIT
