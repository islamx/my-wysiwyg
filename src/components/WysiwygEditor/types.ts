import { EditorState } from 'draft-js';
import { ToolbarProps } from './Toolbar/types';
import React from 'react';

export interface WysiwygProps {
  value?: EditorState;
  onChange?: (editorState: EditorState) => void;
  onContentChange?: (editorState: EditorState) => void;
  minHeight?: number;
  className?: string;
  style?: React.CSSProperties;
  renderToolbar?: (props: ToolbarProps) => React.ReactNode;
} 