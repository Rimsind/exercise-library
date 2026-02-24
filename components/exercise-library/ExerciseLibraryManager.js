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
  IconButton,
  InputAdornment,
  Paper,
  Avatar,
  alpha,
  Zoom,
  Fade,
} from "@mui/material";
import {
  Add,
  Delete,
  Visibility,
  Search,
  FitnessCenter,
  Timer,
  SportsGymnastics,
  LocalFireDepartment,
  Accessibility,
  Spa,
  DirectionsRun,
  SelfImprovement,
  Close,
  Info,
  Warning,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import AddExerciseDialog from "./AddExerciseDialog";
import { DeleteData } from "@/utils/ApiFunctions";

// Category color mapping for vibrant visuals
const categoryColors = {
  "Shoulder Girdle": {
    bg: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
    light: "#FFE5E5",
    icon: <SportsGymnastics />,
  },
  "Upper Extremity": {
    bg: "linear-gradient(135deg, #4ECDC4 0%, #45B7D1 100%)",
    light: "#E0F7FA",
    icon: <FitnessCenter />,
  },
  "Lower Extremity": {
    bg: "linear-gradient(135deg, #96CEB4 0%, #588157 100%)",
    light: "#E8F5E9",
    icon: <DirectionsRun />,
  },
  Core: {
    bg: "linear-gradient(135deg, #FFD93D 0%, #F6B17A 100%)",
    light: "#FFF9C4",
    icon: <SelfImprovement />,
  },
  Cervical: {
    bg: "linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)",
    light: "#EDE9FE",
    icon: <Accessibility />,
  },
  Lumbar: {
    bg: "linear-gradient(135deg, #F472B6 0%, #DB2777 100%)",
    light: "#FCE7F3",
    icon: <Spa />,
  },
};

// Difficulty color mapping
const difficultyColors = {
  Beginner: { bg: "#4CAF50", color: "#fff", icon: <LocalFireDepartment /> },
  Intermediate: { bg: "#FF9800", color: "#fff", icon: <LocalFireDepartment /> },
  Advanced: { bg: "#F44336", color: "#fff", icon: <LocalFireDepartment /> },
};

const ExerciseLibraryManager = ({ data }) => {
  const [exercises, setExercises] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    "All",
    "Shoulder Girdle",
    "Upper Extremity",
    "Lower Extremity",
    "Core",
    "Cervical",
    "Lumbar",
  ];

  // Format incoming Strapi-like data
  useEffect(() => {
    if (data && Array.isArray(data)) {
      const formatted = data.map((item) => {
        const attr = item.attributes || {};
        return {
          id: item.id,
          name: attr.name,
          category: attr.category,
          position: attr.position,
          startingPosition: attr.startingPosition,
          targetMuscles: attr.targetMuscles
            ? attr.targetMuscles.split(",").map((m) => m.trim())
            : [],
          instructions: attr.instructions
            ? attr.instructions.split(",").map((i) => i.trim())
            : [],
          breathing: {
            inhale: attr.breathingInhale || "",
            exhale: attr.breathingExhale || "",
          },
          holdingTime: {
            min: attr.holdingTimeMin,
            max: attr.holdingTimeMax,
            default: attr.holdingTimeDefault,
          },
          imageUrl: attr.imageUrl,
          difficulty: attr.difficulty,
          precautions: attr.precautions
            ? attr.precautions.split(",").map((p) => p.trim())
            : [],
          createdAt: attr.createdAt,
          updatedAt: attr.updatedAt,
        };
      });
      setExercises(formatted);
    }
  }, [data]);

  // Filter
  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch =
      exercise?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise?.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise?.targetMuscles?.some((m) =>
        m.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesCategory =
      filterCategory === "All" || exercise?.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Handlers
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

  const handleDeleteExercise = async (id) => {
    if (confirm("Are you sure you want to remove this exercise?")) {
      await DeleteData({
        endPoint: "exercise-libraries",
        id: id,
      });
      setExercises((prev) => prev.filter((ex) => ex.id !== id));
    }
  };

  // Stats for header
  const totalExercises = exercises.length;
  const categoryCount = categories.filter((c) => c !== "All").length;

  return (
    <Paper
      elevation={24}
      sx={{
        overflow: "hidden",
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}
    >
      <Box sx={{ p: { xs: 3, md: 5 } }}>
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              mb: 5,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: 3,
              p: 4,
              color: "white",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative circles */}
            <Box
              sx={{
                position: "absolute",
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -70,
                left: -70,
                width: 300,
                height: 300,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.05)",
              }}
            />

            <Grid container spacing={3} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  Exercise Library
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    opacity: 0.9,
                    mb: 3,
                    fontWeight: 400,
                  }}
                >
                  Manage home exercise programs for patient rehabilitation
                </Typography>

                {/* Stats */}
                <Stack direction="row" spacing={4}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {totalExercises}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Total Exercises
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {categoryCount}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Categories
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid
                size={{ xs: 12, md: 6 }}
                sx={{ display: { xs: "none", md: "block" } }}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    "& svg": {
                      fontSize: 120,
                      opacity: 0.8,
                      animation: "float 3s ease-in-out infinite",
                    },
                  }}
                >
                  <FitnessCenter sx={{ fontSize: 120 }} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </motion.div>

        {/* Controls Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3,
              background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, md: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleOpenAddDialog}
                  sx={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    textTransform: "none",

                    borderRadius: 2,
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                    },
                  }}
                >
                  Add New
                </Button>
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  fullWidth
                  placeholder="Search exercises or muscles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: "#764ba2" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      bgcolor: "white",
                    },
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 12 }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap",
                  }}
                >
                  {categories.map((cat) => (
                    <motion.div
                      key={cat}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Chip
                        label={cat}
                        onClick={() => setFilterCategory(cat)}
                        icon={
                          cat !== "All" ? categoryColors[cat]?.icon : undefined
                        }
                        sx={{
                          borderRadius: 3,

                          background:
                            filterCategory === cat
                              ? categoryColors[cat]?.bg ||
                                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                              : "white",
                          color: filterCategory === cat ? "white" : "#333",
                          border: "1px solid",
                          borderColor:
                            filterCategory === cat
                              ? "transparent"
                              : categoryColors[cat]?.bg || "#764ba2",
                          boxShadow:
                            filterCategory === cat
                              ? "0 4px 15px rgba(102, 126, 234, 0.4)"
                              : "none",
                          transition: "all 0.3s",
                          "& .MuiChip-icon": {
                            color: filterCategory === cat ? "white" : "inherit",
                          },
                        }}
                      />
                    </motion.div>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

        {/* Exercises Grid */}
        <Grid container spacing={3}>
          <AnimatePresence>
            {filteredExercises.length > 0 ? (
              filteredExercises.map((exercise, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={exercise.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    onHoverStart={() => setHoveredCard(exercise.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 4,
                        overflow: "hidden",
                        position: "relative",
                        background: "white",
                        boxShadow:
                          hoveredCard === exercise.id
                            ? "0 20px 40px rgba(102, 126, 234, 0.3)"
                            : "0 10px 30px rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          "& .exercise-image": {
                            transform: "scale(1.1)",
                          },
                        },
                      }}
                    >
                      {/* Category Color Strip */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: "6px",
                          background:
                            categoryColors[exercise.category]?.bg ||
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        }}
                      />

                      {/* Image Section */}
                      {exercise.imageUrl ? (
                        <Box
                          sx={{
                            position: "relative",
                            overflow: "hidden",
                            height: 200,
                          }}
                        >
                          <CardMedia
                            component="img"
                            className="exercise-image"
                            image={exercise.imageUrl}
                            alt={exercise.name}
                            sx={{
                              height: "100%",
                              width: "100%",
                              objectFit: "cover",
                              transition: "transform 0.6s ease",
                            }}
                          />
                          <Box
                            sx={{
                              position: "absolute",
                              top: 10,
                              right: 10,
                              background: alpha("#000", 0.6),
                              borderRadius: 3,
                              p: 1,
                              backdropFilter: "blur(5px)",
                            }}
                          >
                            <Chip
                              label={exercise.difficulty}
                              size="small"
                              sx={{
                                background:
                                  difficultyColors[exercise.difficulty]?.bg ||
                                  "#764ba2",
                                color: "white",
                                fontWeight: 600,
                              }}
                            />
                          </Box>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            height: 200,
                            background:
                              categoryColors[exercise.category]?.bg ||
                              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {categoryColors[exercise.category]?.icon && (
                            <Avatar
                              sx={{
                                width: 80,
                                height: 80,
                                bgcolor: "rgba(255,255,255,0.2)",
                                color: "white",
                              }}
                            >
                              {React.cloneElement(
                                categoryColors[exercise.category].icon,
                                { sx: { fontSize: 40 } },
                              )}
                            </Avatar>
                          )}
                        </Box>
                      )}

                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            mb: 1,
                            color: "#333",
                            fontSize: "1.2rem",
                            lineHeight: 1.3,
                          }}
                        >
                          {exercise.name}
                        </Typography>

                        <Box sx={{ mb: 2 }}>
                          <Chip
                            label={exercise.category}
                            size="small"
                            sx={{
                              background:
                                categoryColors[exercise.category]?.light ||
                                "#f0f0f0",
                              color: "#333",
                              fontWeight: 600,
                              mr: 1,
                            }}
                          />
                        </Box>

                        {/* Target Muscles with animated chips */}
                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#666",
                              display: "block",
                              mb: 1,
                              fontWeight: 600,
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            Target Muscles
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 0.5,
                            }}
                          >
                            {exercise.targetMuscles.slice(0, 3).map((m, i) => (
                              <Chip
                                key={i}
                                label={m}
                                size="small"
                                sx={{
                                  background: alpha("#764ba2", 0.1),
                                  color: "#764ba2",
                                  fontWeight: 500,
                                  fontSize: "0.7rem",
                                }}
                              />
                            ))}
                            {exercise.targetMuscles.length > 3 && (
                              <Chip
                                label={`+${exercise.targetMuscles.length - 3}`}
                                size="small"
                                sx={{
                                  background: alpha("#667eea", 0.1),
                                  color: "#667eea",
                                  fontWeight: 600,
                                }}
                              />
                            )}
                          </Box>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        {/* Action Buttons */}
                        <Stack direction="row" spacing={1}>
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<Visibility />}
                            onClick={() => handleViewExercise(exercise)}
                            sx={{
                              color: "#667eea",
                              borderColor: "#667eea",
                              borderRadius: 2,
                              textTransform: "none",
                              "&:hover": {
                                borderColor: "#764ba2",
                                background: alpha("#667eea", 0.05),
                              },
                            }}
                          >
                            View
                          </Button>
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<Delete />}
                            onClick={() => handleDeleteExercise(exercise.id)}
                            sx={{
                              color: "#f44336",
                              borderColor: "#f44336",
                              borderRadius: 2,
                              textTransform: "none",
                              "&:hover": {
                                borderColor: "#d32f2f",
                                background: alpha("#f44336", 0.05),
                              },
                            }}
                          >
                            Remove
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Fade in>
                  <Paper
                    sx={{
                      p: 8,
                      textAlign: "center",
                      borderRadius: 4,
                      background:
                        "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
                    }}
                  >
                    <FitnessCenter
                      sx={{
                        fontSize: 80,
                        color: "#764ba2",
                        opacity: 0.5,
                        mb: 2,
                      }}
                    />
                    <Typography variant="h5" sx={{ color: "#666", mb: 1 }}>
                      No exercises found
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#999" }}>
                      Try adjusting your search or filter criteria
                    </Typography>
                  </Paper>
                </Fade>
              </Grid>
            )}
          </AnimatePresence>
        </Grid>

        {/* Add Exercise Dialog */}
        <AddExerciseDialog
          open={openAddDialog}
          onClose={handleCloseAddDialog}
        />

        {/* Enhanced View Exercise Dialog */}
        {selectedExercise && (
          <Dialog
            open={openViewDialog}
            onClose={handleCloseViewDialog}
            maxWidth="md"
            fullWidth
            TransitionComponent={Zoom}
            PaperProps={{
              sx: {
                overflow: "hidden",
              },
            }}
          >
            <DialogTitle
              sx={{
                background:
                  categoryColors[selectedExercise.category]?.bg ||
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                p: 3,
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {selectedExercise.name}
                </Typography>
                <IconButton
                  onClick={handleCloseViewDialog}
                  sx={{ color: "white" }}
                >
                  <Close />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Chip
                  label={selectedExercise.category}
                  size="small"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "white",
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label={selectedExercise.difficulty}
                  size="small"
                  sx={{
                    bgcolor:
                      difficultyColors[selectedExercise.difficulty]?.bg ||
                      "rgba(255,255,255,0.2)",
                    color: "white",
                    fontWeight: 600,
                  }}
                />
              </Box>
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
              {/* Image Section */}
              {selectedExercise.imageUrl && (
                <Box sx={{ position: "relative", height: 300 }}>
                  <CardMedia
                    component="img"
                    image={selectedExercise.imageUrl}
                    alt={selectedExercise.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}

              {/* Content Sections */}
              <Box sx={{ p: 4 }}>
                <Grid container spacing={3}>
                  {/* Left Column */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    {/* Target Muscles */}
                    <Paper
                      sx={{
                        p: 2,
                        mb: 2,
                        borderRadius: 2,
                        bgcolor: "#f8f9fa",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 700, color: "#764ba2", mb: 1 }}
                      >
                        🎯 Target Muscles
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {selectedExercise.targetMuscles.map((m, i) => (
                          <Chip
                            key={i}
                            label={m}
                            sx={{
                              background: alpha("#764ba2", 0.1),
                              color: "#764ba2",
                              fontWeight: 600,
                            }}
                          />
                        ))}
                      </Box>
                    </Paper>

                    {/* Position Info */}
                    {(selectedExercise.position ||
                      selectedExercise.startingPosition) && (
                      <Paper
                        sx={{
                          p: 2,
                          mb: 2,
                          borderRadius: 2,
                          bgcolor: "#f8f9fa",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 700, color: "#667eea", mb: 1 }}
                        >
                          📍 Position
                        </Typography>
                        {selectedExercise.position && (
                          <Typography
                            variant="body2"
                            sx={{ mb: 1, color: "#555" }}
                          >
                            <strong>Position:</strong>{" "}
                            {selectedExercise.position}
                          </Typography>
                        )}
                        {selectedExercise.startingPosition && (
                          <Typography variant="body2" sx={{ color: "#555" }}>
                            <strong>Starting Position:</strong>{" "}
                            {selectedExercise.startingPosition}
                          </Typography>
                        )}
                      </Paper>
                    )}

                    {/* Breathing & Holding */}
                    {(selectedExercise.breathing.inhale ||
                      selectedExercise.holdingTime.min) && (
                      <Paper sx={{ p: 2, borderRadius: 2, bgcolor: "#f8f9fa" }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 700, color: "#4CAF50", mb: 1 }}
                        >
                          💨 Breathing & Timing
                        </Typography>
                        {selectedExercise.breathing.inhale && (
                          <Typography
                            variant="body2"
                            sx={{ mb: 0.5, color: "#555" }}
                          >
                            <strong>Inhale:</strong>{" "}
                            {selectedExercise.breathing.inhale}
                          </Typography>
                        )}
                        {selectedExercise.breathing.exhale && (
                          <Typography
                            variant="body2"
                            sx={{ mb: 1, color: "#555" }}
                          >
                            <strong>Exhale:</strong>{" "}
                            {selectedExercise.breathing.exhale}
                          </Typography>
                        )}
                        {(selectedExercise.holdingTime.min ||
                          selectedExercise.holdingTime.default) && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Timer sx={{ fontSize: 20, color: "#4CAF50" }} />
                            <Typography variant="body2" sx={{ color: "#555" }}>
                              Hold: {selectedExercise.holdingTime.min || 0}s -{" "}
                              {selectedExercise.holdingTime.max || 0}s
                              {selectedExercise.holdingTime.default &&
                                ` (Default: ${selectedExercise.holdingTime.default}s)`}
                            </Typography>
                          </Box>
                        )}
                      </Paper>
                    )}
                  </Grid>

                  {/* Right Column */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    {/* Instructions */}
                    {selectedExercise.instructions.length > 0 && (
                      <Paper
                        sx={{
                          p: 2,
                          mb: 2,
                          borderRadius: 2,
                          bgcolor: "#f8f9fa",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 700, color: "#FF9800", mb: 1 }}
                        >
                          📝 Instructions
                        </Typography>
                        <Box component="ol" sx={{ pl: 2, m: 0 }}>
                          {selectedExercise.instructions.map((inst, i) => (
                            <li key={i}>
                              <Typography
                                variant="body2"
                                sx={{ mb: 0.5, color: "#555" }}
                              >
                                {inst}
                              </Typography>
                            </li>
                          ))}
                        </Box>
                      </Paper>
                    )}

                    {/* Precautions */}
                    {selectedExercise.precautions.length > 0 && (
                      <Paper sx={{ p: 2, borderRadius: 2, bgcolor: "#fff3e0" }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 700,
                            color: "#f44336",
                            mb: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Warning color="error" /> Precautions
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {selectedExercise.precautions.map((p, i) => (
                            <Chip
                              key={i}
                              label={p}
                              size="small"
                              sx={{
                                bgcolor: "white",
                                color: "#f44336",
                                border: "1px solid #f44336",
                                fontWeight: 500,
                              }}
                            />
                          ))}
                        </Box>
                      </Paper>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>

            <DialogActions sx={{ p: 3, bgcolor: "#f8f9fa" }}>
              <Button
                onClick={handleCloseViewDialog}
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  textTransform: "none",
                  px: 4,
                  borderRadius: 2,
                }}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </Paper>
  );
};

export default ExerciseLibraryManager;
