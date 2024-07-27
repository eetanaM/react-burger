import { useState, useCallback } from "react";

export const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const onModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  const onModalOpen = useCallback(() => {
    setModalOpen(true);
},[]);

  return {
    modalOpen,
    onModalClose,
    onModalOpen,
  };
};
