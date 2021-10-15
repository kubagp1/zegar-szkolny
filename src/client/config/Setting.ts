import Settings from './settings'

interface Setting<T> {
  value: T
  setValue: (newValue: T) => void
  applySetting?: () => void
}

class Setting<T> {
  constructor(public value: T) {
    this.setValue = function setValue(newValue: T): void {
      this.value = newValue
      if (typeof this['applySetting'] === 'function') {
        this.applySetting()
      }
    }
  }
}

export default Setting
