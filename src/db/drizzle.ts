export function eq(col: any, val: any) {
  return { type: 'eq', col, val };
}

export function asc(col: any) {
  return { type: 'asc', col };
}

export function desc(col: any) {
  return { type: 'desc', col };
}

// noop placeholder for other utilities
export default { eq, asc, desc };