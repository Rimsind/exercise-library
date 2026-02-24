"use client";
import ExerciseLibraryManager from "@/components/exercise-library/ExerciseLibraryManager";
import { useAuth } from "@/context";
import { GetDataList } from "@/utils/ApiFunctions";
import React from "react";

const Page = () => {
  const { auth } = useAuth();

  const data = GetDataList({
    endPoint: "exercise-libraries",
    auth: auth,
  });
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ExerciseLibraryManager data={data} />
    </>
  );
};

export default Page;
