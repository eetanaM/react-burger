type IngredientsDetails = {
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
}

interface IngredientProps {
    ingredientsDetails: IngredientsDetails[]
}

interface IngredientCardProps extends IngredientProps {
    onModalOpen: (id:string) => void
}

interface ModalProps {
    onModalClose: () => void,
    children?: React.ReactNode,
}

interface IngredientDetailsProps {
    currentIngredient: IngredientsDetails,
    onModalClose: () => void,
}

interface OrderDetailsProps {
    onModalClose: () => void,
    orderId: string,
}

export type {
    IngredientProps,
    ModalProps,
    IngredientCardProps,
    IngredientDetailsProps,
    IngredientsDetails,
    OrderDetailsProps
};
