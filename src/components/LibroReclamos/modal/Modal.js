import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { BiSave } from "react-icons/bi";
import "./Modal.css";
import PDFReclamos from "../pdf/PDFReclamos";
import axios from "axios";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const año = new Date().getFullYear();
const mes = (new Date().getMonth() + 1).toString().padStart(2, "0");
const dia = new Date().getDate().toString().padStart(2, "0");
const fechaActual = `${dia}-${mes}-${año}`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minheight: "40vh",
  bgcolor: "background.paper",
  boxShadow: 25,
  borderRadius: "12px",
  p: 3,
  width: "87%",
  borderRadius: "30px",
  maxWidth: "90%",
  maxHeight: "90vh",
  overflow: "auto",
};

export default function ModalTerminos({
  openModal,
  setOpenModal,
  saveValue,
  dataTable2,
}) {
  const handleClose = () => setOpenModal(false);

  const inputRef = React.useRef(null);

  //ENVIAR RESPUESTA
  const sendData = async () => {
    try {
      const url = `${process.env.REACT_APP_URL_LIBRO}formulario/envia_respuesta`;
      const header = {
        "Content-Type": "application/json",
      };

      const body = JSON.stringify({
        respuesta: inputRef.current.value,
        idreclama: saveValue?.NLIRE_CODIGO,
      });

      const { data } = await axios(url, {
        method: "POST",
        headers: header,
        data: body,
      });

      toast.success(`Guardado Exitoso`);

      dataTable2();
    } catch (error) {
      Swal.fire(JSON.parse(error.response.data.message).Error, "error");
      setTimeout(() => {
        handleClose();
      }, 500);
    }
  };

  return (
    <div>
      <Modal
        open={openModal}
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
          <div className=" flex justify-end gap-1 items-start">
            <button
              className="border-gray-600 border-2 rounded-full px-2 text-gray-600 font-bold font-sans absolute hover:text-red-600 hover:border-red-600"
              onClick={handleClose}
            >
              X
            </button>
          </div>
          <div className="grid  md:grid-cols-2 gap-4 libroReclamaciones__modal--container ">
            <div>
              <PDFReclamos saveValue={saveValue} />
            </div>
            <div className="grid">
              <div className="pl-5 pr-1">
                <h1 className="py-3 text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
                  4. Acciones adoptadas por el proveedor
                </h1>
                <label
                  htmlFor="name"
                  className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                >
                  Fecha
                </label>
                <input
                  id="name"
                  type="text"
                  value={fechaActual}
                  disabled
                  className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border hover:border-green-700 focus:border-green-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                  placeholder="Día/Mes/Año"
                ></input>
                <label
                  htmlFor="name"
                  className="text-gray-800 text-sm font-bold leading-tight tracking-normal "
                >
                  Respuesta (Máximo 4000 Caracteres)
                </label>
                <textarea
                  id="name"
                  type="text"
                  ref={inputRef}
                  maxLength="4000"
                  rows="25"
                  className="resize-none overflow-y-auto mt-2 mb-5 pb-15 py-2 text-gray-600 hover:border-green-700 focus:outline-none focus:border focus:border-green-700 font-normal w-full grid items-center pl-3 text-sm border-gray-300 rounded border"
                  placeholder="4000 Caracteres como máximo"
                >
                  {saveValue?.CLIRE_RESPUESTA === "No respondido"
                    ? null
                    : saveValue?.CLIRE_RESPUESTA}
                </textarea>
              </div>
              <div className="flex justify-end  self-end pl-5 pr-1 w-full">
                <button
                  className="bg-green-700 rounded py-2 px-3 text-white font-medium tracking-wide flex self-end gap-1 items-center hover:bg-green-600"
                  name="guardar"
                  onClick={() => {
                    sendData();
                    handleClose();
                  }}
                >
                  <h3 className="pr-1">Guardar y Cerrar</h3>
                  <BiSave />
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
