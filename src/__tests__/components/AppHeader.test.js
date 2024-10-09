import { render, screen, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../services/store";
import AppHeader from "../../components/app-header/AppHeader";
import userEvent from "@testing-library/user-event";

const renderWithWrapper = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "test page", route);

  return {
    user: userEvent,
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

describe("App Header component tests", () => {
  afterEach(cleanup);

  it("should have logo wrapped with link to home page", () => {
    const logoDataId = "header_logo_element";
    const linkDataId = "header_logo_home_link";

    renderWithWrapper(
      <Provider store={store}>
        <AppHeader />
      </Provider>
    );

    const logoElement = screen.getByTestId(logoDataId);
    const logoParentElement = logoElement.parentElement;

    expect(logoParentElement).toBe(screen.getByTestId(linkDataId));
  });
});
