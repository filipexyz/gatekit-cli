#!/usr/bin/env node
// Generated CLI entry point for GateKit
// DO NOT EDIT - This file is auto-generated from backend contracts

import { Command } from 'commander';
import { createApikeysCommand } from './commands/api-keys';
import { createAuthCommand } from './commands/auth';
import { createIdentitiesCommand } from './commands/identities';
import { createMembersCommand } from './commands/members';
import { createMessagesCommand } from './commands/messages';
import { createPlatformLogsCommand } from './commands/platform-logs';
import { createPlatformsCommand } from './commands/platforms';
import { createProjectsCommand } from './commands/projects';
import { createWebhooksCommand } from './commands/webhooks';

const program = new Command();

program
  .name('gatekit')
  .description('GateKit Universal Messaging Gateway CLI')
  .version('1.2.1');

// Add permission-aware commands
  program.addCommand(createApikeysCommand());
  program.addCommand(createAuthCommand());
  program.addCommand(createIdentitiesCommand());
  program.addCommand(createMembersCommand());
  program.addCommand(createMessagesCommand());
  program.addCommand(createPlatformLogsCommand());
  program.addCommand(createPlatformsCommand());
  program.addCommand(createProjectsCommand());
  program.addCommand(createWebhooksCommand());

// Quick send command (AI-optimized)
program
  .command('send')
  .description('Quick message send (AI-optimized)')
  .requiredOption('--project <id>', 'Project ID')
  .requiredOption('--platform <id>', 'Platform ID')
  .requiredOption('--target <id>', 'Target ID')
  .requiredOption('--text <message>', 'Message text')
  .option('--wait', 'Wait for completion')
  .option('--json', 'JSON output')
  .action(async (options) => {
    // Implementation here - delegate to SDK
  });

program.parse(process.argv);
