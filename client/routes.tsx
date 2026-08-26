import { createRoutesFromElements, Route } from 'react-router'

import Layout from './components/Layout.tsx'
import AddBoardgame from './components/AddBoardgame.tsx'
import BoardgameList from './components/BoardgameList.tsx'
import Boardgame from './components/Boardgame.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route
      index
      element={
        <>
          <AddBoardgame />
          <BoardgameList />
        </>
      }
    />
    <Route path="/:id" element={<Boardgame />} />
  </Route>,
)
