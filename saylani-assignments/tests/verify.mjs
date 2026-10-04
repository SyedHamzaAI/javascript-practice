import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Script } from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(readFileSync(resolve(root, 'manifest.json'), 'utf8'));
const expectedCounts = [7, 9, 4, 3, 13, 5, 11, 7, 15, 10, 18, 8, 14, 14, 10, 5, 3, 2, 2];
assert.equal(manifest.length, 19);
assert.deepEqual(manifest.map(group => group.questions.length), expectedCounts);
assert.equal(manifest.flatMap(group => group.questions).length, 160);
assert.deepEqual(manifest[5].questions.map(q => q.number), [1, 2, 3, 5, 6]);
for (const group of manifest) {
    if (group !== manifest[5]) {
        assert.deepEqual(group.questions.map(q => q.number), Array.from({ length: group.questions.length }, (_, i) => i + 1));
    }
    for (const question of group.questions) {
        assert.ok(existsSync(resolve(root, question.path)), question.path);
        const code = readFileSync(resolve(root, question.script), 'utf8');
        new Script(code, { filename: question.script });
        assert.ok(code.trim().split('\n').length > 3, 'Missing solution: ' + question.script);
        assert.ok(!/\b(TODO|FIXME|not implemented)\b/i.test(code), question.script);
    }
}
let htmlCount = 0;
function verifyDirectory(directory) {
    for (const entry of readdirSync(directory)) {
        if (entry === 'node_modules' || entry === 'test-results' || entry === 'playwright-report') continue;
        const path = resolve(directory, entry);
        if (statSync(path).isDirectory()) { verifyDirectory(path); continue; }
        if (extname(path) !== '.html') continue;
        htmlCount++;
        const markup = readFileSync(path, 'utf8');
        assert.match(markup, /<html lang="en">/);
        assert.match(markup, /name="viewport"/);
        for (const match of markup.matchAll(/(?:href|src)="([^"]+)"/g)) {
            const reference = match[1];
            if (/^(https?:|#|data:|mailto:)/.test(reference)) continue;
            assert.ok(existsSync(resolve(directory, reference.split('#')[0])), path + ': missing ' + reference);
        }
        for (const match of markup.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) {
            if (match[1].trim()) new Script(match[1], { filename: path });
        }
    }
}
verifyDirectory(root);
assert.equal(htmlCount, 180);
new Script(readFileSync(resolve(root, 'shared/helpers.js'), 'utf8'));
new Script(readFileSync(resolve(root, 'shared/hub.js'), 'utf8'));
for (const asset of ['1.jpg', '2.jpg', '3.jpg', '5.jpg', 'iphone11promax.jpg', 'sam.png', 'p40.jpg', 'lgg5.jpeg']) {
    assert.ok(statSync(resolve(root, 'assets', asset)).size > 1000, asset);
}
console.log('Verified 160 exercise scripts, 19 chapter groups, 180 HTML pages, and all local references.');
