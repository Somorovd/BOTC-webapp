"use client";

import { ModalType, useModal } from "@/hooks/use-modal";
import CreateLobbyModal from "../modals/create-lobby-modal";

export const ModalProvider = () => {
  const { isOpen, type, onClose } = useModal();

  const handleClick = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
          onClick={handleClick}
        >
          <div onClick={(e) => e.stopPropagation()}>
            {type === ModalType.CreateLobby && <CreateLobbyModal />}
          </div>
        </div>
      )}
    </>
  );
};
