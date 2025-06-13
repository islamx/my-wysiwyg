declare module 'draft-js' {
  import { ComponentType, KeyboardEvent } from 'react';

  export class EditorState {
    static createEmpty(): EditorState;
    getCurrentContent(): ContentState;
    getCurrentInlineStyle(): DraftInlineStyle;
  }

  export class ContentState {
    getPlainText(): string;
  }

  export type DraftInlineStyle = Set<string>;
  export type DraftEditorCommand = string;

  export const RichUtils: {
    toggleInlineStyle(editorState: EditorState, inlineStyle: string): EditorState;
    handleKeyCommand(editorState: EditorState, command: DraftEditorCommand): EditorState | null;
  };

  export const KeyBindingUtil: {
    hasCommandModifier(e: KeyboardEvent): boolean;
  };

  export const getDefaultKeyBinding: (e: KeyboardEvent) => DraftEditorCommand | null;

  export interface EditorProps {
    editorState: EditorState;
    onChange: (editorState: EditorState) => void;
    handleKeyCommand?: (command: DraftEditorCommand, editorState: EditorState, eventTime: number) => 'handled' | 'not-handled';
    keyBindingFn?: (e: KeyboardEvent) => DraftEditorCommand | null;
    spellCheck?: boolean;
    stripPastedStyles?: boolean;
  }

  export const Editor: ComponentType<EditorProps>;
} 