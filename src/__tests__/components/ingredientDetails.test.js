import { create } from "react-test-renderer";
import { MemoryRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { store } from "../../services/store";
import { loadIngredients } from "../../services/burger-ingredients/actions";
import IngredientDetails from "../../components/ingredient-details/IngredientDetails";

describe("check ingredientDetails component", () => {
  it("should be equal to snapshot", async () => {
    // Arrange (loading ingredients into store)
    await store.dispatch(loadIngredients());

    // Act (rendering certain ingredient's card)
    const renderedValue = create(
      <MemoryRouter initialEntries={["/ingredients/643d69a5c3f7b9001cfa093c"]}>
        <Provider store={store}>
          <Routes>
            <Route path="/ingredients">
              <Route path=":id" element={<IngredientDetails />} />
            </Route>
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    // Assert (checking if the rendered component matches the snapshot)
    expect(renderedValue).toMatchSnapshot();
  });
});
