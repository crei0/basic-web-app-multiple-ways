# Purpose

The idea was to create a simple barebones web app using multiple web Front-end frameworks, and then compare against each other
Code quality is, on purpose not to be "perfect", it's more like if someone with some FE skills picked the framework "XYZ" and just built a simple/fast web app, then what would be the outcome of that
Also no tests have been created

# Backend

Uses a NodeJs + Express to serve the mock data from a static JSON "database" using REST+JSON
If the HTMX version is started, possibly new endpoints will be created to serve HTML partial content

# Routes

```
- / (start / dashboard)
    - /transactions
        - /:id
```
# Status

| Framework                     | Status         |
|-------------------------------|----------------|
| React + Typescript + Vite     | Completed      |
| Qwik / QwikCity               | In progress    |
| Angular                       | To be started  |
| Svelte / Sveltekit            | To be started  |
| HTMX?                         | To be started? |