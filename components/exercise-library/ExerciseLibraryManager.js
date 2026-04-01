"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Typography,
  CardMedia,
  Stack,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import { Add, Edit, Delete, Visibility } from "@mui/icons-material";
import AddExerciseDialog from "./AddExerciseDialog";
import EditExerciseDialog from "./EditExerciseDialog";
import { exerciseLibrary } from "@/lib/exerciseLibrary";
import { DeleteData } from "@/utils/ApiFunctions";

const ExerciseLibraryManager = ({ data }) => {
  const [exercises, setExercises] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterSubCategory, setFilterSubCategory] = useState("All");
  const [filterPosition, setFilterPosition] = useState("All");
  const [filterResistance, setFilterResistance] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 12;

  // ✅ Format incoming API data once
  useEffect(() => {
    if (!data) return;

    const formatted = data.map((item) => {
      const e = item.attributes;
      return {
        id: item.id,
        name: e.name,
        category: e.category,
        subCategory: e.subCategory || "",
        position: e.position,
        startingPosition: e.startingPosition,
        targetMuscles: e.targetMuscles
          ? e.targetMuscles.split(",").map((m) => m.trim())
          : [],
        instructions: e.instructions
          ? e.instructions.split(",").map((m) => m.trim())
          : [],
        breathing: {
          inhale: e.breathingInhale || "",
          exhale: e.breathingExhale || "",
        },
        resistance: e.resistance || "",
        holdingTimeMin: e.holdingTimeMin,
        holdingTimeMax: e.holdingTimeMax,
        holdingTimeDefault: e.holdingTimeDefault,
        imageUrl: e.imageUrl,
        difficulty: e.difficulty,
        precautions: e.precautions
          ? e.precautions.split(",").map((p) => p.trim())
          : [],
        movement: e.movement,
      };
    });

    setExercises(formatted);
  }, [data]);

  // ✅ Dynamic category list
  const categories = [
    "All",
    ...new Set(exercises.map((e) => e.category).filter(Boolean)),
  ];
  const subCategories = [
    "All",
    ...new Set(exercises.map((e) => e.subCategory).filter(Boolean)),
  ];
  const positions = [
    "All",
    ...new Set(exercises.map((e) => e.position).filter(Boolean)),
  ];
  const resistances = [
    "All",
    ...new Set(exercises.map((e) => e.resistance).filter(Boolean)),
  ];

  // ✅ Filter by search + category + subCategory + position + resistance
  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch =
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || exercise.category === filterCategory;
    const matchesSubCategory =
      filterSubCategory === "All" || exercise.subCategory === filterSubCategory;
    const matchesPosition =
      filterPosition === "All" || exercise.position === filterPosition;
    const matchesResistance =
      filterResistance === "All" || exercise.resistance === filterResistance;
    return (
      matchesSearch &&
      matchesCategory &&
      matchesSubCategory &&
      matchesPosition &&
      matchesResistance
    );
  });

  const pageCount = Math.max(1, Math.ceil(filteredExercises.length / pageSize));
  const pagedExercises = filteredExercises.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // ✅ Handlers
  const handleOpenAddDialog = () => setOpenAddDialog(true);
  const handleCloseAddDialog = () => setOpenAddDialog(false);

  const handleViewExercise = (exercise) => {
    setSelectedExercise(exercise);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedExercise(null);
  };

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [exerciseToEdit, setExerciseToEdit] = useState(null);

  const handleOpenEditDialog = (exercise) => {
    setExerciseToEdit(exercise);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setExerciseToEdit(null);
  };

  const handleUpdatedExercise = (updated) => {
    setExercises((prev) =>
      prev.map((e) => (e.id === updated.id ? updated : e)),
    );
    handleCloseEditDialog();
  };

  const handleDeleteExercise = async (id) => {
    if (confirm("Are you sure you want to remove this exercise?")) {
      await DeleteData({
        endPoint: `exercise-libraries`,
        id: id,
      });
    }
  };

  useEffect(() => {
    setPage(1);
  }, [
    searchTerm,
    filterCategory,
    filterSubCategory,
    filterPosition,
    filterResistance,
  ]);

  return (
    <>
      {/* Header */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={{ xs: 6, md: 9 }}>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#2E5E99",
                mb: 1,
              }}
            >
              Exercise Library Management
            </Typography>
            <Typography variant="body1" sx={{ color: "#7ba4d0" }}>
              Manage home exercise programs for patient rehabilitation
            </Typography>
          </Box>
        </Grid>
        <Grid
          size={{ xs: 6, md: 3 }}
          sx={{ textAlign: { xs: "left", md: "right" } }}
        >
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpenAddDialog}
            sx={{
              backgroundColor: "#2E5E99",
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            Add New Exercise
          </Button>
        </Grid>
      </Grid>

      {/* Controls */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          alignItems: "flex-start",
        }}
      >
        <TextField
          placeholder="Search exercises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          sx={{ flexGrow: 1, maxWidth: { xs: "100%", sm: "300px" } }}
        />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "center",
            width: "100%",
          }}
        >
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel id="category-filter-label">Region</InputLabel>
            <Select
              labelId="category-filter-label"
              value={filterCategory}
              label="Region"
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel id="sub-category-filter-label">Joint</InputLabel>
            <Select
              labelId="sub-category-filter-label"
              value={filterSubCategory}
              label="Joint"
              onChange={(e) => setFilterSubCategory(e.target.value)}
            >
              {subCategories.map((subCat) => (
                <MenuItem key={subCat} value={subCat}>
                  {subCat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel id="position-filter-label">Position</InputLabel>
            <Select
              labelId="position-filter-label"
              value={filterPosition}
              label="Position"
              onChange={(e) => setFilterPosition(e.target.value)}
            >
              {positions.map((pos) => (
                <MenuItem key={pos} value={pos}>
                  {pos}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel id="resistance-filter-label">Resistance</InputLabel>
            <Select
              labelId="resistance-filter-label"
              value={filterResistance}
              label="Resistance"
              onChange={(e) => setFilterResistance(e.target.value)}
            >
              {resistances.map((resistance) => (
                <MenuItem key={resistance} value={resistance}>
                  {resistance}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            onClick={() => {
              setFilterCategory("All");
              setFilterSubCategory("All");
              setFilterPosition("All");
              setFilterResistance("All");
              setSearchTerm("");
            }}
            sx={{ textTransform: "none" }}
          >
            Reset Filters
          </Button>
        </Box>
      </Box>

      {/* Exercises Grid */}
      <Grid container spacing={3}>
        {pagedExercises.length > 0 ? (
          pagedExercises.map((exercise) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, xl: 3 }} key={exercise.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    boxShadow: "0 8px 24px rgba(46, 94, 153, 0.15)",
                  },
                }}
              >
                {/* {exercise.imageUrl && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={exercise.imageUrl}
                    alt={exercise.name}
                    sx={{ objectFit: "cover" }}
                  />
                )} */}

                <Box sx={{ width: "100%", height: "300px" }}>
                  {exercise.imageUrl && (
                    <CardMedia
                      component="img"
                      image={exercise.imageUrl}
                      alt={exercise.name}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  )}
                </Box>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mb: 1, color: "#2E5E99" }}
                  >
                    {exercise.name}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={exercise.category}
                      size="small"
                      sx={{
                        backgroundColor: "#e8f5e9",
                        color: "#2E5E99",
                        mr: 1,
                      }}
                    />
                    <Chip
                      label={exercise.subCategory}
                      size="small"
                      sx={{
                        backgroundColor: "#e8f5e9",
                        color: "#2E5E99",
                        mr: 1,
                      }}
                    />
                    <Chip
                      label={exercise.position}
                      size="small"
                      sx={{
                        backgroundColor:
                          exercise.position === "beginner"
                            ? "#c8e6c9"
                            : "#fff9c4",
                        color: "#2E5E99",
                      }}
                    />
                  </Box>

                  <Typography
                    variant="caption"
                    sx={{ color: "#64748b", mb: 1, display: "block" }}
                  >
                    Target Muscles:
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}
                  >
                    {exercise.targetMuscles.slice(0, 2).map((muscle, idx) => (
                      <Typography
                        key={idx}
                        variant="caption"
                        sx={{ color: "#2E5E99", fontWeight: 500 }}
                      >
                        {muscle}
                        {idx < exercise.targetMuscles.length - 1 ? "," : ""}
                      </Typography>
                    ))}
                    {exercise.targetMuscles.length > 2 && (
                      <Typography variant="caption" sx={{ color: "#7ba4d0" }}>
                        +{exercise.targetMuscles.length - 2} more
                      </Typography>
                    )}
                  </Box>

                  <Divider sx={{ my: 1.5 }} />

                  <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<Visibility />}
                      onClick={() => handleViewExercise(exercise)}
                      sx={{
                        flex: 1,
                        color: "#2E5E99",
                        borderColor: "#2E5E99",
                        textTransform: "none",
                      }}
                    >
                      View
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<Edit />}
                      onClick={() => handleOpenEditDialog(exercise)}
                      sx={{
                        flex: 1,
                        color: "#2E5E99",
                        borderColor: "#2E5E99",
                        textTransform: "none",
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<Delete />}
                      onClick={() => handleDeleteExercise(exercise.id)}
                      sx={{
                        flex: 1,
                        color: "#d32f2f",
                        borderColor: "#d32f2f",
                        textTransform: "none",
                      }}
                    >
                      Remove
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid size={{ xs: 12 }}>
            <Card sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h6" sx={{ color: "#7ba4d0" }}>
                No exercises found
              </Typography>
            </Card>
          </Grid>
        )}
      </Grid>

      {filteredExercises.length > pageSize && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}

      {/* Add Exercise Dialog */}
      <AddExerciseDialog open={openAddDialog} onClose={handleCloseAddDialog} />

      {/* Edit Exercise Dialog */}
      <EditExerciseDialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        exercise={exerciseToEdit}
        onUpdated={handleUpdatedExercise}
      />

      {/* View Exercise Dialog */}
      {selectedExercise && (
        <Dialog
          open={openViewDialog}
          onClose={handleCloseViewDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ backgroundColor: "#2E5E99", color: "white" }}>
            {selectedExercise.name}
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Box sx={{ width: "100%", height: "400px" }}>
              {selectedExercise.imageUrl && (
                <CardMedia
                  component="img"
                  image={selectedExercise.imageUrl}
                  alt={selectedExercise.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              )}
            </Box>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Region:
                  </Typography>
                  {selectedExercise.category && (
                    <Chip
                      label={selectedExercise.category}
                      size="small"
                      color="primary"
                    />
                  )}
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Joint:
                  </Typography>
                  {selectedExercise.subCategory && (
                    <Chip
                      label={selectedExercise.subCategory}
                      size="small"
                      color="warning"
                    />
                  )}
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Movement:
                  </Typography>
                  {selectedExercise.movement && (
                    <Chip
                      label={selectedExercise.movement}
                      size="small"
                      color="info"
                    />
                  )}
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Position:
                  </Typography>
                  {selectedExercise.position && (
                    <Chip
                      label={selectedExercise.position}
                      size="small"
                      color="secondary"
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Resistance:
              </Typography>
              <Typography variant="body2" sx={{ color: "#475569" }}>
                {selectedExercise?.resistance}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Target Muscles:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {selectedExercise.targetMuscles.map((muscle, idx) => (
                  <Chip
                    key={idx}
                    label={muscle}
                    size="small"
                    sx={{ backgroundColor: "#e8f5e9", color: "#2E5E99" }}
                  />
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Starting Position:
              </Typography>
              <Typography variant="body2" sx={{ color: "#475569" }}>
                {selectedExercise.startingPosition}
              </Typography>
            </Box>

            {selectedExercise.instructions.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Instructions:
                </Typography>
                {selectedExercise.instructions.map((instruction, idx) => (
                  <Typography
                    key={idx}
                    variant="body2"
                    sx={{ color: "#475569", mb: 0.5 }}
                  >
                    {idx + 1}. {instruction}
                  </Typography>
                ))}
              </Box>
            )}

            {selectedExercise.breathing && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Breathing:
                </Typography>
                <Typography variant="body2" sx={{ color: "#475569" }}>
                  Exhale: {selectedExercise.breathing.exhale}
                </Typography>
                <Typography variant="body2" sx={{ color: "#475569" }}>
                  Inhale: {selectedExercise.breathing.inhale}
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseViewDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default ExerciseLibraryManager;
