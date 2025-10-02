// Generated ApiKeys commands for GateKit CLI
// DO NOT EDIT - This file is auto-generated from backend contracts

import { Command } from 'commander';
import { GateKit } from '@gatekit/sdk';
import { loadConfig, formatOutput, handleError } from '../lib/utils';

export function createApikeysCommand(): Command {
  const apikeys = new Command('api-keys');

  apikeys
    .command('create')
    .description('Generate a new API key')
    .option('--name <value>', 'API key name')
    .option('--scopes <value>', 'Comma-separated scopes')
    .option('--expiresInDays <value>', 'Expiration in days')
    .option('--project <value>', 'Project (uses GATEKIT_DEFAULT_PROJECT if not provided)')
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        const hasPermission = await checkPermissions(config, ["keys:manage"]);
        if (!hasPermission) {
          console.error('❌ Insufficient permissions. Required: keys:manage');
          process.exit(1);
        }

        const gk = new GateKit(config);

        const result = await gk.apikeys.create({
      name: options.name,
      scopes: options.scopes,
      expiresInDays: options.expiresInDays ? parseInt(options.expiresInDays) : undefined,
      project: options.project || config.defaultProject
        });

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  apikeys
    .command('list')
    .description('List all API keys for project')
    .option('--project <value>', 'Project (uses GATEKIT_DEFAULT_PROJECT if not provided)')
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        const hasPermission = await checkPermissions(config, ["keys:read"]);
        if (!hasPermission) {
          console.error('❌ Insufficient permissions. Required: keys:read');
          process.exit(1);
        }

        const gk = new GateKit(config);

        const result = await gk.apikeys.list({ project: options.project || config.defaultProject });

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  apikeys
    .command('revoke')
    .description('Revoke an API key')
    .option('--keyId <value>', 'API key ID to revoke')
    .option('--project <value>', 'Project (uses GATEKIT_DEFAULT_PROJECT if not provided)')
    .option('--keyId <value>', 'keyId parameter', undefined)
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        const hasPermission = await checkPermissions(config, ["keys:manage"]);
        if (!hasPermission) {
          console.error('❌ Insufficient permissions. Required: keys:manage');
          process.exit(1);
        }

        const gk = new GateKit(config);

        const result = await gk.apikeys.revoke(options.keyId, { project: options.project || config.defaultProject });

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  apikeys
    .command('roll')
    .description('Roll an API key (generate new key, revoke old after 24h)')
    .option('--keyId <value>', 'API key ID to roll')
    .option('--project <value>', 'Project (uses GATEKIT_DEFAULT_PROJECT if not provided)')
    .option('--keyId <value>', 'keyId parameter', undefined)
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        const hasPermission = await checkPermissions(config, ["keys:manage"]);
        if (!hasPermission) {
          console.error('❌ Insufficient permissions. Required: keys:manage');
          process.exit(1);
        }

        const gk = new GateKit(config);

        const result = await gk.apikeys.roll(options.keyId, { project: options.project || config.defaultProject });

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  return apikeys;
}


// Target pattern parsing helpers
function parseTargetPattern(pattern: string): { platformId: string; type: string; id: string } {
  const parts = pattern.split(':');
  if (parts.length !== 3) {
    throw new Error('Invalid target pattern. Expected format: platformId:type:id');
  }

  const [platformId, type, id] = parts;

  if (!['user', 'channel', 'group'].includes(type)) {
    throw new Error('Invalid target type. Must be: user, channel, or group');
  }

  return { platformId, type, id };
}

function parseTargetsPattern(pattern: string): Array<{ platformId: string; type: string; id: string }> {
  const patterns = pattern.split(',').map(p => p.trim());
  return patterns.map(parseTargetPattern);
}

function buildMessageDto(options: any): any {
  const dto: any = {};

  // Handle targets - priority: targets pattern > target pattern > content object
  if (options.targets) {
    dto.targets = parseTargetsPattern(options.targets);
  } else if (options.target) {
    dto.targets = [parseTargetPattern(options.target)];
  }

  // Handle content - priority: text shortcut > content object
  if (options.text) {
    dto.content = { text: options.text };
  } else if (options.content) {
    dto.content = JSON.parse(options.content);
  }

  // Handle optional fields
  if (options.options) {
    dto.options = JSON.parse(options.options);
  }
  if (options.metadata) {
    dto.metadata = JSON.parse(options.metadata);
  }

  return dto;
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
