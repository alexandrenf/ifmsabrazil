import React from "react";
import styled from "styled-components";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Smartphone } from "lucide-react";

// Utility functions for robust filtering
const normalizeString = (str) => {
  if (!str) return '';
  return str
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, ' '); // Normalize whitespace
};

const compareStrings = (str1, str2) => {
  const normalized1 = normalizeString(str1);
  const normalized2 = normalizeString(str2);
  return normalized1.includes(normalized2);
};

const StyledTableContainer = styled(TableContainer)`
  border-radius: 15px;
  overflow: hidden;
  background: white;
`;

const StyledTable = styled(Table)`
  min-width: 650px;
`;

const HeaderCell = styled(TableCell)`
  background: #00508C;
  color: white !important;
  font-weight: 600 !important;
  font-size: 1rem !important;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 16px 24px !important;
  border-bottom: none !important;
  white-space: nowrap;

  &:first-of-type {
    border-top-left-radius: 8px;
  }

  &:last-of-type {
    border-top-right-radius: 8px;
  }
`;

const StyledTableRow = styled(TableRow)`
  transition: background-color 0.3s ease;

  &:nth-of-type(odd) {
    background-color: rgba(0, 80, 140, 0.02);
  }

  &:hover {
    background-color: rgba(0, 80, 140, 0.05);
  }

  td {
    padding: 16px 24px;
    font-size: 0.95rem;
    color: #333;
    border-bottom: 1px solid rgba(0, 80, 140, 0.1);
  }
`;

const StyledTablePagination = styled(TablePagination)`
  .MuiTablePagination-toolbar {
    padding: 20px;
    background: #f8f9fa;
    border-top: 1px solid rgba(0, 80, 140, 0.1);
  }

  .MuiTablePagination-selectLabel,
  .MuiTablePagination-displayedRows {
    margin: 0;
  }

  .MuiTablePagination-select {
    padding: 8px 32px 8px 12px;
  }
`;

const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: capitalize;
  background: ${props => {
    switch (props.status?.toLowerCase()) {
      case 'ativo':
        return 'rgba(0, 150, 60, 0.1)';
      case 'inativo':
        return 'rgba(239, 68, 68, 0.1)';
      default:
        return 'rgba(107, 114, 128, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.status?.toLowerCase()) {
      case 'ativo':
        return '#00963C';
      case 'inativo':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  }};
`;

const ResponsiveWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow-x: auto;

  @media (max-width: 768px) {
    &::before {
      content: "Para melhor visualização da tabela em dispositivos móveis, recomendamos rotacionar seu dispositivo para o modo paisagem.";
      display: block;
      padding: 12px 16px;
      background: rgba(0, 80, 140, 0.05);
      color: #00508C;
      font-size: 0.9rem;
      border-radius: 8px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
`;

const TableComponent = ({
  displayedMembers, // full filtered list from parent
  filteredMembersLength,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  showPrompt,
  onClosePrompt,
}) => {
  // Compute the paginated items
  const paginatedMembers = displayedMembers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  
  const totalPages = Math.ceil(filteredMembersLength / rowsPerPage);

  return (
    <>
      <ResponsiveWrapper>
        <StyledTableContainer component={Paper}>
          <StyledTable aria-label="comitês table">
            <TableHead>
              <TableRow>
                <HeaderCell>Comitê Local</HeaderCell>
                <HeaderCell>Regional</HeaderCell>
                <HeaderCell>Cidade</HeaderCell>
                <HeaderCell>UF</HeaderCell>
                <HeaderCell>Status</HeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedMembers.map((member, index) => (
                <StyledTableRow key={index}>
                  <TableCell>{member["Comitê Local"]}</TableCell>
                  <TableCell>{member.Regional}</TableCell>
                  <TableCell>{member.Cidade}</TableCell>
                  <TableCell>{member.UF}</TableCell>
                  <TableCell>
                    <StatusBadge status={member.Status}>
                      {member.Status}
                    </StatusBadge>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </StyledTable>
          <StyledTablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredMembersLength}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Itens por página:"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} de ${count}`
            }
            slotProps={{
              select: {
                native: true,
              },
              backButton: {
                disabled: page === 0,
              },
              nextButton: {
                disabled: page + 1 >= totalPages,
              },
            }}
            getItemAriaLabel={(type) => {
              if (type === 'first') return 'Ir para primeira página';
              if (type === 'last') return 'Ir para última página';
              if (type === 'next') return 'Ir para próxima página';
              if (type === 'previous') return 'Ir para página anterior';
              return '';
            }}
          />
        </StyledTableContainer>
      </ResponsiveWrapper>
    </>
  );
};

export default TableComponent;
