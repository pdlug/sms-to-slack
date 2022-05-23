# Simple SMS to Slack using Twilio

Relays every text message sent to a number in Twilio to a Slack channel and sends a reply as an example.
Deployed with [Cloudflare Workers](https://workers.cloudflare.com/).

## Deployment

1. Create a Slack App in your workspace and add an incoming webhook for the
   channel you'd like to receive messages in.
2. Edit `wrangler.toml` and set the name to whatever you'd like and the `SLACK_WEBHOOK_URL` var to the URL of the incoming webhook you setup.
3. Run `npm run deploy` to deploy to Cloudflare
4. Get a phone number in Twilio and configure the SMS incoming webhook (see:
   [instructions](https://www.twilio.com/docs/usage/webhooks/sms-webhooks)) to
   use the hostname returned by the deployment with `/incoming` in the path (ex:
   `https://sms-to-slack.username.workers.dev/incoming`)

We don't use `@slack/webhook` because it uses axios which does not currently work with Cloudflare Workers. See [axios #1219](https://github.com/axios/axios/issues/1219) and the follow up discussions about [axios next #4477](https://github.com/axios/axios/discussions/4477).
