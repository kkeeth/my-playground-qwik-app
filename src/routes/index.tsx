import { component$, Host, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const github = useStore({
    org: "BuilderIO",
    repos: ["qwik", "partytown"] as string[] | null,
  });

  return (
    <Host class="p-4">
      <h1 class="text-3xl mb-2" onClick$={() => console.warn("hola")}>
        Welcome to Qwik City
      </h1>

      <hr />

      <div class="p-4">
        <span>
          GitHub organization:
          <input
            class="ml-3 placeholder:italic placeholder:text-slate-400 border border-slate-300 rounded-md py-1 px-2 focus:border-sky-500 focus:outline-none focus:ring-1"
            value={github.org}
            onKeyUp$={(ev) =>
              (github.org = (ev.target as HTMLInputElement).value)
            }
            placeholder="any text type"
          />
        </span>
        <div>
          {github.repos ? (
            <ul class="list-square">
              {github.repos.map((repo) => (
                <li>
                  <a
                    class="underline text-blue-700"
                    href={`https://github.com/${github.org}/${repo}`}
                  >
                    {github.org}/{repo}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            "loading..."
          )}
        </div>
      </div>

      <p>The meta-framework for Qwik.</p>
      <button
        class="bg-sky-500 text-white px-2 py-1 rounded-lg"
        onClick$={() => alert("Hello World!!")}
      >
        Greet!
      </button>

      <hr />

      <Counter />
    </Host>
  );
});

export const Counter = component$(() => {
  const store = useStore({ count: 0 });

  return (
    <>
      <p>current count: {store.count}</p>
      <button
        class="bg-sky-500 text-white px-2 py-1 rounded-lg"
        onClick$={() => store.count++}
      >
        +1
      </button>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik City",
};
