import React from "react";
import { Box } from "@mui/material";
import PatientEducationLibraryContent from "@/components/PatientEducationLibrary/PatientEducationLibraryContent";
// import DashboardLayout from "@/components/rehabdoc-dashboard/layout/DashboardLayout"

export const metadata = {
  title: "Patient Education Library | RIMSIND",
  description:
    "Create and manage patient education materials organized by rehabilitation stage",
};

export default function PatientEducationLibraryPage() {
  return <PatientEducationLibraryContent />;
}
