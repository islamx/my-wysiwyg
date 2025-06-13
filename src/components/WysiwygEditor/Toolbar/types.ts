import { EditorState } from 'draft-js';

export interface ToolbarProps {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
} 