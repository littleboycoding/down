import { NextPage } from "next";
import useMarkdownStore from "../stores/markdown";
import Markdown from "../components/Markdown";
import { useRouter } from "next/router";
import useKeyboard from "../hooks/keyboard";
import { useEffect, useMemo, useState } from "react";

import ContainerFooter from "../components/ContainerFooter";

const Page: NextPage = () => {
  const [markdowns, setMarkdown, clearMarkdown] = useMarkdownStore((state) => [
    state.markdowns,
    state.setMarkdown,
    state.clearMarkdown,
  ]);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const navigate = (n: number) => {
    const newPage = page + n;

    if (!markdowns) return setPage(1);

    if (newPage > markdowns.length) return setPage(markdowns.length);
    if (newPage < 1) return setPage(1);

    setPage(newPage);
  };

  useKeyboard([
    {
      key: "Escape",
      action: async () => {
        await window.unwatch();
        clearMarkdown();

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
  ]);

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
