import type { Preview } from "@storybook/react";
import "../app/globals.css"; // اگر globals.css نداری، این خط رو حذف کن

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: { expanded: true },
  },
};

export default preview;
