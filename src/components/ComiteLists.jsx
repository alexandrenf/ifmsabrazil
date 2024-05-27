import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  OutlinedInput,
  Box,
  Typography,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ListaTitulo = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: 1.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 10px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 30px 20px;
  background-color: #fafafa;
`;

const Title = styled.h2`
  font-family: "Poppins", sans-serif;
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
`;

const FilterContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 1200px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

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
`;

const StyledTableCell = styled(TableCell)`
  min-width: 150px;
`;

const ComiteLists = ({ members }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    regional: "",
    cidade: "",
    uf: "",
    status: "",
  });
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setFilteredMembers(filterAndSortMembers(members));
  }, [members, searchTerm, filters]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterAndSortMembers = (members) => {
    return members
      .filter((member) => {
        const matchesSearchTerm =
          member["Comitê Local"]
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          member["Nome da EM"].toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilters =
          (!filters.regional || member.Regional === filters.regional) &&
          (!filters.cidade || member.Cidade === filters.cidade) &&
          (!filters.uf || member.UF === filters.uf) &&
          (!filters.status || member.Status === filters.status);
        return matchesSearchTerm && matchesFilters;
      })
      .sort((a, b) => a["Comitê Local"].localeCompare(b["Comitê Local"]));
  };

  const uniqueValues = (key) =>
    [...new Set(members.map((member) => member[key]))].sort();

  const displayedMembers = filteredMembers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Section>
      <ListaTitulo>Lista de Comitês Locais</ListaTitulo>
      <FilterContainer>
        <TextField
          label="Buscar"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginBottom: "20px", flexGrow: 1 }}
        />
        {["Regional", "Cidade", "UF", "Status"].map((filter) => (
          <FormControl
            variant="outlined"
            style={{ minWidth: 200, marginBottom: "20px" }}
            key={filter}
          >
            <InputLabel>{filter}</InputLabel>
            <Select
              name={filter.toLowerCase()}
              value={filters[filter.toLowerCase()]}
              onChange={handleFilterChange}
              input={<OutlinedInput label={filter} />}
              renderValue={(selected) => selected || `Todos`}
            >
              <MenuItem value="">
                <ListItemText primary="Todos" />
              </MenuItem>
              {uniqueValues(filter).map((value) => (
                <MenuItem key={value} value={value}>
                  <ListItemText primary={value} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}
      </FilterContainer>
      <StyledTableContainer component={Paper}>
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
      </StyledTableContainer>
      <TablePagination
        component="div"
        count={filteredMembers.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[
          10,
          25,
          50,
          100,
          { label: "Todos", value: filteredMembers.length },
        ]}
        labelRowsPerPage="Itens por página"
      />
    </Section>
  );
};

export default ComiteLists;
