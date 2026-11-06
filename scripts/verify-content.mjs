import fs from 'node:fs'
import { execFileSync } from 'node:child_process'
import ts from 'typescript'
import assert from 'node:assert/strict'

const baseline = process.argv[2] || '8509574'
const files = execFileSync('git', ['ls-tree', '-r', '--name-only', baseline], { encoding: 'utf8' }).trim().split('\n')
let checked = 0
for (const file of files) {
  if (!file.startsWith('src/') && !['index.html', 'public/robots.txt', 'public/sitemap.xml'].includes(file)) continue
  if (!/\.(tsx?|html|xml|txt)$/.test(file)) continue
  const original = execFileSync('git', ['show', `${baseline}:${file}`], { encoding: 'utf8' })
  const current = fs.readFileSync(file, 'utf8')
  if (file === 'index.html') {
    for (const match of original.matchAll(/<meta\b[^>]*>|<title>[\s\S]*?<\/title>|<link rel="canonical"[^>]*>|<script type="application\/ld\+json">[\s\S]*?<\/script>/g)) {
      if (match[0].includes('name="theme-color"')) continue
      assert.ok(current.includes(match[0]), 'Original SEO metadata changed')
    }
  }
  if (file.startsWith('src/data/') || file === 'src/constants/siteConfig.ts' || !file.endsWith('.tsx')) {
    if (file.startsWith('src/data/') || file === 'src/constants/siteConfig.ts' || !file.startsWith('src/')) {
      // HTML may gain loading hints, but existing metadata must remain intact.
      if (file !== 'index.html') assert.equal(current.replace(/\r/g, ''), original.replace(/\r/g, ''), file)
    }
  } else {
    const content = (source) => {
      const result = []
      const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
      const visit = node => {
        if (ts.isJsxText(node) && node.text.trim()) result.push(node.text.replace(/\s+/g, ' ').trim())
        if (ts.isJsxAttribute(node) && ['href', 'alt', 'label'].includes(node.name.getText(tree))) result.push(node.getText(tree))
        ts.forEachChild(node, visit)
      }
      visit(tree)
      return result
    }
    const before = content(original), after = content(current)
    for (const value of before) assert.ok(after.includes(value), `${file}: missing original content ${value}`)
    if (process.argv.includes('--exact')) assert.deepEqual([...after].sort(), [...before].sort(), `${file}: original text or link inventory changed`)
  }
  checked++
}
console.log(`Preserved original content and data across ${checked} source files (baseline ${baseline}).`)
