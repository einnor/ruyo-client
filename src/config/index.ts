/**
 * Get the value of an environment variable
 *
 * @param variable
 */
export const get = (variable: string) => {
  return process.env[variable];
};
