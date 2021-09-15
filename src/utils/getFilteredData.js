export default function getFilteredData(
  sortedData,
  showFastDeliveryOnly,
  showInventoryAll
) {
  return sortedData
    .filter(({ fastdelivery }) => (showFastDeliveryOnly ? fastdelivery : true))
    .filter(({ instock }) => (showInventoryAll ? true : instock));
}
