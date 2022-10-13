const fs = require('fs');

const atualizarArquivoJson = (filepath , newData  ) => {

    const encoding = 'utf-8';

    try {
        let jsonFile = fs.readFileSync(filepath, encoding);

        console.log(jsonFile);

        //let objectFile = JSON.parse('[{"teste": "1"},{"teste":"2"}]');

        //console.log(JSON.stringify(newData));
        fs.writeFile(filepath , JSON.stringify(newData) , (err) => {
            if (err) throw err;
        });
   
    }catch(e) {
        console.log('Error:', e.stack);
    }


}

module.exports = {atualizarArquivoJson};