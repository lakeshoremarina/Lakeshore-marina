const brandSelect = document.getElementById('brand');
const params = new URLSearchParams(window.location.search);
const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
const requestedBrand = params.get('brand') || hashParams.get('brand');

if (brandSelect && requestedBrand) {
  const matchingOption = [...brandSelect.options].find(
    (option) => option.value.toLowerCase() === requestedBrand.toLowerCase()
  );
  if (matchingOption) brandSelect.value = matchingOption.value;
}
