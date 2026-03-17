"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Box,
  Typography,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import { Eye, Edit2, Trash2 } from "lucide-react";

const EducationCard = ({ education, onView, onEdit, onDelete }) => {
  // Stage badge colors
  const getStageColor = (stage) => {
    switch (stage) {
      case "Acute":
        return { bg: "#FFEBEE", text: "#D32F2F", border: "#EF5350" };
      case "Sub-Acute":
        return { bg: "#FFF3E0", text: "#F57C00", border: "#FFB74D" };
      case "Chronic":
        return { bg: "#E8F5E9", text: "#388E3C", border: "#81C784" };
      case "Post-Surgical":
        return { bg: "#FFF8E1", text: "#FF8F00", border: "#FFC400" };
      case "Pre-Surgical":
        return { bg: "#E1BEE7", text: "#7B1FA2", border: "#BA68C8" };
      case "Prevention":
        return { bg: "#E0F7FA", text: "#00838F", border: "#4DD0E1" };
      case "Rehabilitation":
        return { bg: "#F3E5F5", text: "#4A148C", border: "#9C27B0" };
      default:
        return { bg: "#F5F5F5", text: "#666", border: "#999" };
    }
  };

  const stageColor = getStageColor(education?.attributes?.stage);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
        border: `2px solid ${stageColor.border}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          transform: "translateY(-4px)",
        },
      }}
    >
      {/* Stage Badge */}
      <Box
        sx={{
          backgroundColor: stageColor.bg,
          padding: "12px 16px",
          borderBottom: `2px solid ${stageColor.border}`,
        }}
      >
        <Chip
          label={education?.attributes?.stage}
          sx={{
            backgroundColor: stageColor.bg,
            color: stageColor.text,
            fontWeight: 700,
            fontSize: "12px",
            height: "28px",
            border: `2px solid ${stageColor.text}`,
          }}
        />
      </Box>

      {/* Content */}
      <CardContent sx={{ flex: 1, pb: 1 }}>
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#1a1a1a",
            mb: 2,
            fontSize: { xs: "14px", md: "16px" },
            lineHeight: 1.4,
          }}
        >
          {education?.attributes?.title}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Instructions Grid */}
        <Grid container spacing={2}>
          {/* Key Treatment */}
          <Grid size={{ xs: 12 }}>
            <Paper
              elevation={0}
              sx={{
                backgroundColor: "#F5F5F5",
                padding: "12px",
                borderRadius: "8px",
                borderLeft: `4px solid #0046a6`,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  color: "#0046a6",
                  display: "block",
                  mb: 0.5,
                  fontSize: "11px",
                  textTransform: "uppercase",
                }}
              >
                Key Treatment
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#333",
                  fontSize: { xs: "12px", md: "13px" },
                  lineHeight: 1.4,
                }}
              >
                {education?.attributes?.keyTreatment}
              </Typography>
            </Paper>
          </Grid>

          {/* General Instruction */}
          <Grid size={{ xs: 12 }}>
            <Paper
              elevation={0}
              sx={{
                backgroundColor: "#F5F5F5",
                padding: "12px",
                borderRadius: "8px",
                borderLeft: `4px solid #F57C00`,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  color: "#F57C00",
                  display: "block",
                  mb: 0.5,
                  fontSize: "11px",
                  textTransform: "uppercase",
                }}
              >
                General Instruction
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#333",
                  fontSize: { xs: "12px", md: "13px" },
                  lineHeight: 1.4,
                }}
              >
                {education?.attributes?.generalInstruction}
              </Typography>
            </Paper>
          </Grid>

          {/* Modalities */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper
              elevation={0}
              sx={{
                backgroundColor: "#F5F5F5",
                padding: "12px",
                borderRadius: "8px",
                borderLeft: `4px solid #388E3C`,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  color: "#388E3C",
                  display: "block",
                  mb: 0.5,
                  fontSize: "11px",
                  textTransform: "uppercase",
                }}
              >
                Modalities
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#333",
                  fontSize: { xs: "12px", md: "13px" },
                  lineHeight: 1.4,
                }}
              >
                {education?.attributes?.modalities}
              </Typography>
            </Paper>
          </Grid>

          {/* Restrictions */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper
              elevation={0}
              sx={{
                backgroundColor: "#F5F5F5",
                padding: "12px",
                borderRadius: "8px",
                borderLeft: `4px solid #D32F2F`,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  color: "#D32F2F",
                  display: "block",
                  mb: 0.5,
                  fontSize: "11px",
                  textTransform: "uppercase",
                }}
              >
                Restrictions
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#333",
                  fontSize: { xs: "12px", md: "13px" },
                  lineHeight: 1.4,
                }}
              >
                {education?.attributes?.restrictions}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>

      {/* Actions */}
      <CardActions
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "space-between",
          pt: 1,
          pb: 2,
          px: 2,
        }}
      >
        <Button
          size="small"
          startIcon={<Eye size={16} />}
          onClick={() => onView(education)}
          sx={{
            textTransform: "none",
            color: "#0046a6",
            fontWeight: 600,
            fontSize: "12px",
            "&:hover": {
              backgroundColor: "#e3f2fd",
            },
          }}
        >
          View
        </Button>
        <Button
          size="small"
          startIcon={<Edit2 size={16} />}
          onClick={() => onEdit(education)}
          sx={{
            textTransform: "none",
            color: "#F57C00",
            fontWeight: 600,
            fontSize: "12px",
            "&:hover": {
              backgroundColor: "#FFF3E0",
            },
          }}
        >
          Edit
        </Button>
        <Button
          size="small"
          startIcon={<Trash2 size={16} />}
          onClick={() => onDelete(education.id)}
          sx={{
            textTransform: "none",
            color: "#D32F2F",
            fontWeight: 600,
            fontSize: "12px",
            "&:hover": {
              backgroundColor: "#FFEBEE",
            },
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default EducationCard;
