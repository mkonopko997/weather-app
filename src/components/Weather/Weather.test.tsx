import { render } from "src/testUtils/testUtils";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Weather } from "src/components/Weather/Weather";

describe("Weather", () => {
  it("should not display weather when the search input is empty", () => {
    render(<Weather />);

    expect(screen.queryByText("Warsaw, PL")).not.toBeInTheDocument();

    // TODO add test-id to the card information container and check if it's displayed
  });

  it("should display weather", async () => {
    render(<Weather />);

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "Warsaw");

    // TODO get rid of this workaround
    await new Promise((r) => setTimeout(r, 1500));

    await waitFor(() => {
      expect(screen.getByText("Warsaw, PL")).toBeInTheDocument();
    });
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("scattered clouds")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();

    // TODO check rest of the elements
  });

  // TODO add tests for loading state, error state, changing days, changing unit etc..
});
