import { graphql } from "@/gql";

export const QUESTION_BY_ID_QUERY = graphql(`
  query QuestionById($id: ID!) {
    question(id: $id) {
      id
      title
      description
      category
      difficulty
      referenceAnswer
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
      slug
      description
    }
  }
`);

export const QUESTIONS_TABLE_QUERY = graphql(`
  query QuestionsTable(
    $first: Int
    $after: Cursor
    $last: Int
    $before: Cursor,
    $query: String,
    $difficulty: QuestionDifficulty
  ) {
    questions(
      first: $first,
      after: $after,
      last: $last,
      before: $before,
      where: {
        or: [
          { titleContains: $query },
          { categoryContains: $query },
          { descriptionContains: $query },
        ],
        difficulty: $difficulty,
      },
    ) {
      edges {
        node {
          id
          title
          description
          category
          difficulty
          referenceAnswer
          database {
            id
            slug
          }
        }
      }
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
    }
  }
`);
