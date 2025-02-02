function reverseString() {
    const input = document.getElementById('inputText').value;
    const reversed = input.split('').reverse().join('');
    document.getElementById('result').textContent = reversed;
}

function copyResult() {
    const result = document.getElementById('result').textContent;
    if (result) {
        navigator.clipboard.writeText(result)
            .then(() => {
                const copyBtn = document.getElementById('copyBtn');
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Copied! ✓';
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    }
}