/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

// === State ===
/** @returns {Freelancer} a freelancer with a random name, occupation, and rate */
function makeFreelancer() {
  const freelancerObj = {};
  freelancerObj.name = NAMES[Math.floor(Math.random() * NAMES.length)];
  freelancerObj.occupation = OCCUPATIONS[Math.floor(Math.random() * OCCUPATIONS.length)];
  freelancerObj.rate = Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min) + PRICE_RANGE.min)

  return freelancerObj;
}

const freelancers = [];
for (let i = 0; i < NUM_FREELANCERS; i++) {
  freelancers.push(makeFreelancer());
}

function getAverageRate() {
    const rateTotal = freelancers.reduce((sum, freelancer) => {
        return sum + freelancer.rate;
    }, 0);
    return (rateTotal / NUM_FREELANCERS).toFixed(2); 
}

let averageRate = 0

// === Components ===
/**
 * A single freelancer component with name, occupation, and rate.
 * @param {Freelancer} freelancer
 */
function FreelancerRow(freelancer) {
  const element = document.createElement('tr');
  element.innerHTML = `
    <td>${freelancer.name}</td>
    <td>${freelancer.occupation}</td>
    <td>${freelancer.rate}</td>
  `;

  return element;
}

/** A table of many Freelancers */
function FreelancerRows() {
  const element = document.createElement('table');
  const tableHeader = document.createElement('tr');
  tableHeader.innerHTML = `
    <th>NAME</th>
    <th>OCCUPATION</th>
    <th>RATE</th>
  `;
  element.append(tableHeader);
  for (let i = 0; i < freelancers.length; i++) {
    element.append(FreelancerRow(freelancers[i]));
  }

  return element;
}

function AverageRateComponent() {
  const element = document.createElement('h2');
  element.id = 'freelancer_rate';
  element.innerText = `The average rate is \$${averageRate}`;

  return element;
}

// === Render ===
function render() {
    const $app = document.querySelector("#app");
    $app.innerHTML = `
        <h1>Freelancer Forum</h1>
        <h2 id="freelancer_rate"></h2>
        <table></table>
    `;
    averageRate = getAverageRate();
 
    $app.querySelector("#freelancer_rate").replaceWith(AverageRateComponent());
    $app.querySelector("table").replaceWith(FreelancerRows());

}
render();
