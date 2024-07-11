import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import * as marked from "https://esm.sh/marked";
import { createStore } from "https://esm.sh/redux";
import { Provider, connect } from "https://esm.sh/react-redux";

const UPDATE_MARKDOWN = "UPDATE_MARKDOWN";

const updateMarkdown = (markdown) => ({
  type: UPDATE_MARKDOWN,
  payload: markdown
});

const initialState = {
  markdown: `# Header 1

## Sub Header 2

[Link to Google](https://www.google.com/)

Inline \`code\` example

\`\`\`
// Code block example
function greet() {
  console.log('Hello!');
}
\`\`\`

- List item 1
- List item 2

> Blockquote example

![React Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png)

**Bolded text example**
`
};

// const initialState = {
//   markdown: '',
// };

const markdownReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MARKDOWN:
      return {
        ...state,
        markdown: action.payload
      };
    default:
      return state;
  }
};

const store = createStore(markdownReducer);

const MarkdownEditor = ({ markdown, updateMarkdown }) => {
  const handleChange = (e) => {
    updateMarkdown(e.target.value);
  };

  // const createMarkup = () => {
  //   const html = marked.parse(markdown); // Utilizar marked.parse para convertir markdown a HTML
  //   return { __html: html };
  // };

  const createMarkup = () => {
    const html = marked.parse(markdown, { breaks: true }); // Enable breaks for newline interpretation
    return { __html: html };
  };

  return (
    <div className="markdown-editor">
      <div className="editor-wrapper">
        <div className="toolbar">
          <i class="fa-brands fa-markdown"></i>
        </div>
        <textarea
          id="editor"
          value={markdown}
          onChange={handleChange}
          placeholder="Escribe tu markdown aquí..."
        />
      </div>
      <div className="preview-wrapper">
        <div className="toolbar">
          <i class="fa-solid fa-code"></i>
        </div>
        <div
          id="preview"
          className="preview"
          dangerouslySetInnerHTML={createMarkup()}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  markdown: state.markdown
});

const mapDispatchToProps = {
  updateMarkdown
};

const ConnectedMarkdownEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(MarkdownEditor);

const App = () => (
  <div className="App">
    <h1 id="main-title">Markdown Editor</h1>
    <ConnectedMarkdownEditor />
  </div>
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
