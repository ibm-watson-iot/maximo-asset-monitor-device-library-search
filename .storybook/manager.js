import { addons } from "@storybook/manager-api";
import theme from "./theme";

addons.setConfig({
  isFullscreen: true,
  showNav: false,
  showPanel: false,
  panelPosition: "bottom",
  enableShortcuts: false,
  showToolbar: false,
  theme,
  selectedPanel: undefined,
  initialActive: "canvas",
  sidebar: {
    showRoots: false,
    collapsedRoots: ["other"],
    disable: true,
  },
  docs: { disable: true },
  toolbar: {
    title: { hidden: true },
    zoom: { hidden: true },
    eject: { hidden: true },
    copy: { hidden: true },
    // fullscreen: { hidden: true },
  },
});
