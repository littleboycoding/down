import { useRouter } from "next/router";
import styled from "styled-components";
import type { NextPage } from "next";

import useMarkdownStore from "../stores/markdown";
import useKeyboard from "../hooks/keyboard";
import ContainerFooter from "../components/ContainerFooter";
import Button from "../components/Button";

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Home: NextPage = () => {
  const router = useRouter();
  const setMarkdown = useMarkdownStore((state) => state.setMarkdown);

  const selectFile = async () => {
    const file = await window.selectFile();
    await window.watch(file.path);

    setMarkdown(file.content);

    router.push("/pages");
  };

  useKeyboard([
    {
      key: "o",
      modifier: {
        ctrl: true,
      },
      action: selectFile,
    },
  ]);

  return (
    <>
      <div>
        <h1>Down 📕</h1>
        <p>Simple, Minimalist, Keyboard-centric presentation application ❤️</p>
        <Column>
          <Button onClick={selectFile}>Select file 📁</Button>
          <Button disabled>Gist 📃</Button>
          <Button disabled>Pastebin 🪣</Button>
        </Column>
      </div>
      <ContainerFooter>
        Made with ❤️ by <b>@littleboycoding</b> with <b>Go</b>, <b>Next.js</b>
      </ContainerFooter>
    </>
  );
};

export default Home;
