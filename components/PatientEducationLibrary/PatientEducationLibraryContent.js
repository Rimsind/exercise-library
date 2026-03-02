"use client"

import React, { useState, useMemo } from "react"
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
} from "@mui/material"
import { LayoutGrid, List } from "lucide-react"
import EducationForm from "./EducationForm"
import EducationCard from "./EducationCard"
import EducationTable from "./EducationTable"
import FilterBar from "./FilterBar"

const PatientEducationLibraryContent = () => {
  const [educations, setEducations] = useState([
    {
      id: 1,
      educationType: "Region Wise Education",
      region: "Lower Extremity",
      area: "Knee",
      title: "Knee Pain Early Rehab",
      stage: "Acute",
      keyTreatment: "Cryotherapy + Immobilization",
      generalInstruction: "Avoid weight bearing, use support",
      modalities: "Ice pack, Ultrasound",
      restrictions: "No running, no squatting",
    },
    {
      id: 2,
      educationType: "Region Wise Education",
      region: "Lower Extremity",
      area: "Knee",
      title: "Knee Mobility Training",
      stage: "Sub-Acute",
      keyTreatment: "ROM + Partial Weight Bearing",
      generalInstruction: "Start walking with walker",
      modalities: "Heat + TENS",
      restrictions: "Avoid stairs",
    },
    {
      id: 3,
      educationType: "General Education",
      region: "Lower Extremity",
      area: "Knee",
      title: "Knee Strength Program",
      stage: "Chronic",
      keyTreatment: "Strengthening + Proprioception",
      generalInstruction: "Regular exercise & posture care",
      modalities: "IFT + Exercise Therapy",
      restrictions: "Avoid high impact sports",
    },
    {
      id: 4,
      educationType: "Region Wise Education",
      region: "Upper Extremity",
      area: "Shoulder",
      title: "Shoulder Impingement Early Stage",
      stage: "Acute",
      keyTreatment: "Rest + Anti-inflammatory",
      generalInstruction: "Limit overhead activities",
      modalities: "Cold therapy, Traction",
      restrictions: "No heavy lifting",
    },
    {
      id: 5,
      educationType: "General Education",
      region: "Spine",
      area: "Lumbar Spine",
      title: "Lower Back Pain Management",
      stage: "Sub-Acute",
      keyTreatment: "Stability training + Mobilization",
      generalInstruction: "Gradual return to activity",
      modalities: "TENS, Manual therapy",
      restrictions: "Avoid twisting motions",
    },
    {
      id: 6,
      educationType: "Region Wise Education",
      region: "Spine",
      area: "Cervical Spine",
      title: "Neck Pain Rehabilitation",
      stage: "Chronic",
      keyTreatment: "Posture correction + Strengthening",
      generalInstruction: "Regular neck exercises",
      modalities: "Heat therapy, Exercise",
      restrictions: "Avoid prolonged static postures",
    },
  ])

  const [formOpen, setFormOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEducationType, setSelectedEducationType] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedArea, setSelectedArea] = useState("")
  const [selectedStages, setSelectedStages] = useState([])
  const [editingData, setEditingData] = useState(null)
  const [viewOpen, setViewOpen] = useState(false)
  const [viewingData, setViewingData] = useState(null)
  const [viewMode, setViewMode] = useState("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  // Filter educations based on search, education type, region, area, and stage
  const filteredEducations = useMemo(() => {
    return educations.filter((education) => {
      const matchesSearch = education.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchesEducationType = !selectedEducationType || education.educationType === selectedEducationType
      const matchesRegion = !selectedRegion || education.region === selectedRegion
      const matchesArea = !selectedArea || education.area === selectedArea
      const matchesStage =
        selectedStages.length === 0 || selectedStages.includes(education.stage)
      return matchesSearch && matchesEducationType && matchesRegion && matchesArea && matchesStage
    })
  }, [educations, searchTerm, selectedEducationType, selectedRegion, selectedArea, selectedStages])

  const handleAddNew = () => {
    setEditingData(null)
    setFormOpen(true)
  }

  const handleFormClose = () => {
    setFormOpen(false)
    setEditingData(null)
  }

  const handleFormSubmit = (formData) => {
    if (editingData) {
      // Update existing
      setEducations((prev) =>
        prev.map((edu) =>
          edu.id === editingData.id ? { ...formData, id: edu.id } : edu
        )
      )
    } else {
      // Add new
      const newEducation = {
        ...formData,
        id: Math.max(...educations.map((e) => e.id), 0) + 1,
      }
      setEducations((prev) => [newEducation, ...prev])
    }
    setCurrentPage(1) // Reset to first page
    handleFormClose()
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredEducations.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedEducations = filteredEducations.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const handleEdit = (education) => {
    setEditingData(education)
    setFormOpen(true)
  }

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this education material?")) {
      setEducations((prev) => prev.filter((edu) => edu.id !== id))
    }
  }

  const handleView = (education) => {
    setViewingData(education)
    setViewOpen(true)
  }

  const handleViewClose = () => {
    setViewOpen(false)
    setViewingData(null)
  }

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
          Create, manage, and organize rehabilitation protocols by stage (Acute, Sub-Acute, Chronic)
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
            {searchTerm || selectedRegion || selectedArea || selectedStages.length > 0
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
                  {viewingData.title}
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
                  {viewingData.stage}
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
                  {viewingData.keyTreatment}
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
                  {viewingData.generalInstruction}
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
                  {viewingData.modalities}
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
                  {viewingData.restrictions}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleViewClose} variant="contained" sx={{ backgroundColor: "#0046a6" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default PatientEducationLibraryContent
