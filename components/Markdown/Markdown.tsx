import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import CodeBlock from "../CodeBlock";

const Markdown = styled.div`
  max-width: 80ch;
`;

const MarkdownStyled = (props: { children: string }) => {
  return (
    <Markdown>
      <ReactMarkdown
        components={{
          code: CodeBlock,
        }}
      >
        {props.children}
      </ReactMarkdown>
    </Markdown>
  );
};

export default MarkdownStyled;
