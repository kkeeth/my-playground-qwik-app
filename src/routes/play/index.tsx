import { component$, Host, useStore } from "@builder.io/qwik";

export default component$(() => {
  const store = useStore({ x: 0, y: 0 });

  return (
    <Host>
      <h1>Welcome to the Docs!</h1>

      <div document:onMouseMove$={(event: MouseEvent) => {
        store.x = event.x;
        store.y = event.y;
      }}>
        Your mouse location is ({store.x}, {store.y}).
      </div>

      <hr />

      <PreventDefaultDemo />
    </Host>
  );
});


export const PreventDefaultDemo = component$(() => (
  <div class="m-4">
    <a
      href="/"
      preventdefault:click
      onClick$={() => alert('do something else.')}
    >
      click me!
    </a>
  </div>
));