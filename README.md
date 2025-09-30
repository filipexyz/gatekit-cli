# @gatekit/cli

Official CLI for GateKit - Universal messaging gateway.

## Installation

```bash
npm install -g @gatekit/cli
```

## Authentication

### API Key (Recommended)
```bash
export GATEKIT_API_KEY="gk_live_your_api_key_here"
export GATEKIT_API_URL="https://api.gatekit.dev"
```

### Environment Setup
```bash
# Production
export GATEKIT_API_URL="https://api.gatekit.dev"

# Local development
export GATEKIT_API_URL="http://localhost:3000"
```

## Quick Start

```bash
# Send a message with simplified pattern
gatekit messages send --projectSlug my-project \
  --target "platformId:user:123" \
  --text "Hello from GateKit!"

# List received messages
gatekit messages list --projectSlug my-project --limit 10

# Get message statistics
gatekit messages stats --projectSlug my-project
```

## Revolutionary Pattern System

Instead of complex JSON, use simple patterns:

```bash
# Single target
--target "platformId:user:253191879"

# Multiple targets
--targets "platform1:user:123,platform2:channel:456"

# Text shortcut
--text "Your message"
```

## Command Reference

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

## Projects

### Create a new project
```bash
gatekit projects create --name "My Project"
```

### List all projects
```bash
gatekit projects list
```

### Update project name, description and settings
```bash
gatekit projects update my-project --name "New Project Name"
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

## Permission System

The CLI automatically checks your permissions and shows only available commands:

```bash
# If you lack permissions, you'll see:
❌ Insufficient permissions. Required: messages:send

# Get your current permissions:
gatekit auth whoami
```

## Advanced Usage

### Complex Content
```bash
gatekit messages send --projectSlug my-project \
  --target "platformId:user:123" \
  --content '{"text":"Hello","buttons":[{"text":"Click me"}]}'
```

### Filtering Messages
```bash
# Filter by platform
gatekit messages list --platform telegram

# Filter by date range
gatekit messages list --startDate "2024-01-01T00:00:00Z"

# Get failed messages
gatekit messages sent --status failed
```

## Error Handling

The CLI provides helpful error messages:
- **Pattern validation**: Invalid target format guidance
- **Permission errors**: Clear permission requirements
- **API errors**: Detailed error descriptions

## Links

[![View on GitHub](https://img.shields.io/badge/View%20on-GitHub-blue?logo=github)](https://github.com/filipexyz/gatekit-cli)
[![View on npm](https://img.shields.io/badge/View%20on-npm-red?logo=npm)](https://www.npmjs.com/package/@gatekit/cli)

- **📦 Repository**: [github.com/filipexyz/gatekit-cli](https://github.com/filipexyz/gatekit-cli)
- **📥 npm Package**: [@gatekit/cli](https://www.npmjs.com/package/@gatekit/cli)
- **🔧 SDK Package**: [@gatekit/sdk](https://www.npmjs.com/package/@gatekit/sdk)
- **📚 Documentation**: [docs.gatekit.dev](https://docs.gatekit.dev)
- **🎛️ Dashboard**: [app.gatekit.dev](https://app.gatekit.dev)

