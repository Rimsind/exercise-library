"use client";

import React, { useEffect, useState } from "react";
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
import { Close } from "@mui/icons-material";
import { UpdateData } from "@/utils/ApiFunctions";

const EditExerciseDialog = ({ open, onClose, exercise, onUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subCategory: "",
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
  const categories = ["Upper Extremity", "Lower Extremity", "Spine"];

  const categorySubcategories = {
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
  };

  useEffect(() => {
    if (!exercise) return;
    setFormData({
      name: exercise.name || "",
      category: exercise.category || "",
      subCategory: exercise.subCategory || "",
      position: exercise.position || "",
      targetMuscles: exercise.targetMuscles || [],
      startingPosition: exercise.startingPosition || "",
      instructions: exercise.instructions || [],
      breathingExhale: exercise.breathing?.exhale || "",
      breathingInhale: exercise.breathing?.inhale || "",
      holdingTimeMin: exercise.holdingTimeMin || 2,
      holdingTimeMax: exercise.holdingTimeMax || 10,
      holdingTimeDefault: exercise.holdingTimeDefault || 5,
      imageUrl: exercise.imageUrl || "",
      difficulty: exercise.difficulty || "beginner",
      precautions: exercise.precautions || [],
    });
    setImagePreview(exercise.imageUrl || "");
  }, [exercise]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) =>
      name === "category"
        ? { ...prev, category: value, subCategory: "" }
        : { ...prev, [name]: value },
    );
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
    setFormData((prev) => ({ ...prev, imageUrl: url }));
    setImagePreview(url);
  };

  const handleSubmit = async () => {
    if (!exercise) return;

    if (
      !formData.name ||
      !formData.category ||
      !formData.subCategory ||
      formData.targetMuscles.length === 0
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const payload = {
        data: {
          name: formData.name,
          category: formData.category,
          subCategory: formData.subCategory,
          position: formData.position,
          targetMuscles: formData.targetMuscles.join(", "),
          startingPosition: formData.startingPosition,
          instructions: formData.instructions.join(", "),
          breathingExhale: formData.breathingExhale,
          breathingInhale: formData.breathingInhale,
          holdingTimeMin: formData.holdingTimeMin,
          holdingTimeMax: formData.holdingTimeMax,
          holdingTimeDefault: formData.holdingTimeDefault,
          imageUrl: formData.imageUrl,
          difficulty: formData.difficulty,
          precautions: formData.precautions.join(", "),
        },
      };

      const res = await UpdateData({
        endPoint: "exercise-libraries",
        id: exercise.id,
        payload,
      });

      const updated = res?.data?.data?.attributes;
      const updatedExercise = {
        id: res?.data?.data?.id || exercise.id,
        name: updated?.name || formData.name,
        category: updated?.category || formData.category,
        subCategory: updated?.subCategory || formData.subCategory,
        position: updated?.position || formData.position,
        targetMuscles: updated?.targetMuscles
          ? updated.targetMuscles.split(",").map((m) => m.trim())
          : formData.targetMuscles,
        startingPosition:
          updated?.startingPosition || formData.startingPosition,
        instructions: updated?.instructions
          ? updated.instructions.split(",").map((i) => i.trim())
          : formData.instructions,
        breathing: {
          inhale: updated?.breathingInhale || formData.breathingInhale,
          exhale: updated?.breathingExhale || formData.breathingExhale,
        },
        holdingTimeMin: updated?.holdingTimeMin || formData.holdingTimeMin,
        holdingTimeMax: updated?.holdingTimeMax || formData.holdingTimeMax,
        holdingTimeDefault:
          updated?.holdingTimeDefault || formData.holdingTimeDefault,
        imageUrl: updated?.imageUrl || formData.imageUrl,
        difficulty: updated?.difficulty || formData.difficulty,
        precautions: updated?.precautions
          ? updated.precautions.split(",").map((p) => p.trim())
          : formData.precautions,
      };

      onUpdated && onUpdated(updatedExercise);
      alert("Exercise updated successfully!");
      handleClose();
    } catch (error) {
      console.error("Error updating exercise:", error);
      alert("Failed to update exercise. Please try again.");
    }
  };

  const handleClose = () => {
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
        Edit Exercise
        <Close onClick={handleClose} sx={{ cursor: "pointer" }} />
      </DialogTitle>

      <DialogContent sx={{ overflowY: "auto", pt: 3 }}>
        <Grid container spacing={2}>
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

          {formData.category && (
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Subcategory *</InputLabel>
                <Select
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleChange}
                  label="Subcategory"
                >
                  {categorySubcategories[formData.category]?.map((sub) => (
                    <MenuItem key={sub} value={sub}>
                      {sub}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

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

          {/* TARGET MUSCLES */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#2E5E99" }}>
              Target Muscles *
            </Typography>
            <Box sx={{ display: "flex", gap: 1, my: 1 }}>
              <TextField
                size="small"
                label="Add Muscle"
                value={currentMuscle}
                onChange={(e) => setCurrentMuscle(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddMuscle()}
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

          {/* STARTING POSITION */}
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

          {/* INSTRUCTIONS */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#2E5E99" }}>
              Instructions
            </Typography>
            <Box sx={{ display: "flex", gap: 1, my: 1 }}>
              <TextField
                fullWidth
                size="small"
                label="Add Instruction Step"
                value={currentInstruction}
                onChange={(e) => setCurrentInstruction(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddInstruction()}
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

          {/* BREATHING */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#2E5E99" }}>
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
              placeholder="e.g., From start to end"
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
              placeholder="e.g., From end to start"
            />
          </Grid>

          {/* HOLDING TIME */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#2E5E99" }}>
              Holding Time (seconds)
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              type="number"
              label="Min"
              name="holdingTimeMin"
              value={formData.holdingTimeMin}
              onChange={handleChange}
              size="small"
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
              label="Max"
              name="holdingTimeMax"
              value={formData.holdingTimeMax}
              onChange={handleChange}
              size="small"
            />
          </Grid>

          {/* PRECAUTIONS */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#2E5E99" }}>
              Safety Precautions
            </Typography>
            <Box sx={{ display: "flex", gap: 1, my: 1 }}>
              <TextField
                fullWidth
                size="small"
                label="Add Precaution"
                value={currentPrecaution}
                onChange={(e) => setCurrentPrecaution(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddPrecaution()}
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

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleImageUrlChange}
              size="small"
              placeholder="Enter Cloudinary or image URL"
              helperText="Paste the complete image URL"
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
          Update Exercise
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditExerciseDialog;
