import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./ModalPDF.css";
import PDFReclamos from "../pdf/PDFReclamos";

const style = {
  bgcolor: "#323639",
  borderRadius: "8px",
  padding: "8px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minheight: "40vh",
  boxShadow: 25,
  borderRadius: "12px",
  width: 850,
  maxWidth: "90%",
  maxHeight: "90vh",
  overflow: "auto",
};

export default function ModalTerminosPDF({
  openModalPDF,
  setOpenModalPDF,
  saveValue,
}) {
  const handleClose = () => setOpenModalPDF(false);

  return (
    <div>
      <Modal
        open={openModalPDF}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          overflowY: "auto",
          "@media(max-width: 768px)": {
            mt: 2,
            mb: 2,
          },
        }}
      >
        <Box sx={style}>
          <div>
            <div className=" flex justify-end items-start">
              <button
                className="border-gray-700 border-2 rounded-full px-2 text-gray-700 font-bold font-sans bg-white absolute"
                onClick={handleClose}
              >
                X
              </button>
            </div>
            <div className=" libroReclamaciones__modal--container2 w-full">
              <PDFReclamos saveValue={saveValue} />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
