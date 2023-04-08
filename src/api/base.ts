/**
 * 此刻的prefix是为了兼容以后的版本变化
 * 可将prefix设置为
 * ''
 * '.'
 * '/api'
 * 'http://domain.com'
 *
 * 若以后设置axios的默认url，则可以将prefix设置为/api或空字符串
 */
export const isProd = process.env.NODE_ENV === 'production';
export const prefix = isProd
  ? 'http://localhost:7000'
  : 'http://localhost:7000';