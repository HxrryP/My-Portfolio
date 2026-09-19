const projectDialog = document.getElementById('project-dialog');
const projectLinks = document.querySelectorAll('[data-project]');
const projectDetails = {
  barangay: {
    category: 'CAPSTONE WEBSITE',
    title: 'Barangay Transaction Management System',
    intro: 'A sample staff dashboard for tracking requests through simple stages.',
    page: 'case-studies/barangay.html'
  },
  municipal: {
    category: 'WEB PROJECT',
    title: 'Municipal E-Services',
    intro: 'A sample resident page for finding services and preparing a request.',
    page: 'case-studies/municipal.html'
  },
  tracker: {
    category: 'PERSONAL PROJECT',
    title: 'Monthly Payment Tracker',
    intro: 'An illustrative monthly view of scheduled payments and progress.',
    page: 'case-studies/tracker.html'
  }
};
let openingProjectLink = null;
let activeProject = null;
let focusProjectContact = false;

const caseRows = [...document.querySelectorAll('[data-case]')];
const caseFilter = document.getElementById('case-filter');
const caseStatusNames = {new: 'Needs review', checking: 'In progress', ready: 'Ready'};
const nextCaseStatus = {new: 'checking', checking: 'ready', ready: 'ready'};

function updateCaseQueue() {
  const counts = {new: 0, checking: 0, ready: 0};
  for (const row of caseRows) {
    const status = row.dataset.status;
    counts[status] += 1;
    row.hidden = caseFilter.value !== 'all' && caseFilter.value !== status;
    const chip = row.querySelector('.case-status');
    chip.textContent = caseStatusNames[status];
    chip.dataset.status = status;
    const button = row.querySelector('[data-advance-case]');
    button.disabled = status === 'ready';
    button.textContent = status === 'ready' ? 'Done' : 'Advance status';
  }
  document.querySelector('[data-total-cases]').textContent = caseRows.length;
  document.querySelector('[data-new-cases]').textContent = counts.new;
  document.querySelector('[data-checking-cases]').textContent = counts.checking;
  document.querySelector('[data-ready-cases]').textContent = counts.ready;
}

document.getElementById('case-rows').addEventListener('click', event => {
  const button = event.target.closest('[data-advance-case]');
  if (!button) return;
  const row = button.closest('[data-case]');
  row.dataset.status = nextCaseStatus[row.dataset.status];
  updateCaseQueue();
  document.getElementById('case-result').textContent = `${row.querySelector('th').textContent} is now ${caseStatusNames[row.dataset.status].toLowerCase()}.`;
});
caseFilter.addEventListener('change', () => {
  updateCaseQueue();
  document.getElementById('case-result').textContent = caseFilter.value === 'all' ? 'Showing all sample requests.' : `Showing requests marked ${caseStatusNames[caseFilter.value].toLowerCase()}.`;
});
document.getElementById('reset-cases').addEventListener('click', () => {
  for (const row of caseRows) row.dataset.status = row.dataset.initialStatus;
  caseFilter.value = 'all';
  updateCaseQueue();
  document.getElementById('case-result').textContent = 'Sample requests restored to their starting status.';
});
updateCaseQueue();

const municipalServices = {
  certificate: {title: 'Certificate request', description: 'A sample guide to preparing a certificate request online.', checklist: ['Valid ID details', 'Purpose of request', 'Contact information']},
  permit: {title: 'Permit inquiry', description: 'A sample guide to gathering information before a permit inquiry.', checklist: ['Business details', 'Supporting documents', 'Contact information']},
  appointment: {title: 'Service appointment', description: 'A sample guide to organizing a visit with the service desk.', checklist: ['Type of visit', 'Preferred date', 'Contact information']}
};
const municipalButtons = [...document.querySelectorAll('[data-municipal-service]')];
const municipalChecks = [...document.querySelectorAll('[data-service-check]')];

function updateMunicipalProgress() {
  const done = municipalChecks.filter(input => input.checked).length;
  document.getElementById('municipal-progress-text').textContent = `${done} of 3 items ready`;
  document.getElementById('municipal-progress-bar').style.width = `${done / 3 * 100}%`;
}
function selectMunicipalService(key) {
  const service = municipalServices[key];
  if (!service) return;
  for (const button of municipalButtons) button.setAttribute('aria-pressed', String(button.dataset.municipalService === key));
  document.getElementById('municipal-title').textContent = service.title;
  document.getElementById('municipal-description').textContent = service.description;
  municipalChecks.forEach((input, index) => {
    input.checked = false;
    input.closest('label').querySelector('[data-check-label]').textContent = service.checklist[index];
  });
  updateMunicipalProgress();
}
for (const button of municipalButtons) button.addEventListener('click', () => selectMunicipalService(button.dataset.municipalService));
for (const input of municipalChecks) input.addEventListener('change', updateMunicipalProgress);
selectMunicipalService('certificate');

