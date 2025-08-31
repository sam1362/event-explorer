import { render, screen, fireEvent } from "@testing-library/react";
import CategoryCard from "../app/components/CategoryCard";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("CategoryCard - Negative Scenarios", () => {
  it("should not crash when title is missing", () => {
    render(<CategoryCard image="/test.jpg" title="" link="/music" />);
    expect(screen.getByAltText("")).toBeInTheDocument(); 
  });

  it("should show placeholder image when image is missing", () => {
    render(<CategoryCard image={undefined} title="Art" link="/art" />);
    const img = screen.getByAltText("Art");
    expect(img).toHaveAttribute("src", "/placeholder.jpg");
  });

  it("should not call router.push when link is invalid", () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(<CategoryCard image="/test.jpg" title="Broken" link="" />);
    fireEvent.click(screen.getByText("Broken"));

    expect(mockPush).not.toHaveBeenCalled();
  });
});
