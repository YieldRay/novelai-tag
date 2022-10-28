<script type="ts">
    import Notifications from "svelte-notifications";
    import Root from "./Root.svelte";
</script>

<Notifications>
    <main>
        <Root />
    </main>
</Notifications>

<footer>
    <p>
        Made with ❤ by
        <a href="https://github.com/YieldRay"> YieldRay </a>
    </p>
    <p>
        Powered by Svelte.
        <a href="https://github.com/YieldRay/novelai-tag"> (Open Source)</a>
    </p>
</footer>

<style type="scss">
    main {
        min-height: 85vh;
        max-width: 1280px;
        margin: 0 auto;
        padding: 1.5rem;
    }
    footer {
        text-align: center;
        padding: 1em;
        background-color: #eeeeee;
        p {
            padding: 0;
            margin: 0;
        }
    }
</style>
