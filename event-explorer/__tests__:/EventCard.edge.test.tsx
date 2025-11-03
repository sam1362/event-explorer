import { render, screen } from "@testing-library/react";
import EventCard from "../app/components/EventCard";

describe("EventCard - Edge Cases", () => {
  it("renders placeholder image if none is provided", () => {
    render(
      <EventCard
        title="No Image Event"
        date="2025-09-03"
        time="20:00"
        venue="Opera House"
        category="Drama"
        image={undefined as any} // no image
      />
    );

    const img = screen.getByRole("img", { name: "No Image Event" });
    expect(img).toHaveAttribute("src", "/placeholder.jpg");
  });

  it("renders fallback text when title is missing", () => {
    render(
      <EventCard
        title=""
        date="2025-09-04"
        time="21:00"
        venue="Stadium"
        category="Sports"
        image="/test.jpg"
      />
    );

    expect(screen.getByText("Event name not available")).toBeInTheDocument();
  });

  it("renders fallback when date and time are missing", () => {
    render(
      <EventCard
        title="Broken Event"
        date=""
        time=""
        venue="Unknown"
        category="Misc"
        image="/test.jpg"
      />
    );

    expect(screen.getByText("Date not available | Unknown")).toBeInTheDocument();
    expect(screen.getByText("Time not available")).toBeInTheDocument();
  });

  it("renders category badge only if category is provided", () => {
    const { rerender } = render(
      <EventCard
        title="With Category"
        date="2025-09-05"
        time="10:00"
        venue="Hall"
        category="Music"
        image="/test.jpg"
      />
    );

    expect(screen.getByText("Music")).toBeInTheDocument();

    // Rerender without category
    rerender(
      <EventCard
        title="No Category"
        date="2025-09-05"
        time="10:00"
        venue="Hall"
        category=""
        image="/test.jpg"
      />
    );

    expect(screen.queryByText("Music")).not.toBeInTheDocument();
  });

  it("renders clickable link overlay only if URL is provided", () => {
    const { rerender } = render(
      <EventCard
        title="Clickable Event"
        date="2025-09-06"
        time="12:00"
        venue="Arena"
        category="Show"
        image="/test.jpg"
        url="https://example.com"
      />
    );

    const link = screen.getByRole("link", { name: "View Event" });
    expect(link).toHaveAttribute("href", "https://example.com");

    // Rerender without URL
    rerender(
      <EventCard
        title="Not Clickable Event"
        date="2025-09-06"
        time="12:00"
        venue="Arena"
        category="Show"
        image="/test.jpg"
        url=""
      />
    );

    expect(screen.queryByRole("link", { name: "View Event" })).toBeNull();
  });
});
