import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

import useKeyboard from "../hooks/keyboard";

import useMarkdownStore from "../stores/markdown";
import usePageStore from "../stores/page";

import Markdown from "../components/Markdown";
import ContainerFooter from "../components/ContainerFooter";

const useKeybind = () => {
  const markdowns = useMarkdownStore((state) => state.markdowns);
  const router = useRouter();
  const [page, next, previous, go] = usePageStore((state) => [
    state.page,
    state.next,
    state.previous,
    state.go,
  ]);

  useKeyboard([
    {
      key: "Escape",
      action: async () => {
        await window.unwatch();

        router.push("/");
      },
    },
    {
      key: "a",
      action: () => {
        if (page > 1) previous();
      },
    },
    {
      key: "d",
      action: () => {
        if (markdowns && page < markdowns.length) next();
      },
    },
    {
      key: "Home",
      action: () => go(1),
    },
    {
      key: "End",
      action: () => {
        if (!markdowns) return;

        go(markdowns.length);
      },
    },
  ]);
};

const Page: NextPage = () => {
  const [markdowns, setMarkdown] = useMarkdownStore((state) => [
    state.markdowns,
    state.setMarkdown,
  ]);
  const page = usePageStore((state) => state.page);

  useEffect(
    () =>
      listen<string>("FSWrite", async (path) => {
        const file = await window.readFile(path);
        setMarkdown(file.content);
      }),
    []
  );

  const markdown = useMemo(() => markdowns?.[page - 1], [markdowns, page]);

  useKeybind();

  return (
    <>
      <Markdown>{markdown || "Emptiness :("}</Markdown>
      <ContainerFooter>
        <span>{page + "/" + markdowns?.length || "?"}</span>
      </ContainerFooter>
    </>
  );
};

export default Page;
