(function () {
    var textFile = null,
        makeTextFile = function (text) {
            var data = new Blob([text], {
                type: 'text/plain'
            });

            // If we are replacing a previously generated file we need to
            // manually revoke the object URL to avoid memory leaks.
            if (textFile !== null) {
                window.URL.revokeObjectURL(textFile);
            }

            textFile = window.URL.createObjectURL(data);

            return textFile;
        };

        function generateDoc() {
            var date = new Date(Date.now());
            var sender = document.getElementById('sender').value;
            var receiver = document.getElementById('receiver').value;
            var amount = document.getElementById('amount').value;

            var doc = "; requires signature of the debtor\n"
            doc += date.getFullYear() + "/" + date.getDate() + "/" + date.getDay() + " * transfer\n"
            doc += "    " + sender + ":Assets -" + amount + " guld\n"
            doc += "    " + sender + ":Expenses " + amount + " guld\n"
            doc += "    " + receiver + ":Assets " + amount + " guld\n"
            doc += "    " + receiver + ":Income -" + amount + " guld\n"

            return doc;
        }

    var generate = document.getElementById('generate');

    generate.addEventListener('click', function () {
        var link = document.getElementById('download');
        doc = generateDoc();
        link.href = makeTextFile(doc);
        link.style.display = 'block';
    }, false);
})();