import { SearchResult, Message, CompanyInfo } from "@/types";

const PERPLEXICA_API_URL = import.meta.env.VITE_PERPLEXICA_API_URL;
const BRINGO_API_URL = import.meta.env.VITE_BRINGO_API_URL;
const BRINGO_API_KEY = import.meta.env.VITE_BRINGO_API_KEY;
const AI_API_URL = import.meta.env.VITE_AI_API_URL;
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function searchPerplexica(query: string): Promise<SearchResult[]> {
  try {
    const response = await fetch(`${PERPLEXICA_API_URL}/search`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query,
        max_results: 10
      })
    });

    if (!response.ok) {
      throw new Error("Perplexica search unavailable");
    }

    const data = await response.json();
    return data.results.map((result: any) => ({
      title: result.title,
      snippet: result.snippet,
      link: result.url
    }));
  } catch (error) {
    console.error("Perplexica search error:", error);
    throw new Error("Failed to perform search");
  }
}

export async function getBringoDirectory(): Promise<any[]> {
  try {
    const response = await fetch(`${BRINGO_API_URL}/parser/directory`, {
      headers: {
        "Authorization": BRINGO_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error("Bringo directory service unavailable");
    }

    return await response.json();
  } catch (error) {
    console.error("Bringo directory error:", error);
    throw new Error("Failed to fetch directory");
  }
}

export async function getBringoCompany(companyNumber: string): Promise<CompanyInfo> {
  try {
    const response = await fetch(`${BRINGO_API_URL}/parser/company/${companyNumber}`, {
      headers: {
        "Authorization": BRINGO_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error("Bringo company service unavailable");
    }

    return await response.json();
  } catch (error) {
    console.error("Bringo company error:", error);
    throw new Error("Failed to fetch company info");
  }
}

export async function getAiResponse(
  message: string,
  context: {
    history: Message[];
    context: {
      searchResults: SearchResult[];
      companyInfo?: CompanyInfo;
      directoryData?: any[];
    }
  }
): Promise<{ response: string }> {
  try {
    const response = await fetch(`${AI_API_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that provides information about UK companies based on search results and company database information."
          },
          ...context.history.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          {
            role: "user",
            content: `
              Search results: ${JSON.stringify(context.context.searchResults)}
              Company info: ${JSON.stringify(context.context.companyInfo)}
              Directory data: ${JSON.stringify(context.context.directoryData)}
              
              User question: ${message}
            `
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error("AI service unavailable");
    }

    const data = await response.json();
    return {
      response: data.choices[0].message.content
    };
  } catch (error) {
    console.error("AI response error:", error);
    throw new Error("Failed to get AI response");
  }
}