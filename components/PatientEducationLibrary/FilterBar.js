"use client"

import React, { useState, useCallback } from "react"
import {
  Box,
  TextField,
  Button,
  Stack,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
} from "@mui/material"
import { Search, X } from "lucide-react"

const FilterBar = ({ 
  searchTerm, 
  onSearchChange, 
  selectedEducationType,
  onEducationTypeChange,
  selectedRegion, 
  onRegionChange,
  selectedArea,
  onAreaChange,
  selectedStages, 
  onStagesChange, 
  onAddNew 
}) => {
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm)

  const regions = {
    "Upper Extremity": [
      "Shoulder Girdle",
      "Shoulder",
      "Elbow",
      "Forearm & Wrist",
      "Finger & Thumb",
    ],
    "Lower Extremity": ["Hip", "Knee", "Ankle", "Foot"],
    Spine: [
      "Cervical Spine",
      "Thoracic Spine",
      "Lumbar Spine",
      "Sacroiliac Joint",
    ],
  }

  const educationTypes = [
  "Region Wise Education",
  "Condition Wise Education",
  "Stage Wise Education",
  "Exercise Education",
  "Lifestyle Education",
];
  const stages = ["General","Acute", "Sub-Acute", "Chronic","Post-Surgical","Pre-Surgical","Preventive","Rehabilitation"];
  // Debounce search function
  const handleSearchChange = useCallback((value) => {
    setDebouncedSearch(value)
    const timeoutId = setTimeout(() => {
      onSearchChange(value)
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [onSearchChange])

  const handleEducationTypeChange = (event) => {
    const newType = event.target.value
    onEducationTypeChange(newType)
    onRegionChange("") // Reset region when education type changes
    onAreaChange("") // Reset area when education type changes
  }

  const handleRegionChange = (event) => {
    const newRegion = event.target.value
    onRegionChange(newRegion)
    onAreaChange("") // Reset area when region changes
  }

  const handleStageChange = (event) => {
    const {
      target: { value },
    } = event
    onStagesChange(typeof value === "string" ? value.split(",") : value)
  }

  const getStageColor = (stage) => {
    switch (stage) {
      case "Acute":
        return "#D32F2F"
      case "Sub-Acute":
        return "#F57C00"
      case "Chronic":
        return "#388E3C"
      case "Post-Surgical":
        return "#FF8F00"  
      case "Pre-Surgical":
        return "#7B1FA2"
      case "Preventive":
        return "#00838F"
      case "Rehabilitation":
        return "#4A148C"
      default:
        return "#999"
    }
  }

  return (
    <Box sx={{ mb: 3 }}>
      {/* First Row: Search and Add Button */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2, md: 2 },
          alignItems: { xs: "stretch", md: "center" },
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        {/* Search Input */}
        <TextField
          placeholder="Search education materials..."
          value={debouncedSearch}
          onChange={(e) => handleSearchChange(e.target.value)}
          size="small"
          sx={{
            flex: 1,
            minWidth: { xs: "100%", md: "300px" },
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #E0E0E0",
              "&:hover fieldset": {
                borderColor: "#0046a6",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#0046a6",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} color="#999" />
              </InputAdornment>
            ),
            endAdornment: debouncedSearch && (
              <InputAdornment position="end">
                <Box
                  component="button"
                  onClick={() => handleSearchChange("")}
                  sx={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    "&:hover": {
                      opacity: 0.7,
                    },
                  }}
                >
                  <X size={18} color="#999" />
                </Box>
              </InputAdornment>
            ),
          }}
        />

        {/* Add New Button */}
        <Button
          variant="contained"
          onClick={onAddNew}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            fontSize: "13px",
            px: 3,
            py: 1.5,
            backgroundColor: "#0046a6",
            whiteSpace: "nowrap",
            "&:hover": {
              backgroundColor: "#003385",
            },
          }}
        >
          Add New Education
        </Button>
      </Box>

      {/* Second Row: Filter Dropdowns */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr 1fr" },
          gap: 2,
          p: 2,
          backgroundColor: "#F9FAFB",
          borderRadius: "12px",
          border: "1px solid #E0E0E0",
        }}
      >
        {/* Education Type Select */}
        <FormControl size="small" fullWidth>
          <InputLabel
            sx={{
              color: "#666",
              "&.Mui-focused": {
                color: "#0046a6",
              },
            }}
          >
            Type
          </InputLabel>
          <Select
            value={selectedEducationType || ""}
            onChange={handleEducationTypeChange}
            label="Type"
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E0E0E0",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#0046a6",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#0046a6",
              },
            }}
          >
            <MenuItem value="">All Types</MenuItem>
            {educationTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Region Select - Only show for Region Wise Education */}
        {selectedEducationType === "Region Wise Education" && (
          <FormControl size="small" fullWidth>
            <InputLabel
              sx={{
                color: "#666",
                "&.Mui-focused": {
                  color: "#0046a6",
                },
              }}
            >
              Region
            </InputLabel>
            <Select
              value={selectedRegion || ""}
              onChange={handleRegionChange}
              label="Region"
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E0E0E0",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#0046a6",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#0046a6",
                },
              }}
            >
              <MenuItem value="">All Regions</MenuItem>
              {Object.keys(regions).map((region) => (
                <MenuItem key={region} value={region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Area Select - Only show for Region Wise Education */}
        {selectedEducationType === "Region Wise Education" && (
          <FormControl size="small" fullWidth disabled={!selectedRegion}>
            <InputLabel
              sx={{
                color: selectedRegion ? "#666" : "#ccc",
                "&.Mui-focused": {
                  color: "#0046a6",
                },
              }}
            >
              Area
            </InputLabel>
            <Select
              value={selectedArea || ""}
              onChange={(e) => onAreaChange(e.target.value)}
              label="Area"
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E0E0E0",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#0046a6",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#0046a6",
                },
              }}
            >
              <MenuItem value="">All Areas</MenuItem>
              {selectedRegion &&
                regions[selectedRegion].map((area) => (
                  <MenuItem key={area} value={area}>
                    {area}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}

        {/* Multi-Select Stage */}
        <FormControl size="small" fullWidth>
          <InputLabel
            sx={{
              color: "#666",
              "&.Mui-focused": {
                color: "#0046a6",
              },
            }}
          >
            Stage
          </InputLabel>
          <Select
            multiple
            value={selectedStages || []}
            onChange={handleStageChange}
            label="Stage"
            input={<OutlinedInput label="Stage" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.length === 0 ? (
                  <span style={{ color: "#999" }}>All Stages</span>
                ) : (
                  selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      size="small"
                      sx={{
                        backgroundColor: getStageColor(value),
                        color: "white",
                        fontWeight: 600,
                        fontSize: "11px",
                        height: "24px",
                      }}
                    />
                  ))
                )}
              </Box>
            )}
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E0E0E0",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#0046a6",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#0046a6",
              },
            }}
          >
            {stages.map((stage) => (
              <MenuItem key={stage} value={stage}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: getStageColor(stage),
                    }}
                  />
                  {stage}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

export default FilterBar
