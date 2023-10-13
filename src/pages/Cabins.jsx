import { useState } from "react";

import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
function Cabins() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>TEST</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setIsOpen((prev) => !prev)}>
          Add Form Data
        </Button>
        {isOpen && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
