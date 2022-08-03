import { component$, Host, useStore, Resource, useResource$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const github = useStore({
    org: "BuilderIO",
    repos: ["qwik", "partytown"] as string[] | null,
  });

  const reposResource = useResource$<string[]>(({ track, cleanup }) => {
    track(github, 'org');

    const controller = new AbortController();
    cleanup(() => controller.abort());

    return getRepositories(github.org, controller);
  });

  console.log('Render');
  return (
    <Host class="p-4">
      <h1 class="text-3xl mb-2" onClick$={() => console.warn("hola")}>
        Welcome to Qwik City
      </h1>

      <Greet />
      <hr />
      <Counter />
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
          <Resource
            resource={reposResource}
            onPending={() => <>Loading...</>}
            onRejected={(error) => <>Error: {error.message}</>}
            onResolved={(repos) => (
              <ul class="list-square">
                {repos.map((repo) => (
                  <li>
                    <a
                      class="underline text-blue-700"
                      href={`https://github.com/${github.org}/${repo}`}
                    >{repo}</a>
                  </li>
                ))}
              </ul>
            )}
          />
        </div>
      </div>
    </Host>
  );
});

export const Greet = component$(() => (
  <>
    <p>The meta-framework for Qwik.</p>
    <button
      class="bg-sky-500 text-white px-2 py-1 rounded-lg"
      onClick$={() => alert("Hello World!!")}
    >
      Greet!
    </button>
  </>
))
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

export const getRepositories = async (
  username: string,
  controller?: AbortController,
): Promise<string[]> => {
  console.log('FETCH', `https://api.github.com/users/${username}/repos`);

  const resp = await fetch(`https://api.github.com/users/${username}/repos`, {
    signal: controller?.signal,
  });
  console.log('FETCH resolved');
  const json = await resp.json();

  return Array.isArray(json)
    ? json.map((repo: { name: string }) => repo.name)
    : Promise.reject(json);
};
