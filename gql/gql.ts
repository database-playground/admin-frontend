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
    "\n  query DatabaseDetail($id: ID!) {\n    database(id: $id) {\n      id\n      slug\n      description\n      schema\n      relationFigure\n    }\n  }\n": typeof types.DatabaseDetailDocument,
    "\n  mutation CreateDatabase($input: CreateDatabaseInput!) {\n    createDatabase(input: $input) {\n      id\n    }\n  }\n": typeof types.CreateDatabaseDocument,
    "\n  mutation UpdateDatabase($id: ID!, $input: UpdateDatabaseInput!) {\n    updateDatabase(id: $id, input: $input) {\n      id\n    }\n  }\n": typeof types.UpdateDatabaseDocument,
    "\n  mutation DeleteDatabase($id: ID!) {\n    deleteDatabase(id: $id)\n  }\n": typeof types.DeleteDatabaseDocument,
    "\n  query DatabaseById($id: ID!) {\n    database(id: $id) {\n      id\n      slug\n      description\n      schema\n      relationFigure\n    }\n  }\n": typeof types.DatabaseByIdDocument,
    "\n  query DatabasesTable {\n    databases {\n      id\n      slug\n      description\n      schema\n      relationFigure\n    }\n  }\n": typeof types.DatabasesTableDocument,
    "\n  query QuestionDetail($id: ID!) {\n    question(id: $id) {\n      id\n      title\n      description\n      category\n      difficulty\n      referenceAnswer\n      database {\n        id\n        slug\n        description\n      }\n    }\n  }\n": typeof types.QuestionDetailDocument,
    "\n  query QuestionReferenceAnswerResult($id: ID!) {\n    question(id: $id) {\n      referenceAnswerResult {\n        columns\n        rows\n      }\n    }\n  }\n": typeof types.QuestionReferenceAnswerResultDocument,
    "\n  mutation CreateQuestion($input: CreateQuestionInput!) {\n    createQuestion(input: $input) {\n      id\n    }\n  }\n": typeof types.CreateQuestionDocument,
    "\n  mutation UpdateQuestion($id: ID!, $input: UpdateQuestionInput!) {\n    updateQuestion(id: $id, input: $input) {\n      id\n    }\n  }\n": typeof types.UpdateQuestionDocument,
    "\n  mutation DeleteQuestion($id: ID!) {\n    deleteQuestion(id: $id)\n  }\n": typeof types.DeleteQuestionDocument,
    "\n  query QuestionById($id: ID!) {\n    question(id: $id) {\n      id\n      title\n      description\n      category\n      difficulty\n      referenceAnswer\n      database {\n        id\n        slug\n      }\n    }\n  }\n": typeof types.QuestionByIdDocument,
    "\n  query DatabaseList {\n    databases {\n      id\n      slug\n      description\n    }\n  }\n": typeof types.DatabaseListDocument,
    "\n  query QuestionsTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n  ) {\n    questions(first: $first, after: $after, last: $last, before: $before) {\n      edges {\n        node {\n          id\n          title\n          description\n          category\n          difficulty\n          referenceAnswer\n          database {\n            id\n            slug\n          }\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n": typeof types.QuestionsTableDocument,
    "\n  query GroupAuditInfo($id: ID!) {\n    group(id: $id) {\n      id\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GroupAuditInfoDocument,
    "\n  query GroupHeader($id: ID!) {\n    group(id: $id) {\n      id\n      name\n      description\n    }\n  }\n": typeof types.GroupHeaderDocument,
    "\n  query GroupMembers($id: ID!) {\n    users(where: { hasGroupWith: { id: $id } }) {\n      totalCount\n    }\n  }\n": typeof types.GroupMembersDocument,
    "\n  query GroupScopes($id: ID!) {\n    group(id: $id) {\n      id\n      scopeSets {\n        id\n        slug\n        scopes\n      }\n    }\n  }\n": typeof types.GroupScopesDocument,
    "\n  mutation CreateGroup($input: CreateGroupInput!) {\n    createGroup(input: $input) {\n      id\n    }\n  }\n": typeof types.CreateGroupDocument,
    "\n  mutation UpdateGroup($id: ID!, $input: UpdateGroupInput!) {\n    updateGroup(id: $id, input: $input) {\n      id\n    }\n  }\n": typeof types.UpdateGroupDocument,
    "\n  mutation DeleteGroup($id: ID!) {\n    deleteGroup(id: $id)\n  }\n": typeof types.DeleteGroupDocument,
    "\n  query GroupsTable {\n    groups {\n      id\n      name\n      description\n      scopeSets {\n        id\n        slug\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GroupsTableDocument,
    "\n  query GroupById($id: ID!) {\n    group(id: $id) {\n      id\n      name\n      description\n      scopeSets {\n        id\n        slug\n      }\n    }\n  }\n": typeof types.GroupByIdDocument,
    "\n  query ScopeSetList {\n    scopeSets {\n      id\n      slug\n    }\n  }\n": typeof types.ScopeSetListDocument,
    "\n  query ScopeSetHeader($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      slug\n      description\n    }\n  }\n": typeof types.ScopeSetHeaderDocument,
    "\n  query ScopeSetScopes($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      scopes\n    }\n  }\n": typeof types.ScopeSetScopesDocument,
    "\n  query GroupsWithScopeSet {\n    groups {\n      id\n      name\n      scopeSets {\n        id\n      }\n    }\n  }\n": typeof types.GroupsWithScopeSetDocument,
    "\n  mutation CreateScopeSet($input: CreateScopeSetInput!) {\n    createScopeSet(input: $input) {\n      id\n    }\n  }\n": typeof types.CreateScopeSetDocument,
    "\n  mutation UpdateScopeSet($id: ID!, $input: UpdateScopeSetInput!) {\n    updateScopeSet(id: $id, input: $input) {\n      id\n    }\n  }\n": typeof types.UpdateScopeSetDocument,
    "\n  mutation DeleteScopeSet($id: ID!) {\n    deleteScopeSet(id: $id)\n  }\n": typeof types.DeleteScopeSetDocument,
    "\n  query ScopeSetTable {\n    scopeSets {\n      id\n      slug\n      description\n      scopes\n    }\n  }\n": typeof types.ScopeSetTableDocument,
    "\n  query ScopeSetById($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      slug\n      description\n      scopes\n    }\n  }\n": typeof types.ScopeSetByIdDocument,
    "\n  query UserHeader($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      email\n      avatar\n    }\n  }\n": typeof types.UserHeaderDocument,
    "\n  query UserGroups($id: ID!) {\n    user(id: $id) {\n      id\n      group {\n        id\n        name\n      }\n    }\n  }\n": typeof types.UserGroupsDocument,
    "\n  query UserAuditInfo($id: ID!) {\n    user(id: $id) {\n      id\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UserAuditInfoDocument,
    "\n  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {\n    updateUser(id: $id, input: $input) {\n      id\n    }\n  }\n": typeof types.UpdateUserDocument,
    "\n  mutation DeleteUser($id: ID!) {\n    deleteUser(id: $id)\n  }\n": typeof types.DeleteUserDocument,
    "\n  mutation LogoutUserDevices($userID: ID!) {\n    logoutUser(userID: $userID)\n  }\n": typeof types.LogoutUserDevicesDocument,
    "\n  mutation ImpersonateUser($userID: ID!) {\n    impersonateUser(userID: $userID)\n  }\n": typeof types.ImpersonateUserDocument,
    "\n  query UserById($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      email\n      avatar\n      createdAt\n      updatedAt\n      group {\n        id\n        name\n      }\n    }\n  }\n": typeof types.UserByIdDocument,
    "\n  query GroupList {\n    groups {\n      id\n      name\n    }\n  }\n": typeof types.GroupListDocument,
    "\n  query UsersTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n  ) {\n    users(first: $first, after: $after, last: $last, before: $before) {\n      edges {\n        node {\n          id\n          name\n          email\n          avatar\n          createdAt\n          updatedAt\n          group {\n            id\n            name\n          }\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n": typeof types.UsersTableDocument,
    "\n  mutation MeUpdateUserInfo($input: UpdateUserInput!) {\n    updateMe(input: $input) {\n      id\n    }\n  }\n": typeof types.MeUpdateUserInfoDocument,
    "\n  query MeUserInfo {\n    me {\n      id\n      name\n      avatar\n    }\n  }\n": typeof types.MeUserInfoDocument,
    "\n  query BasicUserInfo {\n    me {\n      id\n      name\n      email\n      avatar\n\n      group {\n        name\n      }\n    }\n  }\n": typeof types.BasicUserInfoDocument,
};
const documents: Documents = {
    "\n  query DatabaseDetail($id: ID!) {\n    database(id: $id) {\n      id\n      slug\n      description\n      schema\n      relationFigure\n    }\n  }\n": types.DatabaseDetailDocument,
    "\n  mutation CreateDatabase($input: CreateDatabaseInput!) {\n    createDatabase(input: $input) {\n      id\n    }\n  }\n": types.CreateDatabaseDocument,
    "\n  mutation UpdateDatabase($id: ID!, $input: UpdateDatabaseInput!) {\n    updateDatabase(id: $id, input: $input) {\n      id\n    }\n  }\n": types.UpdateDatabaseDocument,
    "\n  mutation DeleteDatabase($id: ID!) {\n    deleteDatabase(id: $id)\n  }\n": types.DeleteDatabaseDocument,
    "\n  query DatabaseById($id: ID!) {\n    database(id: $id) {\n      id\n      slug\n      description\n      schema\n      relationFigure\n    }\n  }\n": types.DatabaseByIdDocument,
    "\n  query DatabasesTable {\n    databases {\n      id\n      slug\n      description\n      schema\n      relationFigure\n    }\n  }\n": types.DatabasesTableDocument,
    "\n  query QuestionDetail($id: ID!) {\n    question(id: $id) {\n      id\n      title\n      description\n      category\n      difficulty\n      referenceAnswer\n      database {\n        id\n        slug\n        description\n      }\n    }\n  }\n": types.QuestionDetailDocument,
    "\n  query QuestionReferenceAnswerResult($id: ID!) {\n    question(id: $id) {\n      referenceAnswerResult {\n        columns\n        rows\n      }\n    }\n  }\n": types.QuestionReferenceAnswerResultDocument,
    "\n  mutation CreateQuestion($input: CreateQuestionInput!) {\n    createQuestion(input: $input) {\n      id\n    }\n  }\n": types.CreateQuestionDocument,
    "\n  mutation UpdateQuestion($id: ID!, $input: UpdateQuestionInput!) {\n    updateQuestion(id: $id, input: $input) {\n      id\n    }\n  }\n": types.UpdateQuestionDocument,
    "\n  mutation DeleteQuestion($id: ID!) {\n    deleteQuestion(id: $id)\n  }\n": types.DeleteQuestionDocument,
    "\n  query QuestionById($id: ID!) {\n    question(id: $id) {\n      id\n      title\n      description\n      category\n      difficulty\n      referenceAnswer\n      database {\n        id\n        slug\n      }\n    }\n  }\n": types.QuestionByIdDocument,
    "\n  query DatabaseList {\n    databases {\n      id\n      slug\n      description\n    }\n  }\n": types.DatabaseListDocument,
    "\n  query QuestionsTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n  ) {\n    questions(first: $first, after: $after, last: $last, before: $before) {\n      edges {\n        node {\n          id\n          title\n          description\n          category\n          difficulty\n          referenceAnswer\n          database {\n            id\n            slug\n          }\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n": types.QuestionsTableDocument,
    "\n  query GroupAuditInfo($id: ID!) {\n    group(id: $id) {\n      id\n      createdAt\n      updatedAt\n    }\n  }\n": types.GroupAuditInfoDocument,
    "\n  query GroupHeader($id: ID!) {\n    group(id: $id) {\n      id\n      name\n      description\n    }\n  }\n": types.GroupHeaderDocument,
    "\n  query GroupMembers($id: ID!) {\n    users(where: { hasGroupWith: { id: $id } }) {\n      totalCount\n    }\n  }\n": types.GroupMembersDocument,
    "\n  query GroupScopes($id: ID!) {\n    group(id: $id) {\n      id\n      scopeSets {\n        id\n        slug\n        scopes\n      }\n    }\n  }\n": types.GroupScopesDocument,
    "\n  mutation CreateGroup($input: CreateGroupInput!) {\n    createGroup(input: $input) {\n      id\n    }\n  }\n": types.CreateGroupDocument,
    "\n  mutation UpdateGroup($id: ID!, $input: UpdateGroupInput!) {\n    updateGroup(id: $id, input: $input) {\n      id\n    }\n  }\n": types.UpdateGroupDocument,
    "\n  mutation DeleteGroup($id: ID!) {\n    deleteGroup(id: $id)\n  }\n": types.DeleteGroupDocument,
    "\n  query GroupsTable {\n    groups {\n      id\n      name\n      description\n      scopeSets {\n        id\n        slug\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.GroupsTableDocument,
    "\n  query GroupById($id: ID!) {\n    group(id: $id) {\n      id\n      name\n      description\n      scopeSets {\n        id\n        slug\n      }\n    }\n  }\n": types.GroupByIdDocument,
    "\n  query ScopeSetList {\n    scopeSets {\n      id\n      slug\n    }\n  }\n": types.ScopeSetListDocument,
    "\n  query ScopeSetHeader($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      slug\n      description\n    }\n  }\n": types.ScopeSetHeaderDocument,
    "\n  query ScopeSetScopes($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      scopes\n    }\n  }\n": types.ScopeSetScopesDocument,
    "\n  query GroupsWithScopeSet {\n    groups {\n      id\n      name\n      scopeSets {\n        id\n      }\n    }\n  }\n": types.GroupsWithScopeSetDocument,
    "\n  mutation CreateScopeSet($input: CreateScopeSetInput!) {\n    createScopeSet(input: $input) {\n      id\n    }\n  }\n": types.CreateScopeSetDocument,
    "\n  mutation UpdateScopeSet($id: ID!, $input: UpdateScopeSetInput!) {\n    updateScopeSet(id: $id, input: $input) {\n      id\n    }\n  }\n": types.UpdateScopeSetDocument,
    "\n  mutation DeleteScopeSet($id: ID!) {\n    deleteScopeSet(id: $id)\n  }\n": types.DeleteScopeSetDocument,
    "\n  query ScopeSetTable {\n    scopeSets {\n      id\n      slug\n      description\n      scopes\n    }\n  }\n": types.ScopeSetTableDocument,
    "\n  query ScopeSetById($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      slug\n      description\n      scopes\n    }\n  }\n": types.ScopeSetByIdDocument,
    "\n  query UserHeader($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      email\n      avatar\n    }\n  }\n": types.UserHeaderDocument,
    "\n  query UserGroups($id: ID!) {\n    user(id: $id) {\n      id\n      group {\n        id\n        name\n      }\n    }\n  }\n": types.UserGroupsDocument,
    "\n  query UserAuditInfo($id: ID!) {\n    user(id: $id) {\n      id\n      createdAt\n      updatedAt\n    }\n  }\n": types.UserAuditInfoDocument,
    "\n  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {\n    updateUser(id: $id, input: $input) {\n      id\n    }\n  }\n": types.UpdateUserDocument,
    "\n  mutation DeleteUser($id: ID!) {\n    deleteUser(id: $id)\n  }\n": types.DeleteUserDocument,
    "\n  mutation LogoutUserDevices($userID: ID!) {\n    logoutUser(userID: $userID)\n  }\n": types.LogoutUserDevicesDocument,
    "\n  mutation ImpersonateUser($userID: ID!) {\n    impersonateUser(userID: $userID)\n  }\n": types.ImpersonateUserDocument,
    "\n  query UserById($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      email\n      avatar\n      createdAt\n      updatedAt\n      group {\n        id\n        name\n      }\n    }\n  }\n": types.UserByIdDocument,
    "\n  query GroupList {\n    groups {\n      id\n      name\n    }\n  }\n": types.GroupListDocument,
    "\n  query UsersTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n  ) {\n    users(first: $first, after: $after, last: $last, before: $before) {\n      edges {\n        node {\n          id\n          name\n          email\n          avatar\n          createdAt\n          updatedAt\n          group {\n            id\n            name\n          }\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n": types.UsersTableDocument,
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
export function graphql(source: "\n  query DatabaseDetail($id: ID!) {\n    database(id: $id) {\n      id\n      slug\n      description\n      schema\n      relationFigure\n    }\n  }\n"): (typeof documents)["\n  query DatabaseDetail($id: ID!) {\n    database(id: $id) {\n      id\n      slug\n      description\n      schema\n      relationFigure\n    }\n  }\n"];
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
export function graphql(source: "\n  query QuestionDetail($id: ID!) {\n    question(id: $id) {\n      id\n      title\n      description\n      category\n      difficulty\n      referenceAnswer\n      database {\n        id\n        slug\n        description\n      }\n    }\n  }\n"): (typeof documents)["\n  query QuestionDetail($id: ID!) {\n    question(id: $id) {\n      id\n      title\n      description\n      category\n      difficulty\n      referenceAnswer\n      database {\n        id\n        slug\n        description\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query QuestionReferenceAnswerResult($id: ID!) {\n    question(id: $id) {\n      referenceAnswerResult {\n        columns\n        rows\n      }\n    }\n  }\n"): (typeof documents)["\n  query QuestionReferenceAnswerResult($id: ID!) {\n    question(id: $id) {\n      referenceAnswerResult {\n        columns\n        rows\n      }\n    }\n  }\n"];
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
export function graphql(source: "\n  query QuestionsTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n  ) {\n    questions(first: $first, after: $after, last: $last, before: $before) {\n      edges {\n        node {\n          id\n          title\n          description\n          category\n          difficulty\n          referenceAnswer\n          database {\n            id\n            slug\n          }\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query QuestionsTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n  ) {\n    questions(first: $first, after: $after, last: $last, before: $before) {\n      edges {\n        node {\n          id\n          title\n          description\n          category\n          difficulty\n          referenceAnswer\n          database {\n            id\n            slug\n          }\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GroupAuditInfo($id: ID!) {\n    group(id: $id) {\n      id\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GroupAuditInfo($id: ID!) {\n    group(id: $id) {\n      id\n      createdAt\n      updatedAt\n    }\n  }\n"];
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
export function graphql(source: "\n  query GroupScopes($id: ID!) {\n    group(id: $id) {\n      id\n      scopeSets {\n        id\n        slug\n        scopes\n      }\n    }\n  }\n"): (typeof documents)["\n  query GroupScopes($id: ID!) {\n    group(id: $id) {\n      id\n      scopeSets {\n        id\n        slug\n        scopes\n      }\n    }\n  }\n"];
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
export function graphql(source: "\n  query ScopeSetHeader($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      slug\n      description\n    }\n  }\n"): (typeof documents)["\n  query ScopeSetHeader($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      slug\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ScopeSetScopes($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      scopes\n    }\n  }\n"): (typeof documents)["\n  query ScopeSetScopes($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      scopes\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GroupsWithScopeSet {\n    groups {\n      id\n      name\n      scopeSets {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query GroupsWithScopeSet {\n    groups {\n      id\n      name\n      scopeSets {\n        id\n      }\n    }\n  }\n"];
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
export function graphql(source: "\n  query UserHeader($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      email\n      avatar\n    }\n  }\n"): (typeof documents)["\n  query UserHeader($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      email\n      avatar\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserGroups($id: ID!) {\n    user(id: $id) {\n      id\n      group {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query UserGroups($id: ID!) {\n    user(id: $id) {\n      id\n      group {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserAuditInfo($id: ID!) {\n    user(id: $id) {\n      id\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query UserAuditInfo($id: ID!) {\n    user(id: $id) {\n      id\n      createdAt\n      updatedAt\n    }\n  }\n"];
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
export function graphql(source: "\n  query UsersTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n  ) {\n    users(first: $first, after: $after, last: $last, before: $before) {\n      edges {\n        node {\n          id\n          name\n          email\n          avatar\n          createdAt\n          updatedAt\n          group {\n            id\n            name\n          }\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query UsersTable(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n  ) {\n    users(first: $first, after: $after, last: $last, before: $before) {\n      edges {\n        node {\n          id\n          name\n          email\n          avatar\n          createdAt\n          updatedAt\n          group {\n            id\n            name\n          }\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n"];
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