import { createRoutesFromElements, Route } from 'react-router'

import Layout from './components/Layout.tsx'
import AddBoardgame from './components/AddBoardgame.tsx'
import EditBoardgame from './components/EditBoardgame.tsx'
import BoardgameList from './components/BoardgameList.tsx'
import Boardgame from './components/Boardgame.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route path="/" element={<BoardgameList />} />
    <Route path="/:id" element={<Boardgame />} />
    <Route path="/edit/:id" element={<EditBoardgame />} />
    <Route path="/add/" element={<AddBoardgame />} />
  </Route>,
)
/*<Route index element={<LocationsList />} />
    <Route path="/schedule/:day" element={<DaySchedule />} />
    <Route path="/locations" element={<LocationsList />} />
    <Route path="/locations/:id/edit" element={<EditLocation />} />*/
