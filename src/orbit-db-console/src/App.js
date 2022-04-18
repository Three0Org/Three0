import React from 'react'
import {Outlet} from 'react-router-dom'

import { actions, loadingState, 
  StateProvider 
} from './state'

import {Systems} from './components/Systems'
import {Header} from './components/Header'

import {Box, Typography} from '@mui/material'
import orbitLogo from '../public/Orbit_round-02.png';

import './index.css'


export function DBView (props) {
  const initialState = {
    user: null,
    loginDialogOpen: false,
    createDBDialogOpen: false,
    addDBDialogOpen: false,
    programs: [],
    program: false,
    db: null,
    entries: [],
    orbitdbStatus: 'Starting',
    ipfsStatus: 'Starting',
    loading: {
      programs: false
    }
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case actions.SYSTEMS.SET_ORBITDB:
        return {
          ...state,
          orbitdbStatus: action.orbitdbStatus
        }
      case actions.SYSTEMS.SET_IPFS:
        return {
          ...state,
          ipfsStatus: action.ipfsStatus
        }
      case actions.PROGRAMS.SET_PROGRAM:
        return {
          ...state,
          program: action.program
        }
      case actions.PROGRAMS.SET_PROGRAM_LOADING:
        return {
          ...state,
          program: loadingState
        }
      case actions.PROGRAMS.SET_PROGRAMS:
        return {
          ...state,
          programs: action.programs
        }
      case actions.DB.SET_DB:
        return {
          ...state,
          db: action.db,
          entries: action.entries,
        }
      case actions.DB.OPEN_CREATEDB_DIALOG:
        return {
          ...state,
          createDBDialogOpen: true
        }
      case actions.DB.CLOSE_CREATEDB_DIALOG:
        return {
          ...state,
          createDBDialogOpen: false
        }
      case actions.DB.OPEN_ADDDB_DIALOG:
        return {
          ...state,
          addDBDialogOpen: true
        }
      case actions.DB.CLOSE_ADDDB_DIALOG:
        return {
          ...state,
          addDBDialogOpen: false
        }
      case actions.PROGRAMS.SET_PROGRAMS_LOADING:
        return {
          ...state,
          loading: { ...state.loading, programs: action.loading }
        }
      default:
        return state
    }
  }

  return (
    <>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Box  height='100%'>
          <Header />
          <Systems />
          <Outlet />
        </Box>
      </StateProvider>
      <footer style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        textAlign: 'center',
      }}><img alt="orbit-logo" src={orbitLogo} width={'1.5%'}/>
        <Typography variant='subtitle2'>Powered by OrbitDB</Typography>
      </footer>
    </>
  )
}
