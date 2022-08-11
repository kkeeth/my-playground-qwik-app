import { component$, Host, useStore, useClientEffect$, useRef } from "@builder.io/qwik";

export default component$(() => {
  const store = useStore({ x: 0, y: 0 });

  return (
    <Host>
      <h1>Welcome to the Docs!</h1>

      <div document:onClick$={(event: MouseEvent) => {
        store.x = event.x;
        store.y = event.y;
      }}>
        Your mouse location is ({store.x}, {store.y}).
      </div>

      <hr />

      <PreventDefaultDemo />

      <hr />

      <Clock />
    </Host>
  );
});


export const PreventDefaultDemo = component$(() => {
  const aHref = useRef();

  useClientEffect$(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      window.open('http://qwik.builder.io');
    };

    aHref.current!.addEventListener('click', handler);
    return () => aHref.current!.removeEventListener('click', handler);
  });

  return (
    <div class="p-4">
      <a
        href="/"
        preventdefault:click
        onClick$={() => alert('do something else.')}
      >
        click me!
      </a>
      <button
        class="bg-sky-500 text-white px-2 py-1 rounded-lg ml-4"
        ref={aHref}
      >
        open
      </button>
    </div>
  );
});

export const Clock = component$(() => {
  const state = useStore({
    seconds: 0,
  });
  useClientEffect$(() => {
    const interval = setInterval(() => {
      state.seconds++;
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <>
      <div class="p-4">Seconds: {state.seconds}</div>
    </>
  );
});