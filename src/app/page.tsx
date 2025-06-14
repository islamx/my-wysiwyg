'use client';

import React, { useState, useEffect } from "react";
import WysiwygEditor from "../components/WysiwygEditor";
import { EditorState, ContentState } from "draft-js";
import { loadContent, saveContent } from "../utils/fakeApi";
import Button from "../components/Button/Button";
import TextFormattingToolbar from "../components/TextFormattingToolbar";
import { ToolbarProps } from "../components/WysiwygEditor/Toolbar/types";
import styles from './page.module.scss';

export default function Home() {
  const [isControlled, setIsControlled] = useState(true);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [uncontrolledState, setUncontrolledState] = useState<EditorState | null>(null);
  const [loading, setLoading] = useState(true);

  // Load initial content
  useEffect(() => {
    setLoading(true);
    loadContent().then((content) => {
      if (isControlled) {
        setEditorState(content);
      } else {
        setUncontrolledState(content);
      }
      setLoading(false);
    });
  }, [isControlled]); // Re-run when mode changes

  const isEmptyContent = (state: EditorState | null) => {
    if (!state) return true;
    const content = state.getCurrentContent();
    return content.getPlainText().trim() === '';
  };

  const handleSave = async () => {
    const contentToSave = isControlled ? editorState : uncontrolledState;
    
    if (isEmptyContent(contentToSave)) {
      alert("Please add some content before saving");
      return;
    }

    try {
      await saveContent(contentToSave as EditorState);
      alert("Content saved successfully!");
    } catch (error) {
      console.error("Failed to save content:", error);
      alert("Failed to save content. Please try again.");
    }
  };

  const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMode = e.target.checked;
    setIsControlled(newMode);
    
    // When switching modes, load content from the API
    loadContent().then((content) => {
      if (newMode) {
        setEditorState(content);
      } else {
        setUncontrolledState(content);
      }
    });
  };

  // Get the current content text
  const getCurrentContent = () => {
    if (isControlled) {
      return editorState.getCurrentContent().getPlainText();
    }
    return uncontrolledState?.getCurrentContent().getPlainText() || '';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>WYSIWYG Editor</h1>
        <p className={styles.description}>
          A modern rich text editor with controlled/uncontrolled modes
        </p>
      </div>

      <div className={styles.modeToggle}>
        <label className={styles.switchLabel}>
          <span>{isControlled ? "Controlled Mode" : "Uncontrolled Mode"}</span>
          <div className={styles.switch}>
            <input
              type="checkbox"
              checked={isControlled}
              onChange={handleModeChange}
            />
            <span className={styles.slider}></span>
          </div>
        </label>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.editorSection}>
          <p className={styles.modeDescription}>
            {isControlled 
              ? "Editor is in controlled mode. State is managed by the parent component."
              : "Editor is in uncontrolled mode. State is managed internally by the editor component."}
          </p>
          
          {loading ? (
            <div style={{ textAlign: "center", padding: "2rem", color: "#64748b", fontStyle: "italic" }}>
              Loading...
            </div>
          ) : (
            <>
              <WysiwygEditor
                value={isControlled ? editorState : undefined}
                onChange={isControlled ? setEditorState : undefined}
                onContentChange={!isControlled ? setUncontrolledState : undefined}
                className={styles.editor}
                minHeight={200}
                renderToolbar={(props: ToolbarProps) => <TextFormattingToolbar {...props} />}
              />
              <Button
                variant="primary"
                size="large"
                onClick={handleSave}
                className={styles.saveButton}
              >
                Save Content
              </Button>
            </>
          )}
        </div>

        <div className={styles.previewSection}>
          <h3 className={styles.previewTitle}>
            Content Preview ({isControlled ? "Controlled" : "Uncontrolled"} Mode)
          </h3>
          <div className={styles.previewContent}>
            {getCurrentContent() || <em>Start typing to see your content here...</em>}
          </div>
        </div>
      </div>
    </div>
  );
}

