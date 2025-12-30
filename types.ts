export interface FailureDiagnosis {
  primary_reasons: string[];
  root_cause_summary: string;
}

export interface AlternativePath {
  path_name: string;
  description: string;
  why_it_passes_feasibility: string;
  key_tradeoffs: string[];
}

export interface LikelyConsequences {
  short_term: string[];
  long_term: string[];
}

export interface OverengineeringRisk {
  risk_level: 'low' | 'medium' | 'high';
  warning_signs: string[];
  simplification_advice: string;
}

export interface RealityCheckResponse {
  reality_score: number;
  reality_tag: string;
  stop_signal: string;
  failure_diagnosis: FailureDiagnosis;
  alternative_paths: AlternativePath[];
  common_mistakes: string[];
  likely_consequences: LikelyConsequences;
  overengineering_risk: OverengineeringRisk;
}

export interface UserContext {
  budget: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Expert';
  hoursPerDay: number;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  input: string;
  context: UserContext;
  data: RealityCheckResponse;
}

export interface AppState {
  status: 'idle' | 'analyzing' | 'complete' | 'error';
  data: RealityCheckResponse | null;
  error: string | null;
  input: string;
  context: UserContext;
  history: HistoryItem[];
  isHistoryOpen: boolean;
}