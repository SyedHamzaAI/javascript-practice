import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { dirname, resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(readFileSync(resolve(root, 'manifest.json'), 'utf8'));
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.json': 'application/json', '.md': 'text/plain; charset=utf-8' };
const server = createServer((request, response) => {
    const url = new URL(request.url, 'http://localhost');
    const path = resolve(root, '.' + decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname));
    if (!path.startsWith(root + sep) || !existsSync(path) || !statSync(path).isFile()) {
        response.writeHead(404).end('Not found');
        return;
    }
    response.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream' });
    response.end(readFileSync(path));
});
await new Promise(resolveListen => server.listen(0, '127.0.0.1', resolveListen));
const base = 'http://127.0.0.1:' + server.address().port;
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_EXECUTABLE_PATH || chromium.executablePath() });
const context = await browser.newContext({ timezoneId: 'Asia/Karachi', viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
await page.addInitScript(() => { Math.random = () => 0.4; });
const defaultDate = '2026-10-04T12:00:00+05:00';
let queue = [], alerts = [], errors = [];
page.on('pageerror', error => errors.push(error.message));
page.on('dialog', async dialog => {
    if (dialog.type() === 'prompt') {
        const answer = queue.length ? queue.shift() : dialog.defaultValue();
        if (answer === null) await dialog.dismiss();
        else await dialog.accept(String(answer));
    } else {
        alerts.push(dialog.message());
        await dialog.accept();
    }
});

function questionPath(slug, number) {
    return slug + '/question-' + String(number).padStart(2, '0') + '/index.html';
}

async function visit(path, inputs = [], now = defaultDate) {
    queue = [...inputs]; alerts = []; errors = [];
    await page.clock.setFixedTime(new Date(now));
    const response = await page.goto(base + '/' + path, { waitUntil: 'load' });
    assert.equal(response.status(), 200, path);
    assert.deepEqual(errors, [], 'Browser errors in ' + path);
    return await page.locator('#output').count() ? page.locator('#output').textContent() : '';
}

async function expectOutput(slug, number, inputs, expected, now = defaultDate) {
    const text = await visit(questionPath(slug, number), inputs, now);
    for (const fragment of Array.isArray(expected) ? expected : [expected]) {
        assert.ok(text.includes(fragment), `${slug} Q${number}: expected ${JSON.stringify(fragment)} in ${JSON.stringify(text)}`);
    }
}

// Independent expected results for the examples. Every exercise is opened in Chromium.
const examples = JSON.parse(readFileSync(new URL('./expected.json', import.meta.url), 'utf8'));

try {
    let count = 0;
    for (let g = 0; g < manifest.length; g++) {
        const group = manifest[g];
        assert.equal(examples[g].length, group.questions.length);
        for (let q = 0; q < group.questions.length; q++) {
            const question = group.questions[q];
            const text = await visit(question.path);
            const expected = examples[g][q];
            assert.ok(text.includes(expected), `${question.path}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(text)}`);
            assert.equal(await page.locator('h1').count(), 1);
            const brokenImages = await page.locator('img[src]').evaluateAll(images => images.filter(image => !image.complete || image.naturalWidth === 0).map(image => image.getAttribute('src')));
            assert.deepEqual(brokenImages, [], question.path + ': broken images');
            count++;
        }
        console.log(`Chapters ${group.chapters}: ${group.questions.length} exercises passed`);
    }
    assert.equal(count, 160);

    // Operator order, default handling, division by zero and the source grade thresholds.
    await expectOutput('chapters-06-09', 2, [], ['a is 1', 'b is 0', 'result is 3']);
    await expectOutput('chapters-06-09', 5, [''], '5 x 10 = 50');
    await expectOutput('chapters-06-09', 5, [null], '5 x 10 = 50');
    await expectOutput('chapters-06-09', 5, ['0'], '0 x 10 = 0');
    await expectOutput('chapter-05', 1, ['invalid', '2', '3'], 'Sum of 2 and 3 is 5');
    assert.equal(alerts.length, 1);
    await expectOutput('chapter-05', 2, ['10', '0'], 'nonzero divisor');
    await expectOutput('chapters-09-11', 5, [], 'conditions 2 and 4');
    assert.deepEqual(alerts, ['given condition for variable a is true', 'condition 2 is true', 'condition 4 is true', 'The cost equals', 'True', 'car is smaller than cat']);
    for (const [mark, grade] of [[80, 'A-one'], [70, 'A'], [60, 'B'], [59, 'Fail']]) {
        await expectOutput('chapters-09-11', 6, ['300', String(mark), String(mark), String(mark)], 'Grade: ' + grade);
    }
    await expectOutput('chapters-09-11', 6, ['10', '10', '10', '10'], 'cannot exceed total marks');
    await expectOutput('chapters-09-11', 7, ['6'], 'Close enough');
    await expectOutput('chapters-09-11', 11, ['9', '0', '/'], 'Cannot divide');
    for (const [operator, answer] of [['+', 13], ['-', 5], ['*', 36], ['/', 2.25], ['%', 1]]) {
        await expectOutput('chapters-09-11', 11, ['9', '4', operator], '= ' + answer);
    }
    await expectOutput('chapters-09-11', 11, ['9', '4', '?'], 'Invalid operator');
    for (const [input, classification] of [['7', 'number'], ['a', 'lowercase'], ['Z', 'uppercase'], ['!', 'special']]) {
        await expectOutput('chapters-12-13', 1, [input], 'is a' + (classification === 'uppercase' ? 'n ' : ' ') + classification);
    }
    await expectOutput('chapters-12-13', 2, ['4', '4'], 'Both integers are equal.');
    await expectOutput('chapters-12-13', 3, ['0'], 'The number is zero.');
    await expectOutput('chapters-12-13', 4, ['z'], 'false');
    await expectOutput('chapters-12-13', 5, [''], 'Please enter your password');
    await expectOutput('chapters-12-13', 5, [null], 'Please enter your password');
    await expectOutput('chapters-12-13', 5, ['wrong'], 'Incorrect password');
    for (const [time, greeting] of [['0000', 'morning'], ['1159', 'morning'], ['1200', 'afternoon'], ['1659', 'afternoon'], ['1700', 'evening'], ['2059', 'evening'], ['2100', 'night'], ['2359', 'night']]) {
        await expectOutput('chapters-12-13', 7, [time], 'Good ' + greeting);
    }
    await expectOutput('chapters-12-13', 7, ['1260'], 'Invalid time');

    // Actual array order and validation behavior, including safe text output.
    await expectOutput('chapters-14-16', 13, [], 'Out: keyboard');
    assert.deepEqual(await page.locator('#output p').allTextContents(), ['Devices: keyboard, mouse, printer, monitor', 'Out: keyboard', 'Out: mouse', 'Out: printer', 'Out: monitor']);
    await expectOutput('chapters-14-16', 14, [], 'Out: monitor');
    assert.deepEqual(await page.locator('#output p').allTextContents(), ['Devices: keyboard, mouse, printer, monitor', 'Out: monitor', 'Out: printer', 'Out: mouse', 'Out: keyboard']);
    await visit(questionPath('chapters-14-16', 15));
    assert.deepEqual(await page.locator('#manufacturer option').allTextContents(), ['Apple', 'Samsung', 'Motorola', 'Nokia', 'Sony', 'Haier']);
    await expectOutput('chapters-21-25', 11, ['  MULTI   word tEXT  '], 'Multi Word Text');
    await expectOutput('chapters-21-25', 13, ['bad@name', 'Hamza'], 'Valid username: Hamza');
    assert.equal(alerts.length, 1);
    await expectOutput('chapters-21-25', 13, [null], 'cancelled');
    await expectOutput('chapters-21-25', 14, ['cOoKiE'], 'available at index 2');
    await expectOutput('chapters-21-25', 14, ['brownie'], 'not available');
    for (const invalidPassword of ['123abc', 'abcdef', '123456', 'ab1']) {
        await expectOutput('chapters-21-25', 15, [invalidPassword, 'abc123'], 'Valid password');
        assert.equal(alerts.length, 1);
    }
    await expectOutput('chapters-21-25', 15, [null], 'cancelled');
    await expectOutput('chapters-26-30', 7, ['50.2kilograms'], '50.2 kilograms');
    await expectOutput('chapters-26-30', 7, ['not a weight'], 'positive weight');
    await expectOutput('chapters-21-25', 1, ['<img src=x onerror=alert(1)>', 'Test'], '<img src=x onerror=alert(1)> Test');
    assert.equal(await page.locator('#output img').count(), 0);

    // Date boundaries and independently known results.
    await expectOutput('chapters-31-34', 5, [], 'First fifteen days', '2026-10-15T12:00:00+05:00');
    await expectOutput('chapters-31-34', 5, [], 'Last days', '2026-10-16T12:00:00+05:00');
    await expectOutput('chapters-31-34', 7, [], 'Its AM', '2026-10-04T11:59:00+05:00');
    await expectOutput('chapters-31-34', 7, [], 'Its PM', '2026-10-04T12:00:00+05:00');
    await visit(questionPath('chapters-31-34', 6));
    assert.equal(await page.evaluate(() => minutesSinceEpoch), Date.parse(defaultDate) / 60000);
    await visit(questionPath('chapters-31-34', 11));
    assert.equal(await page.evaluate(() => currentDate.getTime() - originalDate.getTime()), 3600000);
    await expectOutput('chapters-31-34', 14, ['Customer', '1.5', '2.5', '0.25'], ['Net Amount Payable (within Due Date): 3.75', 'Gross Amount Payable (after Due Date): 4.00']);

    await visit(questionPath('chapters-35-38', 6));
    assert.deepEqual(await page.evaluate(() => [factorial(0), factorial(1), factorial(5)]), [1, 1, 120]);
    await expectOutput('chapters-35-38', 7, ['3', '1'], '3');
    assert.deepEqual(await page.locator('#output p').allTextContents(), ['3', '2', '1']);
    await visit(questionPath('chapters-35-38', 10));
    assert.deepEqual(await page.evaluate(() => [isPalindrome('A man, a plan, a canal: Panama'), isPalindrome('hello'), isPalindrome('!!!')]), [true, false, false]);
    await visit(questionPath('chapters-38-42', 1));
    assert.deepEqual(await page.evaluate(() => [power(2, -3), power(7, 0), power(-2, 3)]), [0.125, 1, -8]);
    await visit(questionPath('chapters-38-42', 2));
    assert.deepEqual(await page.evaluate(() => [isLeapYear(1900), isLeapYear(2000), isLeapYear(2023), isLeapYear(2024)]), [false, true, false, true]);
    await expectOutput('chapters-38-42', 3, ['1', '2', '3'], 'cannot form a triangle');
    await expectOutput('chapters-38-42', 5, ['abc', 'z'], 'Index: -1');
    await expectOutput('chapters-38-42', 9, ['39'], 'Rs. 0.00');
    await expectOutput('chapters-38-42', 10, ['185'], ['100-rupee notes: 1', '50-rupee notes: 1', '10-rupee notes: 3', 'Rs. 5 cannot be paid']);

    // Browser interactions: alerts, counter, hover, form submission and CRUD.
    await visit(questionPath('chapters-43-48', 1));
    await page.locator('#alert-link').click();
    assert.deepEqual(alerts, ['You clicked the link!']);
    await visit(questionPath('chapters-43-48', 2));
    await page.locator('[data-phone]').first().click();
    assert.match(alerts[0], /iPhone 11 Pro Max/);
    await visit(questionPath('chapters-43-48', 3));
    assert.equal(await page.locator('#student-rows tr').count(), 10);
    await page.locator('#student-rows tr').nth(1).getByRole('button', { name: 'Delete' }).click();
    assert.equal(await page.locator('#student-rows tr').count(), 9);
    assert.ok(!(await page.locator('#student-rows').textContent()).includes('Mark'));
    await visit(questionPath('chapters-43-48', 4));
    await page.locator('#hover-image').hover();
    assert.match(await page.locator('#hover-image').getAttribute('src'), /2.jpg$/);
    await page.mouse.move(0, 0);
    assert.match(await page.locator('#hover-image').getAttribute('src'), /1.jpg$/);
    await visit(questionPath('chapters-43-48', 5));
    await page.locator('#increase').click();
    await page.locator('#increase').click();
    await page.locator('#decrease').click();
    assert.equal(await page.locator('#counter').textContent(), '1');
    await visit(questionPath('chapters-49-52', 1));
    await page.locator('#signup-name').fill('<b>Hamza</b>');
    await page.locator('#signup-email').fill('hamza@example.com');
    await page.locator('#signup-password').fill('abc123');
    await page.getByRole('button', { name: 'Sign up', exact: true }).click();
    assert.ok(await page.locator('#signup-result').isVisible());
    assert.equal(await page.locator('#signup-result b').count(), 0);
    assert.match(await page.locator('#signup-result').textContent(), /Name: <b>Hamza<\/b>/);
    assert.ok(!(await page.locator('#signup-result').textContent()).includes('abc123'));
    await visit(questionPath('chapters-49-52', 2));
    await page.locator('#read-more').click();
    assert.match(await page.locator('#item-details').textContent(), /512 GB SSD/);
    assert.equal(await page.locator('#read-more').getAttribute('aria-expanded'), 'true');
    await page.locator('#read-more').click();
    assert.ok(!(await page.locator('#item-details').textContent()).includes('512 GB SSD'));
    await visit(questionPath('chapters-49-52', 3));
    await page.locator('#student-name').fill('New Student');
    await page.locator('#student-age').fill('18');
    await page.locator('#student-class').fill('12');
    await page.getByRole('button', { name: 'Add student', exact: true }).click();
    assert.equal(await page.locator('#editable-student-rows tr').count(), 4);
    await page.locator('#editable-student-rows tr').last().getByRole('button', { name: 'Edit', exact: true }).click();
    assert.equal(await page.locator('#edit-name').inputValue(), 'New Student');
    assert.ok(await page.locator('#edit-student-form').isVisible());
    await page.locator('#edit-name').fill('Updated Student');
    await page.getByRole('button', { name: 'Save changes' }).click();
    assert.match(await page.locator('#editable-student-rows tr').last().textContent(), /Updated Student/);
    assert.ok(!(await page.locator('#edit-student-form').isVisible()));
    await page.locator('#editable-student-rows tr').last().getByRole('button', { name: 'Delete', exact: true }).click();
    assert.equal(await page.locator('#editable-student-rows tr').count(), 3);

    await visit(questionPath('chapters-53-57', 1));
    assert.equal(await page.locator('#gallery img').count(), 4);
    for (const index of [0, 3]) {
        const trigger = page.locator('#gallery button').nth(index);
        const source = await trigger.locator('img').getAttribute('src');
        await trigger.click();
        assert.ok(await page.locator('#modal').isVisible());
        assert.ok((await page.locator('#modal-img').getAttribute('src')).endsWith(source.replace('../../', '/')));
        if (index === 0) await page.keyboard.press('Escape');
        else await page.locator('#modal-close').click();
        await page.locator('#modal').waitFor({ state: 'hidden' });
        assert.equal(await trigger.evaluate(element => element === document.activeElement), true);
    }
    await visit(questionPath('chapters-53-57', 2));
    await page.locator('#zoom-in').click();
    assert.equal(await page.locator('#zoom-paragraph').evaluate(element => getComputedStyle(element).fontSize), '30px');
    await page.locator('#zoom-out').click();
    assert.equal(await page.locator('#font-size').textContent(), '20px');
    await page.locator('#zoom-out').click();
    await page.locator('#zoom-out').click();
    assert.equal(await page.locator('#font-size').textContent(), '10px');
    await visit(questionPath('chapters-58-67', 1));
    assert.equal(await page.locator('#first-name').inputValue(), 'Alex');
    assert.equal(await page.locator('#last-name').inputValue(), 'Bank');
    assert.equal(await page.locator('#email').inputValue(), 'alexbank@example.com');
    await visit(questionPath('chapters-58-67', 2));
    assert.equal(await page.locator('#lastName').textContent(), 'Last Name: Hussain');

    // Hub filtering, all indexes, phone viewport and direct local-file execution.
    await visit('index.html');
    assert.equal(await page.locator('.chapter-card').count(), 19);
    await page.locator('#chapter-search').fill('factorial');
    assert.equal(await page.locator('.chapter-card:visible').count(), 1);
    await page.locator('#chapter-search').fill('no-such-topic');
    assert.ok(await page.locator('#empty-results').isVisible());
    await page.locator('#chapter-search').fill('');
    for (const group of manifest) {
        await visit(group.slug + '/index.html');
        assert.equal(await page.locator('.question-list a').count(), group.questions.length);
    }
    if (process.env.QA_DIR) {
        mkdirSync(process.env.QA_DIR, { recursive: true });
        await visit('index.html');
        await page.screenshot({ path: resolve(process.env.QA_DIR, 'hub-desktop.png'), fullPage: true });
        await visit(questionPath('chapters-49-52', 3));
        await page.screenshot({ path: resolve(process.env.QA_DIR, 'student-table.png'), fullPage: true });
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await visit('index.html');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
    if (process.env.QA_DIR) await page.screenshot({ path: resolve(process.env.QA_DIR, 'hub-mobile.png'), fullPage: true });
    await page.goto('file://' + resolve(root, questionPath('chapters-14-16', 15)));
    assert.equal(await page.locator('#manufacturer option').count(), 6);
    assert.deepEqual(errors, []);
    console.log('All 160 exercises plus calculation, validation, date, DOM, form, image, modal and layout checks passed.');
} finally {
    await context.close();
    await browser.close();
    await new Promise(resolveClose => server.close(resolveClose));
}
