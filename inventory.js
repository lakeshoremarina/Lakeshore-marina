const inventoryGrid = document.getElementById('inventory-grid');
const inventoryEmpty = document.getElementById('inventory-empty');
const inventoryCount = document.getElementById('inventory-count');
const conditionFilter = document.getElementById('condition-filter');
const brandFilter = document.getElementById('brand-filter');
const boatModal = document.getElementById('boat-modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');

let boats = [];

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function formatPrice(value) {
  if (!value) return 'Call for price';
  const numeric = Number(String(value).replace(/[^0-9.]/g, ''));
  return Number.isFinite(numeric) && numeric > 0
    ? numeric.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
    : String(value);
}

function buildPhoto(image, title, className = 'boat-card-photo') {
  const wrap = makeElement('div', className);
  if (image) {
    const img = document.createElement('img');
    img.src = image;
    img.alt = title;
    img.loading = 'lazy';
    img.decoding = 'async';
    wrap.appendChild(img);
  } else {
    wrap.appendChild(makeElement('span', 'photo-coming-soon', 'Photo coming soon'));
  }
  return wrap;
}

function openBoat(boat) {
  modalContent.replaceChildren();

  const gallery = makeElement('div', 'boat-modal-gallery');
  const images = [boat.cover_image, ...(Array.isArray(boat.gallery) ? boat.gallery : [])].filter(Boolean);
  if (images.length) {
    images.forEach((src, index) => gallery.appendChild(buildPhoto(src, `${boat.year || ''} ${boat.make || ''} ${boat.model || ''} photo ${index + 1}`, 'boat-modal-photo')));
  } else {
    gallery.appendChild(buildPhoto('', boat.title || 'Boat', 'boat-modal-photo'));
  }

  const details = makeElement('div', 'boat-modal-details');
  const status = makeElement('div', 'boat-badges');
  status.appendChild(makeElement('span', 'boat-badge', boat.condition || 'Available'));
  if (boat.status) status.appendChild(makeElement('span', `boat-badge boat-badge--${String(boat.status).toLowerCase().replace(/\s+/g, '-')}`, boat.status));

  const title = makeElement('h2', '', boat.title || [boat.year, boat.make, boat.model].filter(Boolean).join(' '));
  title.id = 'boat-modal-title';
  details.append(status, title, makeElement('p', 'boat-modal-price', formatPrice(boat.price)));

  const specs = makeElement('dl', 'boat-specs');
  [
    ['Length', boat.length],
    ['Engine', boat.engine],
    ['Engine Hours', boat.hours],
    ['Stock Number', boat.stock_number]
  ].filter(([, value]) => value).forEach(([label, value]) => {
    const item = makeElement('div', 'boat-spec');
    item.append(makeElement('dt', '', label), makeElement('dd', '', value));
    specs.appendChild(item);
  });
  details.appendChild(specs);

  if (boat.description) details.appendChild(makeElement('p', 'boat-description', boat.description));

  const actions = makeElement('div', 'boat-modal-actions');
  const inquiry = makeElement('a', 'btn btn-primary btn-lg', 'Inquire About This Boat');
  const inquiryParams = new URLSearchParams();
  if (boat.make) inquiryParams.set('brand', boat.make);
  if (boat.model) inquiryParams.set('model', boat.model);
  if (boat.stock_number) inquiryParams.set('stock', boat.stock_number);
  inquiryParams.set('boat', boat.title || [boat.year, boat.make, boat.model].filter(Boolean).join(' '));
  inquiry.href = `boat-inquiry.html#${inquiryParams.toString()}`;

  const call = makeElement('a', 'btn btn-outline btn-lg', 'Call About This Boat');
  call.href = 'tel:4192682280';
  actions.append(inquiry, call);
  details.appendChild(actions);

  modalContent.append(gallery, details);
  boatModal.showModal();
}

function createBoatCard(boat) {
  const card = makeElement('article', 'boat-card');
  const title = boat.title || [boat.year, boat.make, boat.model].filter(Boolean).join(' ') || 'Boat for sale';
  card.appendChild(buildPhoto(boat.cover_image, title));

  const body = makeElement('div', 'boat-card-body');
  const badges = makeElement('div', 'boat-badges');
  badges.appendChild(makeElement('span', 'boat-badge', boat.condition || 'Available'));
  if (boat.status) badges.appendChild(makeElement('span', `boat-badge boat-badge--${String(boat.status).toLowerCase().replace(/\s+/g, '-')}`, boat.status));

  body.append(badges, makeElement('h3', '', title));
  const summary = [boat.length, boat.engine].filter(Boolean).join(' · ');
  if (summary) body.appendChild(makeElement('p', 'boat-card-summary', summary));

  const footer = makeElement('div', 'boat-card-footer');
  footer.appendChild(makeElement('p', 'boat-price', formatPrice(boat.price)));
  const button = makeElement('button', 'btn btn-outline', 'View Details');
  button.type = 'button';
  button.addEventListener('click', () => openBoat(boat));
  footer.appendChild(button);
  body.appendChild(footer);
  card.appendChild(body);
  return card;
}

function renderInventory() {
  const condition = conditionFilter.value;
  const brand = brandFilter.value;
  const available = boats.filter((boat) => boat.status !== 'Sold');
  const filtered = available.filter((boat) =>
    (condition === 'all' || boat.condition === condition) &&
    (brand === 'all' || boat.make === brand)
  );

  inventoryGrid.replaceChildren(...filtered.map(createBoatCard));
  const totalText = `${filtered.length} ${filtered.length === 1 ? 'boat' : 'boats'} available`;
  inventoryCount.textContent = totalText;
  inventoryEmpty.hidden = filtered.length !== 0;
  inventoryGrid.hidden = filtered.length === 0;
}

async function loadInventory() {
  try {
    const response = await fetch('data/boats.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Inventory file could not be loaded');
    const data = await response.json();
    boats = Array.isArray(data.boats) ? data.boats : [];

    [...new Set(boats.map((boat) => boat.make).filter(Boolean))].sort().forEach((make) => {
      const option = document.createElement('option');
      option.value = make;
      option.textContent = make;
      brandFilter.appendChild(option);
    });
    renderInventory();
  } catch (error) {
    inventoryCount.textContent = 'Call for current availability';
    inventoryEmpty.hidden = false;
    inventoryGrid.hidden = true;
  }
}

conditionFilter.addEventListener('change', renderInventory);
brandFilter.addEventListener('change', renderInventory);
modalClose.addEventListener('click', () => boatModal.close());
boatModal.addEventListener('click', (event) => {
  if (event.target === boatModal) boatModal.close();
});

loadInventory();
