export default function format(formatStr) {
  const date = this.toString();
  switch (formatStr) {
    case "ss":
      return date.slice(17, 19);
    case "mm":
      return date.slice(14, 16);
    case "hh":
      return date.slice(11, 13);
    case "DD":
      return date.slice(8, 10);
    case "MM":
      return date.slice(5, 7);
    case "YYYY":
      return date.slice(0, 4);
    default:
      throw new Error(`Not Supported ${formatStr}`);
  }
}
