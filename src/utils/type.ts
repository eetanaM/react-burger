
// Структура ингредиента
type Ingredient = {
    _id: string;
    name: string;
    type: string;
    proteins:number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    counter: number;
    key?: string;
}

interface IngredientsState {
    ingredients: Ingredient[]
}

interface IngredientsToOrderState {
    fillerToOrder: Ingredient[],
    bunsToOrder: Ingredient[],
}

interface IngredientCardProps {
    ingredient: Ingredient;
    onModalOpen?: (id:string) => void;
    index?: number;
}

interface ModalProps {
    children?: React.ReactNode,
    header?: string,
    hideModal?: () => void,
}

interface ConstructorOverlayProps {
    children?: React.ReactNode,
}

interface IngredientDetailsProps {
    currentIngredient: Ingredient,
}

interface OrderDetailsProps {
    orderId: number,
}

export type {
    Ingredient,
    IngredientsState,
    ModalProps,
    IngredientCardProps,
    IngredientDetailsProps,
    OrderDetailsProps,
    IngredientsToOrderState,
    ConstructorOverlayProps
};
