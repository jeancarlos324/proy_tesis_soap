class RegexUtils {
  static uuid(id: string) {
    const regex =
      /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;
    return regex.test(id);
  }
}
export default RegexUtils;
