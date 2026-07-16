import { existsSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const frontendRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const docsDir = join(frontendRoot, '..', 'docs')

if (existsSync(docsDir)) {
  rmSync(docsDir, { recursive: true, force: true })
  console.log('[clean-docs] removed existing ../docs/')
} else {
  console.log('[clean-docs] no existing ../docs/ folder')
}
