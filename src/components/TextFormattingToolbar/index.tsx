import React from 'react';
import { EditorState, RichUtils, Modifier } from 'draft-js';
import { ToolbarProps } from '../WysiwygEditor/Toolbar/types';
import Button from '../Button/Button';
import styles from './styles.module.scss';

/**
 * TextFormattingToolbar component that provides text formatting capabilities:
 * - Basic formatting: bold, italic, underline
 * - Text case transformation: uppercase
 */
const TextFormattingToolbar: React.FC<ToolbarProps> = ({ editorState, onChange }) => {
  const toggleInlineStyle = (style: string) => {
    onChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  const isActive = (style: string) => {
    const currentStyle = editorState.getCurrentInlineStyle();
    return currentStyle.has(style);
  };

  const handleUppercase = () => {
    const content = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const text = content.getPlainText();
    const newContent = Modifier.replaceText(
      content,
      selection,
      text.toUpperCase()
    );
    onChange(EditorState.push(editorState, newContent, 'change-inline-style'));
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.formattingGroup}>
        <Button
          variant="icon"
          onClick={() => toggleInlineStyle('BOLD')}
          isActive={isActive('BOLD')}
          aria-label="Bold"
          className={styles.toolbarButton}
        >
          <strong>B</strong>
        </Button>
        <Button
          variant="icon"
          onClick={() => toggleInlineStyle('ITALIC')}
          isActive={isActive('ITALIC')}
          aria-label="Italic"
          className={styles.toolbarButton}
        >
          <em>I</em>
        </Button>
        <Button
          variant="icon"
          onClick={() => toggleInlineStyle('UNDERLINE')}
          isActive={isActive('UNDERLINE')}
          aria-label="Underline"
          className={styles.toolbarButton}
        >
          <u>U</u>
        </Button>
      </div>

      <div className={styles.toolbarDivider} />

      <div className={styles.transformGroup}>
        <Button
          variant="secondary"
          size="small"
          onClick={handleUppercase}
          className={styles.toolbarButton}
          aria-label="Transform text to uppercase"
        >
          UPPERCASE
        </Button>
      </div>
    </div>
  );
};

export default TextFormattingToolbar; 