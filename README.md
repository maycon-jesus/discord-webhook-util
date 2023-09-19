# discord-webhook-util
A tiny utility package for posting messages to Discord via webhooks.

## Installing
```
npm install discord-webhook-util
```

## Basic usage
```typescript
import {registerWebhookInCategory, sendMessageToCategory} from 'discord-webhook-util';

// Add a webhook to a category
// registerWebhookInCategory(categoryName, url)
registerWebhookInCategory('category-1', 'https://discord.com/api/webhooks/123456789/abcdefghijklmnopqrstuvwxyz');

// Send message to all webhooks that are in a category
sendMessageToCategory('category-1', {
    content: 'Test',
})
    .then(() => {
        console.log('Message sent successfully!');
    })
    .catch(err => {
        console.error(err);
    });
```