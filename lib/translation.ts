import { QuestionDifficulty } from "@/gql/graphql";

export const DIFFICULTY_TRANSLATION: Record<QuestionDifficulty, string> = {
  [QuestionDifficulty.Easy]: "簡單",
  [QuestionDifficulty.Medium]: "中等",
  [QuestionDifficulty.Hard]: "困難",
  [QuestionDifficulty.Unspecified]: "未指定",
};
