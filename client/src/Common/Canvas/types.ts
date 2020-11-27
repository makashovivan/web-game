export type CanvasStateUnit<T> = {
  key: T,
  visibility: boolean,
  zIndex: number,
  x: number,
  y: number,
  color: string,
  width?: number,
  height?: number,
}

export type Coordinates = {x: number, y: number}