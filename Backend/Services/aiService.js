import { GoogleGenAI } from "@google/genai";

export const generateFinancialInsights = async (data) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `

You are a financial analysis AI.

IMPORTANT RULES:

1. ONLY analyze the exact financial data provided.
2. DO NOT hallucinate.
3. DO NOT invent subscriptions, loans, salaries, recurring payments, or investments.
4. Every insight must be based strictly on the real numbers provided.
5. Return ONLY valid JSON.
6. DO NOT use markdown.
7. DO NOT wrap response inside backticks.
8. Generate recommended monthly budgets for major spending categories based on the user's financial behavior.
9. recommendedBudgets must NEVER be empty.
10. Include at least 3 category recommendations whenever possible.
Generate realistic recommended budgets for important categories based strictly on the user's spending patterns.

recommendedBudgets must always contain category-wise budget suggestions.

Example:
[
  {
    "category": "Food",
    "amount": 5000
  }
]

Financial Data:

Income:
₹${data.totalIncome}

Expense:
₹${data.totalExpense}

Savings:
₹${data.totalSavings}

Savings Percentage:
${data.savingsPercentage}%

Top Spending Category:
${data.topCategory}

Budget Warnings:
${data.budgetWarnings}

Return response in EXACT format:

{
  "executiveSummary": "string",

  "spendingAnalysis": [
    "string"
  ],

  "savingTips": [
    "string"
  ],

  "moneyWaste": [
    "string"
  ],

  "recommendedBudgets": [
    {
      "category": "string",
      "amount": 0
    }
  ]
}

`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: prompt,
    });

    console.log("RAW AI RESPONSE:");

    console.log(response.text);

    const cleanedText = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("CLEANED RESPONSE:");

    console.log(cleanedText);

    try {
      return JSON.parse(cleanedText);
    } catch (parseError) {
      console.log("JSON Parse Error:");

      console.log(parseError);

      return {
        executiveSummary: cleanedText,

        spendingAnalysis: [],

        savingTips: [],

        moneyWaste: [],

        recommendedBudgets: [],
      };
    }
  } catch (error) {
    console.log("AI ERROR:");

    console.log(error);

    return {
      executiveSummary: "Unable to generate insights.",

      spendingAnalysis: [],

      savingTips: [],

      budgetAnalysis: [],

      recommendedBudgets: [],
    };
  }
};

export const generateChatResponse = async (data) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `

You are an AI Financial Advisor.

User Financial Data:

Total Income:
₹${data.totalIncome}

Total Expense:
₹${data.totalExpense}

User Question:
${data.message}

IMPORTANT:
- Give short practical advice.
- Be friendly.
- Use simple English.
- Do not hallucinate.
- Keep answer under 120 words.

`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.log(error);

    return "Unable to generate response right now.";
  }
};
