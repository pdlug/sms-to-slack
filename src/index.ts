import { Router } from 'itty-router'
import incomingSMS from './handlers/incomingSMS'

const router = Router()

router.post('/incoming', incomingSMS)

router.all('*', () => new Response('404 not found', { status: 404 }))

const worker: ExportedHandler = {
  async fetch(req, env) {
    return router.handle(req, env)
  },
}

export default worker
