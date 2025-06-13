import React from 'react';
import { EditorState, RichUtils } from 'draft-js';
import styles from './styles.module.scss';
import Button from '../../Button/Button';
import { ToolbarProps } from './types';

const Toolbar: React.FC<ToolbarProps> = ({ editorState, onChange }) => {
  const toggleInlineStyle = (style: string) => {
    onChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  const isActive = (style: string) => {
    const currentStyle = editorState.getCurrentInlineStyle();
    return currentStyle.has(style);
  };

  return (
    <div className={styles.toolbar}>
      <Button
        variant="icon"
        onClick={() => toggleInlineStyle('BOLD')}
        isActive={isActive('BOLD')}
        aria-label="Bold"
      >
        <strong>B</strong>
      </Button>
      <Button
        variant="icon"
        onClick={() => toggleInlineStyle('ITALIC')}
        isActive={isActive('ITALIC')}
        aria-label="Italic"
      >
        <em>I</em>
      </Button>
      <Button
        variant="icon"
        onClick={() => toggleInlineStyle('UNDERLINE')}
        isActive={isActive('UNDERLINE')}
        aria-label="Underline"
      >
        <u>U</u>
      </Button>
    </div>
  );
};

export default Toolbar; 