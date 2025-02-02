/**
 * @jest-environment jsdom
 */

document.body.innerHTML = `
    <input type="text" id="inputText">
    <button id="copyBtn">Copy 📋</button>
    <div id="result"></div>
`;

const { reverseString, copyResult } = require('./script.js');

describe('String Reversal Tests', () => {
    beforeEach(() => {
        // Clear input and result before each test
        document.getElementById('inputText').value = '';
        document.getElementById('result').textContent = '';
    });

    test('reverses a simple string correctly', () => {
        document.getElementById('inputText').value = 'hello';
        reverseString();
        expect(document.getElementById('result').textContent).toBe('olleh');
    });

    test('reverses string with numbers correctly', () => {
        document.getElementById('inputText').value = 'AI4Devs';
        reverseString();
        expect(document.getElementById('result').textContent).toBe('sveD4IA');
    });

    test('handles empty string', () => {
        document.getElementById('inputText').value = '';
        reverseString();
        expect(document.getElementById('result').textContent).toBe('');
    });

    test('reverses special characters correctly', () => {
        document.getElementById('inputText').value = '!@#$%^';
        reverseString();
        expect(document.getElementById('result').textContent).toBe('^%$#@!');
    });

    test('reverses mixed content correctly', () => {
        document.getElementById('inputText').value = 'Hello123!@#';
        reverseString();
        expect(document.getElementById('result').textContent).toBe('#@!321olleH');
    });
});

describe('Copy Function Tests', () => {
    beforeEach(() => {
        // Mock clipboard API
        Object.assign(navigator, {
            clipboard: {
                writeText: jest.fn().mockImplementation(() => Promise.resolve())
            }
        });
        // Reset button text
        document.getElementById('copyBtn').textContent = 'Copy 📋';
    });

    test('copies text to clipboard', async () => {
        document.getElementById('result').textContent = 'test';
        await copyResult();
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test');
    });

    test('updates button text after copying', async () => {
        document.getElementById('result').textContent = 'test';
        await copyResult();
        expect(document.getElementById('copyBtn').textContent).toBe('Copied! ✓');
    });

    test('does not copy when result is empty', async () => {
        document.getElementById('result').textContent = '';
        await copyResult();
        expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
    });

    test('restores original button text after delay', async () => {
        jest.useFakeTimers();
        document.getElementById('result').textContent = 'test';
        await copyResult();
        expect(document.getElementById('copyBtn').textContent).toBe('Copied! ✓');
        jest.advanceTimersByTime(2000);
        expect(document.getElementById('copyBtn').textContent).toBe('Copy 📋');
        jest.useRealTimers();
    });

    test('handles clipboard API errors', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        navigator.clipboard.writeText.mockRejectedValueOnce(new Error('Clipboard error'));
        document.getElementById('result').textContent = 'test';
        await expect(copyResult()).rejects.toThrow('Clipboard error');
        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });
});