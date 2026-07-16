import { copyFileSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const frontendRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = join(frontendRoot, '..')
const outDir = join(frontendRoot, 'public', 'content')

const sources = [
  { lang: 'java', from: join(repoRoot, 'java', 'readme', 'java.md') },
  { lang: 'python', from: join(repoRoot, 'python', 'readme', 'python.md') },
  { lang: 'golang', from: join(repoRoot, 'golang', 'readme', 'golang.md') },
]

if (existsSync(outDir)) {
  rmSync(outDir, { recursive: true, force: true })
}
mkdirSync(outDir, { recursive: true })

for (const { lang, from } of sources) {
  if (!existsSync(from)) {
    console.warn(`[prepare-content] missing: ${from}`)
    continue
  }
  const dest = join(outDir, `${lang}.md`)
  copyFileSync(from, dest)
  console.log(`[prepare-content] ${lang} -> frontend/public/content/${lang}.md`)
}
