/* eslint-disable import/prefer-default-export */

export function debounce<F extends Function>(
  callback: F,
  delay: number = 0
): F {
  let timeoutId: NodeJS.Timeout | null = null;

  return <any>function timeout(this: any, ...args: any[]): void {
    if (timeoutId != null) {
      clearTimeout(timeoutId);
    }
    const context = this;

    timeoutId = setTimeout(() => {
      callback.apply(context, args);
    }, delay);
  };
}
