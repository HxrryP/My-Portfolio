const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const services = {
  sheets: {
    category: '01 / ORGANIZE',
    title: 'Spreadsheets & reporting',
    intro: 'Choose a familiar spreadsheet headache to see how I might tackle it.',
    scenarios: [
      { label: 'Recurring reports', summary: 'Make a repeat report easier to prepare and check.', steps: ['Review the source files and the report your team needs.', 'Build a repeatable layout with formulas and clear checks.', 'Walk your team through updating it next time.'] },
      { label: 'Inventory tracker', summary: 'Give stock movements a clearer home.', steps: ['List what comes in, what goes out, and what needs attention.', 'Set up an easy-to-edit product and transaction sheet.', 'Add a summary view for stock levels and changes.'] },
      { label: 'Messy data', summary: 'Turn scattered entries into information you can use.', steps: ['Find duplicates, missing values, and inconsistent formats.', 'Agree on a simple structure for ongoing entries.', 'Clean the data and document the update process.'] }
    ]
  },
  workflow: {
    category: '02 / SIMPLIFY',
    title: 'Workflow & small tools',
    intro: 'Pick the step that keeps eating your team’s time.',
    scenarios: [
      { label: 'Copying data', summary: 'Reduce repeated copying between files and systems.', steps: ['Map where the information starts and where it must go.', 'Check which parts can be handled by a simple tool.', 'Build a small first version and test it on sample data.'] },
      { label: 'Requests & approvals', summary: 'Make it easier to see who needs to act next.', steps: ['Map the request, review, and approval stages.', 'Design a simple intake and status view.', 'Test the flow with a few realistic requests.'] },
      { label: 'File organization', summary: 'Make shared files easier to find and maintain.', steps: ['Review the current folders and naming patterns.', 'Agree on a structure that fits how the team works.', 'Create a clear guide so new files stay organized.'] }
    ]
  },
  support: {
    category: '03 / SUPPORT',
    title: 'IT support',
    intro: 'Select a common issue to see what I would investigate first.',
    scenarios: [
      { label: 'Slow computer', summary: 'Find the likely cause before making changes.', steps: ['Check when the slowdown happens and what changed recently.', 'Review storage, startup items, updates, and system health.', 'Explain the findings and agree on the practical fix.'] },
      { label: 'Network trouble', summary: 'Trace the issue from the device to the connection.', steps: ['Check whether one device or the whole network is affected.', 'Review Wi-Fi, cables, router status, and basic configuration.', 'Test a fix and leave clear steps for future issues.'] },
      { label: 'New device setup', summary: 'Get a computer ready for everyday work.', steps: ['List the accounts, software, and access needed.', 'Set up the device and confirm updates and backups.', 'Test the essentials with the person who will use it.'] }
    ]
  }
};

const dialog = document.getElementById('service-dialog');
const options = document.getElementById('dialog-options');
const calculator = document.getElementById('dialog-calculator');
let activeService = null;
let selectedScenario = null;
let openingLink = null;
let focusContactOnClose = false;

function selectScenario(scenario, button) {
  selectedScenario = scenario;
  for (const option of options.querySelectorAll('button')) {
    option.setAttribute('aria-pressed', String(option === button));
  }
  document.getElementById('scenario-title').textContent = scenario.label;
  document.getElementById('scenario-summary').textContent = scenario.summary;
  const steps = document.getElementById('scenario-steps');
  steps.replaceChildren(...scenario.steps.map(text => {
    const item = document.createElement('li');
    item.textContent = text;
    return item;
  }));
}

function updateTimeSnapshot() {
  const runs = document.getElementById('weekly-runs');
  const minutes = document.getElementById('minutes-per-run');
  const output = document.getElementById('time-output');
  if (!runs.validity.valid || !minutes.validity.valid || !runs.value || !minutes.value) {
    output.textContent = 'Enter a number in each field';
    return;
  }
  const hours = Number(runs.value) * Number(minutes.value) * 52 / 12 / 60;
  output.textContent = `${hours.toLocaleString('en-PH', {maximumFractionDigits: 1})} hours / month`;
}

for (const link of document.querySelectorAll('[data-service]')) {
  link.addEventListener('click', event => {
    if (typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    const service = services[link.dataset.service];
    if (!service) return;
    openingLink = link;
    activeService = service;
    document.getElementById('dialog-category').textContent = service.category;
    document.getElementById('dialog-title').textContent = service.title;
    document.getElementById('dialog-intro').textContent = service.intro;
    options.replaceChildren(...service.scenarios.map(scenario => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'scenario-option';
      button.textContent = scenario.label;
      button.addEventListener('click', () => selectScenario(scenario, button));
      return button;
    }));
    selectScenario(service.scenarios[0], options.firstElementChild);
    calculator.hidden = link.dataset.service !== 'sheets';
    if (!calculator.hidden) updateTimeSnapshot();
    dialog.showModal();
    options.firstElementChild.focus();
  });
}

for (const input of document.querySelectorAll('#weekly-runs, #minutes-per-run')) {
  input.addEventListener('input', updateTimeSnapshot);
}

dialog.addEventListener('click', event => {
  if (event.target === dialog || event.target.closest('[data-close-dialog]')) dialog.close();
});
dialog.addEventListener('close', () => {
  if (!focusContactOnClose) openingLink?.focus();
  focusContactOnClose = false;
});

document.getElementById('dialog-inquire').addEventListener('click', () => {
  const message = document.getElementById('contact-message');
  if (!message.value.trim() && activeService && selectedScenario) {
    message.value = `Hi Harry, I’d like help with ${selectedScenario.label.toLowerCase()} (${activeService.title.toLowerCase()}). Here’s what I need: `;
  }
  focusContactOnClose = true;
  dialog.close();
  document.getElementById('contact').scrollIntoView({behavior: 'smooth'});
  message.focus({preventScroll: true});
});
