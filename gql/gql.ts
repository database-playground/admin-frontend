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
    "\n    query EventById($id: ID!) {\n      event(id: $id) {\n        id\n        payload\n        triggeredAt\n        type\n        user {\n          id\n          name\n        }\n      }\n    }\n": typeof types.EventByIdDocument,
    "\n  query EventsTable(\n    $after: Cursor\n    $before: Cursor\n    $first: Int\n    $last: Int\n    $where: EventWhereInput\n  ) {\n    events(after: $after, before: $before, first: $first, last: $last, orderBy: { field: TRIGGERED_AT, direction: DESC }, where: $where) {\n      totalCount\n      edges {\n        node {\n          id\n          triggeredAt\n          type\n          user {\n            id\n            name\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n": typeof types.EventsTableDocument,
    "\n  query PointHeader($id: ID!) {\n    pointGrant(id: $id) {\n      id\n      grantedAt\n      points\n    }\n  }\n": typeof types.PointHeaderDocument,
    "\n  query PointCards($id: ID!) {\n    pointGrant(id: $id) {\n      ...PointDetailsCard\n      ...PointUserCard\n      id\n    }\n  }\n": typeof types.PointCardsDocument,
    "\n  fragment PointDetailsCard on Point {\n    id\n    description\n    grantedAt\n    points\n  }\n": typeof types.PointDetailsCardFragmentDoc,
    "\n  fragment PointUserCard on Point {\n    id\n    user {\n      id\n      name\n    }\n  }\n": typeof types.PointUserCardFragmentDoc,
    "\n  mutation CreatePoint($input: CreatePointInput!) {\n    createPoint(input: $input) {\n      id\n    }\n  }\n": typeof types.CreatePointDocument,
    "\n  query PointsTable(\n    $after: Cursor\n    $before: Cursor\n    $first: Int\n    $last: Int\n    $where: PointWhereInput\n  ) {\n    points(\n      after: $after\n      before: $before\n      first: $first\n      last: $last\n      orderBy: { field: GRANTED_AT, direction: DESC }\n      where: $where\n    ) {\n      totalCount\n      edges {\n        node {\n          ...PointsTableRow\n          id\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": typeof types.PointsTableDocument,
    "\n  fragment PointsTableRow on Point {\n    id\n    description\n    grantedAt\n    points\n    user {\n      id\n      name\n    }\n  }\n": typeof types.PointsTableRowFragmentDoc,
    "\n  query UpdatePointsFormUserInfo($id: ID!) {\n    user(id: $id) {\n      id\n      email\n      name\n    }\n  }\n": typeof types.UpdatePointsFormUserInfoDocument,
    "\n  query SubmissionHeader($id: ID!) {\n    submission(id: $id) {\n      id\n      status\n      submittedAt\n    }\n  }\n": typeof types.SubmissionHeaderDocument,
    "\n  fragment SubmissionResultCard on Submission {\n    id\n    queryResult {\n      columns\n      matchAnswer\n      rows\n    }\n    question {\n      id\n    }\n  }\n": typeof types.SubmissionResultCardFragmentDoc,
    "\n  query SubmissionCards($id: ID!) {\n    submission(id: $id) {\n      ...SubmissionDetailsCard\n      ...SubmissionResultCard\n      ...SubmissionUserCard\n      id\n    }\n  }\n": typeof types.SubmissionCardsDocument,
    "\n  fragment SubmissionDetailsCard on Submission {\n    id\n    error\n    submittedCode\n  }\n": typeof types.SubmissionDetailsCardFragmentDoc,
    "\n  fragment SubmissionUserCard on Submission {\n    id\n    user {\n      id\n      name\n    }\n  }\n": typeof types.SubmissionUserCardFragmentDoc,
    "\n  query SubmissionsTable(\n    $after: Cursor\n    $before: Cursor\n    $first: Int\n    $last: Int\n    $where: SubmissionWhereInput\n  ) {\n    submissions(after: $after, before: $before, first: $first, last: $last, orderBy: { field: SUBMITTED_AT, direction: DESC }, where: $where) {\n      totalCount\n      edges {\n        node {\n          id\n          status\n          submittedCode\n          question {\n            id\n            title\n          }\n          user {\n            id\n            email\n            name\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n": typeof types.SubmissionsTableDocument,
    "\n  query DatabaseCards($id: ID!) {\n    database(id: $id) {\n      ...DatabaseDescriptionCard\n      ...DatabaseRelationCard\n      ...DatabaseSchemaCard\n      id\n    }\n  }\n": typeof types.DatabaseCardsDocument,
    "\n  fragment DatabaseDescriptionCard on Database {\n    id\n    description\n  }\n": typeof types.DatabaseDescriptionCardFragmentDoc,
    "\n  query DatabaseHeader($id: ID!) {\n    database(id: $id) {\n      id\n      description\n      slug\n    }\n  }\n": typeof types.DatabaseHeaderDocument,
    "\n  fragment DatabaseRelationCard on Database {\n    id\n    relationFigure\n  }\n": typeof types.DatabaseRelationCardFragmentDoc,
    "\n  fragment DatabaseSchemaCard on Database {\n    id\n    schema\n  }\n": typeof types.DatabaseSchemaCardFragmentDoc,
    "\n  mutation CreateDatabase($input: CreateDatabaseInput!) {\n    createDatabase(input: $input) {\n      id\n    }\n  }\n": typeof types.CreateDatabaseDocument,
    "\n  mutation UpdateDatabase($id: ID!, $input: UpdateDatabaseInput!) {\n    updateDatabase(id: $id, input: $input) {\n      id\n    }\n  }\n": typeof types.UpdateDatabaseDocument,
    "\n  mutation DeleteDatabase($id: ID!) {\n    deleteDatabase(id: $id)\n  }\n": typeof types.DeleteDatabaseDocument,
    "\n  query DatabaseById($id: ID!) {\n    database(id: $id) {\n      id\n      description\n      relationFigure\n      schema\n      slug\n    }\n  }\n": typeof types.DatabaseByIdDocument,
    "\n  query DatabasesTable {\n    databases {\n      id\n      description\n      relationFigure\n      schema\n      slug\n    }\n  }\n": typeof types.DatabasesTableDocument,
    "\n  fragment QuestionAnswerCard on Question {\n    id\n    referenceAnswer\n  }\n": typeof types.QuestionAnswerCardFragmentDoc,
    "\n  fragment QuestionDatabaseCard on Question {\n    id\n    database {\n      id\n      description\n      slug\n    }\n  }\n": typeof types.QuestionDatabaseCardFragmentDoc,
    "\n  fragment QuestionDescriptionCard on Question {\n    id\n    description\n  }\n": typeof types.QuestionDescriptionCardFragmentDoc,
    "\n  query QuestionHeader($id: ID!) {\n    question(id: $id) {\n      id\n      category\n      description\n      difficulty\n      title\n    }\n  }\n": typeof types.QuestionHeaderDocument,
    "\n  fragment QuestionPassRateCard on Question {\n    id\n    statistics {\n      attemptedUsers\n      correctSubmissionCount\n      passedUsers\n      submissionCount\n    }\n  }\n": typeof types.QuestionPassRateCardFragmentDoc,
    "\n  query QuestionCards($id: ID!) {\n    question(id: $id) {\n      ...QuestionAnswerCard\n      ...QuestionDatabaseCard\n      ...QuestionDescriptionCard\n      ...QuestionPassRateCard\n      id\n    }\n  }\n": typeof types.QuestionCardsDocument,
    "\n  query QuestionReferenceAnswerResult($id: ID!) {\n    question(id: $id) {\n      id\n      referenceAnswerResult {\n        columns\n        rows\n      }\n    }\n  }\n": typeof types.QuestionReferenceAnswerResultDocument,
    "\n  query CreateQuestionDialogContent {\n    ...QuestionUpdateForm\n  }\n": typeof types.CreateQuestionDialogContentDocument,
    "\n  mutation CreateQuestion($input: CreateQuestionInput!) {\n    createQuestion(input: $input) {\n      id\n    }\n  }\n": typeof types.CreateQuestionDocument,
    "\n  mutation UpdateQuestion($id: ID!, $input: UpdateQuestionInput!) {\n    updateQuestion(id: $id, input: $input) {\n      id\n    }\n  }\n": typeof types.UpdateQuestionDocument,
    "\n  mutation DeleteQuestion($id: ID!) {\n    deleteQuestion(id: $id)\n  }\n": typeof types.DeleteQuestionDocument,
    "\n  query QuestionById($id: ID!) {\n    question(id: $id) {\n      id\n      category\n      description\n      difficulty\n      referenceAnswer\n      title\n      database {\n        id\n        slug\n      }\n    }\n  }\n": typeof types.QuestionByIdDocument,
    "\n  query DatabaseList {\n    databases {\n      id\n      description\n      slug\n    }\n  }\n": typeof types.DatabaseListDocument,
    "\n  query QuestionsTable(\n    $after: Cursor\n    $before: Cursor\n    $difficulty: QuestionDifficulty\n    $first: Int,\n    $last: Int,\n    $query: String\n  ) {\n    questions(\n      after: $after,\n      before: $before,\n      first: $first,\n      last: $last,\n      where: {\n        or: [\n          { titleContains: $query },\n          { categoryContains: $query },\n          { descriptionContains: $query },\n        ],\n        difficulty: $difficulty,\n      },\n    ) {\n      totalCount\n      edges {\n        node {\n          id\n          category\n          description\n          difficulty\n          referenceAnswer\n          title\n          database {\n            id\n            slug\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n": typeof types.QuestionsTableDocument,
    "\n  fragment QuestionUpdateForm on Query {\n    questionCategories\n\n    databases {\n      id\n      slug\n    }\n  }\n": typeof types.QuestionUpdateFormFragmentDoc,
    "\n  query UpdateQuestionDialogContent {\n    ...QuestionUpdateForm\n  }\n": typeof types.UpdateQuestionDialogContentDocument,
    "\n  query CheatRecordDetails($id: ID!) {\n    cheatRecord(id: $id) {\n      ...CheatRecordDetailsCard\n      id\n    }\n  }\n": typeof types.CheatRecordDetailsDocument,
    "\n  fragment CheatRecordDetailsCard on CheatRecord {\n    id\n    reason\n    cheatedAt\n    resolvedAt\n    resolvedReason\n    user {\n      id\n      name\n      email\n      avatar\n    }\n  }\n": typeof types.CheatRecordDetailsCardFragmentDoc,
    "\n  query CheatRecordHeader($id: ID!) {\n    cheatRecord(id: $id) {\n      id\n      reason\n      user {\n        id\n        name\n        email\n        avatar\n      }\n    }\n  }\n": typeof types.CheatRecordHeaderDocument,
    "\n  query CheatRecordResolveButton($id: ID!) {\n    cheatRecord(id: $id) {\n      ...CheatRecordResolveButtonFragment\n      id\n    }\n  }\n": typeof types.CheatRecordResolveButtonDocument,
    "\n  fragment CheatRecordResolveButtonFragment on CheatRecord {\n    id\n    resolvedAt\n  }\n": typeof types.CheatRecordResolveButtonFragmentFragmentDoc,
    "\n  query CreateCheatRecordFormUserInfo($id: ID!) {\n    user(id: $id) {\n      id\n      email\n      name\n    }\n  }\n": typeof types.CreateCheatRecordFormUserInfoDocument,
    "\n  mutation CreateCheatRecord($reason: String!, $userID: ID) {\n    createCheatRecord(reason: $reason, userID: $userID) {\n      id\n      reason\n      cheatedAt\n      user {\n        id\n        name\n        email\n      }\n    }\n  }\n": typeof types.CreateCheatRecordDocument,
    "\n  mutation ResolveCheatRecord($cheatRecordID: ID!, $reason: String!) {\n    resolveCheatRecord(cheatRecordID: $cheatRecordID, reason: $reason)\n  }\n": typeof types.ResolveCheatRecordDocument,
    "\n  query CheatRecordById($id: ID!) {\n    cheatRecord(id: $id) {\n      id\n      reason\n      cheatedAt\n      resolvedAt\n      resolvedReason\n      user {\n        id\n        name\n        email\n        avatar\n      }\n    }\n  }\n": typeof types.CheatRecordByIdDocument,
    "\n  query CheatRecordsTable(\n    $after: Cursor\n    $before: Cursor\n    $first: Int\n    $last: Int\n    $where: CheatRecordWhereInput\n  ) {\n    cheatRecords(\n      after: $after\n      before: $before\n      first: $first\n      last: $last\n      where: $where\n    ) {\n      totalCount\n      edges {\n        node {\n          id\n          reason\n          cheatedAt\n          resolvedAt\n          resolvedReason\n          user {\n            id\n            name\n            email\n            avatar\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n": typeof types.CheatRecordsTableDocument,
    "\n  fragment GroupAuditInfoCard on Group {\n    id\n    createdAt\n    updatedAt\n  }\n": typeof types.GroupAuditInfoCardFragmentDoc,
    "\n  query GroupCards($id: ID!) {\n    group(id: $id) {\n      ...GroupAuditInfoCard\n      ...GroupScopeCard\n      id\n    }\n  }\n": typeof types.GroupCardsDocument,
    "\n  query GroupHeader($id: ID!) {\n    group(id: $id) {\n      id\n      description\n      name\n    }\n  }\n": typeof types.GroupHeaderDocument,
    "\n  query GroupMembers($id: ID!) {\n    users(where: { hasGroupWith: { id: $id } }) {\n      totalCount\n    }\n  }\n": typeof types.GroupMembersDocument,
    "\n  fragment GroupScopeCard on Group {\n    id\n    scopeSets {\n      id\n      scopes\n      slug\n    }\n  }\n": typeof types.GroupScopeCardFragmentDoc,
    "\n  mutation CreateGroup($input: CreateGroupInput!) {\n    createGroup(input: $input) {\n      id\n    }\n  }\n": typeof types.CreateGroupDocument,
    "\n  mutation UpdateGroup($id: ID!, $input: UpdateGroupInput!) {\n    updateGroup(id: $id, input: $input) {\n      id\n    }\n  }\n": typeof types.UpdateGroupDocument,
    "\n  mutation DeleteGroup($id: ID!) {\n    deleteGroup(id: $id)\n  }\n": typeof types.DeleteGroupDocument,
    "\n  query GroupsTable {\n    groups {\n      id\n      createdAt\n      description\n      name\n      updatedAt\n      scopeSets {\n        id\n        slug\n      }\n    }\n  }\n": typeof types.GroupsTableDocument,
    "\n  query GroupById($id: ID!) {\n    group(id: $id) {\n      id\n      description\n      name\n      scopeSets {\n        id\n        slug\n      }\n    }\n  }\n": typeof types.GroupByIdDocument,
    "\n  query ScopeSetList {\n    scopeSets {\n      id\n      slug\n    }\n  }\n": typeof types.ScopeSetListDocument,
    "\n  query GroupsWithScopeSet {\n    groups {\n      id\n      name\n      scopeSets {\n        id\n      }\n    }\n  }\n": typeof types.GroupsWithScopeSetDocument,
    "\n  query ScopeSetHeader($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      description\n      slug\n    }\n  }\n": typeof types.ScopeSetHeaderDocument,
    "\n  fragment ScopeSetScopesCard on ScopeSet {\n    id\n    scopes\n  }\n": typeof types.ScopeSetScopesCardFragmentDoc,
    "\n  query ScopeSetCards($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      ...ScopeSetScopesCard\n      id\n    }\n  }\n": typeof types.ScopeSetCardsDocument,
    "\n  mutation CreateScopeSet($input: CreateScopeSetInput!) {\n    createScopeSet(input: $input) {\n      id\n    }\n  }\n": typeof types.CreateScopeSetDocument,
    "\n  mutation UpdateScopeSet($id: ID!, $input: UpdateScopeSetInput!) {\n    updateScopeSet(id: $id, input: $input) {\n      id\n    }\n  }\n": typeof types.UpdateScopeSetDocument,
    "\n  mutation DeleteScopeSet($id: ID!) {\n    deleteScopeSet(id: $id)\n  }\n": typeof types.DeleteScopeSetDocument,
    "\n  query ScopeSetTable {\n    scopeSets {\n      id\n      description\n      scopes\n      slug\n    }\n  }\n": typeof types.ScopeSetTableDocument,
    "\n  query ScopeSetById($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      description\n      scopes\n      slug\n    }\n  }\n": typeof types.ScopeSetByIdDocument,
    "\n  fragment UserAuditInfoCard on User {\n    id\n    createdAt\n    updatedAt\n  }\n": typeof types.UserAuditInfoCardFragmentDoc,
    "\n  fragment UserCheatRecordsCard on User {\n    id\n    cheating\n    cheatRecords(first: 5, where: { resolvedAtIsNil: true }) {\n      totalCount\n      edges {\n        node {\n          ...UserCheatRecordLine\n          id\n        }\n      }\n    }\n  }\n": typeof types.UserCheatRecordsCardFragmentDoc,
    "\n  fragment UserCheatRecordLine on CheatRecord {\n    id\n    cheatedAt\n    reason\n  }\n": typeof types.UserCheatRecordLineFragmentDoc,
    "\n  fragment UserGroupsCard on User {\n    id\n    group {\n      id\n      name\n    }\n  }\n": typeof types.UserGroupsCardFragmentDoc,
    "\n  query UserHeader($id: ID!) {\n    user(id: $id) {\n      id\n      avatar\n      email\n      name\n    }\n  }\n": typeof types.UserHeaderDocument,
    "\n  fragment UserPointsCard on User {\n    id\n    totalPoints\n\n    points(first: 5, orderBy: { field: GRANTED_AT, direction: DESC }) {\n      edges {\n        node {\n          ...UserPointHistoryLine\n          id\n        }\n      }\n    }\n  }\n": typeof types.UserPointsCardFragmentDoc,
    "\n  fragment UserPointHistoryLine on Point {\n    id\n    description\n    grantedAt\n    points\n  }\n": typeof types.UserPointHistoryLineFragmentDoc,
    "\n  fragment UserQuestionsCard on User {\n    id\n    submissionStatistics {\n      attemptedQuestions\n      solvedQuestions\n      totalQuestions\n\n      solvedQuestionByDifficulty {\n        difficulty\n        solvedQuestions\n      }\n    }\n  }\n": typeof types.UserQuestionsCardFragmentDoc,
    "\n  query UserCards($id: ID!) {\n    user(id: $id) {\n      ...UserAuditInfoCard\n      ...UserCheatRecordsCard\n      ...UserGroupsCard\n      ...UserPointsCard\n      ...UserQuestionsCard\n      id\n    }\n  }\n": typeof types.UserCardsDocument,
    "\n  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {\n    updateUser(id: $id, input: $input) {\n      id\n    }\n  }\n": typeof types.UpdateUserDocument,
    "\n  mutation DeleteUser($id: ID!) {\n    deleteUser(id: $id)\n  }\n": typeof types.DeleteUserDocument,
    "\n  mutation LogoutUserDevices($userID: ID!) {\n    logoutUser(userID: $userID)\n  }\n": typeof types.LogoutUserDevicesDocument,
    "\n  mutation ImpersonateUser($userID: ID!) {\n    impersonateUser(userID: $userID)\n  }\n": typeof types.ImpersonateUserDocument,
    "\n  query UserById($id: ID!) {\n    user(id: $id) {\n      id\n      avatar\n      createdAt\n      email\n      name\n      updatedAt\n      group {\n        id\n        name\n      }\n    }\n  }\n": typeof types.UserByIdDocument,
    "\n  query GroupList {\n    groups {\n      id\n      name\n    }\n  }\n": typeof types.GroupListDocument,
    "\n  query UsersTable(\n    $after: Cursor\n    $before: Cursor\n    $first: Int\n    $last: Int\n    $where: UserWhereInput\n  ) {\n    users(after: $after, before: $before, first: $first, last: $last, where: $where) {\n      totalCount\n      edges {\n        node {\n          id\n          avatar\n          createdAt\n          email\n          name\n          updatedAt\n          group {\n            id\n            name\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n": typeof types.UsersTableDocument,
    "\n  query LoginTotalCount($where: EventWhereInput!) {\n    events(where: $where) {\n      totalCount\n    }\n  }\n": typeof types.LoginTotalCountDocument,
    "\n  query OverviewRanking($after: Cursor, $filter: RankingFilter!, $first: Int!) {\n    ranking(after: $after, filter: $filter, first: $first) {\n      edges {\n        ...ScoreCell\n        node {\n          id\n          name\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": typeof types.OverviewRankingDocument,
    "\n  fragment ScoreCell on RankingEdge {\n    ...ScoreDiffLine\n    ...UserCompletedQuestions\n    ...UserTotalPoints\n  }\n": typeof types.ScoreCellFragmentDoc,
    "\n  fragment UserCompletedQuestions on RankingEdge {\n    node {\n        id\n        submissionStatistics {\n          solvedQuestions\n        }\n    }\n  }\n": typeof types.UserCompletedQuestionsFragmentDoc,
    "\n  fragment UserTotalPoints on RankingEdge {\n    node {\n      id\n      totalPoints\n    }\n  }\n": typeof types.UserTotalPointsFragmentDoc,
    "\n  fragment ScoreDiffLine on RankingEdge {\n    score\n  }\n": typeof types.ScoreDiffLineFragmentDoc,
    "\n  query SubmissionsTotalCount($where: SubmissionWhereInput!) {\n    submissions(where: $where) {\n      totalCount\n    }\n  }\n": typeof types.SubmissionsTotalCountDocument,
    "\n  mutation MeUpdateUserInfo($input: UpdateUserInput!) {\n    updateMe(input: $input) {\n      id\n    }\n  }\n": typeof types.MeUpdateUserInfoDocument,
    "\n  query MeUserInfo {\n    me {\n      id\n      avatar\n      name\n    }\n  }\n": typeof types.MeUserInfoDocument,
    "\n  query BasicUserInfo {\n    me {\n      id\n      avatar\n      email\n      name\n\n      group {\n        id\n        name\n      }\n    }\n  }\n": typeof types.BasicUserInfoDocument,
};
const documents: Documents = {
    "\n    query EventById($id: ID!) {\n      event(id: $id) {\n        id\n        payload\n        triggeredAt\n        type\n        user {\n          id\n          name\n        }\n      }\n    }\n": types.EventByIdDocument,
    "\n  query EventsTable(\n    $after: Cursor\n    $before: Cursor\n    $first: Int\n    $last: Int\n    $where: EventWhereInput\n  ) {\n    events(after: $after, before: $before, first: $first, last: $last, orderBy: { field: TRIGGERED_AT, direction: DESC }, where: $where) {\n      totalCount\n      edges {\n        node {\n          id\n          triggeredAt\n          type\n          user {\n            id\n            name\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n": types.EventsTableDocument,
    "\n  query PointHeader($id: ID!) {\n    pointGrant(id: $id) {\n      id\n      grantedAt\n      points\n    }\n  }\n": types.PointHeaderDocument,
    "\n  query PointCards($id: ID!) {\n    pointGrant(id: $id) {\n      ...PointDetailsCard\n      ...PointUserCard\n      id\n    }\n  }\n": types.PointCardsDocument,
    "\n  fragment PointDetailsCard on Point {\n    id\n    description\n    grantedAt\n    points\n  }\n": types.PointDetailsCardFragmentDoc,
    "\n  fragment PointUserCard on Point {\n    id\n    user {\n      id\n      name\n    }\n  }\n": types.PointUserCardFragmentDoc,
    "\n  mutation CreatePoint($input: CreatePointInput!) {\n    createPoint(input: $input) {\n      id\n    }\n  }\n": types.CreatePointDocument,
    "\n  query PointsTable(\n    $after: Cursor\n    $before: Cursor\n    $first: Int\n    $last: Int\n    $where: PointWhereInput\n  ) {\n    points(\n      after: $after\n      before: $before\n      first: $first\n      last: $last\n      orderBy: { field: GRANTED_AT, direction: DESC }\n      where: $where\n    ) {\n      totalCount\n      edges {\n        node {\n          ...PointsTableRow\n          id\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.PointsTableDocument,
    "\n  fragment PointsTableRow on Point {\n    id\n    description\n    grantedAt\n    points\n    user {\n      id\n      name\n    }\n  }\n": types.PointsTableRowFragmentDoc,
    "\n  query UpdatePointsFormUserInfo($id: ID!) {\n    user(id: $id) {\n      id\n      email\n      name\n    }\n  }\n": types.UpdatePointsFormUserInfoDocument,
    "\n  query SubmissionHeader($id: ID!) {\n    submission(id: $id) {\n      id\n      status\n      submittedAt\n    }\n  }\n": types.SubmissionHeaderDocument,
    "\n  fragment SubmissionResultCard on Submission {\n    id\n    queryResult {\n      columns\n      matchAnswer\n      rows\n    }\n    question {\n      id\n    }\n  }\n": types.SubmissionResultCardFragmentDoc,
    "\n  query SubmissionCards($id: ID!) {\n    submission(id: $id) {\n      ...SubmissionDetailsCard\n      ...SubmissionResultCard\n      ...SubmissionUserCard\n      id\n    }\n  }\n": types.SubmissionCardsDocument,
    "\n  fragment SubmissionDetailsCard on Submission {\n    id\n    error\n    submittedCode\n  }\n": types.SubmissionDetailsCardFragmentDoc,
    "\n  fragment SubmissionUserCard on Submission {\n    id\n    user {\n      id\n      name\n    }\n  }\n": types.SubmissionUserCardFragmentDoc,
    "\n  query SubmissionsTable(\n    $after: Cursor\n    $before: Cursor\n    $first: Int\n    $last: Int\n    $where: SubmissionWhereInput\n  ) {\n    submissions(after: $after, before: $before, first: $first, last: $last, orderBy: { field: SUBMITTED_AT, direction: DESC }, where: $where) {\n      totalCount\n      edges {\n        node {\n          id\n          status\n          submittedCode\n          question {\n            id\n            title\n          }\n          user {\n            id\n            email\n            name\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n": types.SubmissionsTableDocument,
    "\n  query DatabaseCards($id: ID!) {\n    database(id: $id) {\n      ...DatabaseDescriptionCard\n      ...DatabaseRelationCard\n      ...DatabaseSchemaCard\n      id\n    }\n  }\n": types.DatabaseCardsDocument,
    "\n  fragment DatabaseDescriptionCard on Database {\n    id\n    description\n  }\n": types.DatabaseDescriptionCardFragmentDoc,
    "\n  query DatabaseHeader($id: ID!) {\n    database(id: $id) {\n      id\n      description\n      slug\n    }\n  }\n": types.DatabaseHeaderDocument,
    "\n  fragment DatabaseRelationCard on Database {\n    id\n    relationFigure\n  }\n": types.DatabaseRelationCardFragmentDoc,
    "\n  fragment DatabaseSchemaCard on Database {\n    id\n    schema\n  }\n": types.DatabaseSchemaCardFragmentDoc,
    "\n  mutation CreateDatabase($input: CreateDatabaseInput!) {\n    createDatabase(input: $input) {\n      id\n    }\n  }\n": types.CreateDatabaseDocument,
    "\n  mutation UpdateDatabase($id: ID!, $input: UpdateDatabaseInput!) {\n    updateDatabase(id: $id, input: $input) {\n      id\n    }\n  }\n": types.UpdateDatabaseDocument,
    "\n  mutation DeleteDatabase($id: ID!) {\n    deleteDatabase(id: $id)\n  }\n": types.DeleteDatabaseDocument,
    "\n  query DatabaseById($id: ID!) {\n    database(id: $id) {\n      id\n      description\n      relationFigure\n      schema\n      slug\n    }\n  }\n": types.DatabaseByIdDocument,
    "\n  query DatabasesTable {\n    databases {\n      id\n      description\n      relationFigure\n      schema\n      slug\n    }\n  }\n": types.DatabasesTableDocument,
    "\n  fragment QuestionAnswerCard on Question {\n    id\n    referenceAnswer\n  }\n": types.QuestionAnswerCardFragmentDoc,
    "\n  fragment QuestionDatabaseCard on Question {\n    id\n    database {\n      id\n      description\n      slug\n    }\n  }\n": types.QuestionDatabaseCardFragmentDoc,
    "\n  fragment QuestionDescriptionCard on Question {\n    id\n    description\n  }\n": types.QuestionDescriptionCardFragmentDoc,
    "\n  query QuestionHeader($id: ID!) {\n    question(id: $id) {\n      id\n      category\n      description\n      difficulty\n      title\n    }\n  }\n": types.QuestionHeaderDocument,
    "\n  fragment QuestionPassRateCard on Question {\n    id\n    statistics {\n      attemptedUsers\n      correctSubmissionCount\n      passedUsers\n      submissionCount\n    }\n  }\n": types.QuestionPassRateCardFragmentDoc,
    "\n  query QuestionCards($id: ID!) {\n    question(id: $id) {\n      ...QuestionAnswerCard\n      ...QuestionDatabaseCard\n      ...QuestionDescriptionCard\n      ...QuestionPassRateCard\n      id\n    }\n  }\n": types.QuestionCardsDocument,
    "\n  query QuestionReferenceAnswerResult($id: ID!) {\n    question(id: $id) {\n      id\n      referenceAnswerResult {\n        columns\n        rows\n      }\n    }\n  }\n": types.QuestionReferenceAnswerResultDocument,
    "\n  query CreateQuestionDialogContent {\n    ...QuestionUpdateForm\n  }\n": types.CreateQuestionDialogContentDocument,
    "\n  mutation CreateQuestion($input: CreateQuestionInput!) {\n    createQuestion(input: $input) {\n      id\n    }\n  }\n": types.CreateQuestionDocument,
    "\n  mutation UpdateQuestion($id: ID!, $input: UpdateQuestionInput!) {\n    updateQuestion(id: $id, input: $input) {\n      id\n    }\n  }\n": types.UpdateQuestionDocument,
    "\n  mutation DeleteQuestion($id: ID!) {\n    deleteQuestion(id: $id)\n  }\n": types.DeleteQuestionDocument,
    "\n  query QuestionById($id: ID!) {\n    question(id: $id) {\n      id\n      category\n      description\n      difficulty\n      referenceAnswer\n      title\n      database {\n        id\n        slug\n      }\n    }\n  }\n": types.QuestionByIdDocument,
    "\n  query DatabaseList {\n    databases {\n      id\n      description\n      slug\n    }\n  }\n": types.DatabaseListDocument,
    "\n  query QuestionsTable(\n    $after: Cursor\n    $before: Cursor\n    $difficulty: QuestionDifficulty\n    $first: Int,\n    $last: Int,\n    $query: String\n  ) {\n    questions(\n      after: $after,\n      before: $before,\n      first: $first,\n      last: $last,\n      where: {\n        or: [\n          { titleContains: $query },\n          { categoryContains: $query },\n          { descriptionContains: $query },\n        ],\n        difficulty: $difficulty,\n      },\n    ) {\n      totalCount\n      edges {\n        node {\n          id\n          category\n          description\n          difficulty\n          referenceAnswer\n          title\n          database {\n            id\n            slug\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n": types.QuestionsTableDocument,
    "\n  fragment QuestionUpdateForm on Query {\n    questionCategories\n\n    databases {\n      id\n      slug\n    }\n  }\n": types.QuestionUpdateFormFragmentDoc,
    "\n  query UpdateQuestionDialogContent {\n    ...QuestionUpdateForm\n  }\n": types.UpdateQuestionDialogContentDocument,
    "\n  query CheatRecordDetails($id: ID!) {\n    cheatRecord(id: $id) {\n      ...CheatRecordDetailsCard\n      id\n    }\n  }\n": types.CheatRecordDetailsDocument,
    "\n  fragment CheatRecordDetailsCard on CheatRecord {\n    id\n    reason\n    cheatedAt\n    resolvedAt\n    resolvedReason\n    user {\n      id\n      name\n      email\n      avatar\n    }\n  }\n": types.CheatRecordDetailsCardFragmentDoc,
    "\n  query CheatRecordHeader($id: ID!) {\n    cheatRecord(id: $id) {\n      id\n      reason\n      user {\n        id\n        name\n        email\n        avatar\n      }\n    }\n  }\n": types.CheatRecordHeaderDocument,
    "\n  query CheatRecordResolveButton($id: ID!) {\n    cheatRecord(id: $id) {\n      ...CheatRecordResolveButtonFragment\n      id\n    }\n  }\n": types.CheatRecordResolveButtonDocument,
    "\n  fragment CheatRecordResolveButtonFragment on CheatRecord {\n    id\n    resolvedAt\n  }\n": types.CheatRecordResolveButtonFragmentFragmentDoc,
    "\n  query CreateCheatRecordFormUserInfo($id: ID!) {\n    user(id: $id) {\n      id\n      email\n      name\n    }\n  }\n": types.CreateCheatRecordFormUserInfoDocument,
    "\n  mutation CreateCheatRecord($reason: String!, $userID: ID) {\n    createCheatRecord(reason: $reason, userID: $userID) {\n      id\n      reason\n      cheatedAt\n      user {\n        id\n        name\n        email\n      }\n    }\n  }\n": types.CreateCheatRecordDocument,
    "\n  mutation ResolveCheatRecord($cheatRecordID: ID!, $reason: String!) {\n    resolveCheatRecord(cheatRecordID: $cheatRecordID, reason: $reason)\n  }\n": types.ResolveCheatRecordDocument,
    "\n  query CheatRecordById($id: ID!) {\n    cheatRecord(id: $id) {\n      id\n      reason\n      cheatedAt\n      resolvedAt\n      resolvedReason\n      user {\n        id\n        name\n        email\n        avatar\n      }\n    }\n  }\n": types.CheatRecordByIdDocument,
    "\n  query CheatRecordsTable(\n    $after: Cursor\n    $before: Cursor\n    $first: Int\n    $last: Int\n    $where: CheatRecordWhereInput\n  ) {\n    cheatRecords(\n      after: $after\n      before: $before\n      first: $first\n      last: $last\n      where: $where\n    ) {\n      totalCount\n      edges {\n        node {\n          id\n          reason\n          cheatedAt\n          resolvedAt\n          resolvedReason\n          user {\n            id\n            name\n            email\n            avatar\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n": types.CheatRecordsTableDocument,
    "\n  fragment GroupAuditInfoCard on Group {\n    id\n    createdAt\n    updatedAt\n  }\n": types.GroupAuditInfoCardFragmentDoc,
    "\n  query GroupCards($id: ID!) {\n    group(id: $id) {\n      ...GroupAuditInfoCard\n      ...GroupScopeCard\n      id\n    }\n  }\n": types.GroupCardsDocument,
    "\n  query GroupHeader($id: ID!) {\n    group(id: $id) {\n      id\n      description\n      name\n    }\n  }\n": types.GroupHeaderDocument,
    "\n  query GroupMembers($id: ID!) {\n    users(where: { hasGroupWith: { id: $id } }) {\n      totalCount\n    }\n  }\n": types.GroupMembersDocument,
    "\n  fragment GroupScopeCard on Group {\n    id\n    scopeSets {\n      id\n      scopes\n      slug\n    }\n  }\n": types.GroupScopeCardFragmentDoc,
    "\n  mutation CreateGroup($input: CreateGroupInput!) {\n    createGroup(input: $input) {\n      id\n    }\n  }\n": types.CreateGroupDocument,
    "\n  mutation UpdateGroup($id: ID!, $input: UpdateGroupInput!) {\n    updateGroup(id: $id, input: $input) {\n      id\n    }\n  }\n": types.UpdateGroupDocument,
    "\n  mutation DeleteGroup($id: ID!) {\n    deleteGroup(id: $id)\n  }\n": types.DeleteGroupDocument,
    "\n  query GroupsTable {\n    groups {\n      id\n      createdAt\n      description\n      name\n      updatedAt\n      scopeSets {\n        id\n        slug\n      }\n    }\n  }\n": types.GroupsTableDocument,
    "\n  query GroupById($id: ID!) {\n    group(id: $id) {\n      id\n      description\n      name\n      scopeSets {\n        id\n        slug\n      }\n    }\n  }\n": types.GroupByIdDocument,
    "\n  query ScopeSetList {\n    scopeSets {\n      id\n      slug\n    }\n  }\n": types.ScopeSetListDocument,
    "\n  query GroupsWithScopeSet {\n    groups {\n      id\n      name\n      scopeSets {\n        id\n      }\n    }\n  }\n": types.GroupsWithScopeSetDocument,
    "\n  query ScopeSetHeader($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      description\n      slug\n    }\n  }\n": types.ScopeSetHeaderDocument,
    "\n  fragment ScopeSetScopesCard on ScopeSet {\n    id\n    scopes\n  }\n": types.ScopeSetScopesCardFragmentDoc,
    "\n  query ScopeSetCards($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      ...ScopeSetScopesCard\n      id\n    }\n  }\n": types.ScopeSetCardsDocument,
    "\n  mutation CreateScopeSet($input: CreateScopeSetInput!) {\n    createScopeSet(input: $input) {\n      id\n    }\n  }\n": types.CreateScopeSetDocument,
    "\n  mutation UpdateScopeSet($id: ID!, $input: UpdateScopeSetInput!) {\n    updateScopeSet(id: $id, input: $input) {\n      id\n    }\n  }\n": types.UpdateScopeSetDocument,
    "\n  mutation DeleteScopeSet($id: ID!) {\n    deleteScopeSet(id: $id)\n  }\n": types.DeleteScopeSetDocument,
    "\n  query ScopeSetTable {\n    scopeSets {\n      id\n      description\n      scopes\n      slug\n    }\n  }\n": types.ScopeSetTableDocument,
    "\n  query ScopeSetById($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      description\n      scopes\n      slug\n    }\n  }\n": types.ScopeSetByIdDocument,
    "\n  fragment UserAuditInfoCard on User {\n    id\n    createdAt\n    updatedAt\n  }\n": types.UserAuditInfoCardFragmentDoc,
    "\n  fragment UserCheatRecordsCard on User {\n    id\n    cheating\n    cheatRecords(first: 5, where: { resolvedAtIsNil: true }) {\n      totalCount\n      edges {\n        node {\n          ...UserCheatRecordLine\n          id\n        }\n      }\n    }\n  }\n": types.UserCheatRecordsCardFragmentDoc,
    "\n  fragment UserCheatRecordLine on CheatRecord {\n    id\n    cheatedAt\n    reason\n  }\n": types.UserCheatRecordLineFragmentDoc,
    "\n  fragment UserGroupsCard on User {\n    id\n    group {\n      id\n      name\n    }\n  }\n": types.UserGroupsCardFragmentDoc,
    "\n  query UserHeader($id: ID!) {\n    user(id: $id) {\n      id\n      avatar\n      email\n      name\n    }\n  }\n": types.UserHeaderDocument,
    "\n  fragment UserPointsCard on User {\n    id\n    totalPoints\n\n    points(first: 5, orderBy: { field: GRANTED_AT, direction: DESC }) {\n      edges {\n        node {\n          ...UserPointHistoryLine\n          id\n        }\n      }\n    }\n  }\n": types.UserPointsCardFragmentDoc,
    "\n  fragment UserPointHistoryLine on Point {\n    id\n    description\n    grantedAt\n    points\n  }\n": types.UserPointHistoryLineFragmentDoc,
    "\n  fragment UserQuestionsCard on User {\n    id\n    submissionStatistics {\n      attemptedQuestions\n      solvedQuestions\n      totalQuestions\n\n      solvedQuestionByDifficulty {\n        difficulty\n        solvedQuestions\n      }\n    }\n  }\n": types.UserQuestionsCardFragmentDoc,
    "\n  query UserCards($id: ID!) {\n    user(id: $id) {\n      ...UserAuditInfoCard\n      ...UserCheatRecordsCard\n      ...UserGroupsCard\n      ...UserPointsCard\n      ...UserQuestionsCard\n      id\n    }\n  }\n": types.UserCardsDocument,
    "\n  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {\n    updateUser(id: $id, input: $input) {\n      id\n    }\n  }\n": types.UpdateUserDocument,
    "\n  mutation DeleteUser($id: ID!) {\n    deleteUser(id: $id)\n  }\n": types.DeleteUserDocument,
    "\n  mutation LogoutUserDevices($userID: ID!) {\n    logoutUser(userID: $userID)\n  }\n": types.LogoutUserDevicesDocument,
    "\n  mutation ImpersonateUser($userID: ID!) {\n    impersonateUser(userID: $userID)\n  }\n": types.ImpersonateUserDocument,
    "\n  query UserById($id: ID!) {\n    user(id: $id) {\n      id\n      avatar\n      createdAt\n      email\n      name\n      updatedAt\n      group {\n        id\n        name\n      }\n    }\n  }\n": types.UserByIdDocument,
    "\n  query GroupList {\n    groups {\n      id\n      name\n    }\n  }\n": types.GroupListDocument,
    "\n  query UsersTable(\n    $after: Cursor\n    $before: Cursor\n    $first: Int\n    $last: Int\n    $where: UserWhereInput\n  ) {\n    users(after: $after, before: $before, first: $first, last: $last, where: $where) {\n      totalCount\n      edges {\n        node {\n          id\n          avatar\n          createdAt\n          email\n          name\n          updatedAt\n          group {\n            id\n            name\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n": types.UsersTableDocument,
    "\n  query LoginTotalCount($where: EventWhereInput!) {\n    events(where: $where) {\n      totalCount\n    }\n  }\n": types.LoginTotalCountDocument,
    "\n  query OverviewRanking($after: Cursor, $filter: RankingFilter!, $first: Int!) {\n    ranking(after: $after, filter: $filter, first: $first) {\n      edges {\n        ...ScoreCell\n        node {\n          id\n          name\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.OverviewRankingDocument,
    "\n  fragment ScoreCell on RankingEdge {\n    ...ScoreDiffLine\n    ...UserCompletedQuestions\n    ...UserTotalPoints\n  }\n": types.ScoreCellFragmentDoc,
    "\n  fragment UserCompletedQuestions on RankingEdge {\n    node {\n        id\n        submissionStatistics {\n          solvedQuestions\n        }\n    }\n  }\n": types.UserCompletedQuestionsFragmentDoc,
    "\n  fragment UserTotalPoints on RankingEdge {\n    node {\n      id\n      totalPoints\n    }\n  }\n": types.UserTotalPointsFragmentDoc,
    "\n  fragment ScoreDiffLine on RankingEdge {\n    score\n  }\n": types.ScoreDiffLineFragmentDoc,
    "\n  query SubmissionsTotalCount($where: SubmissionWhereInput!) {\n    submissions(where: $where) {\n      totalCount\n    }\n  }\n": types.SubmissionsTotalCountDocument,
    "\n  mutation MeUpdateUserInfo($input: UpdateUserInput!) {\n    updateMe(input: $input) {\n      id\n    }\n  }\n": types.MeUpdateUserInfoDocument,
    "\n  query MeUserInfo {\n    me {\n      id\n      avatar\n      name\n    }\n  }\n": types.MeUserInfoDocument,
    "\n  query BasicUserInfo {\n    me {\n      id\n      avatar\n      email\n      name\n\n      group {\n        id\n        name\n      }\n    }\n  }\n": types.BasicUserInfoDocument,
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
export function graphql(source: "\n    query EventById($id: ID!) {\n      event(id: $id) {\n        id\n        payload\n        triggeredAt\n        type\n        user {\n          id\n          name\n        }\n      }\n    }\n"): (typeof documents)["\n    query EventById($id: ID!) {\n      event(id: $id) {\n        id\n        payload\n        triggeredAt\n        type\n        user {\n          id\n          name\n        }\n      }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query EventsTable(\n    $after: Cursor\n    $before: Cursor\n    $first: Int\n    $last: Int\n    $where: EventWhereInput\n  ) {\n    events(after: $after, before: $before, first: $first, last: $last, orderBy: { field: TRIGGERED_AT, direction: DESC }, where: $where) {\n      totalCount\n      edges {\n        node {\n          id\n          triggeredAt\n          type\n          user {\n            id\n            name\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query EventsTable(\n    $after: Cursor\n    $before: Cursor\n    $first: Int\n    $last: Int\n    $where: EventWhereInput\n  ) {\n    events(after: $after, before: $before, first: $first, last: $last, orderBy: { field: TRIGGERED_AT, direction: DESC }, where: $where) {\n      totalCount\n      edges {\n        node {\n          id\n          triggeredAt\n          type\n          user {\n            id\n            name\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PointHeader($id: ID!) {\n    pointGrant(id: $id) {\n      id\n      grantedAt\n      points\n    }\n  }\n"): (typeof documents)["\n  query PointHeader($id: ID!) {\n    pointGrant(id: $id) {\n      id\n      grantedAt\n      points\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PointCards($id: ID!) {\n    pointGrant(id: $id) {\n      ...PointDetailsCard\n      ...PointUserCard\n      id\n    }\n  }\n"): (typeof documents)["\n  query PointCards($id: ID!) {\n    pointGrant(id: $id) {\n      ...PointDetailsCard\n      ...PointUserCard\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PointDetailsCard on Point {\n    id\n    description\n    grantedAt\n    points\n  }\n"): (typeof documents)["\n  fragment PointDetailsCard on Point {\n    id\n    description\n    grantedAt\n    points\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PointUserCard on Point {\n    id\n    user {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment PointUserCard on Point {\n    id\n    user {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePoint($input: CreatePointInput!) {\n    createPoint(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePoint($input: CreatePointInput!) {\n    createPoint(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PointsTable(\n    $after: Cursor\n    $before: Cursor\n    $first: Int\n    $last: Int\n    $where: PointWhereInput\n  ) {\n    points(\n      after: $after\n      before: $before\n      first: $first\n      last: $last\n      orderBy: { field: GRANTED_AT, direction: DESC }\n      where: $where\n    ) {\n      totalCount\n      edges {\n        node {\n          ...PointsTableRow\n          id\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query PointsTable(\n    $after: Cursor\n    $before: Cursor\n    $first: Int\n    $last: Int\n    $where: PointWhereInput\n  ) {\n    points(\n      after: $after\n      before: $before\n      first: $first\n      last: $last\n      orderBy: { field: GRANTED_AT, direction: DESC }\n      where: $where\n    ) {\n      totalCount\n      edges {\n        node {\n          ...PointsTableRow\n          id\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PointsTableRow on Point {\n    id\n    description\n    grantedAt\n    points\n    user {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment PointsTableRow on Point {\n    id\n    description\n    grantedAt\n    points\n    user {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UpdatePointsFormUserInfo($id: ID!) {\n    user(id: $id) {\n      id\n      email\n      name\n    }\n  }\n"): (typeof documents)["\n  query UpdatePointsFormUserInfo($id: ID!) {\n    user(id: $id) {\n      id\n      email\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SubmissionHeader($id: ID!) {\n    submission(id: $id) {\n      id\n      status\n      submittedAt\n    }\n  }\n"): (typeof documents)["\n  query SubmissionHeader($id: ID!) {\n    submission(id: $id) {\n      id\n      status\n      submittedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SubmissionResultCard on Submission {\n    id\n    queryResult {\n      columns\n      matchAnswer\n      rows\n    }\n    question {\n      id\n    }\n  }\n"): (typeof documents)["\n  fragment SubmissionResultCard on Submission {\n    id\n    queryResult {\n      columns\n      matchAnswer\n      rows\n    }\n    question {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SubmissionCards($id: ID!) {\n    submission(id: $id) {\n      ...SubmissionDetailsCard\n      ...SubmissionResultCard\n      ...SubmissionUserCard\n      id\n    }\n  }\n"): (typeof documents)["\n  query SubmissionCards($id: ID!) {\n    submission(id: $id) {\n      ...SubmissionDetailsCard\n      ...SubmissionResultCard\n      ...SubmissionUserCard\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SubmissionDetailsCard on Submission {\n    id\n    error\n    submittedCode\n  }\n"): (typeof documents)["\n  fragment SubmissionDetailsCard on Submission {\n    id\n    error\n    submittedCode\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SubmissionUserCard on Submission {\n    id\n    user {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment SubmissionUserCard on Submission {\n    id\n    user {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SubmissionsTable(\n    $after: Cursor\n    $before: Cursor\n    $first: Int\n    $last: Int\n    $where: SubmissionWhereInput\n  ) {\n    submissions(after: $after, before: $before, first: $first, last: $last, orderBy: { field: SUBMITTED_AT, direction: DESC }, where: $where) {\n      totalCount\n      edges {\n        node {\n          id\n          status\n          submittedCode\n          question {\n            id\n            title\n          }\n          user {\n            id\n            email\n            name\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query SubmissionsTable(\n    $after: Cursor\n    $before: Cursor\n    $first: Int\n    $last: Int\n    $where: SubmissionWhereInput\n  ) {\n    submissions(after: $after, before: $before, first: $first, last: $last, orderBy: { field: SUBMITTED_AT, direction: DESC }, where: $where) {\n      totalCount\n      edges {\n        node {\n          id\n          status\n          submittedCode\n          question {\n            id\n            title\n          }\n          user {\n            id\n            email\n            name\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DatabaseCards($id: ID!) {\n    database(id: $id) {\n      ...DatabaseDescriptionCard\n      ...DatabaseRelationCard\n      ...DatabaseSchemaCard\n      id\n    }\n  }\n"): (typeof documents)["\n  query DatabaseCards($id: ID!) {\n    database(id: $id) {\n      ...DatabaseDescriptionCard\n      ...DatabaseRelationCard\n      ...DatabaseSchemaCard\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment DatabaseDescriptionCard on Database {\n    id\n    description\n  }\n"): (typeof documents)["\n  fragment DatabaseDescriptionCard on Database {\n    id\n    description\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DatabaseHeader($id: ID!) {\n    database(id: $id) {\n      id\n      description\n      slug\n    }\n  }\n"): (typeof documents)["\n  query DatabaseHeader($id: ID!) {\n    database(id: $id) {\n      id\n      description\n      slug\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment DatabaseRelationCard on Database {\n    id\n    relationFigure\n  }\n"): (typeof documents)["\n  fragment DatabaseRelationCard on Database {\n    id\n    relationFigure\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment DatabaseSchemaCard on Database {\n    id\n    schema\n  }\n"): (typeof documents)["\n  fragment DatabaseSchemaCard on Database {\n    id\n    schema\n  }\n"];
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
export function graphql(source: "\n  query DatabaseById($id: ID!) {\n    database(id: $id) {\n      id\n      description\n      relationFigure\n      schema\n      slug\n    }\n  }\n"): (typeof documents)["\n  query DatabaseById($id: ID!) {\n    database(id: $id) {\n      id\n      description\n      relationFigure\n      schema\n      slug\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DatabasesTable {\n    databases {\n      id\n      description\n      relationFigure\n      schema\n      slug\n    }\n  }\n"): (typeof documents)["\n  query DatabasesTable {\n    databases {\n      id\n      description\n      relationFigure\n      schema\n      slug\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuestionAnswerCard on Question {\n    id\n    referenceAnswer\n  }\n"): (typeof documents)["\n  fragment QuestionAnswerCard on Question {\n    id\n    referenceAnswer\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuestionDatabaseCard on Question {\n    id\n    database {\n      id\n      description\n      slug\n    }\n  }\n"): (typeof documents)["\n  fragment QuestionDatabaseCard on Question {\n    id\n    database {\n      id\n      description\n      slug\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuestionDescriptionCard on Question {\n    id\n    description\n  }\n"): (typeof documents)["\n  fragment QuestionDescriptionCard on Question {\n    id\n    description\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query QuestionHeader($id: ID!) {\n    question(id: $id) {\n      id\n      category\n      description\n      difficulty\n      title\n    }\n  }\n"): (typeof documents)["\n  query QuestionHeader($id: ID!) {\n    question(id: $id) {\n      id\n      category\n      description\n      difficulty\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuestionPassRateCard on Question {\n    id\n    statistics {\n      attemptedUsers\n      correctSubmissionCount\n      passedUsers\n      submissionCount\n    }\n  }\n"): (typeof documents)["\n  fragment QuestionPassRateCard on Question {\n    id\n    statistics {\n      attemptedUsers\n      correctSubmissionCount\n      passedUsers\n      submissionCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query QuestionCards($id: ID!) {\n    question(id: $id) {\n      ...QuestionAnswerCard\n      ...QuestionDatabaseCard\n      ...QuestionDescriptionCard\n      ...QuestionPassRateCard\n      id\n    }\n  }\n"): (typeof documents)["\n  query QuestionCards($id: ID!) {\n    question(id: $id) {\n      ...QuestionAnswerCard\n      ...QuestionDatabaseCard\n      ...QuestionDescriptionCard\n      ...QuestionPassRateCard\n      id\n    }\n  }\n"];
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
export function graphql(source: "\n  query QuestionById($id: ID!) {\n    question(id: $id) {\n      id\n      category\n      description\n      difficulty\n      referenceAnswer\n      title\n      database {\n        id\n        slug\n      }\n    }\n  }\n"): (typeof documents)["\n  query QuestionById($id: ID!) {\n    question(id: $id) {\n      id\n      category\n      description\n      difficulty\n      referenceAnswer\n      title\n      database {\n        id\n        slug\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DatabaseList {\n    databases {\n      id\n      description\n      slug\n    }\n  }\n"): (typeof documents)["\n  query DatabaseList {\n    databases {\n      id\n      description\n      slug\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query QuestionsTable(\n    $after: Cursor\n    $before: Cursor\n    $difficulty: QuestionDifficulty\n    $first: Int,\n    $last: Int,\n    $query: String\n  ) {\n    questions(\n      after: $after,\n      before: $before,\n      first: $first,\n      last: $last,\n      where: {\n        or: [\n          { titleContains: $query },\n          { categoryContains: $query },\n          { descriptionContains: $query },\n        ],\n        difficulty: $difficulty,\n      },\n    ) {\n      totalCount\n      edges {\n        node {\n          id\n          category\n          description\n          difficulty\n          referenceAnswer\n          title\n          database {\n            id\n            slug\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query QuestionsTable(\n    $after: Cursor\n    $before: Cursor\n    $difficulty: QuestionDifficulty\n    $first: Int,\n    $last: Int,\n    $query: String\n  ) {\n    questions(\n      after: $after,\n      before: $before,\n      first: $first,\n      last: $last,\n      where: {\n        or: [\n          { titleContains: $query },\n          { categoryContains: $query },\n          { descriptionContains: $query },\n        ],\n        difficulty: $difficulty,\n      },\n    ) {\n      totalCount\n      edges {\n        node {\n          id\n          category\n          description\n          difficulty\n          referenceAnswer\n          title\n          database {\n            id\n            slug\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuestionUpdateForm on Query {\n    questionCategories\n\n    databases {\n      id\n      slug\n    }\n  }\n"): (typeof documents)["\n  fragment QuestionUpdateForm on Query {\n    questionCategories\n\n    databases {\n      id\n      slug\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UpdateQuestionDialogContent {\n    ...QuestionUpdateForm\n  }\n"): (typeof documents)["\n  query UpdateQuestionDialogContent {\n    ...QuestionUpdateForm\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CheatRecordDetails($id: ID!) {\n    cheatRecord(id: $id) {\n      ...CheatRecordDetailsCard\n      id\n    }\n  }\n"): (typeof documents)["\n  query CheatRecordDetails($id: ID!) {\n    cheatRecord(id: $id) {\n      ...CheatRecordDetailsCard\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CheatRecordDetailsCard on CheatRecord {\n    id\n    reason\n    cheatedAt\n    resolvedAt\n    resolvedReason\n    user {\n      id\n      name\n      email\n      avatar\n    }\n  }\n"): (typeof documents)["\n  fragment CheatRecordDetailsCard on CheatRecord {\n    id\n    reason\n    cheatedAt\n    resolvedAt\n    resolvedReason\n    user {\n      id\n      name\n      email\n      avatar\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CheatRecordHeader($id: ID!) {\n    cheatRecord(id: $id) {\n      id\n      reason\n      user {\n        id\n        name\n        email\n        avatar\n      }\n    }\n  }\n"): (typeof documents)["\n  query CheatRecordHeader($id: ID!) {\n    cheatRecord(id: $id) {\n      id\n      reason\n      user {\n        id\n        name\n        email\n        avatar\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CheatRecordResolveButton($id: ID!) {\n    cheatRecord(id: $id) {\n      ...CheatRecordResolveButtonFragment\n      id\n    }\n  }\n"): (typeof documents)["\n  query CheatRecordResolveButton($id: ID!) {\n    cheatRecord(id: $id) {\n      ...CheatRecordResolveButtonFragment\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CheatRecordResolveButtonFragment on CheatRecord {\n    id\n    resolvedAt\n  }\n"): (typeof documents)["\n  fragment CheatRecordResolveButtonFragment on CheatRecord {\n    id\n    resolvedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CreateCheatRecordFormUserInfo($id: ID!) {\n    user(id: $id) {\n      id\n      email\n      name\n    }\n  }\n"): (typeof documents)["\n  query CreateCheatRecordFormUserInfo($id: ID!) {\n    user(id: $id) {\n      id\n      email\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCheatRecord($reason: String!, $userID: ID) {\n    createCheatRecord(reason: $reason, userID: $userID) {\n      id\n      reason\n      cheatedAt\n      user {\n        id\n        name\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCheatRecord($reason: String!, $userID: ID) {\n    createCheatRecord(reason: $reason, userID: $userID) {\n      id\n      reason\n      cheatedAt\n      user {\n        id\n        name\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ResolveCheatRecord($cheatRecordID: ID!, $reason: String!) {\n    resolveCheatRecord(cheatRecordID: $cheatRecordID, reason: $reason)\n  }\n"): (typeof documents)["\n  mutation ResolveCheatRecord($cheatRecordID: ID!, $reason: String!) {\n    resolveCheatRecord(cheatRecordID: $cheatRecordID, reason: $reason)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CheatRecordById($id: ID!) {\n    cheatRecord(id: $id) {\n      id\n      reason\n      cheatedAt\n      resolvedAt\n      resolvedReason\n      user {\n        id\n        name\n        email\n        avatar\n      }\n    }\n  }\n"): (typeof documents)["\n  query CheatRecordById($id: ID!) {\n    cheatRecord(id: $id) {\n      id\n      reason\n      cheatedAt\n      resolvedAt\n      resolvedReason\n      user {\n        id\n        name\n        email\n        avatar\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CheatRecordsTable(\n    $after: Cursor\n    $before: Cursor\n    $first: Int\n    $last: Int\n    $where: CheatRecordWhereInput\n  ) {\n    cheatRecords(\n      after: $after\n      before: $before\n      first: $first\n      last: $last\n      where: $where\n    ) {\n      totalCount\n      edges {\n        node {\n          id\n          reason\n          cheatedAt\n          resolvedAt\n          resolvedReason\n          user {\n            id\n            name\n            email\n            avatar\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query CheatRecordsTable(\n    $after: Cursor\n    $before: Cursor\n    $first: Int\n    $last: Int\n    $where: CheatRecordWhereInput\n  ) {\n    cheatRecords(\n      after: $after\n      before: $before\n      first: $first\n      last: $last\n      where: $where\n    ) {\n      totalCount\n      edges {\n        node {\n          id\n          reason\n          cheatedAt\n          resolvedAt\n          resolvedReason\n          user {\n            id\n            name\n            email\n            avatar\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment GroupAuditInfoCard on Group {\n    id\n    createdAt\n    updatedAt\n  }\n"): (typeof documents)["\n  fragment GroupAuditInfoCard on Group {\n    id\n    createdAt\n    updatedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GroupCards($id: ID!) {\n    group(id: $id) {\n      ...GroupAuditInfoCard\n      ...GroupScopeCard\n      id\n    }\n  }\n"): (typeof documents)["\n  query GroupCards($id: ID!) {\n    group(id: $id) {\n      ...GroupAuditInfoCard\n      ...GroupScopeCard\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GroupHeader($id: ID!) {\n    group(id: $id) {\n      id\n      description\n      name\n    }\n  }\n"): (typeof documents)["\n  query GroupHeader($id: ID!) {\n    group(id: $id) {\n      id\n      description\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GroupMembers($id: ID!) {\n    users(where: { hasGroupWith: { id: $id } }) {\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query GroupMembers($id: ID!) {\n    users(where: { hasGroupWith: { id: $id } }) {\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment GroupScopeCard on Group {\n    id\n    scopeSets {\n      id\n      scopes\n      slug\n    }\n  }\n"): (typeof documents)["\n  fragment GroupScopeCard on Group {\n    id\n    scopeSets {\n      id\n      scopes\n      slug\n    }\n  }\n"];
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
export function graphql(source: "\n  query GroupsTable {\n    groups {\n      id\n      createdAt\n      description\n      name\n      updatedAt\n      scopeSets {\n        id\n        slug\n      }\n    }\n  }\n"): (typeof documents)["\n  query GroupsTable {\n    groups {\n      id\n      createdAt\n      description\n      name\n      updatedAt\n      scopeSets {\n        id\n        slug\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GroupById($id: ID!) {\n    group(id: $id) {\n      id\n      description\n      name\n      scopeSets {\n        id\n        slug\n      }\n    }\n  }\n"): (typeof documents)["\n  query GroupById($id: ID!) {\n    group(id: $id) {\n      id\n      description\n      name\n      scopeSets {\n        id\n        slug\n      }\n    }\n  }\n"];
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
export function graphql(source: "\n  query ScopeSetHeader($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      description\n      slug\n    }\n  }\n"): (typeof documents)["\n  query ScopeSetHeader($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      description\n      slug\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ScopeSetScopesCard on ScopeSet {\n    id\n    scopes\n  }\n"): (typeof documents)["\n  fragment ScopeSetScopesCard on ScopeSet {\n    id\n    scopes\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ScopeSetCards($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      ...ScopeSetScopesCard\n      id\n    }\n  }\n"): (typeof documents)["\n  query ScopeSetCards($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      ...ScopeSetScopesCard\n      id\n    }\n  }\n"];
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
export function graphql(source: "\n  query ScopeSetTable {\n    scopeSets {\n      id\n      description\n      scopes\n      slug\n    }\n  }\n"): (typeof documents)["\n  query ScopeSetTable {\n    scopeSets {\n      id\n      description\n      scopes\n      slug\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ScopeSetById($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      description\n      scopes\n      slug\n    }\n  }\n"): (typeof documents)["\n  query ScopeSetById($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      description\n      scopes\n      slug\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserAuditInfoCard on User {\n    id\n    createdAt\n    updatedAt\n  }\n"): (typeof documents)["\n  fragment UserAuditInfoCard on User {\n    id\n    createdAt\n    updatedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserCheatRecordsCard on User {\n    id\n    cheating\n    cheatRecords(first: 5, where: { resolvedAtIsNil: true }) {\n      totalCount\n      edges {\n        node {\n          ...UserCheatRecordLine\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment UserCheatRecordsCard on User {\n    id\n    cheating\n    cheatRecords(first: 5, where: { resolvedAtIsNil: true }) {\n      totalCount\n      edges {\n        node {\n          ...UserCheatRecordLine\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserCheatRecordLine on CheatRecord {\n    id\n    cheatedAt\n    reason\n  }\n"): (typeof documents)["\n  fragment UserCheatRecordLine on CheatRecord {\n    id\n    cheatedAt\n    reason\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserGroupsCard on User {\n    id\n    group {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment UserGroupsCard on User {\n    id\n    group {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserHeader($id: ID!) {\n    user(id: $id) {\n      id\n      avatar\n      email\n      name\n    }\n  }\n"): (typeof documents)["\n  query UserHeader($id: ID!) {\n    user(id: $id) {\n      id\n      avatar\n      email\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserPointsCard on User {\n    id\n    totalPoints\n\n    points(first: 5, orderBy: { field: GRANTED_AT, direction: DESC }) {\n      edges {\n        node {\n          ...UserPointHistoryLine\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment UserPointsCard on User {\n    id\n    totalPoints\n\n    points(first: 5, orderBy: { field: GRANTED_AT, direction: DESC }) {\n      edges {\n        node {\n          ...UserPointHistoryLine\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserPointHistoryLine on Point {\n    id\n    description\n    grantedAt\n    points\n  }\n"): (typeof documents)["\n  fragment UserPointHistoryLine on Point {\n    id\n    description\n    grantedAt\n    points\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserQuestionsCard on User {\n    id\n    submissionStatistics {\n      attemptedQuestions\n      solvedQuestions\n      totalQuestions\n\n      solvedQuestionByDifficulty {\n        difficulty\n        solvedQuestions\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment UserQuestionsCard on User {\n    id\n    submissionStatistics {\n      attemptedQuestions\n      solvedQuestions\n      totalQuestions\n\n      solvedQuestionByDifficulty {\n        difficulty\n        solvedQuestions\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserCards($id: ID!) {\n    user(id: $id) {\n      ...UserAuditInfoCard\n      ...UserCheatRecordsCard\n      ...UserGroupsCard\n      ...UserPointsCard\n      ...UserQuestionsCard\n      id\n    }\n  }\n"): (typeof documents)["\n  query UserCards($id: ID!) {\n    user(id: $id) {\n      ...UserAuditInfoCard\n      ...UserCheatRecordsCard\n      ...UserGroupsCard\n      ...UserPointsCard\n      ...UserQuestionsCard\n      id\n    }\n  }\n"];
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
export function graphql(source: "\n  query UserById($id: ID!) {\n    user(id: $id) {\n      id\n      avatar\n      createdAt\n      email\n      name\n      updatedAt\n      group {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query UserById($id: ID!) {\n    user(id: $id) {\n      id\n      avatar\n      createdAt\n      email\n      name\n      updatedAt\n      group {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GroupList {\n    groups {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GroupList {\n    groups {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UsersTable(\n    $after: Cursor\n    $before: Cursor\n    $first: Int\n    $last: Int\n    $where: UserWhereInput\n  ) {\n    users(after: $after, before: $before, first: $first, last: $last, where: $where) {\n      totalCount\n      edges {\n        node {\n          id\n          avatar\n          createdAt\n          email\n          name\n          updatedAt\n          group {\n            id\n            name\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query UsersTable(\n    $after: Cursor\n    $before: Cursor\n    $first: Int\n    $last: Int\n    $where: UserWhereInput\n  ) {\n    users(after: $after, before: $before, first: $first, last: $last, where: $where) {\n      totalCount\n      edges {\n        node {\n          id\n          avatar\n          createdAt\n          email\n          name\n          updatedAt\n          group {\n            id\n            name\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query LoginTotalCount($where: EventWhereInput!) {\n    events(where: $where) {\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query LoginTotalCount($where: EventWhereInput!) {\n    events(where: $where) {\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query OverviewRanking($after: Cursor, $filter: RankingFilter!, $first: Int!) {\n    ranking(after: $after, filter: $filter, first: $first) {\n      edges {\n        ...ScoreCell\n        node {\n          id\n          name\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query OverviewRanking($after: Cursor, $filter: RankingFilter!, $first: Int!) {\n    ranking(after: $after, filter: $filter, first: $first) {\n      edges {\n        ...ScoreCell\n        node {\n          id\n          name\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ScoreCell on RankingEdge {\n    ...ScoreDiffLine\n    ...UserCompletedQuestions\n    ...UserTotalPoints\n  }\n"): (typeof documents)["\n  fragment ScoreCell on RankingEdge {\n    ...ScoreDiffLine\n    ...UserCompletedQuestions\n    ...UserTotalPoints\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserCompletedQuestions on RankingEdge {\n    node {\n        id\n        submissionStatistics {\n          solvedQuestions\n        }\n    }\n  }\n"): (typeof documents)["\n  fragment UserCompletedQuestions on RankingEdge {\n    node {\n        id\n        submissionStatistics {\n          solvedQuestions\n        }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserTotalPoints on RankingEdge {\n    node {\n      id\n      totalPoints\n    }\n  }\n"): (typeof documents)["\n  fragment UserTotalPoints on RankingEdge {\n    node {\n      id\n      totalPoints\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ScoreDiffLine on RankingEdge {\n    score\n  }\n"): (typeof documents)["\n  fragment ScoreDiffLine on RankingEdge {\n    score\n  }\n"];
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
export function graphql(source: "\n  query MeUserInfo {\n    me {\n      id\n      avatar\n      name\n    }\n  }\n"): (typeof documents)["\n  query MeUserInfo {\n    me {\n      id\n      avatar\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query BasicUserInfo {\n    me {\n      id\n      avatar\n      email\n      name\n\n      group {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query BasicUserInfo {\n    me {\n      id\n      avatar\n      email\n      name\n\n      group {\n        id\n        name\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;