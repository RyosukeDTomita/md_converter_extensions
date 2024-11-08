// document.getElementByIdがHtmlElementを返すため，HTMLTextAreaElementにキャストして代入する
const inputElement: HTMLTextAreaElement = document.getElementById('input')! as HTMLTextAreaElement;
const outputElement: HTMLTextAreaElement = document.getElementById('output')! as HTMLTextAreaElement;

document.getElementById('github')?.addEventListener('click', () => {
    let convertedText = inputElement.value;
    // Qiita to GitHub
    // NOTE: $1には[\s\S]*?でキャプチャした文字列が入る
    convertedText = convertedText.replace(/:::note info\n([\s\S]*?)\n:::/g, (match, p1) => {
        return '> [!NOTE]\n' + p1.split('\n').map(line => '> ' + line).join('\n');
    });
    // Zenn to GitHub
    convertedText = convertedText.replace(/:::message\n([\s\S]*?)\n:::/g, (match, p1) => {
        return '> [!NOTE]\n' + p1.split('\n').map(line => '> ' + line).join('\n');
    });
    outputElement.value = convertedText;
});

document.getElementById('qiita')?.addEventListener('click', () => {

    let convertedText = inputElement.value;
    // GitHub to Qiita
    convertedText = convertedText.replace(/> \[!NOTE\]\n([\s\S]*?)(?=\n\n|$)/g, (match, p1) => {
        return ':::note info\n' + p1.split('\n').map(line => line.replace(/^> /, '')).join('\n') + '\n:::';
    });
    // Zenn to Qiita
    convertedText = convertedText.replace(/:::message\n([\s\S]*?)\n:::/g, ':::note info\n$1\n:::');

    outputElement.value = convertedText;
});

document.getElementById('zenn')?.addEventListener('click', () => {
    let convertedText = inputElement.value;

    // GitHub to Zenn
    convertedText = convertedText.replace(/> \[!NOTE\]\n([\s\S]*?)(?=\n\n|$)/g, (match, p1) => {
        return ':::message\n' + p1.split('\n').map(line => line.replace(/^> /, '')).join('\n') + '\n:::';
    });
    // Qiita to Zenn
    convertedText = convertedText.replace(/:::note info\n([\s\S]*?)\n:::/g, ':::message\n$1\n:::');

    outputElement.value = convertedText;
});

document.getElementById('clear')?.addEventListener('click', () => {
    inputElement.value = '';
    outputElement.value = '';
});

document.getElementById('copy-button')?.addEventListener('click', () => {
    navigator.clipboard.writeText(outputElement.value).then(() => {
        alert("Copied to clipboard");
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
});