export function debounce<F extends Function>(
  callback: F,
  delay: number = 0
): F {
  let timeoutId: NodeJS.Timeout | null = null;

  return <any>function (this: any, ...args: any[]) {
    if (timeoutId != null) {
      clearTimeout(timeoutId);
    }
    const context = this;

    timeoutId = setTimeout(function () {
      callback.apply(context, args);
    }, delay);
  };
}
