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
} from "@mui/material";
import TableComponent from "./ComiteListsTable";

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
  const [showPrompt, setShowPrompt] = useState(false);
  const [askedToCloseRotate, setAskedToCloseRotate] = useState(false);

  const normalizedMembers = normalizeMembers(members);

  useEffect(() => {
    const checkOrientation = () => {
      const isMobileDevice = window.innerWidth <= 768;
      const isVerticalMode = window.innerHeight > window.innerWidth;

      setShowPrompt(isMobileDevice && isVerticalMode);
    };

    if (!askedToCloseRotate) {
      window.addEventListener("resize", checkOrientation);
      checkOrientation();
    }

    return () => {
      window.removeEventListener("resize", checkOrientation);
    };
  }, [askedToCloseRotate]);

  useEffect(() => {
    setFilteredMembers(filterAndSortMembers(normalizedMembers));
  }, [normalizedMembers, searchTerm, filters]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCloseRotatePrompt = () => {
    setAskedToCloseRotate(true);
    setShowPrompt(false);
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
        const comiteLocal = member["Comitê Local"] || ""; // Use normalized property
        const nomeDaEM = member["Nome da EM"] || ""; // Default to an empty string if undefined

        const matchesSearchTerm =
          comiteLocal.toLowerCase().includes(searchTerm.toLowerCase()) ||
          nomeDaEM.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilters =
          (!filters.regional || member.Regional === filters.regional) &&
          (!filters.cidade || member.Cidade === filters.cidade) &&
          (!filters.uf || member.UF === filters.uf) &&
          (!filters.status || member.Status === filters.status);
        return matchesSearchTerm && matchesFilters;
      })
      .sort((a, b) => {
        const comiteLocalA = a["Comitê Local"] || "";
        const comiteLocalB = b["Comitê Local"] || "";
        return comiteLocalA.localeCompare(comiteLocalB);
      });
  };

  const uniqueValues = (key) =>
    [...new Set(members.map((member) => member[key]))].sort();

  const displayedMembers = filteredMembers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Section>
      <ListaTitulo>Lista de Comitês Locais Filiados</ListaTitulo>
      <FilterContainer>
        <TextField
          label="Buscar"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            mimWidth: 250,
            marginBottom: "20px",
            flexGrow: 1,
            marginRight: "10px",
          }}
        />
        {["Regional", "Cidade", "UF", "Status"].map((filter) => (
          <FormControl
            variant="outlined"
            style={{ minWidth: 175, marginBottom: "20px", marginRight: "10px" }}
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
      <TableComponent
        displayedMembers={displayedMembers}
        filteredMembersLength={filteredMembers.length}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        showPrompt={showPrompt}
        onClosePrompt={() => handleCloseRotatePrompt()}
      />
    </Section>
  );
};

export default ComiteLists;

// Helper function to normalize the members array
const normalizeMembers = (members) => {
  return members.map((member) => {
    if (member["Comitê Local "]) {
      member["Comitê Local"] = member["Comitê Local "].trim();
      delete member["Comitê Local "];
    }
    return member;
  });
};
