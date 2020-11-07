export type InferActions<T> =
  T extends {[keys: string]: (...args: any[]) => infer U}
    ? U
    : never

export type InferActionsTypes<T> = T extends {type: infer U} ? U : never

export type InferActionFromActions<A, T extends InferActionsTypes<A>> =
  A extends {type: infer U}
    ? U extends T
      ? A
      : never
    : never
