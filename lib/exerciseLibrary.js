"use client"

// Exercise Library - Central repository for all home exercises
// Used by doctors to manage and patients to access exercises

export const exerciseLibrary = {
  // Predefined exercises
  exercises: [
    {
      id: "EX-001",
      name: "Shoulder Girdle Depression (Lying) - Without Resistance",
      category: "Shoulder Girdle",
      position: "Lying",
      targetMuscles: ["Pectoralis minor", "Serratus anterior", "Latissimus dorsi", "Lower trapezius"],
      startingPosition:
        "The patient lies on back on a firm surface with arms at the sides, elbows extended, palm facing inward, knees bent and low back flat on the surface.",
      instructions: [
        "Reach your hand down toward your feet",
        "Push your shoulders down and away from your ears",
        "Bring your arm back to starting position",
        "Both sides can be done together as per therapist recommendations",
      ],
      breathing: {
        exhale: "From starting point to end point",
        inhale: "From end point to starting point",
      },
      holdingTime: { min: 2, max: 10, default: 5 },
      imageUrl:
        "https://res.cloudinary.com/dklnjxs9u/image/upload/v1770756718/SHOULDER-GIRDLE-DEPRESSION-WITHOUT-RESISTANCE_ajnlwt.png",
      difficulty: "beginner",
      precautions: [
        "Maintain stable spine throughout the movement",
        "Do not force movement beyond comfortable range",
        "Stop immediately if sharp pain occurs",
        "Keep movements smooth and controlled",
      ],
      createdAt: new Date().toISOString(),
      createdBy: "System",
      isActive: true,
    },
  ],

  // Exercise logs for patients
  logs: [],

  // Get all active exercises
  getAllExercises: function () {
    return this.exercises.filter((ex) => ex.isActive)
  },

  // Get exercise by ID
  getExerciseById: function (id) {
    return this.exercises.find((ex) => ex.id === id)
  },

  // Add new exercise to library
  addExercise: function (exercise) {
    const newExercise = {
      ...exercise,
      id: `EX-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isActive: true,
    }
    this.exercises.push(newExercise)
    return newExercise
  },

  // Update exercise in library
  updateExercise: function (id, updates) {
    const index = this.exercises.findIndex((ex) => ex.id === id)
    if (index !== -1) {
      this.exercises[index] = { ...this.exercises[index], ...updates }
      return this.exercises[index]
    }
    return null
  },

  // Deactivate exercise
  deactivateExercise: function (id) {
    return this.updateExercise(id, { isActive: false })
  },

  // Get exercises by category
  getExercisesByCategory: function (category) {
    return this.exercises.filter((ex) => ex.category === category && ex.isActive)
  },

  // Get all unique categories
  getAllCategories: function () {
    const categories = new Set()
    this.exercises.forEach((ex) => {
      if (ex.isActive) categories.add(ex.category)
    })
    return Array.from(categories).sort()
  },

  // Log exercise session
  logExerciseSession: function (session) {
    const newLog = {
      id: `LOG-${Date.now()}`,
      ...session,
      logDate: new Date().toISOString(),
    }
    this.logs.push(newLog)
    return newLog
  },

  // Get logs for specific patient
  getPatientLogs: function (patientId) {
    return this.logs.filter((log) => log.patientId === patientId)
  },

  // Get logs for specific exercise
  getExerciseLogs: function (exerciseId) {
    return this.logs.filter((log) => log.exerciseId === exerciseId)
  },

  // Get logs for date range
  getLogsByDateRange: function (patientId, startDate, endDate) {
    return this.logs.filter(
      (log) =>
        log.patientId === patientId &&
        new Date(log.logDate) >= new Date(startDate) &&
        new Date(log.logDate) <= new Date(endDate)
    )
  },

  // Get assigned programs for patient
  getPatientPrograms: function (patientId) {
    // This would typically fetch from a database
    // For now, returning empty array
    return []
  },

  // Assign exercise program to patient
  assignProgramToPatient: function (patientId, exerciseId, programDetails) {
    return {
      id: `PROG-${Date.now()}`,
      patientId,
      exerciseId,
      assignedDate: new Date().toISOString(),
      ...programDetails,
    }
  },
}
