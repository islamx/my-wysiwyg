import { EditorState, KeyBindingUtil, getDefaultKeyBinding } from 'draft-js';

const { hasCommandModifier } = KeyBindingUtil;

export const mapKeyToEditorCommand = (e: React.KeyboardEvent): string | null => {
  if (e.keyCode === 83 && hasCommandModifier(e)) {
    return 'save';
  }
  return getDefaultKeyBinding(e);
};

export const handleKeyCommand = (
  command: string,
  editorState: EditorState,
  eventTime: number,
  onChange: (editorState: EditorState) => void
): 'handled' | 'not-handled' => {
  if (command === 'save') {
    // Handle save command
    return 'handled';
  }
  return 'not-handled';
}; 