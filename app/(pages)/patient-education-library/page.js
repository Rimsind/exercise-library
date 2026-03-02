"use client";

import PatientEducationLibraryContent from "@/components/PatientEducationLibrary/PatientEducationLibraryContent";
import { useAuth } from "@/context";
import { GetDataList } from "@/utils/ApiFunctions";
// import DashboardLayout from "@/components/rehabdoc-dashboard/layout/DashboardLayout"

export default function PatientEducationLibraryPage() {
  const { auth } = useAuth();

  const data = GetDataList({
    endPoint: "patient-education-libraries",
    auth: auth,
  });
  if (!data) {
    return <div>Loading...</div>;
  }

  return <PatientEducationLibraryContent data={data} />;
}
