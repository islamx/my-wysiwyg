import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { EditorState, ContentState } from 'draft-js';
import WysiwygEditor from '../index';
import { WysiwygProps } from '../types';
import styles from '../styles.module.scss';

// Mock the Editor component from draft-js
jest.mock('draft-js', () => ({
  ...jest.requireActual('draft-js'),
  Editor: ({ editorState, onChange }: any) => (
    <div
      data-testid="mock-editor"
      onClick={() => {
        // Simulate editor change
        const newContent = ContentState.createFromText('New content');
        onChange(EditorState.createWithContent(newContent));
      }}
    >
      {editorState.getCurrentContent().getPlainText()}
    </div>
  ),
}));

describe('WysiwygEditor', () => {
  let mockEditorState: EditorState;
  let mockOnChange: jest.Mock;
  let mockOnContentChange: jest.Mock;

  beforeEach(() => {
    mockEditorState = EditorState.createWithContent(
      ContentState.createFromText('Initial content')
    );
    mockOnChange = jest.fn();
    mockOnContentChange = jest.fn();
  });

  it('renders in controlled mode when value and onChange are provided', () => {
    const props: WysiwygProps = {
      value: mockEditorState,
      onChange: mockOnChange,
    };

    render(<WysiwygEditor {...props} />);
    
    const editor = screen.getByTestId('mock-editor');
    expect(editor).toHaveTextContent('Initial content');
  });

  it('renders in uncontrolled mode when no value prop is provided', () => {
    const props: WysiwygProps = {
      onContentChange: mockOnContentChange,
    };

    render(<WysiwygEditor {...props} />);
    
    const editor = screen.getByTestId('mock-editor');
    expect(editor).toBeInTheDocument();
  });

  it('calls onChange when content changes in controlled mode', () => {
    const props: WysiwygProps = {
      value: mockEditorState,
      onChange: mockOnChange,
    };

    render(<WysiwygEditor {...props} />);
    
    const editor = screen.getByTestId('mock-editor');
    fireEvent.click(editor);
    
    expect(mockOnChange).toHaveBeenCalled();
    const newEditorState = mockOnChange.mock.calls[0][0];
    expect(newEditorState.getCurrentContent().getPlainText()).toBe('New content');
  });

  it('calls onContentChange when content changes in uncontrolled mode', () => {
    const props: WysiwygProps = {
      onContentChange: mockOnContentChange,
    };

    render(<WysiwygEditor {...props} />);
    
    const editor = screen.getByTestId('mock-editor');
    fireEvent.click(editor);
    
    expect(mockOnContentChange).toHaveBeenCalled();
    const newEditorState = mockOnContentChange.mock.calls[0][0];
    expect(newEditorState.getCurrentContent().getPlainText()).toBe('New content');
  });

  it('renders with custom toolbar when renderToolbar prop is provided', () => {
    const CustomToolbar = ({ editorState, onChange }: any) => (
      <div data-testid="custom-toolbar">Custom Toolbar</div>
    );

    const props: WysiwygProps = {
      value: mockEditorState,
      onChange: mockOnChange,
      renderToolbar: (toolbarProps) => <CustomToolbar {...toolbarProps} />,
    };

    render(<WysiwygEditor {...props} />);
    
    expect(screen.getByTestId('custom-toolbar')).toBeInTheDocument();
  });

  it('applies custom className and style props', () => {
    const customStyle = { backgroundColor: 'red' };
    const props: WysiwygProps = {
      value: mockEditorState,
      onChange: mockOnChange,
      className: 'custom-class',
      style: customStyle,
    };

    const { container } = render(<WysiwygEditor {...props} />);
    
    // The editor container should have both the default class and custom class
    const editorContainer = container.firstChild as HTMLElement;
    expect(editorContainer).toHaveClass(styles.editorContainer, 'custom-class');
    
    // Check if the style is applied to the editor container
    Object.entries(customStyle).forEach(([key, value]) => {
      expect(editorContainer.style[key as any]).toBe(value);
    });
  });
}); 