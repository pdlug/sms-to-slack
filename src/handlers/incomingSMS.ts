import { Request } from 'itty-router'
import qs from 'qs'
import { twiml } from 'twilio'

async function postSlackWebhook(url: string, text: string) {
  const payload = { text }

  await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

type RequestEnv = {
  SLACK_WEBHOOK_URL: string
}

export default async (request: Request, env: RequestEnv): Promise<Response> => {
  const body = await request.text?.()
  const params = qs.parse(body)
  const text = (params['Body'] ?? '') as string

  await postSlackWebhook(
    env.SLACK_WEBHOOK_URL,
    `From ${params['From']}: ${text}`,
  )

  const reply = new twiml.MessagingResponse()
  reply.message(`Hi, thanks for txting. You said: ${text}`)

  return new Response(reply.toString(), {
    headers: { 'Content-Type': 'text/xml' },
  })
}
