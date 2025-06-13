import { EditorState, ContentState } from "draft-js";

// simulate fetching initial content
export function loadContent(): Promise<EditorState> {
  return new Promise((res) => {
    setTimeout(() => {
      const content = ContentState.createFromText("Hello from fake API!");
      res(EditorState.createWithContent(content));
    }, 1000);
  });
}

// simulate saving content
export function saveContent(state: EditorState): Promise<void> {
  return new Promise((res) => {
    setTimeout(() => {
      console.log(
        "Saved content:",
        state.getCurrentContent().getPlainText()
      );
      res();
    }, 500);
  });
}
