import { Component, forwardRef, Input, Output, EventEmitter, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class InputComponent implements ControlValueAccessor {
  @Input() propName: string
  @Output() isChange = new EventEmitter<boolean>()

  previousValue: string
  state: string
  isActiveInput = false

  compareValue(previousValue, newValue): boolean{
    if (previousValue !== newValue) {
      return true
    }
    return false
  }

  private onChange = (toOutsideValue: string) => {
  }

  onBlur(currentState: string): void {
    this.isActiveInput = false
    if(this.compareValue(this.previousValue, currentState)){
      this.isChange.emit(true)
      this.onChange(currentState)
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(fromOutsideValue: string): void {
    this.state = fromOutsideValue
    this.previousValue = fromOutsideValue
  }



}
