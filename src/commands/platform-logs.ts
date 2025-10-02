// Generated Platform Logs commands for GateKit CLI
// DO NOT EDIT - This file is auto-generated from backend contracts

import { Command } from 'commander';
import { GateKit } from '@gatekit/sdk';
import { loadConfig, formatOutput, handleError } from '../lib/utils';

export function createPlatformLogsCommand(): Command {
  const platformLogs = new Command('platform-logs');

  platformLogs
    .command('list')
    .description('List platform processing logs for a project')
    .option('--platform <value>', 'Filter by platform (telegram, discord)')
    .option('--level <value>', 'Filter by log level')
    .option('--category <value>', 'Filter by log category')
    .option('--startDate <value>', 'Filter logs after this date (ISO 8601)')
    .option('--endDate <value>', 'Filter logs before this date (ISO 8601)')
    .option('--limit <value>', 'Number of logs to return (1-1000)', '100')
    .option('--offset <value>', 'Number of logs to skip')
    .option('--project <value>', 'Project (uses GATEKIT_DEFAULT_PROJECT if not provided)')
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        const hasPermission = await checkPermissions(config, ["platforms:read"]);
        if (!hasPermission) {
          console.error('❌ Insufficient permissions. Required: platforms:read');
          process.exit(1);
        }

        const gk = new GateKit(config);

        const result = await gk.platformLogs.list({ project: options.project || config.defaultProject });

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  platformLogs
    .command('get')
    .description('List logs for a specific platform configuration')
    .option('--level <value>', 'Filter by log level')
    .option('--category <value>', 'Filter by log category')
    .option('--startDate <value>', 'Filter logs after this date (ISO 8601)')
    .option('--endDate <value>', 'Filter logs before this date (ISO 8601)')
    .option('--limit <value>', 'Number of logs to return (1-1000)', '100')
    .option('--offset <value>', 'Number of logs to skip')
    .option('--project <value>', 'Project (uses GATEKIT_DEFAULT_PROJECT if not provided)')
    .option('--platformId <value>', 'platformId parameter', undefined)
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        const hasPermission = await checkPermissions(config, ["platforms:read"]);
        if (!hasPermission) {
          console.error('❌ Insufficient permissions. Required: platforms:read');
          process.exit(1);
        }

        const gk = new GateKit(config);

        const result = await gk.platformLogs.get(options.platformId, { project: options.project || config.defaultProject });

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  platformLogs
    .command('stats')
    .description('Get platform logs statistics and recent errors')
    .option('--project <value>', 'Project (uses GATEKIT_DEFAULT_PROJECT if not provided)')
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        const hasPermission = await checkPermissions(config, ["platforms:read"]);
        if (!hasPermission) {
          console.error('❌ Insufficient permissions. Required: platforms:read');
          process.exit(1);
        }

        const gk = new GateKit(config);

        const result = await gk.platformLogs.stats({ project: options.project || config.defaultProject });

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  return platformLogs;
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
