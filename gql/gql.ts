/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n    query EventById($id: ID!) {\n      event(id: $id) {\n        id\n        user {\n          id\n          name\n        }\n        type\n        payload\n        triggeredAt\n      }\n    }\n": typeof types.EventByIdDocument,
    "\n  query EventsTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n    $where: EventWhereInput\n  ) {\n    events(first: $first, after: $after, last: $last, before: $before, where: $where, orderBy: { field: TRIGGERED_AT, direction: DESC }) {\n      edges {\n        node {\n          id\n          user {\n            id\n            name\n          }\n          type\n          triggeredAt\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n": typeof types.EventsTableDocument,
    "\n  query PointHeader($id: ID!) {\n    pointGrant(id: $id) {\n      id\n      points\n      grantedAt\n    }\n  }\n": typeof types.PointHeaderDocument,
    "\n  query PointCards($id: ID!) {\n    pointGrant(id: $id) {\n      id\n      ...PointDetailsCard\n      ...PointUserCard\n    }\n  }\n": typeof types.PointCardsDocument,
    "\n  fragment PointDetailsCard on Point {\n    points\n    description\n    grantedAt\n  }\n": typeof types.PointDetailsCardFragmentDoc,
    "\n  fragment PointUserCard on Point {\n    user {\n      id\n      name\n    }\n  }\n": typeof types.PointUserCardFragmentDoc,
    "\n  query PointsTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n    $where: PointWhereInput\n  ) {\n    points(first: $first, after: $after, last: $last, before: $before, where: $where, orderBy: { field: GRANTED_AT, direction: DESC }) {\n      edges {\n        node {\n          id\n          user {\n            id\n            name\n          }\n          points\n          description\n          grantedAt\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n": typeof types.PointsTableDocument,
    "\n  query SubmissionHeader($id: ID!) {\n    submission(id: $id) {\n      id\n      status\n      submittedAt\n    }\n  }\n": typeof types.SubmissionHeaderDocument,
    "\n  fragment SubmissionResultCard on Submission {\n    queryResult {\n      columns\n      rows\n      matchAnswer\n    }\n    question {\n      id\n    }\n  }\n": typeof types.SubmissionResultCardFragmentDoc,
    "\n  query SubmissionCards($id: ID!) {\n    submission(id: $id) {\n      id\n      ...SubmissionDetailsCard\n      ...SubmissionUserCard\n      ...SubmissionResultCard\n    }\n  }\n": typeof types.SubmissionCardsDocument,
    "\n  fragment SubmissionDetailsCard on Submission {\n    submittedCode\n    error\n  }\n": typeof types.SubmissionDetailsCardFragmentDoc,
    "\n  fragment SubmissionUserCard on Submission {\n    user {\n      id\n      name\n    }\n  }\n": typeof types.SubmissionUserCardFragmentDoc,
    "\n  query SubmissionsTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n  ) {\n    submissions(first: $first, after: $after, last: $last, before: $before, orderBy: { field: SUBMITTED_AT, direction: DESC }) {\n      edges {\n        node {\n          id\n          submittedCode\n          status\n          user {\n            id\n            name\n          }\n          question {\n            id\n            title\n          }\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n": typeof types.SubmissionsTableDocument,
    "\n  query DatabaseCards($id: ID!) {\n    database(id: $id) {\n      id\n      ...DatabaseDescriptionCard\n      ...DatabaseRelationCard\n      ...DatabaseSchemaCard\n    }\n  }\n": typeof types.DatabaseCardsDocument,
    "\n  fragment DatabaseDescriptionCard on Database {\n    description\n  }\n": typeof types.DatabaseDescriptionCardFragmentDoc,
    "\n  query DatabaseHeader($id: ID!) {\n    database(id: $id) {\n      id\n      slug\n      description\n    }\n  }\n": typeof types.DatabaseHeaderDocument,
    "\n  fragment DatabaseRelationCard on Database {\n    relationFigure\n  }\n": typeof types.DatabaseRelationCardFragmentDoc,
    "\n  fragment DatabaseSchemaCard on Database {\n    schema\n  }\n": typeof types.DatabaseSchemaCardFragmentDoc,
    "\n  mutation CreateDatabase($input: CreateDatabaseInput!) {\n    createDatabase(input: $input) {\n      id\n    }\n  }\n": typeof types.CreateDatabaseDocument,
    "\n  mutation UpdateDatabase($id: ID!, $input: UpdateDatabaseInput!) {\n    updateDatabase(id: $id, input: $input) {\n      id\n    }\n  }\n": typeof types.UpdateDatabaseDocument,
    "\n  mutation DeleteDatabase($id: ID!) {\n    deleteDatabase(id: $id)\n  }\n": typeof types.DeleteDatabaseDocument,
    "\n  query DatabaseById($id: ID!) {\n    database(id: $id) {\n      id\n      slug\n      description\n      schema\n      relationFigure\n    }\n  }\n": typeof types.DatabaseByIdDocument,
    "\n  query DatabasesTable {\n    databases {\n      id\n      slug\n      description\n      schema\n      relationFigure\n    }\n  }\n": typeof types.DatabasesTableDocument,
    "\n  fragment QuestionAnswerCard on Question {\n    id\n    referenceAnswer\n  }\n": typeof types.QuestionAnswerCardFragmentDoc,
    "\n  fragment QuestionDatabaseCard on Question {\n    database {\n      id\n      slug\n      description\n    }\n  }\n": typeof types.QuestionDatabaseCardFragmentDoc,
    "\n  fragment QuestionDescriptionCard on Question {\n    description\n  }\n": typeof types.QuestionDescriptionCardFragmentDoc,
    "\n  query QuestionHeader($id: ID!) {\n    question(id: $id) {\n      id\n      title\n      description\n      category\n      difficulty\n    }\n  }\n": typeof types.QuestionHeaderDocument,
    "\n  query QuestionCards($id: ID!) {\n    question(id: $id) {\n      id\n      ...QuestionDescriptionCard\n      ...QuestionDatabaseCard\n      ...QuestionAnswerCard\n    }\n  }\n": typeof types.QuestionCardsDocument,
    "\n  query QuestionReferenceAnswerResult($id: ID!) {\n    question(id: $id) {\n      id\n      referenceAnswerResult {\n        columns\n        rows\n      }\n    }\n  }\n": typeof types.QuestionReferenceAnswerResultDocument,
    "\n  query CreateQuestionDialogContent {\n    ...QuestionUpdateForm\n  }\n": typeof types.CreateQuestionDialogContentDocument,
    "\n  mutation CreateQuestion($input: CreateQuestionInput!) {\n    createQuestion(input: $input) {\n      id\n    }\n  }\n": typeof types.CreateQuestionDocument,
    "\n  mutation UpdateQuestion($id: ID!, $input: UpdateQuestionInput!) {\n    updateQuestion(id: $id, input: $input) {\n      id\n    }\n  }\n": typeof types.UpdateQuestionDocument,
    "\n  mutation DeleteQuestion($id: ID!) {\n    deleteQuestion(id: $id)\n  }\n": typeof types.DeleteQuestionDocument,
    "\n  query QuestionById($id: ID!) {\n    question(id: $id) {\n      id\n      title\n      description\n      category\n      difficulty\n      referenceAnswer\n      database {\n        id\n        slug\n      }\n    }\n  }\n": typeof types.QuestionByIdDocument,
    "\n  query DatabaseList {\n    databases {\n      id\n      slug\n      description\n    }\n  }\n": typeof types.DatabaseListDocument,
    "\n  query QuestionsTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor,\n    $query: String,\n    $difficulty: QuestionDifficulty\n  ) {\n    questions(\n      first: $first,\n      after: $after,\n      last: $last,\n      before: $before,\n      where: {\n        or: [\n          { titleContains: $query },\n          { categoryContains: $query },\n          { descriptionContains: $query },\n        ],\n        difficulty: $difficulty,\n      },\n    ) {\n      edges {\n        node {\n          id\n          title\n          description\n          category\n          difficulty\n          referenceAnswer\n          database {\n            id\n            slug\n          }\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n": typeof types.QuestionsTableDocument,
    "\n  fragment QuestionUpdateForm on Query {\n    databases {\n      id\n      slug\n    }\n\n    questionCategories\n  }\n": typeof types.QuestionUpdateFormFragmentDoc,
    "\n  query UpdateQuestionDialogContent {\n    ...QuestionUpdateForm\n  }\n": typeof types.UpdateQuestionDialogContentDocument,
    "\n  fragment GroupAuditInfoCard on Group {\n    createdAt\n    updatedAt\n  }\n": typeof types.GroupAuditInfoCardFragmentDoc,
    "\n  query GroupCards($id: ID!) {\n    group(id: $id) {\n      id\n      ...GroupAuditInfoCard\n      ...GroupScopeCard\n    }\n  }\n": typeof types.GroupCardsDocument,
    "\n  query GroupHeader($id: ID!) {\n    group(id: $id) {\n      id\n      name\n      description\n    }\n  }\n": typeof types.GroupHeaderDocument,
    "\n  query GroupMembers($id: ID!) {\n    users(where: { hasGroupWith: { id: $id } }) {\n      totalCount\n    }\n  }\n": typeof types.GroupMembersDocument,
    "\n  fragment GroupScopeCard on Group {\n    scopeSets {\n      id\n      slug\n      scopes\n    }\n  }\n": typeof types.GroupScopeCardFragmentDoc,
    "\n  mutation CreateGroup($input: CreateGroupInput!) {\n    createGroup(input: $input) {\n      id\n    }\n  }\n": typeof types.CreateGroupDocument,
    "\n  mutation UpdateGroup($id: ID!, $input: UpdateGroupInput!) {\n    updateGroup(id: $id, input: $input) {\n      id\n    }\n  }\n": typeof types.UpdateGroupDocument,
    "\n  mutation DeleteGroup($id: ID!) {\n    deleteGroup(id: $id)\n  }\n": typeof types.DeleteGroupDocument,
    "\n  query GroupsTable {\n    groups {\n      id\n      name\n      description\n      scopeSets {\n        id\n        slug\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GroupsTableDocument,
    "\n  query GroupById($id: ID!) {\n    group(id: $id) {\n      id\n      name\n      description\n      scopeSets {\n        id\n        slug\n      }\n    }\n  }\n": typeof types.GroupByIdDocument,
    "\n  query ScopeSetList {\n    scopeSets {\n      id\n      slug\n    }\n  }\n": typeof types.ScopeSetListDocument,
    "\n  query GroupsWithScopeSet {\n    groups {\n      id\n      name\n      scopeSets {\n        id\n      }\n    }\n  }\n": typeof types.GroupsWithScopeSetDocument,
    "\n  query ScopeSetHeader($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      slug\n      description\n    }\n  }\n": typeof types.ScopeSetHeaderDocument,
    "\n  fragment ScopeSetScopesCard on ScopeSet {\n    scopes\n  }\n": typeof types.ScopeSetScopesCardFragmentDoc,
    "\n  query ScopeSetCards($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      ...ScopeSetScopesCard\n    }\n  }\n": typeof types.ScopeSetCardsDocument,
    "\n  mutation CreateScopeSet($input: CreateScopeSetInput!) {\n    createScopeSet(input: $input) {\n      id\n    }\n  }\n": typeof types.CreateScopeSetDocument,
    "\n  mutation UpdateScopeSet($id: ID!, $input: UpdateScopeSetInput!) {\n    updateScopeSet(id: $id, input: $input) {\n      id\n    }\n  }\n": typeof types.UpdateScopeSetDocument,
    "\n  mutation DeleteScopeSet($id: ID!) {\n    deleteScopeSet(id: $id)\n  }\n": typeof types.DeleteScopeSetDocument,
    "\n  query ScopeSetTable {\n    scopeSets {\n      id\n      slug\n      description\n      scopes\n    }\n  }\n": typeof types.ScopeSetTableDocument,
    "\n  query ScopeSetById($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      slug\n      description\n      scopes\n    }\n  }\n": typeof types.ScopeSetByIdDocument,
    "\n  fragment UserAuditInfoCard on User {\n    createdAt\n    updatedAt\n  }\n": typeof types.UserAuditInfoCardFragmentDoc,
    "\n  fragment UserGroupsCard on User {\n    group {\n      id\n      name\n    }\n  }\n": typeof types.UserGroupsCardFragmentDoc,
    "\n  query UserHeader($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      email\n      avatar\n    }\n  }\n": typeof types.UserHeaderDocument,
    "\n  query UserCards($id: ID!) {\n    user(id: $id) {\n      id\n      ...UserGroupsCard\n      ...UserAuditInfoCard\n    }\n  }\n": typeof types.UserCardsDocument,
    "\n  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {\n    updateUser(id: $id, input: $input) {\n      id\n    }\n  }\n": typeof types.UpdateUserDocument,
    "\n  mutation DeleteUser($id: ID!) {\n    deleteUser(id: $id)\n  }\n": typeof types.DeleteUserDocument,
    "\n  mutation LogoutUserDevices($userID: ID!) {\n    logoutUser(userID: $userID)\n  }\n": typeof types.LogoutUserDevicesDocument,
    "\n  mutation ImpersonateUser($userID: ID!) {\n    impersonateUser(userID: $userID)\n  }\n": typeof types.ImpersonateUserDocument,
    "\n  query UserById($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      email\n      avatar\n      createdAt\n      updatedAt\n      group {\n        id\n        name\n      }\n    }\n  }\n": typeof types.UserByIdDocument,
    "\n  query GroupList {\n    groups {\n      id\n      name\n    }\n  }\n": typeof types.GroupListDocument,
    "\n  query UsersTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n    $where: UserWhereInput\n  ) {\n    users(first: $first, after: $after, last: $last, before: $before, where: $where) {\n      edges {\n        node {\n          id\n          name\n          email\n          avatar\n          createdAt\n          updatedAt\n          group {\n            id\n            name\n          }\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n": typeof types.UsersTableDocument,
    "\n  query LoginTotalCount($where: EventWhereInput!) {\n    events(where: $where) {\n      totalCount\n    }\n  }\n": typeof types.LoginTotalCountDocument,
    "\n  query OverviewRanking($filter: RankingFilter!, $first: Int!, $after: Cursor) {\n    ranking(filter: $filter, first: $first, after: $after) {\n      edges {\n        node {\n          id\n          name\n        }\n        ...ScoreCell\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": typeof types.OverviewRankingDocument,
    "\n  fragment ScoreCell on RankingEdge {\n    ...UserCompletedQuestions\n    ...UserTotalPoints\n    ...RankingFragment\n  }\n": typeof types.ScoreCellFragmentDoc,
    "\n  fragment UserCompletedQuestions on RankingEdge {\n    node {\n        submissionStatistics {\n          solvedQuestions\n        }\n    }\n  }\n": typeof types.UserCompletedQuestionsFragmentDoc,
    "\n  fragment UserTotalPoints on RankingEdge {\n    node {\n      totalPoints\n    }\n  }\n": typeof types.UserTotalPointsFragmentDoc,
    "\n  fragment RankingFragment on RankingEdge {\n    score\n  }\n": typeof types.RankingFragmentFragmentDoc,
    "\n  query SubmissionsTotalCount($where: SubmissionWhereInput!) {\n    submissions(where: $where) {\n      totalCount\n    }\n  }\n": typeof types.SubmissionsTotalCountDocument,
    "\n  mutation MeUpdateUserInfo($input: UpdateUserInput!) {\n    updateMe(input: $input) {\n      id\n    }\n  }\n": typeof types.MeUpdateUserInfoDocument,
    "\n  query MeUserInfo {\n    me {\n      id\n      name\n      avatar\n    }\n  }\n": typeof types.MeUserInfoDocument,
    "\n  query BasicUserInfo {\n    me {\n      id\n      name\n      email\n      avatar\n\n      group {\n        name\n      }\n    }\n  }\n": typeof types.BasicUserInfoDocument,
};
const documents: Documents = {
    "\n    query EventById($id: ID!) {\n      event(id: $id) {\n        id\n        user {\n          id\n          name\n        }\n        type\n        payload\n        triggeredAt\n      }\n    }\n": types.EventByIdDocument,
    "\n  query EventsTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n    $where: EventWhereInput\n  ) {\n    events(first: $first, after: $after, last: $last, before: $before, where: $where, orderBy: { field: TRIGGERED_AT, direction: DESC }) {\n      edges {\n        node {\n          id\n          user {\n            id\n            name\n          }\n          type\n          triggeredAt\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n": types.EventsTableDocument,
    "\n  query PointHeader($id: ID!) {\n    pointGrant(id: $id) {\n      id\n      points\n      grantedAt\n    }\n  }\n": types.PointHeaderDocument,
    "\n  query PointCards($id: ID!) {\n    pointGrant(id: $id) {\n      id\n      ...PointDetailsCard\n      ...PointUserCard\n    }\n  }\n": types.PointCardsDocument,
    "\n  fragment PointDetailsCard on Point {\n    points\n    description\n    grantedAt\n  }\n": types.PointDetailsCardFragmentDoc,
    "\n  fragment PointUserCard on Point {\n    user {\n      id\n      name\n    }\n  }\n": types.PointUserCardFragmentDoc,
    "\n  query PointsTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n    $where: PointWhereInput\n  ) {\n    points(first: $first, after: $after, last: $last, before: $before, where: $where, orderBy: { field: GRANTED_AT, direction: DESC }) {\n      edges {\n        node {\n          id\n          user {\n            id\n            name\n          }\n          points\n          description\n          grantedAt\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n": types.PointsTableDocument,
    "\n  query SubmissionHeader($id: ID!) {\n    submission(id: $id) {\n      id\n      status\n      submittedAt\n    }\n  }\n": types.SubmissionHeaderDocument,
    "\n  fragment SubmissionResultCard on Submission {\n    queryResult {\n      columns\n      rows\n      matchAnswer\n    }\n    question {\n      id\n    }\n  }\n": types.SubmissionResultCardFragmentDoc,
    "\n  query SubmissionCards($id: ID!) {\n    submission(id: $id) {\n      id\n      ...SubmissionDetailsCard\n      ...SubmissionUserCard\n      ...SubmissionResultCard\n    }\n  }\n": types.SubmissionCardsDocument,
    "\n  fragment SubmissionDetailsCard on Submission {\n    submittedCode\n    error\n  }\n": types.SubmissionDetailsCardFragmentDoc,
    "\n  fragment SubmissionUserCard on Submission {\n    user {\n      id\n      name\n    }\n  }\n": types.SubmissionUserCardFragmentDoc,
    "\n  query SubmissionsTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n  ) {\n    submissions(first: $first, after: $after, last: $last, before: $before, orderBy: { field: SUBMITTED_AT, direction: DESC }) {\n      edges {\n        node {\n          id\n          submittedCode\n          status\n          user {\n            id\n            name\n          }\n          question {\n            id\n            title\n          }\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n": types.SubmissionsTableDocument,
    "\n  query DatabaseCards($id: ID!) {\n    database(id: $id) {\n      id\n      ...DatabaseDescriptionCard\n      ...DatabaseRelationCard\n      ...DatabaseSchemaCard\n    }\n  }\n": types.DatabaseCardsDocument,
    "\n  fragment DatabaseDescriptionCard on Database {\n    description\n  }\n": types.DatabaseDescriptionCardFragmentDoc,
    "\n  query DatabaseHeader($id: ID!) {\n    database(id: $id) {\n      id\n      slug\n      description\n    }\n  }\n": types.DatabaseHeaderDocument,
    "\n  fragment DatabaseRelationCard on Database {\n    relationFigure\n  }\n": types.DatabaseRelationCardFragmentDoc,
    "\n  fragment DatabaseSchemaCard on Database {\n    schema\n  }\n": types.DatabaseSchemaCardFragmentDoc,
    "\n  mutation CreateDatabase($input: CreateDatabaseInput!) {\n    createDatabase(input: $input) {\n      id\n    }\n  }\n": types.CreateDatabaseDocument,
    "\n  mutation UpdateDatabase($id: ID!, $input: UpdateDatabaseInput!) {\n    updateDatabase(id: $id, input: $input) {\n      id\n    }\n  }\n": types.UpdateDatabaseDocument,
    "\n  mutation DeleteDatabase($id: ID!) {\n    deleteDatabase(id: $id)\n  }\n": types.DeleteDatabaseDocument,
    "\n  query DatabaseById($id: ID!) {\n    database(id: $id) {\n      id\n      slug\n      description\n      schema\n      relationFigure\n    }\n  }\n": types.DatabaseByIdDocument,
    "\n  query DatabasesTable {\n    databases {\n      id\n      slug\n      description\n      schema\n      relationFigure\n    }\n  }\n": types.DatabasesTableDocument,
    "\n  fragment QuestionAnswerCard on Question {\n    id\n    referenceAnswer\n  }\n": types.QuestionAnswerCardFragmentDoc,
    "\n  fragment QuestionDatabaseCard on Question {\n    database {\n      id\n      slug\n      description\n    }\n  }\n": types.QuestionDatabaseCardFragmentDoc,
    "\n  fragment QuestionDescriptionCard on Question {\n    description\n  }\n": types.QuestionDescriptionCardFragmentDoc,
    "\n  query QuestionHeader($id: ID!) {\n    question(id: $id) {\n      id\n      title\n      description\n      category\n      difficulty\n    }\n  }\n": types.QuestionHeaderDocument,
    "\n  query QuestionCards($id: ID!) {\n    question(id: $id) {\n      id\n      ...QuestionDescriptionCard\n      ...QuestionDatabaseCard\n      ...QuestionAnswerCard\n    }\n  }\n": types.QuestionCardsDocument,
    "\n  query QuestionReferenceAnswerResult($id: ID!) {\n    question(id: $id) {\n      id\n      referenceAnswerResult {\n        columns\n        rows\n      }\n    }\n  }\n": types.QuestionReferenceAnswerResultDocument,
    "\n  query CreateQuestionDialogContent {\n    ...QuestionUpdateForm\n  }\n": types.CreateQuestionDialogContentDocument,
    "\n  mutation CreateQuestion($input: CreateQuestionInput!) {\n    createQuestion(input: $input) {\n      id\n    }\n  }\n": types.CreateQuestionDocument,
    "\n  mutation UpdateQuestion($id: ID!, $input: UpdateQuestionInput!) {\n    updateQuestion(id: $id, input: $input) {\n      id\n    }\n  }\n": types.UpdateQuestionDocument,
    "\n  mutation DeleteQuestion($id: ID!) {\n    deleteQuestion(id: $id)\n  }\n": types.DeleteQuestionDocument,
    "\n  query QuestionById($id: ID!) {\n    question(id: $id) {\n      id\n      title\n      description\n      category\n      difficulty\n      referenceAnswer\n      database {\n        id\n        slug\n      }\n    }\n  }\n": types.QuestionByIdDocument,
    "\n  query DatabaseList {\n    databases {\n      id\n      slug\n      description\n    }\n  }\n": types.DatabaseListDocument,
    "\n  query QuestionsTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor,\n    $query: String,\n    $difficulty: QuestionDifficulty\n  ) {\n    questions(\n      first: $first,\n      after: $after,\n      last: $last,\n      before: $before,\n      where: {\n        or: [\n          { titleContains: $query },\n          { categoryContains: $query },\n          { descriptionContains: $query },\n        ],\n        difficulty: $difficulty,\n      },\n    ) {\n      edges {\n        node {\n          id\n          title\n          description\n          category\n          difficulty\n          referenceAnswer\n          database {\n            id\n            slug\n          }\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n": types.QuestionsTableDocument,
    "\n  fragment QuestionUpdateForm on Query {\n    databases {\n      id\n      slug\n    }\n\n    questionCategories\n  }\n": types.QuestionUpdateFormFragmentDoc,
    "\n  query UpdateQuestionDialogContent {\n    ...QuestionUpdateForm\n  }\n": types.UpdateQuestionDialogContentDocument,
    "\n  fragment GroupAuditInfoCard on Group {\n    createdAt\n    updatedAt\n  }\n": types.GroupAuditInfoCardFragmentDoc,
    "\n  query GroupCards($id: ID!) {\n    group(id: $id) {\n      id\n      ...GroupAuditInfoCard\n      ...GroupScopeCard\n    }\n  }\n": types.GroupCardsDocument,
    "\n  query GroupHeader($id: ID!) {\n    group(id: $id) {\n      id\n      name\n      description\n    }\n  }\n": types.GroupHeaderDocument,
    "\n  query GroupMembers($id: ID!) {\n    users(where: { hasGroupWith: { id: $id } }) {\n      totalCount\n    }\n  }\n": types.GroupMembersDocument,
    "\n  fragment GroupScopeCard on Group {\n    scopeSets {\n      id\n      slug\n      scopes\n    }\n  }\n": types.GroupScopeCardFragmentDoc,
    "\n  mutation CreateGroup($input: CreateGroupInput!) {\n    createGroup(input: $input) {\n      id\n    }\n  }\n": types.CreateGroupDocument,
    "\n  mutation UpdateGroup($id: ID!, $input: UpdateGroupInput!) {\n    updateGroup(id: $id, input: $input) {\n      id\n    }\n  }\n": types.UpdateGroupDocument,
    "\n  mutation DeleteGroup($id: ID!) {\n    deleteGroup(id: $id)\n  }\n": types.DeleteGroupDocument,
    "\n  query GroupsTable {\n    groups {\n      id\n      name\n      description\n      scopeSets {\n        id\n        slug\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.GroupsTableDocument,
    "\n  query GroupById($id: ID!) {\n    group(id: $id) {\n      id\n      name\n      description\n      scopeSets {\n        id\n        slug\n      }\n    }\n  }\n": types.GroupByIdDocument,
    "\n  query ScopeSetList {\n    scopeSets {\n      id\n      slug\n    }\n  }\n": types.ScopeSetListDocument,
    "\n  query GroupsWithScopeSet {\n    groups {\n      id\n      name\n      scopeSets {\n        id\n      }\n    }\n  }\n": types.GroupsWithScopeSetDocument,
    "\n  query ScopeSetHeader($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      slug\n      description\n    }\n  }\n": types.ScopeSetHeaderDocument,
    "\n  fragment ScopeSetScopesCard on ScopeSet {\n    scopes\n  }\n": types.ScopeSetScopesCardFragmentDoc,
    "\n  query ScopeSetCards($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      ...ScopeSetScopesCard\n    }\n  }\n": types.ScopeSetCardsDocument,
    "\n  mutation CreateScopeSet($input: CreateScopeSetInput!) {\n    createScopeSet(input: $input) {\n      id\n    }\n  }\n": types.CreateScopeSetDocument,
    "\n  mutation UpdateScopeSet($id: ID!, $input: UpdateScopeSetInput!) {\n    updateScopeSet(id: $id, input: $input) {\n      id\n    }\n  }\n": types.UpdateScopeSetDocument,
    "\n  mutation DeleteScopeSet($id: ID!) {\n    deleteScopeSet(id: $id)\n  }\n": types.DeleteScopeSetDocument,
    "\n  query ScopeSetTable {\n    scopeSets {\n      id\n      slug\n      description\n      scopes\n    }\n  }\n": types.ScopeSetTableDocument,
    "\n  query ScopeSetById($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      slug\n      description\n      scopes\n    }\n  }\n": types.ScopeSetByIdDocument,
    "\n  fragment UserAuditInfoCard on User {\n    createdAt\n    updatedAt\n  }\n": types.UserAuditInfoCardFragmentDoc,
    "\n  fragment UserGroupsCard on User {\n    group {\n      id\n      name\n    }\n  }\n": types.UserGroupsCardFragmentDoc,
    "\n  query UserHeader($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      email\n      avatar\n    }\n  }\n": types.UserHeaderDocument,
    "\n  query UserCards($id: ID!) {\n    user(id: $id) {\n      id\n      ...UserGroupsCard\n      ...UserAuditInfoCard\n    }\n  }\n": types.UserCardsDocument,
    "\n  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {\n    updateUser(id: $id, input: $input) {\n      id\n    }\n  }\n": types.UpdateUserDocument,
    "\n  mutation DeleteUser($id: ID!) {\n    deleteUser(id: $id)\n  }\n": types.DeleteUserDocument,
    "\n  mutation LogoutUserDevices($userID: ID!) {\n    logoutUser(userID: $userID)\n  }\n": types.LogoutUserDevicesDocument,
    "\n  mutation ImpersonateUser($userID: ID!) {\n    impersonateUser(userID: $userID)\n  }\n": types.ImpersonateUserDocument,
    "\n  query UserById($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      email\n      avatar\n      createdAt\n      updatedAt\n      group {\n        id\n        name\n      }\n    }\n  }\n": types.UserByIdDocument,
    "\n  query GroupList {\n    groups {\n      id\n      name\n    }\n  }\n": types.GroupListDocument,
    "\n  query UsersTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n    $where: UserWhereInput\n  ) {\n    users(first: $first, after: $after, last: $last, before: $before, where: $where) {\n      edges {\n        node {\n          id\n          name\n          email\n          avatar\n          createdAt\n          updatedAt\n          group {\n            id\n            name\n          }\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n": types.UsersTableDocument,
    "\n  query LoginTotalCount($where: EventWhereInput!) {\n    events(where: $where) {\n      totalCount\n    }\n  }\n": types.LoginTotalCountDocument,
    "\n  query OverviewRanking($filter: RankingFilter!, $first: Int!, $after: Cursor) {\n    ranking(filter: $filter, first: $first, after: $after) {\n      edges {\n        node {\n          id\n          name\n        }\n        ...ScoreCell\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.OverviewRankingDocument,
    "\n  fragment ScoreCell on RankingEdge {\n    ...UserCompletedQuestions\n    ...UserTotalPoints\n    ...RankingFragment\n  }\n": types.ScoreCellFragmentDoc,
    "\n  fragment UserCompletedQuestions on RankingEdge {\n    node {\n        submissionStatistics {\n          solvedQuestions\n        }\n    }\n  }\n": types.UserCompletedQuestionsFragmentDoc,
    "\n  fragment UserTotalPoints on RankingEdge {\n    node {\n      totalPoints\n    }\n  }\n": types.UserTotalPointsFragmentDoc,
    "\n  fragment RankingFragment on RankingEdge {\n    score\n  }\n": types.RankingFragmentFragmentDoc,
    "\n  query SubmissionsTotalCount($where: SubmissionWhereInput!) {\n    submissions(where: $where) {\n      totalCount\n    }\n  }\n": types.SubmissionsTotalCountDocument,
    "\n  mutation MeUpdateUserInfo($input: UpdateUserInput!) {\n    updateMe(input: $input) {\n      id\n    }\n  }\n": types.MeUpdateUserInfoDocument,
    "\n  query MeUserInfo {\n    me {\n      id\n      name\n      avatar\n    }\n  }\n": types.MeUserInfoDocument,
    "\n  query BasicUserInfo {\n    me {\n      id\n      name\n      email\n      avatar\n\n      group {\n        name\n      }\n    }\n  }\n": types.BasicUserInfoDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query EventById($id: ID!) {\n      event(id: $id) {\n        id\n        user {\n          id\n          name\n        }\n        type\n        payload\n        triggeredAt\n      }\n    }\n"): (typeof documents)["\n    query EventById($id: ID!) {\n      event(id: $id) {\n        id\n        user {\n          id\n          name\n        }\n        type\n        payload\n        triggeredAt\n      }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query EventsTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n    $where: EventWhereInput\n  ) {\n    events(first: $first, after: $after, last: $last, before: $before, where: $where, orderBy: { field: TRIGGERED_AT, direction: DESC }) {\n      edges {\n        node {\n          id\n          user {\n            id\n            name\n          }\n          type\n          triggeredAt\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query EventsTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n    $where: EventWhereInput\n  ) {\n    events(first: $first, after: $after, last: $last, before: $before, where: $where, orderBy: { field: TRIGGERED_AT, direction: DESC }) {\n      edges {\n        node {\n          id\n          user {\n            id\n            name\n          }\n          type\n          triggeredAt\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PointHeader($id: ID!) {\n    pointGrant(id: $id) {\n      id\n      points\n      grantedAt\n    }\n  }\n"): (typeof documents)["\n  query PointHeader($id: ID!) {\n    pointGrant(id: $id) {\n      id\n      points\n      grantedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PointCards($id: ID!) {\n    pointGrant(id: $id) {\n      id\n      ...PointDetailsCard\n      ...PointUserCard\n    }\n  }\n"): (typeof documents)["\n  query PointCards($id: ID!) {\n    pointGrant(id: $id) {\n      id\n      ...PointDetailsCard\n      ...PointUserCard\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PointDetailsCard on Point {\n    points\n    description\n    grantedAt\n  }\n"): (typeof documents)["\n  fragment PointDetailsCard on Point {\n    points\n    description\n    grantedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PointUserCard on Point {\n    user {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment PointUserCard on Point {\n    user {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PointsTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n    $where: PointWhereInput\n  ) {\n    points(first: $first, after: $after, last: $last, before: $before, where: $where, orderBy: { field: GRANTED_AT, direction: DESC }) {\n      edges {\n        node {\n          id\n          user {\n            id\n            name\n          }\n          points\n          description\n          grantedAt\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query PointsTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n    $where: PointWhereInput\n  ) {\n    points(first: $first, after: $after, last: $last, before: $before, where: $where, orderBy: { field: GRANTED_AT, direction: DESC }) {\n      edges {\n        node {\n          id\n          user {\n            id\n            name\n          }\n          points\n          description\n          grantedAt\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SubmissionHeader($id: ID!) {\n    submission(id: $id) {\n      id\n      status\n      submittedAt\n    }\n  }\n"): (typeof documents)["\n  query SubmissionHeader($id: ID!) {\n    submission(id: $id) {\n      id\n      status\n      submittedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SubmissionResultCard on Submission {\n    queryResult {\n      columns\n      rows\n      matchAnswer\n    }\n    question {\n      id\n    }\n  }\n"): (typeof documents)["\n  fragment SubmissionResultCard on Submission {\n    queryResult {\n      columns\n      rows\n      matchAnswer\n    }\n    question {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SubmissionCards($id: ID!) {\n    submission(id: $id) {\n      id\n      ...SubmissionDetailsCard\n      ...SubmissionUserCard\n      ...SubmissionResultCard\n    }\n  }\n"): (typeof documents)["\n  query SubmissionCards($id: ID!) {\n    submission(id: $id) {\n      id\n      ...SubmissionDetailsCard\n      ...SubmissionUserCard\n      ...SubmissionResultCard\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SubmissionDetailsCard on Submission {\n    submittedCode\n    error\n  }\n"): (typeof documents)["\n  fragment SubmissionDetailsCard on Submission {\n    submittedCode\n    error\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SubmissionUserCard on Submission {\n    user {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment SubmissionUserCard on Submission {\n    user {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SubmissionsTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n  ) {\n    submissions(first: $first, after: $after, last: $last, before: $before, orderBy: { field: SUBMITTED_AT, direction: DESC }) {\n      edges {\n        node {\n          id\n          submittedCode\n          status\n          user {\n            id\n            name\n          }\n          question {\n            id\n            title\n          }\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query SubmissionsTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n  ) {\n    submissions(first: $first, after: $after, last: $last, before: $before, orderBy: { field: SUBMITTED_AT, direction: DESC }) {\n      edges {\n        node {\n          id\n          submittedCode\n          status\n          user {\n            id\n            name\n          }\n          question {\n            id\n            title\n          }\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DatabaseCards($id: ID!) {\n    database(id: $id) {\n      id\n      ...DatabaseDescriptionCard\n      ...DatabaseRelationCard\n      ...DatabaseSchemaCard\n    }\n  }\n"): (typeof documents)["\n  query DatabaseCards($id: ID!) {\n    database(id: $id) {\n      id\n      ...DatabaseDescriptionCard\n      ...DatabaseRelationCard\n      ...DatabaseSchemaCard\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment DatabaseDescriptionCard on Database {\n    description\n  }\n"): (typeof documents)["\n  fragment DatabaseDescriptionCard on Database {\n    description\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DatabaseHeader($id: ID!) {\n    database(id: $id) {\n      id\n      slug\n      description\n    }\n  }\n"): (typeof documents)["\n  query DatabaseHeader($id: ID!) {\n    database(id: $id) {\n      id\n      slug\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment DatabaseRelationCard on Database {\n    relationFigure\n  }\n"): (typeof documents)["\n  fragment DatabaseRelationCard on Database {\n    relationFigure\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment DatabaseSchemaCard on Database {\n    schema\n  }\n"): (typeof documents)["\n  fragment DatabaseSchemaCard on Database {\n    schema\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateDatabase($input: CreateDatabaseInput!) {\n    createDatabase(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateDatabase($input: CreateDatabaseInput!) {\n    createDatabase(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateDatabase($id: ID!, $input: UpdateDatabaseInput!) {\n    updateDatabase(id: $id, input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateDatabase($id: ID!, $input: UpdateDatabaseInput!) {\n    updateDatabase(id: $id, input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteDatabase($id: ID!) {\n    deleteDatabase(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteDatabase($id: ID!) {\n    deleteDatabase(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DatabaseById($id: ID!) {\n    database(id: $id) {\n      id\n      slug\n      description\n      schema\n      relationFigure\n    }\n  }\n"): (typeof documents)["\n  query DatabaseById($id: ID!) {\n    database(id: $id) {\n      id\n      slug\n      description\n      schema\n      relationFigure\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DatabasesTable {\n    databases {\n      id\n      slug\n      description\n      schema\n      relationFigure\n    }\n  }\n"): (typeof documents)["\n  query DatabasesTable {\n    databases {\n      id\n      slug\n      description\n      schema\n      relationFigure\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuestionAnswerCard on Question {\n    id\n    referenceAnswer\n  }\n"): (typeof documents)["\n  fragment QuestionAnswerCard on Question {\n    id\n    referenceAnswer\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuestionDatabaseCard on Question {\n    database {\n      id\n      slug\n      description\n    }\n  }\n"): (typeof documents)["\n  fragment QuestionDatabaseCard on Question {\n    database {\n      id\n      slug\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuestionDescriptionCard on Question {\n    description\n  }\n"): (typeof documents)["\n  fragment QuestionDescriptionCard on Question {\n    description\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query QuestionHeader($id: ID!) {\n    question(id: $id) {\n      id\n      title\n      description\n      category\n      difficulty\n    }\n  }\n"): (typeof documents)["\n  query QuestionHeader($id: ID!) {\n    question(id: $id) {\n      id\n      title\n      description\n      category\n      difficulty\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query QuestionCards($id: ID!) {\n    question(id: $id) {\n      id\n      ...QuestionDescriptionCard\n      ...QuestionDatabaseCard\n      ...QuestionAnswerCard\n    }\n  }\n"): (typeof documents)["\n  query QuestionCards($id: ID!) {\n    question(id: $id) {\n      id\n      ...QuestionDescriptionCard\n      ...QuestionDatabaseCard\n      ...QuestionAnswerCard\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query QuestionReferenceAnswerResult($id: ID!) {\n    question(id: $id) {\n      id\n      referenceAnswerResult {\n        columns\n        rows\n      }\n    }\n  }\n"): (typeof documents)["\n  query QuestionReferenceAnswerResult($id: ID!) {\n    question(id: $id) {\n      id\n      referenceAnswerResult {\n        columns\n        rows\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CreateQuestionDialogContent {\n    ...QuestionUpdateForm\n  }\n"): (typeof documents)["\n  query CreateQuestionDialogContent {\n    ...QuestionUpdateForm\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateQuestion($input: CreateQuestionInput!) {\n    createQuestion(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateQuestion($input: CreateQuestionInput!) {\n    createQuestion(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateQuestion($id: ID!, $input: UpdateQuestionInput!) {\n    updateQuestion(id: $id, input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateQuestion($id: ID!, $input: UpdateQuestionInput!) {\n    updateQuestion(id: $id, input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteQuestion($id: ID!) {\n    deleteQuestion(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteQuestion($id: ID!) {\n    deleteQuestion(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query QuestionById($id: ID!) {\n    question(id: $id) {\n      id\n      title\n      description\n      category\n      difficulty\n      referenceAnswer\n      database {\n        id\n        slug\n      }\n    }\n  }\n"): (typeof documents)["\n  query QuestionById($id: ID!) {\n    question(id: $id) {\n      id\n      title\n      description\n      category\n      difficulty\n      referenceAnswer\n      database {\n        id\n        slug\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DatabaseList {\n    databases {\n      id\n      slug\n      description\n    }\n  }\n"): (typeof documents)["\n  query DatabaseList {\n    databases {\n      id\n      slug\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query QuestionsTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor,\n    $query: String,\n    $difficulty: QuestionDifficulty\n  ) {\n    questions(\n      first: $first,\n      after: $after,\n      last: $last,\n      before: $before,\n      where: {\n        or: [\n          { titleContains: $query },\n          { categoryContains: $query },\n          { descriptionContains: $query },\n        ],\n        difficulty: $difficulty,\n      },\n    ) {\n      edges {\n        node {\n          id\n          title\n          description\n          category\n          difficulty\n          referenceAnswer\n          database {\n            id\n            slug\n          }\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query QuestionsTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor,\n    $query: String,\n    $difficulty: QuestionDifficulty\n  ) {\n    questions(\n      first: $first,\n      after: $after,\n      last: $last,\n      before: $before,\n      where: {\n        or: [\n          { titleContains: $query },\n          { categoryContains: $query },\n          { descriptionContains: $query },\n        ],\n        difficulty: $difficulty,\n      },\n    ) {\n      edges {\n        node {\n          id\n          title\n          description\n          category\n          difficulty\n          referenceAnswer\n          database {\n            id\n            slug\n          }\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuestionUpdateForm on Query {\n    databases {\n      id\n      slug\n    }\n\n    questionCategories\n  }\n"): (typeof documents)["\n  fragment QuestionUpdateForm on Query {\n    databases {\n      id\n      slug\n    }\n\n    questionCategories\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UpdateQuestionDialogContent {\n    ...QuestionUpdateForm\n  }\n"): (typeof documents)["\n  query UpdateQuestionDialogContent {\n    ...QuestionUpdateForm\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment GroupAuditInfoCard on Group {\n    createdAt\n    updatedAt\n  }\n"): (typeof documents)["\n  fragment GroupAuditInfoCard on Group {\n    createdAt\n    updatedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GroupCards($id: ID!) {\n    group(id: $id) {\n      id\n      ...GroupAuditInfoCard\n      ...GroupScopeCard\n    }\n  }\n"): (typeof documents)["\n  query GroupCards($id: ID!) {\n    group(id: $id) {\n      id\n      ...GroupAuditInfoCard\n      ...GroupScopeCard\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GroupHeader($id: ID!) {\n    group(id: $id) {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  query GroupHeader($id: ID!) {\n    group(id: $id) {\n      id\n      name\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GroupMembers($id: ID!) {\n    users(where: { hasGroupWith: { id: $id } }) {\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query GroupMembers($id: ID!) {\n    users(where: { hasGroupWith: { id: $id } }) {\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment GroupScopeCard on Group {\n    scopeSets {\n      id\n      slug\n      scopes\n    }\n  }\n"): (typeof documents)["\n  fragment GroupScopeCard on Group {\n    scopeSets {\n      id\n      slug\n      scopes\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateGroup($input: CreateGroupInput!) {\n    createGroup(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateGroup($input: CreateGroupInput!) {\n    createGroup(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateGroup($id: ID!, $input: UpdateGroupInput!) {\n    updateGroup(id: $id, input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateGroup($id: ID!, $input: UpdateGroupInput!) {\n    updateGroup(id: $id, input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteGroup($id: ID!) {\n    deleteGroup(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteGroup($id: ID!) {\n    deleteGroup(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GroupsTable {\n    groups {\n      id\n      name\n      description\n      scopeSets {\n        id\n        slug\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GroupsTable {\n    groups {\n      id\n      name\n      description\n      scopeSets {\n        id\n        slug\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GroupById($id: ID!) {\n    group(id: $id) {\n      id\n      name\n      description\n      scopeSets {\n        id\n        slug\n      }\n    }\n  }\n"): (typeof documents)["\n  query GroupById($id: ID!) {\n    group(id: $id) {\n      id\n      name\n      description\n      scopeSets {\n        id\n        slug\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ScopeSetList {\n    scopeSets {\n      id\n      slug\n    }\n  }\n"): (typeof documents)["\n  query ScopeSetList {\n    scopeSets {\n      id\n      slug\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GroupsWithScopeSet {\n    groups {\n      id\n      name\n      scopeSets {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query GroupsWithScopeSet {\n    groups {\n      id\n      name\n      scopeSets {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ScopeSetHeader($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      slug\n      description\n    }\n  }\n"): (typeof documents)["\n  query ScopeSetHeader($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      slug\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ScopeSetScopesCard on ScopeSet {\n    scopes\n  }\n"): (typeof documents)["\n  fragment ScopeSetScopesCard on ScopeSet {\n    scopes\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ScopeSetCards($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      ...ScopeSetScopesCard\n    }\n  }\n"): (typeof documents)["\n  query ScopeSetCards($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      ...ScopeSetScopesCard\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateScopeSet($input: CreateScopeSetInput!) {\n    createScopeSet(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateScopeSet($input: CreateScopeSetInput!) {\n    createScopeSet(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateScopeSet($id: ID!, $input: UpdateScopeSetInput!) {\n    updateScopeSet(id: $id, input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateScopeSet($id: ID!, $input: UpdateScopeSetInput!) {\n    updateScopeSet(id: $id, input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteScopeSet($id: ID!) {\n    deleteScopeSet(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteScopeSet($id: ID!) {\n    deleteScopeSet(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ScopeSetTable {\n    scopeSets {\n      id\n      slug\n      description\n      scopes\n    }\n  }\n"): (typeof documents)["\n  query ScopeSetTable {\n    scopeSets {\n      id\n      slug\n      description\n      scopes\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ScopeSetById($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      slug\n      description\n      scopes\n    }\n  }\n"): (typeof documents)["\n  query ScopeSetById($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      slug\n      description\n      scopes\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserAuditInfoCard on User {\n    createdAt\n    updatedAt\n  }\n"): (typeof documents)["\n  fragment UserAuditInfoCard on User {\n    createdAt\n    updatedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserGroupsCard on User {\n    group {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment UserGroupsCard on User {\n    group {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserHeader($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      email\n      avatar\n    }\n  }\n"): (typeof documents)["\n  query UserHeader($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      email\n      avatar\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserCards($id: ID!) {\n    user(id: $id) {\n      id\n      ...UserGroupsCard\n      ...UserAuditInfoCard\n    }\n  }\n"): (typeof documents)["\n  query UserCards($id: ID!) {\n    user(id: $id) {\n      id\n      ...UserGroupsCard\n      ...UserAuditInfoCard\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {\n    updateUser(id: $id, input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {\n    updateUser(id: $id, input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteUser($id: ID!) {\n    deleteUser(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteUser($id: ID!) {\n    deleteUser(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LogoutUserDevices($userID: ID!) {\n    logoutUser(userID: $userID)\n  }\n"): (typeof documents)["\n  mutation LogoutUserDevices($userID: ID!) {\n    logoutUser(userID: $userID)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ImpersonateUser($userID: ID!) {\n    impersonateUser(userID: $userID)\n  }\n"): (typeof documents)["\n  mutation ImpersonateUser($userID: ID!) {\n    impersonateUser(userID: $userID)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserById($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      email\n      avatar\n      createdAt\n      updatedAt\n      group {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query UserById($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      email\n      avatar\n      createdAt\n      updatedAt\n      group {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GroupList {\n    groups {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GroupList {\n    groups {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UsersTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n    $where: UserWhereInput\n  ) {\n    users(first: $first, after: $after, last: $last, before: $before, where: $where) {\n      edges {\n        node {\n          id\n          name\n          email\n          avatar\n          createdAt\n          updatedAt\n          group {\n            id\n            name\n          }\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query UsersTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n    $where: UserWhereInput\n  ) {\n    users(first: $first, after: $after, last: $last, before: $before, where: $where) {\n      edges {\n        node {\n          id\n          name\n          email\n          avatar\n          createdAt\n          updatedAt\n          group {\n            id\n            name\n          }\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query LoginTotalCount($where: EventWhereInput!) {\n    events(where: $where) {\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query LoginTotalCount($where: EventWhereInput!) {\n    events(where: $where) {\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query OverviewRanking($filter: RankingFilter!, $first: Int!, $after: Cursor) {\n    ranking(filter: $filter, first: $first, after: $after) {\n      edges {\n        node {\n          id\n          name\n        }\n        ...ScoreCell\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query OverviewRanking($filter: RankingFilter!, $first: Int!, $after: Cursor) {\n    ranking(filter: $filter, first: $first, after: $after) {\n      edges {\n        node {\n          id\n          name\n        }\n        ...ScoreCell\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ScoreCell on RankingEdge {\n    ...UserCompletedQuestions\n    ...UserTotalPoints\n    ...RankingFragment\n  }\n"): (typeof documents)["\n  fragment ScoreCell on RankingEdge {\n    ...UserCompletedQuestions\n    ...UserTotalPoints\n    ...RankingFragment\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserCompletedQuestions on RankingEdge {\n    node {\n        submissionStatistics {\n          solvedQuestions\n        }\n    }\n  }\n"): (typeof documents)["\n  fragment UserCompletedQuestions on RankingEdge {\n    node {\n        submissionStatistics {\n          solvedQuestions\n        }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserTotalPoints on RankingEdge {\n    node {\n      totalPoints\n    }\n  }\n"): (typeof documents)["\n  fragment UserTotalPoints on RankingEdge {\n    node {\n      totalPoints\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RankingFragment on RankingEdge {\n    score\n  }\n"): (typeof documents)["\n  fragment RankingFragment on RankingEdge {\n    score\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SubmissionsTotalCount($where: SubmissionWhereInput!) {\n    submissions(where: $where) {\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query SubmissionsTotalCount($where: SubmissionWhereInput!) {\n    submissions(where: $where) {\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation MeUpdateUserInfo($input: UpdateUserInput!) {\n    updateMe(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation MeUpdateUserInfo($input: UpdateUserInput!) {\n    updateMe(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MeUserInfo {\n    me {\n      id\n      name\n      avatar\n    }\n  }\n"): (typeof documents)["\n  query MeUserInfo {\n    me {\n      id\n      name\n      avatar\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query BasicUserInfo {\n    me {\n      id\n      name\n      email\n      avatar\n\n      group {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query BasicUserInfo {\n    me {\n      id\n      name\n      email\n      avatar\n\n      group {\n        name\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;