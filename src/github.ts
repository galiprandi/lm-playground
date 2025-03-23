import { execSync } from "child_process";

/**
 * Reads a GitHub secret using the GitHub CLI (gh)
 * @param secretName The name of the secret to read
 * @param repo Optional repository in format owner/repo. If not provided, uses the current repository
 * @returns The value of the secret or null if not found
 */
export function getGithubSecret(
  secretName: string,
  repo?: string
): string | null {
  try {
    const repoFlag = repo ? `--repo ${repo}` : "";

    // Execute the GitHub CLI command to get the secret
    // Note: This requires the user to be authenticated with gh CLI
    const command = `gh secret get ${secretName} ${repoFlag}`;

    const result = execSync(command, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"], // Redirect stdin, stdout, stderr
    }).trim();

    return result;
  } catch (error) {
    console.error(`Error retrieving GitHub secret ${secretName}:`, error);
    return null;
  }
}

/**
 * Reads multiple GitHub secrets at once
 * @param secretNames Array of secret names to read
 * @param repo Optional repository in format owner/repo
 * @returns Object mapping secret names to their values
 */
export function getGithubSecrets(
  secretNames: string[],
  repo?: string
): Record<string, string | null> {
  const secrets: Record<string, string | null> = {};

  for (const secretName of secretNames) {
    secrets[secretName] = getGithubSecret(secretName, repo);
  }

  return secrets;
}



/**
 * Reads a secret from environment variables or GitHub secrets
 * @param secretName The name of the secret to read
 * @returns The value of the secret or null if not found
 */
export const getSecret = (secretName: string) =>
  process.env[secretName] || getGithubSecret(secretName);
