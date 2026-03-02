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
} from "@mui/material";
import { Add, Edit, Delete, Visibility } from "@mui/icons-material";
import AddExerciseDialog from "./AddExerciseDialog";
import EditExerciseDialog from "./EditExerciseDialog";
import { exerciseLibrary } from "@/lib/exerciseLibrary";
import { DeleteData } from "@/utils/ApiFunctions";

const ExerciseLibraryManager = ({ data }) => {
  console.log("Exercise Library Data:", data);

  const [exercises, setExercises] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

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
        holdingTimeMin: e.holdingTimeMin,
        holdingTimeMax: e.holdingTimeMax,
        holdingTimeDefault: e.holdingTimeDefault,
        imageUrl: e.imageUrl,
        difficulty: e.difficulty,
        precautions: e.precautions
          ? e.precautions.split(",").map((p) => p.trim())
          : [],
      };
    });

    setExercises(formatted);
  }, [data]);

  // ✅ Dynamic category list
  const categories = [
    "All",
    ...new Set(exercises.map((e) => e.category).filter(Boolean)),
  ];

  // ✅ Filter by search + category
  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch =
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || exercise.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

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

  return (
    <>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
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

        <TextField
          placeholder="Search exercises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          sx={{ flexGrow: 1, maxWidth: { xs: "100%", sm: "300px" } }}
        />

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => setFilterCategory(cat)}
              variant={filterCategory === cat ? "filled" : "outlined"}
              sx={{
                backgroundColor:
                  filterCategory === cat ? "#2E5E99" : "transparent",
                color: filterCategory === cat ? "white" : "#2E5E99",
                borderColor: "#2E5E99",
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Exercises Grid */}
      <Grid container spacing={3}>
        {filteredExercises.length > 0 ? (
          filteredExercises.map((exercise) => (
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
                {exercise.imageUrl && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={exercise.imageUrl}
                    alt={exercise.name}
                    sx={{ objectFit: "cover" }}
                  />
                )}

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
                      label={exercise.difficulty}
                      size="small"
                      sx={{
                        backgroundColor:
                          exercise.difficulty === "beginner"
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
            {selectedExercise.imageUrl && (
              <CardMedia
                component="img"
                image={selectedExercise.imageUrl}
                alt={selectedExercise.name}
                sx={{
                  mb: 2,
                  borderRadius: 1,
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            )}

            <Box sx={{ mb: 2, display: "flex", gap: 1, alignItems: "center" }}>
              <Chip
                label={selectedExercise.category}
                size="small"
                sx={{ backgroundColor: "#e8f5e9", color: "#2E5E99" }}
              />
              {selectedExercise.subCategory && (
                <Chip
                  label={selectedExercise.subCategory}
                  size="small"
                  sx={{ backgroundColor: "#fff3e0", color: "#2E5E99" }}
                />
              )}
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
