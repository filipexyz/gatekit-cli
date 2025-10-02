// Generated Webhooks commands for GateKit CLI
// DO NOT EDIT - This file is auto-generated from backend contracts

import { Command } from 'commander';
import { GateKit } from '@gatekit/sdk';
import { loadConfig, formatOutput, handleError } from '../lib/utils';

export function createWebhooksCommand(): Command {
  const webhooks = new Command('webhooks');

  webhooks
    .command('create')
    .description('Create a new webhook for event notifications')
    .option('--name <value>', 'Friendly name for the webhook')
    .option('--url <value>', 'Target URL for webhook delivery')
    .option('--events <value>', 'Events to subscribe to (comma-separated: message.received,message.sent,message.failed,button.clicked,reaction.added,reaction.removed)')
    .option('--secret <value>', 'Custom webhook secret (auto-generated if not provided)')
    .option('--project <value>', 'Project (uses GATEKIT_DEFAULT_PROJECT if not provided)')
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        const hasPermission = await checkPermissions(config, ["webhooks:write"]);
        if (!hasPermission) {
          console.error('❌ Insufficient permissions. Required: webhooks:write');
          process.exit(1);
        }

        const gk = new GateKit(config);

        const result = await gk.webhooks.create({
      name: options.name,
      url: options.url,
      events: options.events,
      secret: options.secret,
      project: options.project || config.defaultProject
        });

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  webhooks
    .command('list')
    .description('List all webhooks for a project')
    .option('--project <value>', 'Project (uses GATEKIT_DEFAULT_PROJECT if not provided)')
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        const hasPermission = await checkPermissions(config, ["webhooks:read"]);
        if (!hasPermission) {
          console.error('❌ Insufficient permissions. Required: webhooks:read');
          process.exit(1);
        }

        const gk = new GateKit(config);

        const result = await gk.webhooks.list({ project: options.project || config.defaultProject });

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  webhooks
    .command('get')
    .description('Get a specific webhook with delivery statistics')
    .option('--webhookId <value>', 'Webhook ID')
    .option('--project <value>', 'Project (uses GATEKIT_DEFAULT_PROJECT if not provided)')
    .option('--webhookId <value>', 'webhookId parameter', undefined)
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        const hasPermission = await checkPermissions(config, ["webhooks:read"]);
        if (!hasPermission) {
          console.error('❌ Insufficient permissions. Required: webhooks:read');
          process.exit(1);
        }

        const gk = new GateKit(config);

        const result = await gk.webhooks.get(options.webhookId, { project: options.project || config.defaultProject });

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  webhooks
    .command('update')
    .description('Update a webhook configuration')
    .option('--webhookId <value>', 'Webhook ID')
    .option('--name <value>', 'New webhook name')
    .option('--url <value>', 'New webhook URL')
    .option('--events <value>', 'New events subscription')
    .option('--isActive <value>', 'Enable or disable webhook')
    .option('--project <value>', 'Project (uses GATEKIT_DEFAULT_PROJECT if not provided)')
    .option('--webhookId <value>', 'webhookId parameter', undefined)
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        const hasPermission = await checkPermissions(config, ["webhooks:write"]);
        if (!hasPermission) {
          console.error('❌ Insufficient permissions. Required: webhooks:write');
          process.exit(1);
        }

        const gk = new GateKit(config);

        const result = await gk.webhooks.update(options.webhookId, {
      name: options.name,
      url: options.url,
      events: options.events,
      isActive: options.isActive !== undefined ? (options.isActive === 'true' || options.isActive === true) : undefined,
      project: options.project || config.defaultProject
        });

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  webhooks
    .command('delete')
    .description('Delete a webhook')
    .option('--webhookId <value>', 'Webhook ID')
    .option('--project <value>', 'Project (uses GATEKIT_DEFAULT_PROJECT if not provided)')
    .option('--webhookId <value>', 'webhookId parameter', undefined)
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        const hasPermission = await checkPermissions(config, ["webhooks:write"]);
        if (!hasPermission) {
          console.error('❌ Insufficient permissions. Required: webhooks:write');
          process.exit(1);
        }

        const gk = new GateKit(config);

        const result = await gk.webhooks.delete(options.webhookId, { project: options.project || config.defaultProject });

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  webhooks
    .command('deliveries')
    .description('List webhook delivery attempts with filtering')
    .option('--webhookId <value>', 'Webhook ID')
    .option('--event <value>', 'Filter by event type')
    .option('--status <value>', 'Filter by delivery status')
    .option('--limit <value>', 'Number of deliveries to return (1-100)', '50')
    .option('--offset <value>', 'Number of deliveries to skip', '0')
    .option('--project <value>', 'Project (uses GATEKIT_DEFAULT_PROJECT if not provided)')
    .option('--webhookId <value>', 'webhookId parameter', undefined)
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        const config = await loadConfig();

        // Check permissions
        const hasPermission = await checkPermissions(config, ["webhooks:read"]);
        if (!hasPermission) {
          console.error('❌ Insufficient permissions. Required: webhooks:read');
          process.exit(1);
        }

        const gk = new GateKit(config);

        const result = await gk.webhooks.deliveries(options.webhookId, { project: options.project || config.defaultProject });

        formatOutput(result, options.json);
      } catch (error) {
        handleError(error);
      }
    });

  return webhooks;
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
