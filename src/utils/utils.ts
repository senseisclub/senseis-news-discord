export class Utils {
  static trimAndLowerCase(value: string | null) {
    let processedValue = value;

    if (value) {
      processedValue = value.trim().toLowerCase();
    }

    return processedValue;
  }
}
