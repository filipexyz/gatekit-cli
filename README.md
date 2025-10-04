# @gatekit/cli

Permission-aware CLI for GateKit - Universal messaging gateway.

> **Auto-generated from backend contracts** - Do not edit manually

## Installation

```bash
npm install -g @gatekit/cli
```

## Quick Start

### Option 1: Using Config File (Recommended for local development)

```bash
# Configure CLI (stores in ~/.gatekit/config.json with secure permissions)
gatekit config set apiUrl https://api.gatekit.dev
gatekit config set apiKey gk_live_your_api_key_here
gatekit config set defaultProject my-project

# Verify configuration
gatekit config list

# Use CLI
gatekit messages send --target "platform-id:user:123" --text "Hello!"
```

### Option 2: Using Environment Variables (Recommended for CI/CD)

```bash
# Set environment variables (override config file)
export GATEKIT_API_URL="https://api.gatekit.dev"
export GATEKIT_API_KEY="gk_live_your_api_key_here"
export GATEKIT_DEFAULT_PROJECT="my-project"

# Use CLI
gatekit projects list --json
```

### Configuration Priority

1. **Environment variables** (highest priority)
2. **Config file** (~/.gatekit/config.json)
3. **Defaults**

This allows you to:

- Use config file for daily work
- Override with env vars for CI/CD or testing
- Keep sensitive keys secure (file has 600 permissions)

## Features

- ✅ **Permission-aware** - Only shows commands you have access to
- ✅ **Auto-generated** - Always synced with backend API
- ✅ **Type-safe** - Built on @gatekit/sdk with full type safety
- ✅ **Interactive** - Helpful prompts and error messages
- ✅ **JSON output** - Perfect for scripting and automation

## Commands

## ApiKeys

### Generate a new API key
```bash
gatekit keys create --name "Bot Key" --scopes "messages:send,messages:read"
```

### List all API keys for project
```bash
gatekit keys list
```

### Revoke an API key
```bash
gatekit keys revoke --keyId "key-123"
```

## Auth

### Create a new user account (first user becomes admin)
```bash
gatekit auth signup --email admin@example.com --password Admin123 --name "Admin User"
```

### Login with email and password
```bash
gatekit auth login --email admin@example.com --password Admin123
```

### Get current authentication context and permissions
```bash
gatekit auth whoami
```

## Identities

### Create a new identity with platform aliases
```bash
gatekit identities create --displayName "John Doe" --email "john@example.com" --aliases '[{"platformId":"platform-123","providerUserId":"discord-456","providerUserDisplay":"JohnD#1234"}]'
```

### List all identities for a project
```bash
gatekit identities list
```

### Lookup identity by platform user ID
```bash
gatekit identities lookup --platformId platform-123 --providerUserId discord-456
```

## Members

### List all members of a project
```bash
gatekit members list my-project
```

### Add a member to a project
```bash
gatekit members add my-project --email user@example.com --role admin
```

### Update a member role in a project
```bash
gatekit members update my-project user-123 --role admin
```

## Messages

### List received messages for a project
```bash
gatekit messages list
```

### Get message statistics for a project
```bash
gatekit messages stats
```

### Get a specific message by ID
```bash
gatekit messages get --messageId "msg-123"
```

## Platform Logs

### List platform processing logs for a project
```bash
gatekit platforms logs list my-project
```

### List logs for a specific platform configuration
```bash
gatekit platforms logs get my-project platform-id-123
```

### Get platform logs statistics and recent errors
```bash
gatekit platforms logs stats my-project
```

## Platforms

### Configure a new platform integration
```bash
gatekit platforms create --platform discord --name "Main Discord Bot" --credentials '{"token":"YOUR_DISCORD_BOT_TOKEN"}'
```

### List configured platforms for project
```bash
gatekit platforms list
```

### Get platform configuration details
```bash
gatekit platforms get --id "platform-123"
```

## Projects

### Create a new project
```bash
gatekit projects create --name "My Project"
```

### List all projects
```bash
gatekit projects list
```

### Get project details
```bash
gatekit projects get my-project
```

## Webhooks

### Create a new webhook for event notifications
```bash
gatekit webhooks create --name "Production Webhook" --url "https://myapp.com/webhooks" --events "message.received,message.sent,message.failed"
```

### List all webhooks for a project
```bash
gatekit webhooks list
```

### Get a specific webhook with delivery statistics
```bash
gatekit webhooks get --webhookId "webhook-123"
```

## Configuration Management

### Config Commands

```bash
# Set configuration values
gatekit config set apiUrl https://api.gatekit.dev
gatekit config set apiKey gk_live_your_api_key_here
gatekit config set defaultProject my-project
gatekit config set outputFormat json

# Get a specific value
gatekit config get apiKey
# Output: apiKey = ***

# List all configuration
gatekit config list
# Output:
#   apiUrl = https://api.gatekit.dev
#   apiKey = ***
#   defaultProject = my-project
```

### Configuration File

Stored in `~/.gatekit/config.json` with **secure permissions (600)**:

```json
{
  "apiUrl": "https://api.gatekit.dev",
  "apiKey": "gk_live_your_api_key_here",
  "defaultProject": "my-project",
  "outputFormat": "table"
}
```

**Security:**

- File permissions: `600` (owner read/write only)
- Directory permissions: `700`
- API keys are never logged or displayed in full
- Safe to use on shared systems

### Environment Variables (Override Config File)

Environment variables have **highest priority**:

```bash
export GATEKIT_API_URL="https://api.gatekit.dev"
export GATEKIT_API_KEY="gk_live_your_api_key_here"
export GATEKIT_JWT_TOKEN="your-jwt-token"  # Alternative to API key
export GATEKIT_DEFAULT_PROJECT="my-project"
export GATEKIT_OUTPUT_FORMAT="json"        # or "table"
```

**Use cases:**

- CI/CD pipelines (GitHub Actions, GitLab CI)
- Docker containers
- Temporary overrides for testing
- Multiple environments

### Configuration Priority

```
┌─────────────────────────────────┐
│ 1. Environment Variables        │ ← Highest priority
├─────────────────────────────────┤
│ 2. Config File (~/.gatekit/)    │
├─────────────────────────────────┤
│ 3. Defaults                     │ ← Lowest priority
└─────────────────────────────────┘
```

## Scripting

The CLI supports `--json` flag for machine-readable output:

```bash
# Get projects as JSON
gatekit projects list --json | jq '.[] | .id'

# Send message and capture result
RESULT=$(gatekit messages send --target "id:user:123" --text "Hello" --json)
echo $RESULT | jq '.jobId'
```

## Links

- [Documentation](https://docs.gatekit.dev)
- [GitHub](https://github.com/filipexyz/gatekit-cli)
- [npm](https://www.npmjs.com/package/@gatekit/cli)
- [Discord Community](https://discord.gg/bQPsvycW)

## License

MIT
