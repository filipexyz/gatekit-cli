// Generated Auth commands for GateKit CLI
// DO NOT EDIT - This file is auto-generated from backend contracts

import { Command } from 'commander';
import { GateKit } from '@gatekit/sdk';
import { loadConfig, formatOutput, handleError } from '../lib/utils';


export function createAuthCommand(): Command {
  const auth = new Command('auth');

  auth
    .command('signup')
    .description('Create a new user account (first user becomes admin)')
    .option('--email <value>', 'Email address')
    .option('--password <value>', 'Password (min 8 chars, 1 uppercase, 1 number)')
    .option('--name <value>', 'Full name')
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        // No permissions required for this command

        const gk = new GateKit(config);

        const result = await gk.auth.signup({
      email: options.email,
      password: options.password,
      name: options.name
        });

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  auth
    .command('login')
    .description('Login with email and password')
    .option('--email <value>', 'Email address')
    .option('--password <value>', 'Password')
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        // No permissions required for this command

        const gk = new GateKit(config);

        const result = await gk.auth.login({
      email: options.email,
      password: options.password
        });

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  auth
    .command('whoami')
    .description('Get current authentication context and permissions')

    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        // No permissions required for this command

        const gk = new GateKit(config);

        const result = await gk.auth.whoami();

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  return auth;
}


async function checkPermissions(config: any, requiredScopes: string[]): Promise<boolean> {
  try {
    // We need to add a permissions method to the SDK
    // For now, use axios directly
    const axios = require('axios');
    const client = axios.create({
      baseURL: config.apiUrl,
      headers: config.apiKey ? { 'X-API-Key': config.apiKey } : { 'Authorization': `Bearer ${config.jwtToken}` }
    });

    const response = await client.get('/api/v1/auth/whoami');
    const userPermissions = response.data.permissions || [];

    return requiredScopes.every(scope => userPermissions.includes(scope));
  } catch {
    return false; // Assume no permission if check fails
  }
}
