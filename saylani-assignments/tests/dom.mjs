import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const modulePath = process.env.HAPPY_DOM_MODULE;
const happyDOM = modulePath ? await import(pathToFileURL(modulePath).href) : await import('happy-dom');
const { Window } = happyDOM;
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(readFileSync(resolve(root, 'manifest.json'), 'utf8'));
const examples = JSON.parse(readFileSync(new URL('./expected.json', import.meta.url), 'utf8'));
const defaultDate = '2026-10-04T12:00:00+05:00';
process.env.TZ = 'Asia/Karachi';
let window, alerts = [], inputs = [], errors = [];

function pathFor(slug, number) { return `${slug}/question-${String(number).padStart(2, '0')}/index.html`; }
function el(selector) { return window.document.querySelector(selector); }
function all(selector) { return [...window.document.querySelectorAll(selector)]; }
function text() { return el('#output')?.textContent || ''; }
function fill(selector, value) { el(selector).value = String(value); }
function submit(selector) { el(selector).dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true })); }

async function load(path, answers = [], now = defaultDate, random = 0.4) {
    if (window) {
        assert.deepEqual(errors, [], 'Errors from the preceding exercise');
        await window.happyDOM.abort();
    }
    inputs = [...answers]; alerts = []; errors = [];
    window = new Window({
        url: 'https://assignments.test/' + path,
        settings: { enableJavaScriptEvaluation: true, disableJavaScriptFileLoading: true, disableCSSFileLoading: true, suppressInsecureJavaScriptEnvironmentWarning: true }
    });
    const timestamp = Date.parse(now);
    const NativeDate = window.Date;
    window.Date = class extends NativeDate {
        constructor(...args) { super(...(args.length ? args : [timestamp])); }
        static now() { return timestamp; }
    };
    window.Math.random = () => random;
    let promptCount = 0;
    window.prompt = (_message, fallback) => {
        assert.ok(++promptCount < 100, 'Unexpected prompt loop in ' + path);
        return inputs.length ? inputs.shift() : String(fallback);
    };
    window.alert = message => alerts.push(String(message));
    window.addEventListener('error', event => errors.push(event.message));
    const file = resolve(root, path);
    const markup = readFileSync(file, 'utf8');
    const scripts = [...markup.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)];
    // Parse the page, then execute trusted local scripts in their source order.
    // This checks JS/DOM behavior, not browser parser timing or visual rendering.
    window.document.write(markup.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, ''));
    let writtenHTML = '';
    window.document.write = (...parts) => { writtenHTML += parts.join(''); };
    for (const script of scripts) {
        const source = script[1].match(/\bsrc="([^"]+)"/);
        const code = source ? readFileSync(resolve(dirname(file), source[1]), 'utf8') : script[2];
        window.eval(code);
        if (writtenHTML) {
            el('#output').insertAdjacentHTML('beforeend', writtenHTML);
            writtenHTML = '';
        }
    }
    assert.deepEqual(errors, [], path);
    return text();
}

async function expect(slug, number, answers, expected, now = defaultDate, random = 0.4) {
    const output = await load(pathFor(slug, number), answers, now, random);
    for (const fragment of Array.isArray(expected) ? expected : [expected]) {
        assert.ok(output.includes(fragment), `${slug} Q${number}: expected ${JSON.stringify(fragment)}, got ${JSON.stringify(output)}`);
    }
}

