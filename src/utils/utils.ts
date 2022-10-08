export class Utils {
  static trimAndLowerCase(value: string | null) {
    let processedValue = value;

    if (value) {
      processedValue = value.trim().toLowerCase();
    }

    return processedValue;
  }

  static compareString(firstString: string, secondString: string) {
    return (Utils.trimAndLowerCase(firstString) || '').includes(Utils.trimAndLowerCase(secondString) || '');
  }
}
