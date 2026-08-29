const rentalType = document.getElementById('rental-type');
const tubeAddon = document.getElementById('tube-addon');
const requestedDate = document.getElementById('requested-date');
const alternateDate = document.getElementById('alternate-date');
const params = new URLSearchParams(window.location.search);
const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
const requestedRental = params.get('rental') || hashParams.get('rental');
const requestedTube = params.get('tube') || hashParams.get('tube');
const today = new Date();
const minimumDate = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, '0'),
  String(today.getDate()).padStart(2, '0')
].join('-');

if (rentalType && requestedRental) {
  const matchingOption = [...rentalType.options].find(
    (option) => option.value.toLowerCase() === requestedRental.toLowerCase()
  );
  if (matchingOption) rentalType.value = matchingOption.value;
}

if (tubeAddon && requestedTube && requestedTube.toLowerCase() === 'yes') {
  tubeAddon.value = 'Yes';
}

if (requestedDate) requestedDate.min = minimumDate;
if (alternateDate) alternateDate.min = minimumDate;
