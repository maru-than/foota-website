---
name: foota-design
description: Use this skill to generate well-branded interfaces and assets for Foota Jerseys, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

# Foota design

Read the `README.md` file within this skill, and explore the other available files (`colors_and_type.css`, the `fonts/` and `preview/` folders, and `ui_kits/storefront/`).

The brand in one line: **sport · energetic · modern · linear** — dark base (`#111`), electric Voltron lime accent (`#C1FF56`), Sonara display + Geist UI, **sharp corners (0px radius), thin 1px hairlines, no shadows on cards**, no emoji, no marketing adjectives. The visual rules and the voice rules in `README.md` are non-negotiable; treat them like brand law.

If creating visual artifacts (slides, mocks, throwaway prototypes, marketing landing pages, etc), copy assets out of this skill folder and create static HTML files for the user to view — link `colors_and_type.css` from your output, import fonts from `fonts/`, and lift components verbatim from `ui_kits/storefront/` rather than rebuilding from scratch.

If working on production code, copy the tokens from `colors_and_type.css` into the project's CSS variable system, and use `ui_kits/storefront/` components as the reference implementation.

If the user invokes this skill without any other guidance, ask them what they want to build or design (a landing page? a campaign deck? a new product screen?), ask 4–6 focused questions about audience / surface / variations / desired tweaks, and then act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need. Default to the lime palette; switch to the alt gold/beige "Champion" palette only when the user explicitly asks for a premium / retro variant.
