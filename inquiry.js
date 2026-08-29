const brandSelect = document.getElementById('brand');
const modelInput = document.getElementById('model');
const stockInput = document.getElementById('stock-number');
const params = new URLSearchParams(window.location.search);
const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
const requestedBrand = params.get('brand') || hashParams.get('brand');
const requestedModel = params.get('model') || hashParams.get('model');
const requestedStock = params.get('stock') || hashParams.get('stock');
const requestedBoat = params.get('boat') || hashParams.get('boat');

if (brandSelect && requestedBrand) {
  const matchingOption = [...brandSelect.options].find(
    (option) => option.value.toLowerCase() === requestedBrand.toLowerCase()
  );
  if (matchingOption) brandSelect.value = matchingOption.value;
}

if (modelInput && requestedModel) modelInput.value = requestedModel;
if (stockInput) stockInput.value = requestedStock || requestedBoat || '';
