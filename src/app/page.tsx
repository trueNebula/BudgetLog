import React from "react";
import { api } from "../trcp/server.ts";

export default async function Home() {
  // const { data } = api.hello.helloSafe.useQuery();
  const { greeting: dataPossiblyUndefined } = await api.hello.talk({
    text: "again",
  });
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        Hello! {dataPossiblyUndefined}
      </main>
    </div>
  );
}
