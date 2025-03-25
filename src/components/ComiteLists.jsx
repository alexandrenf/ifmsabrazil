import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
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

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 80px 20px;
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
  min-height: 100vh;
`;

const Title = styled.h2`
  font-family: "Poppins", sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #00508C;
  text-align: center;
  margin-bottom: 50px;
  position: relative;
  display: inline-block;
  animation: ${fadeIn} 0.8s ease-out forwards;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, #00508c, #fac800);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 30px;
  }
`;

const FilterContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  width: 100%;
  max-width: 1200px;
  flex-wrap: wrap;
  gap: 20px;
  animation: ${fadeIn} 0.8s ease-out forwards;
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    padding: 20px;
  }
`;

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    border-radius: 8px;
    transition: all 0.3s ease;
    
    &:hover {
      .MuiOutlinedInput-notchedOutline {
        border-color: #00508C;
      }
    }
    
    &.Mui-focused {
      .MuiOutlinedInput-notchedOutline {
        border-color: #00508C;
        border-width: 2px;
      }
    }
  }

  .MuiInputLabel-root {
    color: #666;
    
    &.Mui-focused {
      color: #00508C;
    }
  }
`;

const StyledFormControl = styled(FormControl)`
  .MuiOutlinedInput-root {
    border-radius: 8px;
    transition: all 0.3s ease;
    
    &:hover {
      .MuiOutlinedInput-notchedOutline {
        border-color: #00508C;
      }
    }
    
    &.Mui-focused {
      .MuiOutlinedInput-notchedOutline {
        border-color: #00508C;
        border-width: 2px;
      }
    }
  }

  .MuiInputLabel-root {
    color: #666;
    
    &.Mui-focused {
      color: #00508C;
    }
  }
`;

const TableContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  animation: ${fadeIn} 1s ease-out forwards;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const chooseBetterFormatted = (str1, str2) => {
  if (!str1) return str2;
  if (!str2) return str1;

  const str1Cleaned = str1.trim();
  const str2Cleaned = str2.trim();

  if (str1Cleaned === str2Cleaned) return str1Cleaned;

  const hasProperCaps1 = /^[A-Z]/.test(str1Cleaned);
  const hasProperCaps2 = /^[A-Z]/.test(str2Cleaned);

  if (hasProperCaps1 && !hasProperCaps2) return str1Cleaned;
  if (hasProperCaps2 && !hasProperCaps1) return str2Cleaned;

  if (str1Cleaned.length !== str2Cleaned.length) {
    return str1Cleaned.length > str2Cleaned.length ? str1Cleaned : str2Cleaned;
  }

  const upperCount1 = (str1Cleaned.match(/[A-Z]/g) || []).length;
  const upperCount2 = (str2Cleaned.match(/[A-Z]/g) || []).length;

  return upperCount1 >= upperCount2 ? str1Cleaned : str2Cleaned;
};

const normalizeString = (str) => {
  if (!str) return '';
  return str
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, ' ');
};

const normalizeAndMergeMembers = (members) => {
  const normalizedMembers = members.map(member => ({
    "Comitê Local": member["Comitê Local"] || member["Comitê Local "] || '',
    Regional: member.Regional || '',
    Cidade: member.Cidade || '',
    UF: member.UF || '',
    Status: member.Status || ''
  }));

  const mergedMap = new Map();

  normalizedMembers.forEach((member) => {
    const key = [
      normalizeString(member["Comitê Local"]),
      normalizeString(member.Regional),
      normalizeString(member.Cidade),
      normalizeString(member.UF)
    ].join('|');

    if (!mergedMap.has(key)) {
      mergedMap.set(key, { ...member });
    } else {
      const existing = mergedMap.get(key);
      mergedMap.set(key, {
        "Comitê Local": chooseBetterFormatted(existing["Comitê Local"], member["Comitê Local"]),
        Regional: chooseBetterFormatted(existing.Regional, member.Regional),
        Cidade: chooseBetterFormatted(existing.Cidade, member.Cidade),
        UF: chooseBetterFormatted(existing.UF, member.UF),
        Status: chooseBetterFormatted(existing.Status, member.Status)
      });
    }
  });

  return Array.from(mergedMap.values());
};

const uniqueValues = (members, key) => {
  const normalizedMap = new Map();
  
  members.forEach(member => {
    const value = member[key];
    if (!value) return;
    
    const normalized = normalizeString(value);
    const current = normalizedMap.get(normalized);
    
    if (!current || chooseBetterFormatted(current, value) === value) {
      normalizedMap.set(normalized, value);
    }
  });

  return Array.from(normalizedMap.values())
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, 'pt-BR', { sensitivity: 'base' }));
};

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

  const normalizedMembers = React.useMemo(() => 
    normalizeAndMergeMembers(members),
    [members]
  );

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
    const keyMapping = {
      regional: "Regional",
      cidade: "Cidade",
      uf: "UF",
      status: "Status",
    };

    return members
      .filter((member) => {
        const searchFields = [
          member["Comitê Local"],
          member.Regional,
          member.Cidade,
          member.UF,
          member.Status
        ].map(field => normalizeString(field));

        const normalizedSearch = normalizeString(searchTerm);
        
        const matchesSearchTerm = searchFields.some(field => 
          field.includes(normalizedSearch)
        );

        const matchesFilters = Object.entries(filters).every(([key, value]) => {
          if (!value) return true;
          const mappedKey = keyMapping[key];
          return normalizeString(member[mappedKey]) === normalizeString(value);
        });

        return matchesSearchTerm && matchesFilters;
      })
      .sort((a, b) => {
        const comiteLocalA = normalizeString(a["Comitê Local"] || "");
        const comiteLocalB = normalizeString(b["Comitê Local"] || "");
        return comiteLocalA.localeCompare(comiteLocalB);
      });
  };

  const displayedMembers = filteredMembers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Section>
      <Title>Lista de Comitês Locais Filiados</Title>
      <FilterContainer>
        <StyledTextField
          label="Buscar"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            minWidth: 250,
            flexGrow: 1,
          }}
        />
        {["Regional", "Cidade", "UF", "Status"].map((filter) => (
          <StyledFormControl
            variant="outlined"
            style={{ minWidth: 175 }}
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
              {uniqueValues(normalizedMembers, filter).map((value) => (
                <MenuItem key={value} value={value}>
                  <ListItemText primary={value} />
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        ))}
      </FilterContainer>
      <TableContainer>
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
      </TableContainer>
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
