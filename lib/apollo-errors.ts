/**
 * GraphQL API error codes.
 *
 * @see https://github.com/database-playground/backend-v2/blob/main/graph/defs/README.md
 */

/**
 * NOT_FOUND: 找不到指定的實體。
 */
export const ERROR_NOT_FOUND = "NOT_FOUND";
/**
 * UNAUTHORIZED: 這個 API 需要認證或授權後才能運作。
 */
export const ERROR_UNAUTHORIZED = "UNAUTHORIZED";
/**
 * NOT_IMPLEMENTED: 這個 API 尚未實作，請先不要呼叫。
 */
export const ERROR_NOT_IMPLEMENTED = "NOT_IMPLEMENTED";
/**
 * FORBIDDEN: 使用者的權限 (scope) 不足以執行這個操作。
 */
export const ERROR_FORBIDDEN = "FORBIDDEN";
/**
 * INVALID_INPUT: 輸入有誤。
 */
export const ERROR_INVALID_INPUT = "INVALID_INPUT";
