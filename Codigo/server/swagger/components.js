const components = {
    schemas: {
        User: {
            type: "object",
            properties: {
                name: { type: "string" },
                email: { type: "string" },
                cpf: { type: "string" },
                password: { type: "string" }, // Note: This should be excluded in responses for security reasons
                role: { type: "string", enum: ["admin", "accountant", "secretary", "basic"] },
                bearerToken: { type: "string" },
                address: {
                    type: "object",
                    properties: {
                        street: { type: "string" },
                        city: { type: "string" },
                        state: { type: "string" },
                        zipCode: { type: "string" },
                        country: { type: "string" }
                    }
                }
            },
            required: ["name", "email", "password", "role"],
            example: {
                name: "John Doe",
                email: "john.doe@example.com",
                cpf: "123.456.789-00",
                password: "password123",
                role: "basic",
                bearerToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
                address: {
                    street: "123 Main St",
                    city: "Anytown",
                    state: "Anystate",
                    zipCode: "12345",
                    country: "USA"
                }
            }
        },
        Pacient: {
            type: "object",
            properties: {
                name: { type: "string" },
                cpf: { type: "string" },
                birthdate: { type: "string", format: "date" },
                biologicalSex: { type: "string", enum: ["M", "F"] },
                mainComplaint: { type: "string" },
                sign: { type: "string", enum: ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"] },
                phone: { type: "string" },
                email: { type: "string" },
                bloodType: { type: "string", enum: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"] },
                address: {
                    type: "object", properties: {
                        street: { type: "string" },
                        city: { type: "string" },
                        state: { type: "string" },
                        zipCode: { type: "string" },
                        country: { type: "string" }
                    }
                },
                familyData: {
                    type: "object", properties: {
                        mother: { type: "string" },
                        father: { type: "string" },
                        siblings: { type: "array", items: { type: "string" } },
                        children: { type: "array", items: { type: "string" } },
                        partner: { type: "string" },
                        birthOrder: { type: "string" },
                    }
                },
                record: {
                    type: "object", properties: {
                        generalData: {
                            type: "object", properties: {
                                recentDiagnosis: { type: "string" },
                                medication: { type: "string" },
                                selfSteem: { type: "string" },
                                allergies: { type: "string" },
                                religiousActivities: { type: "string" },
                                socialContext: { type: "string" }
                            }
                        },
                        habits: {
                            type: "object", properties: {
                                exercises: { type: "string" },
                                alimentation: { type: "string" },
                                intestinalHabits: { type: "string" },
                                sexualHabits: { type: "string" },
                                drugConsumption: { type: "string" },
                                alcoholConsumption: { type: "string" },
                                smokingHabits: { type: "string" },
                                disgestion: { type: "string" },
                                sleepHabits: { type: "string" },
                                menstrualCycle: { type: "string" }
                            }
                        }
                    }
                },
                biography: {
                    type: "object", properties: {
                        observations: { type: "string" },
                        zeroToSeven: { type: "string" },
                        eightToFourteen: { type: "string" },
                        fifteenToTwentyOne: { type: "string" },
                        twentyTwoToTwentyEight: { type: "string" },
                        twentyNineToThirtyFive: { type: "string" },
                        thirtySixToFortyTwo: { type: "string" },
                        fortyThreeToFortyNine: { type: "string" },
                        fiftyToFiftySix: { type: "string" },
                        fiftySevenToSixtyThree: { type: "string" },
                        sixtyFourToSeventy: { type: "string" },
                        seventyOneAndAbove: { type: "string" }
                    }
                },
                exams: {
                    type: "array",
                    items: { type: "object" }

                },
                treatments: {
                    type: "array",
                    items: { type: "object", }
                }
            }
        },
        Receipt: {
            type: "object",
            properties: {
                id: { type: "string" },
                date: { type: "string", format: "date" },
                value: { type: "number" },
                pacient_id: { type: "string" }
            },
            required: ["date", "value", "pacient_id"],
            example: {
                date: "2024-01-01",
                value: 100.00,
                pacient_id: "77c74dd3-b749-4826-809c-d26521c43a8e"
            }
        },
        Treatment: {
            type: "object",
            properties: {
                element: {
                    type: "string"
                },
                spiritual: {
                    type: "number",
                    format: "float"
                },
                sensorial: {
                    type: "number",
                    format: "float"
                },
                rhythmic: {
                    type: "number",
                    format: "float"
                },
                motor: {
                    type: "number",
                    format: "float"
                },
                mental: {
                    type: "number",
                    format: "float"
                },
                custom: {
                    type: "boolean"
                },
            },
        }
    }
}

export default components;