try {
    let total = 0;
    for (let g = 0; g < manifest.length; g++) {
        const group = manifest[g];
        for (let q = 0; q < group.questions.length; q++) {
            const question = group.questions[q];
            const output = await load(question.path);
            assert.ok(output.includes(examples[g][q]), `${question.path}: expected ${JSON.stringify(examples[g][q])}, got ${JSON.stringify(output)}`);
            total++;
        }
        console.log(`Chapters ${group.chapters}: ${group.questions.length} exercises passed`);
    }
    assert.equal(total, 160);

    await expect('chapters-06-09', 2, [], ['a is 1', 'b is 0', 'result is 3']);
    for (const answer of ['', null, '0']) {
        await expect('chapters-06-09', 5, [answer], answer === '0' ? '0 x 10 = 0' : '5 x 10 = 50');
    }
    await expect('chapter-05', 1, ['invalid', '2', '3'], 'Sum of 2 and 3 is 5');
    assert.equal(alerts.length, 1);
    await expect('chapter-05', 2, ['10', '0'], 'nonzero divisor');
    await expect('chapters-09-11', 5, [], 'Final c = 14');
    assert.deepEqual(alerts, ['given condition for variable a is true', 'condition 2 is true', 'condition 4 is true', 'The cost equals', 'True', 'car is smaller than cat']);
    for (const [mark, grade] of [[80, 'A-one'], [70, 'A'], [60, 'B'], [59, 'Fail']]) {
        await expect('chapters-09-11', 6, ['300', String(mark), String(mark), String(mark)], 'Grade: ' + grade);
    }
    await expect('chapters-09-11', 6, ['10', '10', '10', '10'], 'cannot exceed total marks');
    await expect('chapters-09-11', 7, ['6'], 'Close enough');
    for (const [operator, answer] of [['+', 13], ['-', 5], ['*', 36], ['/', 2.25], ['%', 1]]) {
        await expect('chapters-09-11', 11, ['9', '4', operator], '= ' + answer);
    }
    await expect('chapters-09-11', 11, ['9', '0', '/'], 'Cannot divide');
    await expect('chapters-09-11', 11, ['9', '4', '?'], 'Invalid operator');
    for (const [input, classification] of [['7', 'number'], ['a', 'lowercase'], ['Z', 'uppercase'], ['!', 'special']]) {
        await expect('chapters-12-13', 1, [input], 'is a' + (classification === 'uppercase' ? 'n ' : ' ') + classification);
    }
    await expect('chapters-12-13', 2, ['4', '4'], 'Both integers are equal.');
    await expect('chapters-12-13', 3, ['0'], 'The number is zero.');
    await expect('chapters-12-13', 4, ['z'], 'false');
    await expect('chapters-12-13', 5, [''], 'Please enter your password');
    await expect('chapters-12-13', 5, [null], 'Please enter your password');
    await expect('chapters-12-13', 5, ['wrong'], 'Incorrect password');
    for (const [time, greeting] of [['0000', 'morning'], ['1159', 'morning'], ['1200', 'afternoon'], ['1659', 'afternoon'], ['1700', 'evening'], ['2059', 'evening'], ['2100', 'night'], ['2359', 'night']]) {
        await expect('chapters-12-13', 7, [time], 'Good ' + greeting);
    }
    await expect('chapters-12-13', 7, ['1260'], 'Invalid time');

    await load(pathFor('chapters-14-16', 13));
    assert.deepEqual(all('#output p').map(p => p.textContent), ['Devices: keyboard, mouse, printer, monitor', 'Out: keyboard', 'Out: mouse', 'Out: printer', 'Out: monitor']);
    await load(pathFor('chapters-14-16', 14));
    assert.deepEqual(all('#output p').map(p => p.textContent), ['Devices: keyboard, mouse, printer, monitor', 'Out: monitor', 'Out: printer', 'Out: mouse', 'Out: keyboard']);
    await load(pathFor('chapters-14-16', 15));
    assert.deepEqual(all('#manufacturer option').map(p => p.textContent), ['Apple', 'Samsung', 'Motorola', 'Nokia', 'Sony', 'Haier']);
    await expect('chapters-21-25', 11, ['  MULTI   word tEXT  '], 'Multi Word Text');
    await expect('chapters-21-25', 13, ['bad@name', 'Hamza'], 'Valid username: Hamza');
    assert.equal(alerts.length, 1);
    await expect('chapters-21-25', 13, [null], 'cancelled');
    await expect('chapters-21-25', 14, ['cOoKiE'], 'available at index 2');
    await expect('chapters-21-25', 14, ['brownie'], 'not available');
    for (const password of ['123abc', 'abcdef', '123456', 'ab1']) {
        await expect('chapters-21-25', 15, [password, 'abc123'], 'Valid password');
        assert.equal(alerts.length, 1);
    }
    await expect('chapters-21-25', 15, [null], 'cancelled');
    await expect('chapters-21-25', 1, ['<img src=x onerror=alert(1)>', 'Test'], '<img src=x onerror=alert(1)> Test');
    assert.equal(all('#output img').length, 0);
    for (const [value, die, coin, number] of [[0, 1, 'Tails', 1], [0.999999, 6, 'Heads', 100]]) {
        await expect('chapters-26-30', 4, [], 'Random dice value: ' + die, defaultDate, value);
        await expect('chapters-26-30', 5, [], coin, defaultDate, value);
        await expect('chapters-26-30', 6, [], '1 and 100: ' + number, defaultDate, value);
    }
    await expect('chapters-26-30', 7, ['50.2kilograms'], '50.2 kilograms');
    await expect('chapters-26-30', 7, ['not a weight'], 'positive weight');
    await expect('chapters-31-34', 5, [], 'First fifteen days', '2026-10-15T12:00:00+05:00');
    await expect('chapters-31-34', 5, [], 'Last days', '2026-10-16T12:00:00+05:00');
    await expect('chapters-31-34', 7, [], 'Its AM', '2026-10-04T11:59:00+05:00');
    await expect('chapters-31-34', 7, [], 'Its PM', '2026-10-04T12:00:00+05:00');
    await load(pathFor('chapters-31-34', 6));
    assert.equal(window.minutesSinceEpoch, Date.parse(defaultDate) / 60000);
    await load(pathFor('chapters-31-34', 11));
    assert.equal(window.currentDate.getTime() - window.originalDate.getTime(), 3600000);
    await expect('chapters-31-34', 14, ['Customer', '1.5', '2.5', '0.25'], ['Net Amount Payable (within Due Date): 3.75', 'Gross Amount Payable (after Due Date): 4.00']);
    await load(pathFor('chapters-35-38', 6));
    assert.equal(window.factorial(0), 1);
    assert.equal(window.factorial(5), 120);
    await load(pathFor('chapters-35-38', 10));
    assert.equal(window.isPalindrome('A man, a plan, a canal: Panama'), true);
    assert.equal(window.isPalindrome('hello'), false);
    await load(pathFor('chapters-38-42', 1));
    assert.equal(window.power(2, -3), 0.125);
    assert.equal(window.power(7, 0), 1);
    assert.equal(window.power(-2, 3), -8);
    await load(pathFor('chapters-38-42', 2));
    assert.equal(window.isLeapYear(1900), false);
    assert.equal(window.isLeapYear(2000), true);
    await expect('chapters-38-42', 3, ['1', '2', '3'], 'cannot form a triangle');
    await expect('chapters-38-42', 5, ['abc', 'z'], 'Index: -1');
    await expect('chapters-38-42', 9, ['39'], 'Rs. 0.00');
    await expect('chapters-38-42', 10, ['185'], ['100-rupee notes: 1', '50-rupee notes: 1', '10-rupee notes: 3', 'Rs. 5 cannot be paid']);

    await load(pathFor('chapters-43-48', 1));
    el('#alert-link').click();
    assert.deepEqual(alerts, ['You clicked the link!']);
    await load(pathFor('chapters-43-48', 2));
    el('[data-phone]').click();
    assert.match(alerts[0], /iPhone 11 Pro Max/);
    await load(pathFor('chapters-43-48', 3));
    assert.equal(all('#student-rows tr').length, 10);
    all('#student-rows button')[1].click();
    assert.equal(all('#student-rows tr').length, 9);
    assert.ok(!el('#student-rows').textContent.includes('Mark'));
    await load(pathFor('chapters-43-48', 4));
    el('#hover-image').dispatchEvent(new window.MouseEvent('mouseover'));
    assert.match(el('#hover-image').getAttribute('src'), /2.jpg$/);
    el('#hover-image').dispatchEvent(new window.MouseEvent('mouseout'));
    assert.match(el('#hover-image').getAttribute('src'), /1.jpg$/);
    await load(pathFor('chapters-43-48', 5));
    el('#increase').click(); el('#increase').click(); el('#decrease').click();
    assert.equal(el('#counter').textContent, '1');
    await load(pathFor('chapters-49-52', 1));
    fill('#signup-name', '<b>Hamza</b>'); fill('#signup-email', 'hamza@example.com'); fill('#signup-password', 'abc123');
    submit('#signup-form');
    assert.equal(el('#signup-result').hidden, false);
    assert.equal(all('#signup-result b').length, 0);
    assert.match(el('#signup-result').textContent, /Name: <b>Hamza<\/b>/);
    assert.ok(!el('#signup-result').textContent.includes('abc123'));
    await load(pathFor('chapters-49-52', 2));
    el('#read-more').click();
    assert.match(el('#item-details').textContent, /512 GB SSD/);
    assert.equal(el('#read-more').getAttribute('aria-expanded'), 'true');
    el('#read-more').click();
    assert.ok(!el('#item-details').textContent.includes('512 GB SSD'));
    await load(pathFor('chapters-49-52', 3));
    fill('#student-name', 'New Student'); fill('#student-age', 18); fill('#student-class', 12);
    submit('#add-student-form');
    assert.equal(all('#editable-student-rows tr').length, 4);
    all('#editable-student-rows tr').at(-1).querySelector('button').click();
    assert.equal(el('#edit-name').value, 'New Student');
    assert.equal(el('#edit-student-form').hidden, false);
    fill('#edit-name', 'Updated Student');
    submit('#edit-student-form');
    assert.match(all('#editable-student-rows tr').at(-1).textContent, /Updated Student/);
    assert.equal(el('#edit-student-form').hidden, true);
    all('#editable-student-rows tr').at(-1).querySelectorAll('button')[1].click();
    assert.equal(all('#editable-student-rows tr').length, 3);
    // Deleting the record currently being edited also closes its form.
    all('#editable-student-rows tr')[0].querySelector('button').click();
    all('#editable-student-rows tr')[0].querySelectorAll('button')[1].click();
    assert.equal(el('#edit-student-form').hidden, true);

    await load(pathFor('chapters-53-57', 1));
    assert.equal(all('#gallery img').length, 4);
    for (const [index, closing] of [[0, 'escape'], [3, 'button'], [1, 'backdrop']]) {
        const button = all('#gallery button')[index];
        button.click();
        assert.equal(el('#modal').style.display, 'block', 'Open gallery image ' + index);
        assert.equal(el('#modal-img').src, button.querySelector('img').src);
        if (closing === 'escape') window.document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape' }));
        else if (closing === 'button') el('#modal-close').click();
        else el('#modal').click();
        await window.happyDOM.whenAsyncComplete();
        assert.equal(el('#modal').style.display, 'none');
        assert.equal(window.document.activeElement, button);
    }
    await load(pathFor('chapters-53-57', 2));
    el('#zoom-in').click();
    assert.equal(el('#zoom-paragraph').style.fontSize, '30px');
    el('#zoom-out').click();
    assert.equal(el('#font-size').textContent, '20px');
    el('#zoom-out').click(); el('#zoom-out').click();
    assert.equal(el('#font-size').textContent, '10px');
    await load(pathFor('chapters-58-67', 1));
    assert.equal(el('#first-name').value, 'Alex');
    assert.equal(el('#last-name').value, 'Bank');
    assert.equal(el('#email').value, 'alexbank@example.com');
    await load(pathFor('chapters-58-67', 2));
    assert.equal(el('#lastName').textContent, 'Last Name: Hussain');
    assert.equal(window.formContent.nodeType, 1);
    assert.equal(window.lastName.firstChild.nodeType, 3);

    await load('index.html');
    assert.equal(all('.chapter-card').length, 19);
    fill('#chapter-search', 'factorial');
    el('#chapter-search').dispatchEvent(new window.Event('input'));
    assert.equal(all('.chapter-card').filter(card => !card.hidden).length, 1);
    fill('#chapter-search', 'no-such-topic');
    el('#chapter-search').dispatchEvent(new window.Event('input'));
    assert.equal(el('#empty-results').hidden, false);
    for (const group of manifest) {
        await load(group.slug + '/index.html');
        assert.equal(all('.question-list a').length, group.questions.length);
    }
    assert.deepEqual(errors, []);
    console.log('All 160 exercises plus calculation, validation, date, event, form, table, image, modal and DOM checks passed.');
    console.log('DOM simulation only: browser rendering and parser timing are covered by the separate Chromium suite.');
} finally {
    if (window) await window.happyDOM.abort();
}
