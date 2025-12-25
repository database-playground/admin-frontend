import { graphql } from "@/gql";

export const QUESTION_BY_ID_QUERY = graphql(`
  query QuestionById($id: ID!) {
    question(id: $id) {
      id
      category
      description
      difficulty
      referenceAnswer
      title
      database {
        id
        slug
      }
    }
  }
`);

export const DATABASE_LIST_QUERY = graphql(`
  query DatabaseList {
    databases {
      id
      description
      slug
    }
  }
`);

export const QUESTIONS_TABLE_QUERY = graphql(`
  query QuestionsTable(
    $after: Cursor
    $before: Cursor
    $difficulty: QuestionDifficulty
    $first: Int,
    $last: Int,
    $query: String
  ) {
    questions(
      after: $after,
      before: $before,
      first: $first,
      last: $last,
      where: {
        or: [
          { titleContains: $query },
          { categoryContains: $query },
          { descriptionContains: $query },
        ],
        difficulty: $difficulty,
      },
    ) {
      totalCount
      edges {
        node {
          id
          category
          description
          difficulty
          referenceAnswer
          title
          database {
            id
            slug
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`);
