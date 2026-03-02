"use client"

import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Box,
  Typography,
} from "@mui/material"
import { Eye, Edit2, Trash2 } from "lucide-react"

const EducationTable = ({ educations, onView, onEdit, onDelete }) => {
  const getStageColor = (stage) => {
    switch (stage) {
      case "Acute":
        return { bg: "#FFEBEE", text: "#D32F2F" }
      case "Sub-Acute":
        return { bg: "#FFF3E0", text: "#F57C00" }
      case "Chronic":
        return { bg: "#E8F5E9", text: "#388E3C" }
      default:
        return { bg: "#F5F5F5", text: "#666" }
    }
  }

  if (educations.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography color="textSecondary">No education materials found</Typography>
      </Paper>
    )
  }

  return (
    <TableContainer component={Paper} sx={{ borderRadius: "12px", overflow: "hidden" }}>
      <Table sx={{ minWidth: 1050 }}>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#0046a6",
              "& th": {
                color: "white",
                fontWeight: 700,
                fontSize: "13px",
                padding: "16px 12px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              },
            }}
          >
            <TableCell align="center" sx={{ width: "60px" }}>
              Sl.No
            </TableCell>
            <TableCell>Education Title</TableCell>
            <TableCell align="center" sx={{ width: "120px" }}>
              Stage
            </TableCell>
            <TableCell align="center" sx={{ width: "280px" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {educations.map((education, index) => {
            const stageColor = getStageColor(education.stage)
            return (
              <TableRow
                key={education.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#F5F5F5",
                  },
                  borderBottom: "1px solid #e0e0e0",
                  "&:last-child": {
                    borderBottom: "none",
                  },
                }}
              >
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 700,
                    color: "#0046a6",
                    fontSize: "13px",
                    padding: "14px 12px",
                  }}
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "#1a1a1a",
                    fontSize: "13px",
                    padding: "14px 12px",
                    maxWidth: "300px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {education.title}
                </TableCell>
                <TableCell align="center" sx={{ padding: "14px 12px" }}>
                  <Chip
                    label={education.stage}
                    sx={{
                      backgroundColor: stageColor.bg,
                      color: stageColor.text,
                      fontWeight: 700,
                      fontSize: "11px",
                      height: "24px",
                    }}
                  />
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    padding: "14px 12px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 0.5,
                      justifyContent: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Button
                      size="small"
                      startIcon={<Eye size={14} />}
                      onClick={() => onView(education)}
                      sx={{
                        textTransform: "none",
                        color: "#0046a6",
                        fontWeight: 600,
                        fontSize: "11px",
                        padding: "4px 8px",
                        minWidth: "auto",
                        "&:hover": {
                          backgroundColor: "#e3f2fd",
                        },
                      }}
                    >
                      View
                    </Button>
                    <Button
                      size="small"
                      startIcon={<Edit2 size={14} />}
                      onClick={() => onEdit(education)}
                      sx={{
                        textTransform: "none",
                        color: "#F57C00",
                        fontWeight: 600,
                        fontSize: "11px",
                        padding: "4px 8px",
                        minWidth: "auto",
                        "&:hover": {
                          backgroundColor: "#FFF3E0",
                        },
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      startIcon={<Trash2 size={14} />}
                      onClick={() => onDelete(education.id)}
                      sx={{
                        textTransform: "none",
                        color: "#D32F2F",
                        fontWeight: 600,
                        fontSize: "11px",
                        padding: "4px 8px",
                        minWidth: "auto",
                        "&:hover": {
                          backgroundColor: "#FFEBEE",
                        },
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default EducationTable
