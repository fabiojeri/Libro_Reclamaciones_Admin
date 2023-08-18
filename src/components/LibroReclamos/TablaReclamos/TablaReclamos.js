import React from "react";
import { TablePagination } from "@mui/material";
import "./TablaReclamos/TablaReclamos.css";

const TablaReclamos = ({ saveNewList, saveAuditoriaList, page, setPage }) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg tablaAuditoria__container--table bg-white">
      <table className="w-full text-sm text-left text-gray-500 light:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              NRO DE RECLAMO
            </th>
            <th scope="col" className="py-3 px-6">
              NOMBRE
            </th>
            <th scope="col" className="py-3 px-6">
              FECHA
            </th>
            <th scope="col" className="py-3 px-6">
              ESTADO
            </th>
            <th scope="col" className="py-3 px-6">
              VISUALIZAR RECLAMO
            </th>
          </tr>
        </thead>
        <tbody>
          {(Object.keys(saveNewList).length > 0
            ? saveNewList
            : saveAuditoriaList
          )
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((data, index) => (
              <tr
                className="bg-white border-b light:bg-gray-800 light:border-gray-700"
                key={index}
              >
                <th
                  scope="row"
                  className="py-2 px-6 font-medium text-gray-900 whitespace-nowrap light:text-white"
                >
                  {data.NRO_RECLAMO.split(".0")[0]}
                </th>
                <td className="py-2 px-6">{data.NOMBRE}</td>
                <td className="py-2 px-6">{data.FECHA}</td>
                <td className="py-2 px-6">{data.ESTADO}</td>
                <td className="py-2 px-6">{data.VER_RECLAMO}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <TablePagination
        sx={{ mt: 2 }}
        rowsPerPageOptions={[10, 20, 100]}
        component="div"
        count={
          Object.keys(saveNewList).length > 0
            ? saveNewList.length
            : saveAuditoriaList.length
        }
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default TablaReclamos;
