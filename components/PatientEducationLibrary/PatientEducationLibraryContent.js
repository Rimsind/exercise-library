"use client";

import React, { useState, useMemo } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Container,
  Pagination,
  Stack,
} from "@mui/material";
import { LayoutGrid, List } from "lucide-react";
import EducationForm from "./EducationForm";
import EducationCard from "./EducationCard";
import EducationTable from "./EducationTable";
import FilterBar from "./FilterBar";
import { CreateNewData, DeleteData, UpdateData } from "@/utils/ApiFunctions";

const PatientEducationLibraryContent = ({ data }) => {
  const [formOpen, setFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEducationType, setSelectedEducationType] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedStages, setSelectedStages] = useState([]);
  const [editingData, setEditingData] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [viewingData, setViewingData] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Filter educations based on search, education type, region, area, and stage
  const filteredEducations = useMemo(() => {
    return data.filter((education) => {
      const matchesSearch = education?.attributes?.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesEducationType =
        !selectedEducationType ||
        education?.attributes?.educationType === selectedEducationType;
      const matchesRegion =
        !selectedRegion || education?.attributes?.region === selectedRegion;
      const matchesArea =
        !selectedArea || education?.attributes?.area === selectedArea;
      const matchesStage =
        selectedStages.length === 0 ||
        selectedStages.includes(education?.attributes?.stage);
      return (
        matchesSearch &&
        matchesEducationType &&
        matchesRegion &&
        matchesArea &&
        matchesStage
      );
    });
  }, [
    data,
    searchTerm,
    selectedEducationType,
    selectedRegion,
    selectedArea,
    selectedStages,
  ]);

  const handleAddNew = () => {
    setEditingData(null);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditingData(null);
  };

  const handleFormSubmit = async (formData) => {
    if (editingData) {
      // Update existing
      await UpdateData({
        endPoint: "patient-education-libraries",
        id: editingData.id,
        payload: {
          data: formData,
        },
      });
    } else {
      await CreateNewData({
        endPoint: "patient-education-libraries",
        payload: {
          data: formData,
        },
      });
    }
    setCurrentPage(1); // Reset to first page
    handleFormClose();
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredEducations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEducations = filteredEducations.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleEdit = (education) => {
    setEditingData(education);
    setFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this education material?")) {
      await DeleteData({
        endPoint: `patient-education-libraries`,
        id: id,
      });
    }
  };

  const handleView = (education) => {
    setViewingData(education);
    setViewOpen(true);
  };

  const handleViewClose = () => {
    setViewOpen(false);
    setViewingData(null);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 2, md: 3 } }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#0046a6",
            mb: 1,
            fontSize: { xs: "22px", md: "28px" },
          }}
        >
          Patient Education Library
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#666",
            fontSize: { xs: "12px", md: "14px" },
          }}
        >
          Create, manage, and organize rehabilitation protocols by stage (Acute,
          Sub-Acute, Chronic)
        </Typography>
      </Box>

      {/* Filter Bar */}
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedEducationType={selectedEducationType}
        onEducationTypeChange={setSelectedEducationType}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        selectedArea={selectedArea}
        onAreaChange={setSelectedArea}
        selectedStages={selectedStages}
        onStagesChange={setSelectedStages}
        onAddNew={handleAddNew}
      />

      {/* View Toggle */}
      <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(e, newMode) => newMode && setViewMode(newMode)}
          size="small"
          sx={{
            backgroundColor: "#F5F5F5",
            border: "1px solid #E0E0E0",
            borderRadius: "8px",
            "& .MuiToggleButton-root": {
              color: "#666",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "12px",
              px: 2,
              py: 1,
              "&.Mui-selected": {
                backgroundColor: "#0046a6",
                color: "white",
              },
            },
          }}
        >
          <ToggleButton value="grid">
            <LayoutGrid size={16} style={{ marginRight: "4px" }} />
            Grid View
          </ToggleButton>
          <ToggleButton value="table">
            <List size={16} style={{ marginRight: "4px" }} />
            Table View
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Content */}
      {filteredEducations.length === 0 ? (
        <Paper
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: "12px",
          }}
        >
          <Typography variant="h6" sx={{ color: "#999", mb: 2 }}>
            No education materials found
          </Typography>
          <Typography variant="body2" sx={{ color: "#bbb" }}>
            {searchTerm ||
            selectedRegion ||
            selectedArea ||
            selectedStages.length > 0
              ? "Try adjusting your filters"
              : "Click 'Add New Education' to create your first material"}
          </Typography>
        </Paper>
      ) : viewMode === "grid" ? (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {paginatedEducations.map((education) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={education.id}>
                <EducationCard
                  education={education}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </Grid>
            ))}
          </Grid>
          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(e, page) => setCurrentPage(page)}
                sx={{
                  "& .MuiButtonBase-root": {
                    color: "#0046a6",
                  },
                  "& .Mui-selected": {
                    backgroundColor: "#0046a6 !important",
                    color: "white",
                  },
                }}
              />
            </Box>
          )}
        </>
      ) : (
        <>
          <EducationTable
            educations={paginatedEducations}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(e, page) => setCurrentPage(page)}
                sx={{
                  "& .MuiButtonBase-root": {
                    color: "#0046a6",
                  },
                  "& .Mui-selected": {
                    backgroundColor: "#0046a6 !important",
                    color: "white",
                  },
                }}
              />
            </Box>
          )}
        </>
      )}
      {/* </Box> */}

      {/* Education Form Modal */}
      <EducationForm
        open={formOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        editingData={editingData}
      />

      {/* View Modal */}
      <Dialog open={viewOpen} onClose={handleViewClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            backgroundColor: "#0046a6",
            color: "white",
            fontWeight: 700,
            fontSize: "18px",
          }}
        >
          Education Details
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {viewingData && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Grid container spacing={2} mt={2}>
                <Grid size={6}>
                  {" "}
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 700,
                        color: "#0046a6",
                        textTransform: "uppercase",
                        fontSize: "11px",
                      }}
                    >
                      Region
                    </Typography>
                    <Typography sx={{ color: "#333", fontWeight: 600 }}>
                      {viewingData?.attributes?.region}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={6}>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 700,
                        color: "#0046a6",
                        textTransform: "uppercase",
                        fontSize: "11px",
                      }}
                    >
                      Area
                    </Typography>
                    <Typography sx={{ color: "#333", fontWeight: 600 }}>
                      {viewingData?.attributes?.area}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    color: "#0046a6",
                    textTransform: "uppercase",
                    fontSize: "11px",
                  }}
                >
                  Title
                </Typography>
                <Typography sx={{ color: "#333", fontWeight: 600 }}>
                  {viewingData?.attributes?.title}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    color: "#0046a6",
                    textTransform: "uppercase",
                    fontSize: "11px",
                  }}
                >
                  Stage
                </Typography>
                <Typography sx={{ color: "#333", fontWeight: 600 }}>
                  {viewingData?.attributes?.stage}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    color: "#0046a6",
                    textTransform: "uppercase",
                    fontSize: "11px",
                  }}
                >
                  Key Treatment
                </Typography>
                <Typography sx={{ color: "#333" }}>
                  {viewingData?.attributes?.keyTreatment}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    color: "#0046a6",
                    textTransform: "uppercase",
                    fontSize: "11px",
                  }}
                >
                  General Instruction
                </Typography>
                <Typography sx={{ color: "#333" }}>
                  {viewingData?.attributes?.generalInstruction}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    color: "#0046a6",
                    textTransform: "uppercase",
                    fontSize: "11px",
                  }}
                >
                  Modalities
                </Typography>
                <Typography sx={{ color: "#333" }}>
                  {viewingData?.attributes?.modalities}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    color: "#0046a6",
                    textTransform: "uppercase",
                    fontSize: "11px",
                  }}
                >
                  Restrictions
                </Typography>
                <Typography sx={{ color: "#333" }}>
                  {viewingData?.attributes?.restrictions}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleViewClose}
            variant="contained"
            sx={{ backgroundColor: "#0046a6" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PatientEducationLibraryContent;
