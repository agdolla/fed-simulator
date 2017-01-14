import * as types from "./types"

export function create(brand) {
  return {
    type: types.CREATE_BRAND,
    brand,
  }
}

export function update(brand) {
  return {
    type: types.UPDATE_BRAND,
    brand,
  }
}
