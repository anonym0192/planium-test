const fs = require('fs');

const atualizarArquivoJson = (filepath , newData  ) => {

    const encoding = 'utf-8';

    try {
        
        fs.writeFileSync(filepath , JSON.stringify(newData, null , 2 ) , {encoding} );
   
    }catch(e) {
        console.log('Error:', e.stack);
    }


}

const lerArquivoJson = (filepath ) => {

    const encoding = 'utf-8';

    try {
        const jsonFile = fs.readFileSync(filepath, encoding);

        const objectFile = JSON.parse(jsonFile);

        return objectFile;
   
    }catch(e) {
        console.log('Error:', e.stack);
    }


}

module.exports = {atualizarArquivoJson, lerArquivoJson};