import type { Meta, StoryObj } from "@storybook/react";
import CategoryCard from "../app/components/CategoryCard";
import { action } from "@storybook/addon-actions"; // 👈 برای ثبت event

const meta: Meta<typeof CategoryCard> = {
  title: "Components/CategoryCard",
  component: CategoryCard,
  parameters: { layout: "centered" },
  argTypes: {
    title: { control: "text" },
    image: { control: "text" },
    link: { control: "text" },
    onClick: { action: "clicked" }, 
  },
};
export default meta;

type Story = StoryObj<typeof CategoryCard>;

export const Default: Story = {
  args: {
    title: "Art & Culture",
    image:
      "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=400",
    link: "/category/art",
    onClick: action("Card clicked!"),
  },
};

export const WithoutImage: Story = {
  args: {
    title: "No Image Category",
    link: "/category/none",
    onClick: action("Card clicked!"),
  },
};
