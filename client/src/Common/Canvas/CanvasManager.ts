import CanvasRenderer from "./CanvasRenderer"

export default abstract class CanvasManager<StateType> {
  
  protected state: StateType

  protected renderer: CanvasRenderer<StateType>

  protected canvas: HTMLCanvasElement

  constructor(initialState: StateType, renderer: CanvasRenderer<StateType>, canvas: HTMLCanvasElement) {
    this.state = initialState
    this.renderer = renderer
    this.canvas = canvas
  }

  public getState(): StateType {
    return {...this.state}
  }

  public setState(key: keyof StateType, value: StateType[typeof key] | ((arg: StateType[typeof key]) => StateType[typeof key])): void {
    if (typeof value === "function") {
      const newStateUnit = (value as ((arg: StateType[typeof key]) => StateType[typeof key]))(this.state[key])
      this.state[key] = newStateUnit
    } else {
      this.state[key] = value
    }
    this.renderer.rerender(this.state)
  }
}


