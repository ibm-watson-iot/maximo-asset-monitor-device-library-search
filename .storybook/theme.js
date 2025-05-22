import { create } from "@storybook/theming";
import { name, homepage } from '../package.json';

export default create({
  base: "light",

  // Typography
  fontBase: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
  fontCode: "'IBM Plex Mono', Menlo, 'DejaVu Sans Mono'",
  brandTitle: name,
  brandUrl: homepage,
});
