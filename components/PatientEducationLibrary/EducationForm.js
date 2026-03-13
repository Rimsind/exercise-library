"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Paper,
  Divider,
  Grid,
} from "@mui/material";
import { Add, Close } from "@mui/icons-material";

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
};
const stages = ["General","Acute", "Sub-Acute", "Chronic","Post-Surgical","Pre-Surgical","Prevention","Rehabilitation"];
const educationTypes = [
  "Region Wise Education",
  "Condition Wise Education",
  "Stage Wise Education",
  "Exercise Education",
  "Lifestyle Education",
];

const EducationForm = ({ open, onClose, onSubmit, editingData }) => {
  const [formData, setFormData] = useState({
    educationType: "",
    region: "Upper Extremity",
    area: "Shoulder Girdle",
    title: "",
    stage: "Acute",
    keyTreatment: "",
    generalInstruction: "",
    modalities: "",
    restrictions: "",
  });

  // Keep form in sync when editingData changes or dialog opens
  useEffect(() => {
    if (editingData) {
      setFormData({
        educationType: editingData?.attributes?.educationType || "",
        region: editingData?.attributes?.region || "",
        area: editingData?.attributes?.area || "",
        title: editingData?.attributes?.title || "",
        stage: editingData?.attributes?.stage || "",
        keyTreatment: editingData?.attributes?.keyTreatment || "",
        generalInstruction: editingData?.attributes?.generalInstruction || "",
        modalities: editingData?.attributes?.modalities || "",
        restrictions: editingData?.attributes?.restrictions || "",
      });
    } else if (open === false) {
      // reset when dialog fully closed
      setFormData({
        educationType: "General Education",
        region: "Upper Extremity",
        area: "Shoulder Girdle",
        title: "",
        stage: "Acute",
        keyTreatment: "",
        generalInstruction: "",
        modalities: "",
        restrictions: "",
      });
    }
  }, [editingData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "region") {
      // When region changes, reset area to first option of new region
      setFormData((prev) => ({
        ...prev,
        region: value,
        area: regions[value][0],
      }));
    } else if (name === "educationType") {
      // When education type changes, reset region and area for Region Wise Education
      setFormData((prev) => ({
        ...prev,
        educationType: value,
        region: "Upper Extremity",
        area: "Shoulder Girdle",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    // Validate education type
    if (!formData.educationType.trim()) {
      alert("Please select an education type");
      return;
    }

    // Validate region and area only for Region Wise Education
    if (formData.educationType === "Region Wise Education") {
      if (!formData.region.trim() || !formData.area.trim()) {
        alert("Please select region and area for Region Wise Education");
        return;
      }
    }

    // Validate common fields
    if (
      !formData.title.trim() ||
      !formData.keyTreatment.trim() ||
      !formData.generalInstruction.trim() ||
      !formData.modalities.trim() ||
      !formData.restrictions.trim()
    ) {
      alert("Please fill all required fields");
      return;
    }
    onSubmit(formData);
    setFormData({
      educationType: "General Education",
      region: "Upper Extremity",
      area: "Shoulder Girdle",
      title: "",
      stage: "Acute",
      keyTreatment: "",
      generalInstruction: "",
      modalities: "",
      restrictions: "",
    });
  };

  const handleClose = () => {
    setFormData({
      educationType: "General Education",
      region: "Upper Extremity",
      area: "Shoulder Girdle",
      title: "",
      stage: "Acute",
      keyTreatment: "",
      generalInstruction: "",
      modalities: "",
      restrictions: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          backgroundColor: "#0046a6",
          color: "white",
          fontWeight: 700,
          fontSize: "18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Add size={24} />
          {editingData ? "Edit Education" : "Add New Education"}
        </Box>
        <Button
          onClick={handleClose}
          sx={{
            color: "white",
            minWidth: "auto",
            padding: "4px 8px",
          }}
        >
          <Close size={20} />
        </Button>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
          {/* Education Type Selection */}
          <FormControl fullWidth size="small">
            <InputLabel>Education Type</InputLabel>
            <Select
              name="educationType"
              value={formData.educationType}
              onChange={handleChange}
              label="Education Type"
            >
              {educationTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Region</InputLabel>
            <Select
              name="region"
              value={formData.region}
              onChange={handleChange}
              label="Region"
            >
              {Object.keys(regions).map((region) => (
                <MenuItem key={region} value={region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Area</InputLabel>
            <Select
              name="area"
              value={formData.area}
              onChange={handleChange}
              label="Area"
            >
              {regions[formData.region].map((area) => (
                <MenuItem key={area} value={area}>
                  {area}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Title Field */}
          <TextField
            fullWidth
            label="Education Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Knee Pain Early Rehab"
            size="small"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#0046a6",
                },
              },
            }}
          />

          {/* Stage Selection */}
          <FormControl fullWidth size="small">
            <InputLabel>Stage</InputLabel>
            <Select
              name="stage"
              value={formData.stage}
              onChange={handleChange}
              label="Stage"
            >
              {stages.map((stage) => (
                <MenuItem key={stage} value={stage}>
                  {stage}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Divider sx={{ my: 2 }} />

          {/* Instructions Section */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#0046a6",
              fontSize: "14px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Instructions
          </Typography>

          {/* Key Treatment */}
          <TextField
            fullWidth
            label="Key Treatment"
            name="keyTreatment"
            value={formData.keyTreatment}
            onChange={handleChange}
            placeholder="e.g., Cryotherapy + Immobilization"
            size="small"
            multiline
            rows={2}
            variant="outlined"
          />

          {/* General Instruction */}
          <TextField
            fullWidth
            label="General Instruction"
            name="generalInstruction"
            value={formData.generalInstruction}
            onChange={handleChange}
            placeholder="e.g., Avoid weight bearing, use support"
            size="small"
            multiline
            rows={2}
            variant="outlined"
          />

          {/* Modalities */}
          <TextField
            fullWidth
            label="Modalities"
            name="modalities"
            value={formData.modalities}
            onChange={handleChange}
            placeholder="e.g., Ice pack, Ultrasound"
            size="small"
            multiline
            rows={2}
            variant="outlined"
          />

          {/* Restrictions */}
          <TextField
            fullWidth
            label="Restrictions"
            name="restrictions"
            value={formData.restrictions}
            onChange={handleChange}
            placeholder="e.g., No running, no squatting"
            size="small"
            multiline
            rows={2}
            variant="outlined"
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            color: "#666",
            borderColor: "#ddd",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: "#0046a6",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#003385",
            },
          }}
        >
          {editingData ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EducationForm;
