export interface Family {
    mother?: string;
    father?: string;
    siblings?: string;
    children?: string;
    partner?: string;
    birthOrder?: string;
}

export interface Biography {
    observations?: string;
    zeroToSeven?: string;
    eightToFourteen?: string;
    fifteenToTwentyOne?: string;
    twentyTwoToTwentyEight?: string;
    twentyNineToThirtyFive?: string;
    thirtySixToFortyTwo?: string;
    fortyThreeToFortyNine?: string;
    fiftyToFiftySix?: string;
    fiftySevenToSixtyThree?: string;
    sixtyFourToSeventy?: string;
    seventyOneAndAbove?: string;
}

export interface Habits {
    exercises?: string;
    alimentation?: string;
    intestinalHabits?: string;
    sexualActivity?: string;
    drugs?: string;
    alcohol?: string;
    smoking?: string;
    digestion?: string;
    sleep?: string;
    menstrual?: string;
}

export interface Record {
    diagnosis?: string;
    medication?: string;
    selfSteem?: string;
    religion?: string;
    social?: string;
    allergies?: string;
    habits?: Habits;
}

export interface Treatment {
    element: string;
    spiritual: number;
    sensorial: number;
    rhythmic: number;
    motor: number;
    mental: number;
    custom: boolean;
}

export interface FisicalExam {
    height?: string;
    weight?: string;
    bloodPressure?: string;
    heartRate?: string;
    svc?: string;
    heartRateRegular?: string;
    respiratoryRate?: string;
    temperature?: string;
    sr?: string;
    observations?: string;
}