const demoMonths = {
  oct: [{name: 'Internet', amount: 1800}, {name: 'Phone', amount: 3250}, {name: 'Short-term plan', amount: 1400}],
  nov: [{name: 'Internet', amount: 1800}, {name: 'Phone', amount: 3250}, {name: 'Short-term plan', amount: 1400}],
  dec: [{name: 'Internet', amount: 1800}, {name: 'Phone', amount: 3250}, {name: 'Short-term plan', amount: 1400}],
  jan: [{name: 'Internet', amount: 1800}, {name: 'Phone', amount: 3250}]
};
const trackerMonth = document.getElementById('tracker-month');
const trackerRows = document.getElementById('tracker-demo-rows');
const peso = amount => `₱${amount.toLocaleString('en-PH')}`;
function updateTrackerMetrics() {
  const inputs = [...trackerRows.querySelectorAll('input[type="checkbox"]')];
  const scheduled = inputs.reduce((sum, input) => sum + Number(input.dataset.amount), 0);
  const paid = inputs.filter(input => input.checked);
  const paidAmount = paid.reduce((sum, input) => sum + Number(input.dataset.amount), 0);
  document.getElementById('tracker-scheduled').textContent = peso(scheduled);
  document.getElementById('tracker-remaining').textContent = peso(scheduled - paidAmount);
  document.getElementById('tracker-paid-count').textContent = `${paid.length} / ${inputs.length}`;
  document.getElementById('tracker-progress-bar').style.width = scheduled ? `${paidAmount / scheduled * 100}%` : '0%';
}
function renderTrackerMonth() {
  trackerRows.replaceChildren(...demoMonths[trackerMonth.value].map(item => {
    const row = document.createElement('tr');
    const name = document.createElement('th');
    name.scope = 'row';
    name.textContent = item.name;
    const amount = document.createElement('td');
    amount.textContent = peso(item.amount);
    const paid = document.createElement('td');
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.dataset.amount = item.amount;
    input.addEventListener('change', updateTrackerMetrics);
    label.append(input, document.createTextNode(' Mark paid'));
    paid.append(label);
    row.append(name, amount, paid);
    return row;
  }));
  updateTrackerMetrics();
}
trackerMonth.addEventListener('change', renderTrackerMonth);
renderTrackerMonth();

for (const link of projectLinks) {
  link.addEventListener('click', event => {
    if (typeof projectDialog.showModal !== 'function') return;
    const project = projectDetails[link.dataset.project];
    if (!project) return;
    event.preventDefault();
    openingProjectLink = link;
    activeProject = project;
    document.getElementById('project-dialog-label').textContent = project.category;
    document.getElementById('project-dialog-title').textContent = project.title;
    document.getElementById('project-dialog-intro').textContent = project.intro;
    document.getElementById('project-case-study').href = project.page;
    for (const view of document.querySelectorAll('[data-project-view]')) view.hidden = view.dataset.projectView !== link.dataset.project;
    if (link.dataset.project === 'barangay') document.getElementById('reset-cases').click();
    if (link.dataset.project === 'municipal') selectMunicipalService('certificate');
    if (link.dataset.project === 'tracker') {trackerMonth.value = 'oct'; renderTrackerMonth();}
    projectDialog.showModal();
    (link.dataset.project === 'barangay' ? caseFilter : link.dataset.project === 'municipal' ? municipalButtons[0] : trackerMonth).focus();
  });
}

const previewSlug = /^#preview-(barangay|municipal|anilao|tracker)$/.exec(window.location?.hash || '')?.[1];
if (previewSlug) document.querySelector(`[data-project="${previewSlug === 'anilao' ? 'municipal' : previewSlug}"]`)?.click();

projectDialog.addEventListener('click', event => {
  if (event.target === projectDialog || event.target.closest('[data-close-project]')) projectDialog.close();
});
projectDialog.addEventListener('close', () => {
  if (!focusProjectContact) openingProjectLink?.focus();
  focusProjectContact = false;
});
document.getElementById('project-inquire').addEventListener('click', () => {
  const message = document.getElementById('contact-message');
  if (!message.value.trim() && activeProject) message.value = `Hi Harry, I saw your ${activeProject.title} sample. I'd like to discuss a similar project: `;
  focusProjectContact = true;
  projectDialog.close();
  document.getElementById('contact').scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  message.focus({preventScroll: true});
});
