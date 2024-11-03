import { MessageType, SearchResult, CompanyInfo } from "@/types";
import { searchPerplexica, getBringoDirectory, getBringoCompany, getAiResponse } from "./api";

export async function processUserMessage(
  message: string,
  history: MessageType[]
): Promise<{ content: string; sources?: SearchResult[]; companyInfo?: CompanyInfo }> {
  try {
    // Get search results from Perplexica
    const searchResults = await searchPerplexica(message);
    
    // Get directory data from Bringo
    let directoryData;
    try {
      directoryData = await getBringoDirectory();
    } catch (error) {
      console.warn("Failed to fetch directory:", error);
    }
    
    // Try to extract company number from message or search results
    let companyInfo;
    const companyNumberMatch = message.match(/\b\d{8}\b/); // Basic company number pattern
    if (companyNumberMatch) {
      try {
        companyInfo = await getBringoCompany(companyNumberMatch[0]);
      } catch (error) {
        console.warn("Failed to fetch company info:", error);
      }
    }
    
    // Get AI response with all available context
    const aiResponse = await getAiResponse(message, {
      history,
      context: {
        searchResults,
        companyInfo,
        directoryData
      }
    });
    
    return {
      content: aiResponse.response,
      sources: searchResults,
      companyInfo
    };
  } catch (error) {
    console.error("Error processing message:", error);
    throw error;
  }
}