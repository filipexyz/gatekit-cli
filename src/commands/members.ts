// Generated Members commands for GateKit CLI
// DO NOT EDIT - This file is auto-generated from backend contracts

import { Command } from 'commander';
import { GateKit } from '@gatekit/sdk';
import { loadConfig, formatOutput, handleError } from '../lib/utils';

export function createMembersCommand(): Command {
  const members = new Command('members');

  members
    .command('list')
    .description('List all members of a project')
    .option('--project <value>', 'Project (uses GATEKIT_DEFAULT_PROJECT if not provided)')
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        const hasPermission = await checkPermissions(config, ["members:read"]);
        if (!hasPermission) {
          console.error('❌ Insufficient permissions. Required: members:read');
          process.exit(1);
        }

        const gk = new GateKit(config);

        const result = await gk.members.list({ project: options.project || config.defaultProject });

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  members
    .command('add')
    .description('Add a member to a project')
    .option('--email <value>', 'Email of user to add')
    .option('--role <value>', 'Role to assign to the member')
    .option('--project <value>', 'Project (uses GATEKIT_DEFAULT_PROJECT if not provided)')
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        const hasPermission = await checkPermissions(config, ["members:write"]);
        if (!hasPermission) {
          console.error('❌ Insufficient permissions. Required: members:write');
          process.exit(1);
        }

        const gk = new GateKit(config);

        const result = await gk.members.add({
      email: options.email,
      role: options.role,
      project: options.project || config.defaultProject
        });

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  members
    .command('update')
    .description('Update a member role in a project')
    .option('--userId <value>', 'User ID of the member to update')
    .option('--role <value>', 'New role to assign')
    .option('--project <value>', 'Project (uses GATEKIT_DEFAULT_PROJECT if not provided)')
    .option('--userId <value>', 'userId parameter', undefined)
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        const hasPermission = await checkPermissions(config, ["members:write"]);
        if (!hasPermission) {
          console.error('❌ Insufficient permissions. Required: members:write');
          process.exit(1);
        }

        const gk = new GateKit(config);

        const result = await gk.members.update(options.userId, {
      role: options.role,
      project: options.project || config.defaultProject
        });

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  members
    .command('remove')
    .description('Remove a member from a project')
    .option('--userId <value>', 'User ID of the member to remove')
    .option('--project <value>', 'Project (uses GATEKIT_DEFAULT_PROJECT if not provided)')
    .option('--userId <value>', 'userId parameter', undefined)
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        const hasPermission = await checkPermissions(config, ["members:write"]);
        if (!hasPermission) {
          console.error('❌ Insufficient permissions. Required: members:write');
          process.exit(1);
        }

        const gk = new GateKit(config);

        const result = await gk.members.remove(options.userId, { project: options.project || config.defaultProject });

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  return members;
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
