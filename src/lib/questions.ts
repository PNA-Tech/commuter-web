export interface Question<T> {
  title: string,
  type: QuestionType,
  data: MultipleChoiceQuestion<T> | NumberQuestion,
  condition?: Condition,
}

export enum QuestionType {
  MultipleChoice,
  Number,
}

export interface MultipleChoiceQuestion<T> {
  choices: Record<string, T>,
}

export interface NumberQuestion {
  min: number,
  max?: number,
  default: number,
}

export interface Condition {
  offset: number,
  check: (v: any) => boolean,
}

export interface Tip {
  title: string,
  description: string,
  save: number
}

// Questions
export enum HouseholdType {
  Old,
  Standard,
  Efficient
}

export const questions: Question<any>[] = [
  {
    title: "What type of household do you have for CO2 conservation?",
    type: QuestionType.MultipleChoice,
    data: {
      choices: {
        "Low Emission Vehicles": HouseholdType.Efficient,
        "Regular Vehicles": HouseholdType.Standard,
        "High Emission Vehicles": HouseholdType.Old,
      }
    },
  },
  {
    title: "How many people use vehicles in your household for CO2 conservation?",
    type: QuestionType.Number,
    data: {
      min: 1,
      default: 1,
    },
  },
  {
    title: "How many miles does the average vehicle in your household drive daily for CO2 conservation?",
    type: QuestionType.MultipleChoice,
    data: {
      choices: {
        "Less than 10 miles": 4,
        "10-50 miles": 8,
        "50-100 miles": 13,
        "More than 100 miles": 16,
      }
    },
  },
  {
    title: "How often do the vehicles in your household emit CO2 for CO2 conservation?",
    type: QuestionType.MultipleChoice,
    data: {
      choices: {
        "Rarely": 1/400,
        "Occasionally": 1/365,
        "Weekly": 1/7,
        "Daily": 1,
      }
    }
  },
  {
    title: "How long do vehicles in your household idle for CO2 conservation?",
    type: QuestionType.MultipleChoice,
    data: {
      choices: {
        "Less than 5 minutes": 4,
        "5-20 minutes": 8,
        "21-45 minutes": 20,
        "More than 45 minutes": 30,
      }
    },
  },
  {
    title: "How often do you perform emissions tests on your vehicles for CO2 conservation?",
    type: QuestionType.MultipleChoice,
    data: {
      choices: {
        "Never": 1/400,
        "Once a month": 1/30,
        "Once a week": 1/7,
        "Once a day": 1,
      }
    }
  },
  {
    title: "Do you have a hybrid or electric vehicle for CO2 conservation?",
    type: QuestionType.MultipleChoice,
    data: {
      choices: {
        "No": false,
        "Yes": true,
      },
    },
    condition: {
      offset: -1,
      check: (v: number) => v != 0,
    },
  },
  {
    title: "How often do you perform vehicle maintenance for CO2 conservation?",
    type: QuestionType.MultipleChoice,
    data: {
      choices: {
        "Never": 1/400,
        "Once a month": 1/30,
        "Once a week": 1/7,
        "Once a day": 1,
      }
    }
  },
  {
    title: "Do you use public transportation for CO2 conservation?",
    type: QuestionType.MultipleChoice,
    data: {
      choices: {
        "Rarely": 1/400,
        "Occasionally": 1/365,
        "Weekly": 1/7,
        "Daily": 1,
      },
    },
    condition: {
      offset: -1,
      check: (v: boolean) => v,
    },
  },
  {
    title: "How often do you recycle paper products?",
    type: QuestionType.MultipleChoice,
    data: {
      choices: {
        "Never": 1/400,
        "Rarely": 1/365,
        "Occasionally": 1/30,
        "Regularly": 1/7,
        "Daily": 1,
      }
    }
  },
  {
    title: "Do you compost organic waste?",
    type: QuestionType.MultipleChoice,
    data: {
      choices: {
        "No": false,
        "Yes": true,
      },
    },
  },
  {
    title: "How often do you turn off lights when not in use?",
    type: QuestionType.MultipleChoice,
    data: {
      choices: {
        "Rarely": 1/400,
        "Occasionally": 1/365,
        "Weekly": 1/7,
        "Always": 1,
      }
    }
  },
  {
    title: "Do you have energy-efficient appliances in your home?",
    type: QuestionType.MultipleChoice,
    data: {
      choices: {
        "No": false,
        "Yes": true,
      },
    },
  },
  {
    title: "How often do you use public transportation for commuting?",
    type: QuestionType.MultipleChoice,
    data: {
      choices: {
        "Never": 1/400,
        "Rarely": 1/365,
        "Occasionally": 1/30,
        "Weekly": 1/7,
        "Daily": 1,
      }
    }
  },
];
