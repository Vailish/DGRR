import React from 'react'
import '../../../scss/KioskLogin.scss'
import { addPlayer } from '../../../store/OfflineLoginUsers'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const KioskLoginPlayer = props => {
  // const players = useSelector(state => state.OfflineLoginUsers.players)
  const { player } = props
  const playersNow = players.map(player => `<div class='Player'> ${{ ...player }} </div>`)
  return { ...playersNow }
}

export default KioskLoginPlayer
