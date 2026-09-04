import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import PublicLayout from '../components/layout/PublicLayout'

/* Sahifalar kerak bo'lganda yuklanadi — birinchi yuklanish yengil qoladi. */
const Home = lazy(() => import('../pages/Home'))
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Courses = lazy(() => import('../pages/Courses'))
const CourseDetail = lazy(() => import('../pages/CourseDetail'))
const Lesson = lazy(() => import('../pages/Lesson'))
const Quiz = lazy(() => import('../pages/Quiz'))
const PromptLab = lazy(() => import('../pages/PromptLab'))
const PromptPractice = lazy(() => import('../pages/PromptPractice'))
const PromptLibrary = lazy(() => import('../pages/PromptLibrary'))
const AITools = lazy(() => import('../pages/AITools'))
const ToolDetail = lazy(() => import('../pages/ToolDetail'))
const Challenges = lazy(() => import('../pages/Challenges'))
const DailyChallenge = lazy(() => import('../pages/DailyChallenge'))
const Projects = lazy(() => import('../pages/Projects'))
const Analytics = lazy(() => import('../pages/Analytics'))
const Badges = lazy(() => import('../pages/Badges'))
const Certificate = lazy(() => import('../pages/Certificate'))
const Profile = lazy(() => import('../pages/Profile'))
const Settings = lazy(() => import('../pages/Settings'))
const NotFound = lazy(() => import('../pages/NotFound'))

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route path="/courses/:courseId/quiz" element={<Quiz />} />
        <Route path="/lessons/:lessonId" element={<Lesson />} />

        <Route path="/prompt-lab" element={<PromptLab />} />
        <Route path="/prompt-practice" element={<PromptPractice />} />
        <Route path="/prompt-library" element={<PromptLibrary />} />

        <Route path="/ai-tools" element={<AITools />} />
        <Route path="/ai-tools/:toolId" element={<ToolDetail />} />

        <Route path="/challenges" element={<Challenges />} />
        <Route path="/daily-challenge" element={<DailyChallenge />} />
        <Route path="/projects" element={<Projects />} />

        <Route path="/analytics" element={<Analytics />} />
        <Route path="/badges" element={<Badges />} />
        <Route path="/certificate" element={<Certificate />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />

        {/* Eski / qisqa manzillar */}
        <Route path="/lessons" element={<Navigate to="/courses" replace />} />
        <Route path="/home" element={<Navigate to="/" replace />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
