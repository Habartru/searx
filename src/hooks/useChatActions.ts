import { useState } from "react";
import { Message, SearchResult } from "@/types";
import { searchSearxng, queryDatabase, getAiResponse } from "@/lib/api";

export function useChatActions() {
  const [isSearching, setIsSearching] = useState(false);

  const sendMessage = async (
    message: string, 
    history: Message[]
  ): Promise<Message> => {
    setIsSearching(true);
    
    try {
      // First attempt to get search results
      let searchResults: SearchResult[] = [];
      try {
        searchResults = await searchSearxng(message);
      } catch (error) {
        console.warn("Search failed:", error);
        // Continue without search results
      }

      // Then try to get company data
      let companyData = null;
      try {
        companyData = await queryDatabase(message);
      } catch (error) {
        console.warn("Database query failed:", error);
        // Continue without company data
      }

      // Get AI response with available context
      const response = await getAiResponse(message, {
        history,
        context: {
          searchResults,
          companyData
        }
      });

      return {
        role: "assistant",
        content: response.response,
        sources: searchResults
      };
    } finally {
      setIsSearching(false);
    }
  };

  return {
    sendMessage,
    isSearching
  };
}