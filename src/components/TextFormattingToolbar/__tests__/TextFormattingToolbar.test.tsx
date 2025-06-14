import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { EditorState, ContentState, RichUtils } from 'draft-js';
import TextFormattingToolbar from '../index';
import { ToolbarProps } from '../../WysiwygEditor/Toolbar/types';

// Mock the Button component
jest.mock('../../Button/Button', () => {
  return function MockButton({ onClick, children, 'data-active': isActive, ...props }: any) {
    return (
      <button 
        onClick={onClick} 
        data-active={isActive} 
        {...props} 
        data-testid="format-button"
      >
        {children}
      </button>
    );
  };
});

describe('TextFormattingToolbar', () => {
  let mockEditorState: EditorState;
  let mockOnChange: jest.Mock;
  let props: ToolbarProps;

  beforeEach(() => {
    // Create a new EditorState for each test
    mockEditorState = EditorState.createWithContent(
      ContentState.createFromText('Test content')
    );
    mockOnChange = jest.fn();
    props = {
      editorState: mockEditorState,
      onChange: mockOnChange,
    };
  });

  it('renders all formatting buttons', () => {
    render(<TextFormattingToolbar {...props} />);
    
    // Check if all formatting buttons are rendered
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('I')).toBeInTheDocument();
    expect(screen.getByText('U')).toBeInTheDocument();
    expect(screen.getByText('UPPERCASE')).toBeInTheDocument();
  });

  it('toggles bold formatting when bold button is clicked', () => {
    render(<TextFormattingToolbar {...props} />);
    
    const boldButton = screen.getByText('B');
    fireEvent.click(boldButton);
    
    expect(mockOnChange).toHaveBeenCalled();
    // The new editor state should have bold formatting
    const newEditorState = mockOnChange.mock.calls[0][0];
    expect(newEditorState.getCurrentInlineStyle().has('BOLD')).toBe(true);
  });

  it('toggles italic formatting when italic button is clicked', () => {
    render(<TextFormattingToolbar {...props} />);
    
    const italicButton = screen.getByText('I');
    fireEvent.click(italicButton);
    
    expect(mockOnChange).toHaveBeenCalled();
    // The new editor state should have italic formatting
    const newEditorState = mockOnChange.mock.calls[0][0];
    expect(newEditorState.getCurrentInlineStyle().has('ITALIC')).toBe(true);
  });

  it('toggles underline formatting when underline button is clicked', () => {
    render(<TextFormattingToolbar {...props} />);
    
    const underlineButton = screen.getByText('U');
    fireEvent.click(underlineButton);
    
    expect(mockOnChange).toHaveBeenCalled();
    // The new editor state should have underline formatting
    const newEditorState = mockOnChange.mock.calls[0][0];
    expect(newEditorState.getCurrentInlineStyle().has('UNDERLINE')).toBe(true);
  });

  it('converts selected text to uppercase when uppercase button is clicked', () => {
    // Create editor state with some selected text
    const contentState = ContentState.createFromText('test content');
    const selection = contentState.getSelectionAfter().merge({
      anchorOffset: 0,
      focusOffset: 4, // Select "test"
    });
    const editorState = EditorState.forceSelection(
      EditorState.createWithContent(contentState),
      selection
    );

    render(
      <TextFormattingToolbar
        editorState={editorState}
        onChange={mockOnChange}
      />
    );
    
    const uppercaseButton = screen.getByText('UPPERCASE');
    fireEvent.click(uppercaseButton);
    
    expect(mockOnChange).toHaveBeenCalled();
    // The new editor state should have uppercase text for the selected portion only
    const newEditorState = mockOnChange.mock.calls[0][0];
    expect(newEditorState.getCurrentContent().getPlainText()).toBe('TEST content');
  });
}); 