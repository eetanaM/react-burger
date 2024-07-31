// Редьюсер из тренажёра, временный - только для компиляции

export const rootReducer = (state = "cart", action:any) => {
  switch (action.type) {
    case "NEXT_STEP": {
      return state === "cart"
        ? "delivery"
        : state === "delivery"
        ? "checkout"
        : state === "checkout"
        ? "checkout"
        : "checkout";
    }
    case "PREVIOUS_STEP": {
      return state === "cart"
        ? "cart"
        : state === "delivery"
        ? "cart"
        : state === "checkout"
        ? "delivery"
        : "cart";
    }
    default: {
      return state;
    }
  }
};
