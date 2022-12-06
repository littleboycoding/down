import { NextPage } from "next";
import useMarkdownStore from "../stores/markdown";
import Markdown from "../components/Markdown";
import { useRouter } from "next/router";
import useKeyboard from "../hooks/keyboard";
import { Dispatch, useEffect, useMemo, useState } from "react";

import ContainerFooter from "../components/ContainerFooter";

const usePageKeybinds = (page: number, setPage: Dispatch<number>) => {
  const markdowns = useMarkdownStore((state) => state.markdowns);
  const router = useRouter();

  const navigate = (n: number) => {
    const newPage = page + n;

    if (!markdowns) return setPage(1);

    if (newPage > markdowns.length) return setPage(markdowns.length);
    if (newPage < 1) return setPage(1);

    setPage(newPage);
  };

  const firstPage = () => setPage(1);
  const lastPage = () => {
    if (!markdowns) return;
    const newPage = markdowns.length - page;

    setPage(newPage);
  };

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
      action: () => navigate(-1),
    },
    {
      key: "d",
      action: () => navigate(1),
    },
    {
      key: "Home",
      action: firstPage,
    },
    {
      key: "End",
      action: lastPage,
    },
  ]);
};

const Page: NextPage = () => {
  const [markdowns, setMarkdown] = useMarkdownStore((state) => [
    state.markdowns,
    state.setMarkdown,
  ]);
  const [page, setPage] = useState(1);

  usePageKeybinds(page, setPage);

  useEffect(
    () =>
      listen<string>("FSWrite", async (path) => {
        const file = await window.readFile(path);
        setMarkdown(file.content);
      }),
    []
  );

  const markdown = useMemo(() => markdowns?.[page - 1], [markdowns, page]);

  return (
    <>
      <Markdown>{markdown || "Emptiness :("}</Markdown>
      <ContainerFooter>{page + "/" + markdowns?.length || "?"}</ContainerFooter>
    </>
  );
};

export default Page;
