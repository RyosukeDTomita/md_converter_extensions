var _a, _b, _c, _d, _e;
// document.getElementByIdがHtmlElementを返すため，HTMLTextAreaElementにキャストして代入する
var inputElement = document.getElementById('input');
var outputElement = document.getElementById('output');
(_a = document.getElementById('github')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    var convertedText = inputElement.value;
    // Qiita to GitHub
    // NOTE: $1には[\s\S]*?でキャプチャした文字列が入る
    convertedText = convertedText.replace(/:::note info\n([\s\S]*?)\n:::/g, function (match, p1) {
        return '> [!NOTE]\n' + p1.split('\n').map(function (line) { return '> ' + line; }).join('\n');
    });
    // Zenn to GitHub
    convertedText = convertedText.replace(/:::message\n([\s\S]*?)\n:::/g, function (match, p1) {
        return '> [!NOTE]\n' + p1.split('\n').map(function (line) { return '> ' + line; }).join('\n');
    });
    outputElement.value = convertedText;
});
(_b = document.getElementById('qiita')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    var convertedText = inputElement.value;
    // GitHub to Qiita
    convertedText = convertedText.replace(/> \[!NOTE\]\n([\s\S]*?)(?=\n\n|$)/g, function (match, p1) {
        return ':::note info\n' + p1.split('\n').map(function (line) { return line.replace(/^> /, ''); }).join('\n') + '\n:::';
    });
    // Zenn to Qiita
    convertedText = convertedText.replace(/:::message\n([\s\S]*?)\n:::/g, ':::note info\n$1\n:::');
    outputElement.value = convertedText;
});
(_c = document.getElementById('zenn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
    var convertedText = inputElement.value;
    // GitHub to Zenn
    convertedText = convertedText.replace(/> \[!NOTE\]\n([\s\S]*?)(?=\n\n|$)/g, function (match, p1) {
        return ':::message\n' + p1.split('\n').map(function (line) { return line.replace(/^> /, ''); }).join('\n') + '\n:::';
    });
    // Qiita to Zenn
    convertedText = convertedText.replace(/:::note info\n([\s\S]*?)\n:::/g, ':::message\n$1\n:::');
    outputElement.value = convertedText;
});
(_d = document.getElementById('clear')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () {
    inputElement.value = '';
    outputElement.value = '';
});
(_e = document.getElementById('copy-button')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function () {
    navigator.clipboard.writeText(outputElement.value).then(function () {
        alert("Copied to clipboard");
    })["catch"](function (err) {
        console.error('Failed to copy: ', err);
    });
});
