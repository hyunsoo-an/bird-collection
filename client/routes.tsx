import { Route, createRoutesFromElements } from 'react-router-dom'
import App from './components/App'
import BirdProfile from './components/BirdProfile'
import Layout from './components/Layout'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<App />} />
    <Route path="/birds/:id" element={<BirdProfile />} />
  </Route>,
)
