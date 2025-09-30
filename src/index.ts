#!/usr/bin/env node
// Generated CLI entry point for GateKit
// DO NOT EDIT - This file is auto-generated from backend contracts

import { Command } from 'commander';
import { createWebhooksCommand } from './commands/webhooks';
import { createMembersCommand } from './commands/members';
import { createProjectsCommand } from './commands/projects';
import { createPlatformsCommand } from './commands/platforms';
import { createMessagesCommand } from './commands/messages';
import { createApikeysCommand } from './commands/api-keys';
import { createPlatformLogsCommand } from './commands/platform-logs';

const program = new Command();

program
  .name('gatekit')
  .description('GateKit Universal Messaging Gateway CLI')
  .version('1.0.0');

// Add permission-aware commands
  program.addCommand(createWebhooksCommand());
  program.addCommand(createMembersCommand());
  program.addCommand(createProjectsCommand());
  program.addCommand(createPlatformsCommand());
  program.addCommand(createMessagesCommand());
  program.addCommand(createApikeysCommand());
  program.addCommand(createPlatformLogsCommand());

// Quick send command (AI-optimized)
program
  .command('send')
  .description('Quick message send (AI-optimized)')
  .requiredOption('--project <slug>', 'Project slug')
  .requiredOption('--platform <id>', 'Platform ID')
  .requiredOption('--target <id>', 'Target ID')
  .requiredOption('--text <message>', 'Message text')
  .option('--wait', 'Wait for completion')
  .option('--json', 'JSON output')
  .action(async (options) => {
    // Implementation here - delegate to SDK
  });

program.parse(process.argv);
