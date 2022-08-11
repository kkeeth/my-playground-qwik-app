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
    </Host>
  );
});
