interface Setting<T> {
  setValue: (newValue: T) => Promise<void>
  getValue: () => Promise<T>
  title?: string
  subtitle?: string
}

class Setting<T> {
  constructor(
    public setValue: (newValue: T) => Promise<void>,
    public getValue: () => Promise<T>,
    public title?: string,
    public subtitle?: string
  ) {}
}

export default Setting
