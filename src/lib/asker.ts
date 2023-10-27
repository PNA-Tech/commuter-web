import { writable } from "svelte/store";
import { HouseholdType, questions, QuestionType, type MultipleChoiceQuestion, type NumberQuestion, type Tip } from "./questions";

let $values: any[] = [];
for (let q of questions) {
  switch (q.type) {
    case QuestionType.MultipleChoice:
      $values.push(Object.values((q.data as MultipleChoiceQuestion<any>).choices)[0]);
      break;
  
    case QuestionType.Number:
      $values.push((q.data as NumberQuestion).default);
      break;
  }
}

export let values = writable($values);
values.subscribe(v => {$values = v});

export let tips: Tip[] = [];

function bathrooms(): number {
  let res = 0;

  // Shower
  let mult = 0;
  switch ($values[0]) {
    case HouseholdType.Old:
      mult = 30; // Realistic CO2 emission factor for old showers (in kilograms of CO2 per year)
      break;

    case HouseholdType.Standard:
      mult = 15; // Realistic CO2 emission factor for standard showers
      break;

    case HouseholdType.Efficient:
      mult = 10; // Realistic CO2 emission factor for efficient showers
      break;

    default:
      console.error("Invalid HouseholdType");
      return 0;
  }

  res += mult * $values[2] * $values[1];
  if ($values[0] != HouseholdType.Efficient) {
    tips.push({
      title: "Low-flow Showerhead",
      description: "Try to use a showerhead which releases less water. This can help you save money and the planet by reducing CO2 emissions!",
      save: (mult - 10) * $values[2] * $values[1]
    });
  }

  // Baths
  if (isNaN($values[3]) || isNaN($values[1])) {
    console.error("Invalid values for baths");
    return 0;
  }
  res += 50 * $values[3] * $values[1]; // Realistic CO2 emission factor for baths (in kilograms of CO2 per year)

  // Sinks
  switch ($values[0]) {
    case HouseholdType.Old:
      mult = 20; // Realistic CO2 emission factor for old sinks
      break;

    case HouseholdType.Standard:
      mult = 15; // Realistic CO2 emission factor for standard sinks
      break;

    case HouseholdType.Efficient:
      mult = 10; // Realistic CO2 emission factor for efficient sinks
      break;

    default:
      console.error("Invalid HouseholdType");
      return 0;
  }
  res += $values[4] * mult * $values[1];
  if ($values[0] != HouseholdType.Efficient) {
    tips.push({
      title: "Low-flow Bathroom Faucet",
      description: "Use a faucet with low-flow. This allows you to save money and help the Earth by reducing CO2 emissions!",
      save: $values[4] * (mult - 10) * $values[1]
    });
  }

  // Toilets
  switch ($values[0]) {
    case HouseholdType.Old:
      mult = 35; // Realistic CO2 emission factor for old toilets
      break;

    case HouseholdType.Standard:
      mult = 25; // Realistic CO2 emission factor for standard toilets
      break;

    case HouseholdType.Efficient:
      mult = 20; // Realistic CO2 emission factor for efficient toilets
      break;

    default:
      console.error("Invalid HouseholdType");
      return 0;
  }
  res += 10 * mult * $values[1]; // Realistic CO2 emission factor for toilet usage (in kilograms of CO2 per year)
  if ($values[0] != HouseholdType.Efficient) {
    tips.push({
      title: "WaterSense Toilet",
      description: "Save the environment as well as your bank account with a WaterSense Toilet and reduce CO2 emissions!",
      save: 10 * (mult - 20) * $values[1]
    });
  }
  return res;
}

function household(): number {
  let res = 0;

  // Kitchen sink
  let mult = 0;
  if ($values[0] === HouseholdType.Efficient) {
    mult = 10; // Realistic CO2 emission factor for efficient kitchen sinks
  } else {
    mult = 20; // Realistic CO2 emission factor for other kitchen sinks
  }
  res += $values[5] * mult * $values[1];
  if ($values[0] != HouseholdType.Efficient) {
    tips.push({
      title: "Low-flow Kitchen Faucet",
      description: "Use a kitchen faucet with low-flow. This allows you to save money and help the Earth by reducing CO2 emissions!",
      save: $values[5] * (mult - 10) * $values[1]
    });
  }

  // Dishes
  if (isNaN($values[6]) || isNaN($values[8])) {
    console.error("Invalid values for dishes or laundry");
    return 0;
  }
  if ($values[0] === HouseholdType.Efficient) {
    mult = 5; // Realistic CO2 emission factor for efficient dishwashing
  } else {
    mult = 25; // Realistic CO2 emission factor for other dishwashing
  }
  if ($values[7]) {
    mult = 30; // Realistic CO2 emission factor for dishwashing with EnergyStar dishwasher
  }
  res += $values[6] * mult;
  if ($values[6] > 0 && $values[0] != HouseholdType.Efficient) {
    tips.push({
      title: "Use EnergyStar Dishwasher",
      description: "Use an EnergyStar Dishwasher to clean your dishes while helping the environment and reducing CO2 emissions!",
      save: $values[6] * (mult - 5) // Adjusted for more realistic savings
    });
  }

  // Laundry
  if ($values[0] === HouseholdType.Efficient) {
    mult = 50; // Realistic CO2 emission factor for efficient laundry
  } else {
    mult = 80; // Realistic CO2 emission factor for other laundry
  }
  res += $values[8] * mult;
  if ($values[8] > 0 && $values[0] != HouseholdType.Efficient) {
    tips.push({
      title: "WaterSense Washing Machine",
      description: "Use a WaterSense Washing Machine to clean your clothes while helping the environment and reducing CO2 emissions!",
      save: $values[8] * (mult - 50) // Adjusted for more realistic savings
    });
  }
  return res;
}

function outdoor(): number {
  let res = 0;

  // Lawn
  if (isNaN($values[9]) || isNaN($values[10])) {
    console.error("Invalid values for lawn or swimming pool");
    return 0;
  }
  res += $values[9] * $values[10];

  // Swimming pool
  if ($values[11]) {
    if (isNaN($values[12])) {
      console.error("Invalid value for swimming pool");
      return 0;
    }
    res += (20000 + $values[12]) / 365; // Realistic CO2 emission factor for swimming pool
  }

  // Car
  if (isNaN($values[13]) || isNaN($values[14])) {
    console.error("Invalid values for car");
    return 0;
  }
  res += $values[13] * $values[14];

  return res;
}

export function calculate(): number {
  tips = [];
  let res = 0;

  res += bathrooms();
  res += household();
  res += outdoor();

  return Math.round(res);
}

// TODO: Support per-state prices
export function cost(co2Emissions: number): number {
  const carbonPrice = 0.03; // Realistic carbon price in dollars per kilogram of CO2
  return carbonPrice * co2Emissions / 1.2;
}
