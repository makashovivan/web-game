import {CanvasStateUnit} from './types'

export default abstract class CanvasRenderer<StateType> {
  
  protected canvas: HTMLCanvasElement

  protected ctx: CanvasRenderingContext2D

  protected unitRenderMethods: Map<keyof StateType, (unit: CanvasStateUnit<keyof StateType>) => void> = new Map()

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
  }
  
  public rerender(state: StateType): void {
    this.clearArea()
    this.renderState(state)
  }

  private renderState(state: StateType): void {
    const keys = Object.keys(state)
    const stateUnitsArray: CanvasStateUnit<keyof StateType>[] = keys.reduce((accumulator, currentValue) => {
      const stateUnit = state[currentValue]
      if (Array.isArray(stateUnit)) {
        return [...accumulator, ...stateUnit]
      } else {
        return [...accumulator, stateUnit]
      }
    }, [])
    const sortedStateUnitsArray = stateUnitsArray
    .sort((a, b) => {
      if (a.zIndex > b.zIndex) {
        return 1;
      }
      if (a.zIndex < b.zIndex) {
        return -1;
      }
      return 0;
    })
    .filter(unit => unit.visibility)
    sortedStateUnitsArray.forEach(unit => this.renderStateUnit(unit))
  }

  private renderStateUnit(unit: CanvasStateUnit<keyof StateType>): void {
    this.unitRenderMethods.get(unit.key)(unit)
  }

  private clearArea() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}


