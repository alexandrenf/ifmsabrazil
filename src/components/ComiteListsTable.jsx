import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import styled from "styled-components";
import RotatePrompt from "./RotatePrompt";

const StyledTableHead = styled(TableHead)`
  background-color: #00508c;
  & th {
    color: #fff;
    font-weight: bold;
    white-space: nowrap;
  }
`;

const StyledTableContainer = styled(TableContainer)`
  width: 100%;
  overflow-x: auto;
  position: relative;
`;

const StyledTableCell = styled(TableCell)`
  min-width: 150px;
`;

const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;

const TableComponent = ({
  displayedMembers,
  filteredMembersLength,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  showPrompt,
  onClosePrompt,
}) => {
  return (
    <StyledTableContainer component={Paper}>
      {showPrompt && <DarkOverlay />}
      {showPrompt && <RotatePrompt onClose={onClosePrompt} />}
      <Table>
        <StyledTableHead>
          <TableRow>
            <StyledTableCell>Comitê Local</StyledTableCell>
            <StyledTableCell>Nome da EM</StyledTableCell>
            <StyledTableCell>Regional</StyledTableCell>
            <StyledTableCell>Cidade</StyledTableCell>
            <StyledTableCell>UF</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {displayedMembers.map((member, index) => (
            <TableRow key={index}>
              <StyledTableCell>{member["Comitê Local"]}</StyledTableCell>
              <StyledTableCell>{member["Nome da EM"]}</StyledTableCell>
              <StyledTableCell>{member.Regional}</StyledTableCell>
              <StyledTableCell>{member.Cidade}</StyledTableCell>
              <StyledTableCell>{member.UF}</StyledTableCell>
              <StyledTableCell>{member.Status}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={filteredMembersLength}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[
          10,
          25,
          50,
          100,
          { label: "Todos", value: filteredMembersLength },
        ]}
        labelRowsPerPage="Itens por página"
      />
    </StyledTableContainer>
  );
};

export default TableComponent;
