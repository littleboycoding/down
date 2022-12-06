import { useRouter } from "next/router";
import type { NextPage } from "next";

import useMarkdownStore from "../stores/markdown";
import useKeyboard from "../hooks/keyboard";

import ContainerFooter from "../components/ContainerFooter";
import Button from "../components/Button";
import Column from "../components/Column";
import Spacer from "../components/Spacer";

const useHomeKeybinds = (selectFile: () => void) => {
  useKeyboard([
    {
      key: "o",
      modifier: {
        ctrl: true,
      },
      action: selectFile,
    },
  ]);
};

const Home: NextPage = () => {
  const router = useRouter();
  const setMarkdown = useMarkdownStore((state) => state.setMarkdown);

  const selectFile = async () => {
    const file = await window.selectFile();
    await window.watch(file.path);

    setMarkdown(file.content);

    router.push("/pages");
  };

  useHomeKeybinds(selectFile);

  return (
    <>
      <div>
        <h1>Down 📕</h1>
        <p>Simple, Minimalist, Keyboard-centric presentation application ❤️</p>
        <Column>
          <Button onClick={selectFile}>
            <Spacer>
              <span>📁</span>
              <span>Select file</span>
            </Spacer>
          </Button>
          <Button disabled>
            <Spacer>
              <span>📃</span>
              <span>Gist</span>
            </Spacer>
          </Button>
          <Button disabled>
            <Spacer>
              <span>🪣</span>
              <span>Pastebin</span>
            </Spacer>
          </Button>
        </Column>
      </div>
      <ContainerFooter>
        Made with ❤️ by <b>@littleboycoding</b> with <b>Go</b>, <b>Next.js</b>
      </ContainerFooter>
    </>
  );
};

export default Home;
