function reverseString() {
    const input = document.getElementById('inputText').value;
    const reversed = input.split('').reverse().join('');
    document.getElementById('result').textContent = reversed;
}

async function copyResult() {
    const result = document.getElementById('result').textContent;
    if (result) {
        try {
            await navigator.clipboard.writeText(result);
            const copyBtn = document.getElementById('copyBtn');
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied! ✓';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            throw err;
        }
    }
    return Promise.resolve();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { reverseString, copyResult };
}