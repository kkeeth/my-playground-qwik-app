import { component$, Host, Slot, useStyles$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Breadcrumbs } from "../../../components/breadcrumbs/breadcrumbs";
import Footer from "../../../components/footer/footer";
import Header from "../../../components/header/header";
import styles from "./index.css?inline";

export default component$(() => {
  useStyles$(styles);

  return (
    <Host class="play full-screen">
      <Header />
      <main>
        <section class="play-content">
          <Breadcrumbs />
          <Slot />
        </section>
      </main>
      <Footer />
    </Host>
  );
});

export const head: DocumentHead = ({ head }) => {
  return {
    title: `Docs: ${head.title}`,
  };
};
