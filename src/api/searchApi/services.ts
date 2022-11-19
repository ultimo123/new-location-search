export const filterByKeyWordsServices = (
  array: Array<Array<string | number>>,
  keyOrIndex: string | number,
  keywords: string,
) => {
  const arrayFilter = array.filter(
    (n: any) =>
      (n[keyOrIndex] as string).substring(0, keywords.length).toLowerCase() ===
      keywords.toLowerCase(),
  )

  if (!keywords) return new Array<string>()
  return arrayFilter
}
