"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Grid,
  Chip,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardMedia,
} from "@mui/material";
import { Close, Image } from "@mui/icons-material";
import { exerciseLibrary } from "@/lib/exerciseLibrary";

const AddExerciseDialog = ({ open, onClose, onExerciseAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    position: "",
    targetMuscles: [],
    startingPosition: "",
    instructions: [],
    breathingExhale: "",
    breathingInhale: "",
    holdingTimeMin: 2,
    holdingTimeMax: 10,
    holdingTimeDefault: 5,
    imageUrl: "",
    difficulty: "beginner",
    precautions: [],
  });

  const [currentInstruction, setCurrentInstruction] = useState("");
  const [currentPrecaution, setCurrentPrecaution] = useState("");
  const [currentMuscle, setCurrentMuscle] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const difficulties = ["beginner", "intermediate", "advanced"];
  const categories = [
    "Shoulder Girdle",
    "Upper Extremity",
    "Lower Extremity",
    "Core",
    "Cervical",
    "Lumbar",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddInstruction = () => {
    if (currentInstruction.trim()) {
      setFormData((prev) => ({
        ...prev,
        instructions: [...prev.instructions, currentInstruction.trim()],
      }));
      setCurrentInstruction("");
    }
  };

  const handleAddMuscle = () => {
    if (
      currentMuscle.trim() &&
      !formData.targetMuscles.includes(currentMuscle.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        targetMuscles: [...prev.targetMuscles, currentMuscle.trim()],
      }));
      setCurrentMuscle("");
    }
  };

  const handleAddPrecaution = () => {
    if (currentPrecaution.trim()) {
      setFormData((prev) => ({
        ...prev,
        precautions: [...prev.precautions, currentPrecaution.trim()],
      }));
      setCurrentPrecaution("");
    }
  };

  const handleRemoveInstruction = (index) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveMuscle = (muscle) => {
    setFormData((prev) => ({
      ...prev,
      targetMuscles: prev.targetMuscles.filter((m) => m !== muscle),
    }));
  };

  const handleRemovePrecaution = (index) => {
    setFormData((prev) => ({
      ...prev,
      precautions: prev.precautions.filter((_, i) => i !== index),
    }));
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData((prev) => ({
      ...prev,
      imageUrl: url,
    }));
    setImagePreview(url);
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.category ||
      formData.targetMuscles.length === 0
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const newExercise = exerciseLibrary.addExercise({
      name: formData.name,
      category: formData.category,
      position: formData.position,
      targetMuscles: formData.targetMuscles,
      startingPosition: formData.startingPosition,
      instructions: formData.instructions,
      breathing: {
        exhale: formData.breathingExhale,
        inhale: formData.breathingInhale,
      },
      holdingTime: {
        min: formData.holdingTimeMin,
        max: formData.holdingTimeMax,
        default: formData.holdingTimeDefault,
      },
      imageUrl: formData.imageUrl,
      difficulty: formData.difficulty,
      precautions: formData.precautions,
      createdBy: "Dr. Admin",
    });

    onExerciseAdded?.(newExercise);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: "",
      category: "",
      position: "",
      targetMuscles: [],
      startingPosition: "",
      instructions: [],
      breathingExhale: "",
      breathingInhale: "",
      holdingTimeMin: 2,
      holdingTimeMax: 10,
      holdingTimeDefault: 5,
      imageUrl: "",
      difficulty: "beginner",
      precautions: [],
    });
    setCurrentInstruction("");
    setCurrentPrecaution("");
    setCurrentMuscle("");
    setImagePreview("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      sx={{ "& .MuiDialog-paper": { maxHeight: "90vh" } }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#2E5E99",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Add New Exercise to Library
        <Close onClick={handleClose} sx={{ cursor: "pointer" }} />
      </DialogTitle>

      <DialogContent sx={{ overflowY: "auto", pt: 3 }}>
        <Grid container spacing={2}>
          {/* Basic Information */}
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#2E5E99", mb: 2 }}
            >
              Basic Information
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Exercise Name *"
              name="name"
              value={formData.name}
              onChange={handleChange}
              size="small"
              required
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Category *</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                label="Category"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              size="small"
              placeholder="e.g., Lying, Standing, Sitting"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Difficulty Level</InputLabel>
              <Select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                label="Difficulty Level"
              >
                {difficulties.map((diff) => (
                  <MenuItem key={diff} value={diff}>
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Target Muscles */}
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#2E5E99", mb: 1 }}
            >
              Target Muscles *
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
              <TextField
                size="small"
                label="Add Muscle"
                value={currentMuscle}
                onChange={(e) => setCurrentMuscle(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddMuscle();
                  }
                }}
                sx={{ flex: 1 }}
              />
              <Button
                variant="contained"
                onClick={handleAddMuscle}
                sx={{ backgroundColor: "#2E5E99" }}
              >
                Add
              </Button>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {formData.targetMuscles.map((muscle, index) => (
                <Chip
                  key={index}
                  label={muscle}
                  onDelete={() => handleRemoveMuscle(muscle)}
                  sx={{ backgroundColor: "#e8f5e9", color: "#2E5E99" }}
                />
              ))}
            </Box>
          </Grid>

          {/* Starting Position */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Starting Position"
              name="startingPosition"
              value={formData.startingPosition}
              onChange={handleChange}
              multiline
              rows={3}
              size="small"
            />
          </Grid>

          {/* Instructions */}
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#2E5E99", mb: 1 }}
            >
              Instructions
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
              <TextField
                fullWidth
                size="small"
                label="Add Instruction Step"
                value={currentInstruction}
                onChange={(e) => setCurrentInstruction(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddInstruction();
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={handleAddInstruction}
                sx={{ backgroundColor: "#2E5E99" }}
              >
                Add
              </Button>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {formData.instructions.map((instruction, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 1.5,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2">
                    {index + 1}. {instruction}
                  </Typography>
                  <Close
                    onClick={() => handleRemoveInstruction(index)}
                    sx={{ cursor: "pointer", color: "#d32f2f", fontSize: 18 }}
                  />
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Breathing */}
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#2E5E99", mb: 1 }}
            >
              Breathing Instructions
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Exhale"
              name="breathingExhale"
              value={formData.breathingExhale}
              onChange={handleChange}
              size="small"
              placeholder="e.g., From starting point to end point"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Inhale"
              name="breathingInhale"
              value={formData.breathingInhale}
              onChange={handleChange}
              size="small"
              placeholder="e.g., From end point to starting point"
            />
          </Grid>

          {/* Holding Time */}
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#2E5E99", mb: 1 }}
            >
              Holding Time (seconds)
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              type="number"
              label="Minimum"
              name="holdingTimeMin"
              value={formData.holdingTimeMin}
              onChange={handleChange}
              size="small"
              inputProps={{ min: 1 }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              type="number"
              label="Default"
              name="holdingTimeDefault"
              value={formData.holdingTimeDefault}
              onChange={handleChange}
              size="small"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              type="number"
              label="Maximum"
              name="holdingTimeMax"
              value={formData.holdingTimeMax}
              onChange={handleChange}
              size="small"
            />
          </Grid>

          {/* Precautions */}
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#2E5E99", mb: 1 }}
            >
              Safety Precautions
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
              <TextField
                fullWidth
                size="small"
                label="Add Precaution"
                value={currentPrecaution}
                onChange={(e) => setCurrentPrecaution(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddPrecaution();
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={handleAddPrecaution}
                sx={{ backgroundColor: "#2E5E99" }}
              >
                Add
              </Button>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {formData.precautions.map((precaution, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 1.5,
                    backgroundColor: "#fff3e0",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2">{precaution}</Typography>
                  <Close
                    onClick={() => handleRemovePrecaution(index)}
                    sx={{ cursor: "pointer", color: "#d32f2f", fontSize: 18 }}
                  />
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Image Upload */}
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#2E5E99", mb: 1 }}
            >
              Exercise Image
            </Typography>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleImageUrlChange}
              size="small"
              placeholder="Enter Cloudinary or image URL"
              helperText="Paste the complete image URL (e.g., https://res.cloudinary.com/...)"
            />
          </Grid>

          {imagePreview && (
            <Grid size={{ xs: 12 }}>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={imagePreview}
                  alt="Exercise preview"
                />
              </Card>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ backgroundColor: "#2E5E99" }}
        >
          Add to Library
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExerciseDialog;
