import type { DashboardData } from '../utils/types'

export const demoData: DashboardData = {
  learners: [
    { id: '1', name: 'Amara Okafor', email: 'amara.okafor@email.com', cohort: 'Cohort 04 · 2026', progress: 86, status: 'Active', initials: 'AO', color: 'coral' },
    { id: '2', name: 'Kwame Mensah', email: 'kwame.mensah@email.com', cohort: 'Cohort 04 · 2026', progress: 72, status: 'Active', initials: 'KM', color: 'blue' },
    { id: '3', name: 'Lerato Mokoena', email: 'lerato.mokoena@email.com', cohort: 'Cohort 03 · 2026', progress: 64, status: 'At risk', initials: 'LM', color: 'purple' },
    { id: '4', name: 'Daniel Williams', email: 'daniel.williams@email.com', cohort: 'Cohort 04 · 2026', progress: 93, status: 'Completed', initials: 'DW', color: 'green' },
  ],
  activities: [
    { id: '1', title: 'The Water Cycle', type: 'Simulation', subject: 'Environmental Science', assigned: 48, completed: 38, due: 'May 24, 2026', color: 'mint', icon: '◌' },
    { id: '2', title: 'Fractions & Decimals', type: 'Quiz', subject: 'Mathematics', assigned: 42, completed: 29, due: 'May 27, 2026', color: 'lavender', icon: '÷' },
    { id: '3', title: 'Build a Simple Circuit', type: 'Simulation', subject: 'Physical Science', assigned: 36, completed: 18, due: 'May 30, 2026', color: 'peach', icon: '⌁' },
  ],
  completions: [],
}
