'use client';

import React, { useState, useEffect } from 'react';
import { EditorState, Editor, DraftEditorCommand } from 'draft-js';
import 'draft-js/dist/Draft.css';
import Toolbar from './Toolbar/index';
import { WysiwygProps } from './types';
import { mapKeyToEditorCommand, handleKeyCommand } from '../../utils/editorUtils';
import styles from './styles.module.scss';

const WysiwygEditor: React.FC<WysiwygProps> = ({
  value,
  onChange,
  onContentChange,
  minHeight = 400,
  className,
  style,
  renderToolbar,
}) => {
  const [editorState, setEditorState] = useState(() => 
    value || EditorState.createEmpty()
  );

  useEffect(() => {
    if (value !== undefined) {
      setEditorState(value);
    }
  }, [value]);

  const handleChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    if (onChange) {
      onChange(newEditorState);
    }
    if (onContentChange) {
      onContentChange(newEditorState);
    }
  };

  const editorStyle = {
    height: `${minHeight}px`,
    ...style
  } as React.CSSProperties;

  const toolbarProps = {
    editorState,
    onChange: handleChange,
  };

  return (
    <div className={`${styles.editorContainer} ${className || ''}`} style={editorStyle}>
      {renderToolbar ? renderToolbar(toolbarProps) : <Toolbar {...toolbarProps} />}
      <div className={styles.editor}>
        <Editor
          editorState={editorState}
          onChange={handleChange}
          handleKeyCommand={(command: DraftEditorCommand, state: EditorState, time: number) => 
            handleKeyCommand(command, state, time, handleChange)
          }
          keyBindingFn={mapKeyToEditorCommand}
          spellCheck={true}
          stripPastedStyles={true}
        />
      </div>
    </div>
  );
};

export default WysiwygEditor;
