<script lang="ts">
  import axios from "axios";

  let name = $state('');
  let email = $state('');
  let message = $state('');

  function checkIfSubmitted() {
    const lastSubmitted = localStorage?.getItem("submittedContactForm");

    if (!lastSubmitted) {
      return false;
    }

    return new Date().getTime() - new Date(lastSubmitted).getTime() < (5 * 24 * 3600 * 1000);
  }

  let hasSubmitted = $state(checkIfSubmitted() || false);

  let isSending = $state(false);

  async function submitContactForm() {
    if (isSending || !name || !email || !message) {
      return;
    }

    isSending = true;

    const api = axios.create({
      baseURL: import.meta.env.PROD ? "http://localhost:8000/" : "https://api.izzicup.net/",
      headers: { "Content-Type": "application/json" },
    });

    api.post("contact-us", { name, email, message }).then(() => {
      localStorage.setItem("submittedContactForm", String(new Date()));
      hasSubmitted = true;
    }).finally(() => {
      isSending = false;
    })
  }
</script>

{#if !hasSubmitted}
  <form class="flex flex-col" onsubmit={(event) => event.preventDefault()}>
    <div class="flex items-center">
      <label class="flex flex-col font-medium" for="name">
        Name
        <input
            id="name"
            bind:value={name}
            type="text"
            class="mt-1 rounded text-black font-normal px-2 py-0.5"
        >
      </label>

      <label class="flex flex-col font-medium ml-4" for="email">
        Email
        <input
          id="email"
          bind:value={email}
          type="email"
          class="mt-1 rounded text-black font-normal px-2 py-0.5"
        >
      </label>
    </div>

    <label for="message" class="flex flex-col font-medium mt-4">
      Message
      <textarea
        id="message"
        bind:value={message}
        name="message"
        rows="5"
        class="mt-1 rounded text-black font-normal px-2 py-0.5"
      ></textarea>
    </label>

    <button
      type="button"
      class="mx-auto mt-4 w-fit font-semibold rounded border px-2 py-0.5 bg-neutral-900
        hover:bg-neutral-800 hover:text-emerald-600
        active:bg-neutral-700 active:text-emerald-400
        disabled:bg-neutral-950 disabled:text-white/20 disabled:cursor-not-allowed
        active-focus:text-emerald-600 transition-colors"
      onclick={submitContactForm}
    >
      Submit
    </button>
  </form>
{:else}
  <p>
    Thank you for your submission. We will get back to you as soon as possible.
  </p>
{/if}
