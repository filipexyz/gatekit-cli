# @gatekit/cli

Permission-aware CLI for GateKit - Universal messaging gateway.

> **Auto-generated from backend contracts** - Do not edit manually

## Installation

```bash
npm install -g @gatekit/cli
```

## Quick Start

```bash
# Configure CLI
gatekit config set apiUrl https://api.gatekit.dev
gatekit config set apiKey gk_live_your_api_key_here
gatekit config set defaultProject my-project

# Send a message
gatekit messages send \
  --target "platform-id:user:123" \
  --text "Hello from GateKit CLI!"

# List projects
gatekit projects list --json

# Create a platform configuration
gatekit platforms create \
  --platform discord \
  --credentials '{"token":"bot-token"}'
```

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

### Get current authentication context and permissions
```bash
gatekit auth whoami --help
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

## Configuration

The CLI stores configuration in `~/.gatekit/config.json`:

```json
{
  "apiUrl": "https://api.gatekit.dev",
  "apiKey": "gk_live_your_api_key_here",
  "defaultProject": "my-project"
}
```

### Environment Variables

You can override configuration with environment variables:

- `GATEKIT_API_URL` - API URL
- `GATEKIT_API_KEY` - API key for authentication
- `GATEKIT_JWT_TOKEN` - JWT token (alternative to API key)
- `GATEKIT_DEFAULT_PROJECT` - Default project ID

## Authentication

### API Key (Recommended)

```bash
gatekit config set apiKey gk_live_your_api_key_here
```

### JWT Token

```bash
export GATEKIT_JWT_TOKEN="your-jwt-token"
gatekit projects list
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
