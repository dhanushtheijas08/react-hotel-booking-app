import { useState } from "react";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div>
      <Button onClick={openModal}>Add cabin</Button>
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <CreateCabinForm closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
// <Modal>
//   <Modal.Toggle opens='new-cabin'>
//     <Button>Add new cabin</Button>
//   </Modal.Toggle>
//   <Modal.Window name='new-cabin'>
//     <CreateCabinForm />
//   </Modal.Window>
// </Modal>
