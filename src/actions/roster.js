import * as types from "./types"

export function updateWrestler(payload) {
  return {
    type: types.UPDATE_WRESTLER,
    payload,
  }
}

export function simulateRandomMatch() {
  return {
    type: types.SIMULATE_RANDOM_MATCH,
  }
}

export function createWrestler(wrestler) {
  return {
    type: types.CREATE_WRESTLER,
    payload: wrestler,
  }
}

export function generateRoster() {
  return {
    type: types.GENERATE_ROSTER,
  }
}

export function removeWrestler(id) {
  return {
    type: types.REMOVE_WRESTLER,
    payload: { id, },
  }
}

export function updateRoster(payload) {
  return {
    type: types.UPDATE_ROSTER,
    payload,
  }
}

export function reset() {
  return {
    type: types.RESET,
  }
}
