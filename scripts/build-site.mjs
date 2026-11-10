import { cp, copyFile, mkdir, rm, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const out = path.join(root, '_site');
const pages = [
  'index.html',
  'study-plan.html',
  'c-checker.html',
  'physical-code-practice.html',
  'physical-vehicle-exam.html',
  '.nojekyll',
];

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
for (const file of pages) {
  await stat(path.join(root, file));
  await copyFile(path.join(root, file), path.join(out, file));
}
await cp(path.join(root, 'assets'), path.join(out, 'assets'), { recursive: true });
console.log('Prepared _site:', pages.join(', '), 'and assets/');
