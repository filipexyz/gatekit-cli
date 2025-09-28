// Generated Messages commands for GateKit CLI
// DO NOT EDIT - This file is auto-generated from backend contracts

import { Command } from 'commander';
import { GateKit } from '@gatekit/sdk';
import { loadConfig, formatOutput, handleError } from '../lib/utils';

export function createMessagesCommand(): Command {
  const messages = new Command('messages');

  messages
    .command('list')
    .description('List received messages for a project')
    .option('--platform <value>', 'Filter by platform (telegram, discord, whatsapp-evo)')
    .option('--chatId <value>', 'Filter by chat/channel ID')
    .option('--userId <value>', 'Filter by user ID')
    .option('--startDate <value>', 'Filter messages after this date (ISO 8601)')
    .option('--endDate <value>', 'Filter messages before this date (ISO 8601)')
    .option('--limit <value>', 'Number of messages to return (1-100)', '50')
    .option('--offset <value>', 'Number of messages to skip')
    .option('--order <value>', 'Sort order (asc or desc)', 'desc')
    .option('--projectSlug <value>', 'projectSlug parameter', 'default')
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        const hasPermission = await checkPermissions(config, ["messages:read"]);
        if (!hasPermission) {
          console.error('❌ Insufficient permissions. Required: messages:read');
          process.exit(1);
        }

        const gk = new GateKit(config);

        const result = await gk.messages.list(options.projectSlug || 'default', {
      platform: options.platform,
      chatId: options.chatId,
      userId: options.userId,
      startDate: options.startDate,
      endDate: options.endDate,
      limit: options.limit ? parseInt(options.limit) : undefined,
      offset: options.offset ? parseInt(options.offset) : undefined,
      order: options.order
        });

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  messages
    .command('stats')
    .description('Get message statistics for a project')
    .option('--projectSlug <value>', 'projectSlug parameter', 'default')
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        const hasPermission = await checkPermissions(config, ["messages:read"]);
        if (!hasPermission) {
          console.error('❌ Insufficient permissions. Required: messages:read');
          process.exit(1);
        }

        const gk = new GateKit(config);

        const result = await gk.messages.stats(options.projectSlug || 'default');

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  messages
    .command('get')
    .description('Get a specific message by ID')
    .option('--messageId <value>', 'Message ID')
    .option('--projectSlug <value>', 'projectSlug parameter', 'default')
    .option('--messageId <value>', 'messageId parameter', undefined)
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        const hasPermission = await checkPermissions(config, ["messages:read"]);
        if (!hasPermission) {
          console.error('❌ Insufficient permissions. Required: messages:read');
          process.exit(1);
        }

        const gk = new GateKit(config);

        const result = await gk.messages.get(options.projectSlug || 'default', options.messageId || 'default');

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  messages
    .command('cleanup')
    .description('Delete messages older than specified days')
    .option('--daysBefore <value>', 'Delete messages older than this many days')
    .option('--projectSlug <value>', 'projectSlug parameter', 'default')
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        const hasPermission = await checkPermissions(config, ["messages:write"]);
        if (!hasPermission) {
          console.error('❌ Insufficient permissions. Required: messages:write');
          process.exit(1);
        }

        const gk = new GateKit(config);

        const result = await gk.messages.cleanup(options.projectSlug || 'default');

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  messages
    .command('send')
    .description('Send a message to platforms')
    .option('--target <value>', 'Single target in format: platformId:type:id')
    .option('--targets <value>', 'Multiple targets comma-separated: platformId:type:id,platformId:type:id')
    .option('--text <value>', 'Message text content')
    .option('--content <value>', 'Full message content object (advanced)')
    .option('--options <value>', 'Message options')
    .option('--metadata <value>', 'Message metadata')
    .option('--projectSlug <value>', 'projectSlug parameter', 'default')
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        const hasPermission = await checkPermissions(config, ["messages:send"]);
        if (!hasPermission) {
          console.error('❌ Insufficient permissions. Required: messages:send');
          process.exit(1);
        }

        const gk = new GateKit(config);

        const result = await gk.messages.send(options.projectSlug || 'default', buildMessageDto(options));

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  messages
    .command('status')
    .description('Check message delivery status')
    .option('--jobId <value>', 'Message job ID')
    .option('--projectSlug <value>', 'projectSlug parameter', 'default')
    .option('--jobId <value>', 'jobId parameter', undefined)
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        const hasPermission = await checkPermissions(config, ["messages:read"]);
        if (!hasPermission) {
          console.error('❌ Insufficient permissions. Required: messages:read');
          process.exit(1);
        }

        const gk = new GateKit(config);

        const result = await gk.messages.status(options.projectSlug || 'default', options.jobId || 'default');

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  messages
    .command('retry')
    .description('Retry a failed message')
    .option('--jobId <value>', 'Failed message job ID')
    .option('--projectSlug <value>', 'projectSlug parameter', 'default')
    .option('--jobId <value>', 'jobId parameter', undefined)
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        const hasPermission = await checkPermissions(config, ["messages:send"]);
        if (!hasPermission) {
          console.error('❌ Insufficient permissions. Required: messages:send');
          process.exit(1);
        }

        const gk = new GateKit(config);

        const result = await gk.messages.retry(options.projectSlug || 'default', options.jobId || 'default');

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  messages
    .command('sent')
    .description('List sent messages for a project')
    .option('--platform <value>', 'Filter by platform')
    .option('--status <value>', 'Filter by status (pending, sent, failed)')
    .option('--limit <value>', 'Number of messages to return', '50')
    .option('--offset <value>', 'Number of messages to skip')
    .option('--projectSlug <value>', 'projectSlug parameter', 'default')
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        const hasPermission = await checkPermissions(config, ["messages:read"]);
        if (!hasPermission) {
          console.error('❌ Insufficient permissions. Required: messages:read');
          process.exit(1);
        }

        const gk = new GateKit(config);

        const result = await gk.messages.sent(options.projectSlug || 'default');

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  return messages;
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
