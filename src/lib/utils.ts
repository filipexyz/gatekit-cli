// Generated config management for GateKit CLI
// DO NOT EDIT - This file is auto-generated

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

interface CLIConfig {
  apiUrl: string;
  apiKey?: string;
  jwtToken?: string;
  defaultProject?: string;
  outputFormat?: 'table' | 'json';
}

export async function loadConfig(): Promise<CLIConfig> {
  const config: CLIConfig = {
    apiUrl: process.env.GATEKIT_API_URL || 'https://api.gatekit.dev',
    apiKey: process.env.GATEKIT_API_KEY,
    jwtToken: process.env.GATEKIT_JWT_TOKEN,
    defaultProject: process.env.GATEKIT_DEFAULT_PROJECT,
    outputFormat: (process.env.GATEKIT_OUTPUT_FORMAT as any) || 'table',
  };

  // Try to load from config file
  try {
    const configPath = path.join(os.homedir(), '.gatekit', 'config.json');
    const fileConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    Object.assign(config, fileConfig);
  } catch {
    // Config file doesn't exist or is invalid - use environment/defaults
  }

  return config;
}

export function formatOutput(data: any, json: boolean = false): void {
  if (json) {
    console.log(JSON.stringify(data, null, 2));
  } else {
    // Simple table output for humans
    if (Array.isArray(data)) {
      console.table(data);
    } else {
      console.log(data);
    }
  }
}

export function handleError(error: any): void {
  if (error.code === 'INSUFFICIENT_PERMISSIONS') {
    console.error(`❌ Permission denied: ${error.message}`);
    console.error('💡 Contact your administrator to request additional permissions.');
  } else if (error.code === 'AUTHENTICATION_ERROR') {
    console.error('❌ Authentication failed. Check your API key or token.');
  } else {
    console.error(`❌ Error: ${error.message}`);
  }
  process.exit(1);
}
