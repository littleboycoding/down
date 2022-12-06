import highlight from "highlight.js";
import { ReactNode, useEffect, useRef, useMemo } from "react";
import styled from "styled-components";
import sanitize from "sanitize-html";

const CodeBlock = styled.div`
  padding: 1.5rem;
`;

const CodeBlockStyled = (props: {
  children: ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const escaped = useMemo(
    () => (props.children ? sanitize(props.children.toString()) : null),
    [props.children]
  );

  useEffect(() => {
    const div = ref.current;

    if (!div) return;

    div.innerHTML = escaped || "";
    highlight.highlightElement(div);
  }, [escaped]);

  return (
    <CodeBlock className={props.className} ref={ref}>
      {escaped}
    </CodeBlock>
  );
};

export default CodeBlockStyled;
