"use client";

import { CardLayout } from "@/components/card-layout";
import { type FragmentType, graphql, useFragment } from "@/gql";
import { DIFFICULTY_TRANSLATION } from "@/lib/translation";
import { BookOpen, CheckCircle2, FileQuestion } from "lucide-react";

const USER_QUESTIONS_CARD_FRAGMENT = graphql(`
  fragment UserQuestionsCard on User {
    id
    submissionStatistics {
      attemptedQuestions
      solvedQuestions
      totalQuestions

      solvedQuestionByDifficulty {
        difficulty
        solvedQuestions
      }
    }
  }
`);

export function QuestionsCard({ fragment }: { fragment: FragmentType<typeof USER_QUESTIONS_CARD_FRAGMENT> }) {
  const { submissionStatistics } = useFragment(USER_QUESTIONS_CARD_FRAGMENT, fragment);

  if (!submissionStatistics) {
    return (
      <CardLayout title="做題統計" description="這個使用者的做題統計資訊。">
        <p className="text-sm text-muted-foreground">暫無資料</p>
      </CardLayout>
    );
  }

  const { totalQuestions, solvedQuestions, attemptedQuestions, solvedQuestionByDifficulty } = submissionStatistics;

  return (
    <CardLayout title="做題統計" description="這個使用者的做題統計資訊。">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <div
              className={`flex items-center gap-2 text-sm text-muted-foreground`}
            >
              <FileQuestion className="h-4 w-4" />
              <span>總題數</span>
            </div>
            <p className="text-2xl font-bold">{totalQuestions}</p>
          </div>
          <div className="flex flex-col gap-1">
            <div
              className={`flex items-center gap-2 text-sm text-muted-foreground`}
            >
              <BookOpen className="h-4 w-4" />
              <span>嘗試題數</span>
            </div>
            <p className="text-2xl font-bold">{attemptedQuestions}</p>
          </div>
          <div className="flex flex-col gap-1">
            <div
              className={`flex items-center gap-2 text-sm text-muted-foreground`}
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>完成題數</span>
            </div>
            <p className="text-2xl font-bold">{solvedQuestions}</p>
          </div>
        </div>

        {solvedQuestionByDifficulty && solvedQuestionByDifficulty.length > 0 && (
          <div className="border-t pt-4">
            <p className="mb-2 text-sm font-medium">各難度完成題數</p>
            <div className="space-y-2">
              {solvedQuestionByDifficulty.map(({ difficulty, solvedQuestions }) => (
                <div
                  key={difficulty}
                  className={`flex items-center justify-between`}
                >
                  <span className="text-sm">{DIFFICULTY_TRANSLATION[difficulty]}</span>
                  <span className="font-medium">{solvedQuestions}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </CardLayout>
  );
}
