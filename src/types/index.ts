export interface SearchResult {
  title: string;
  snippet: string;
  link: string;
}

export interface CompanyInfo {
  company_number: string;
  company_name: string;
  registered_address: string;
  company_status: string;
  incorporation_date: string;
  company_type: string;
  sic_codes: string[];
  [key: string]: any; // For additional fields from the API
}

export interface Message {
  role: "assistant" | "user";
  content: string;
  sources?: SearchResult[];
  companyInfo?: CompanyInfo;
}

export interface MessageType extends Message {
  timestamp?: number;
  error?: string;
}

export interface Source {
  title: string;
  url: string;
  snippet: string;
}

export interface ApiError extends Error {
  code?: string;
  status?: number;
  details?: string;
}