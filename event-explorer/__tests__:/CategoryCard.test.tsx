import { render, screen, fireEvent } from "@testing-library/react";
import CategoryCard from "../app/components/CategoryCard";


jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("CategoryCard", () => {
  it("renders title and image correctly", () => {
    render(<CategoryCard image="/test.jpg" title="Music" link="/music" />);

  
    expect(screen.getByText("Music")).toBeInTheDocument();

  
    const img = screen.getByAltText("Music");
    expect(img).toHaveAttribute("src", "/test.jpg");
  });

  it("calls router.push when clicked", () => {
    const mockPush = jest.fn();
    (require("next/navigation") as any).useRouter = () => ({ push: mockPush });

    render(<CategoryCard image="/test.jpg" title="Music" link="/music" />);
    fireEvent.click(screen.getByText("Music"));

    expect(mockPush).toHaveBeenCalledWith("/music");
  });
});
