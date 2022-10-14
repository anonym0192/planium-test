const {atualizarArquivoJson} = require('../../utils');
const fs = require('fs');


test("testar funcao atualizarArquivoJson", async () => {

    let testMockObject = [{'teste': 1} , {'teste': 4 }];
 
    const filepathname = 'tests/unit/utilsDataTest.json';

    
    fs.writeFileSync(filepathname, JSON.stringify(testMockObject) , {encoding: 'utf-8'});

    const newData = [...testMockObject, {'teste': 3}, {'teste': 4}];

    atualizarArquivoJson(filepathname , newData );


    const changedFile = fs.readFileSync(filepathname, 'utf-8');

    const changedFileObject = JSON.parse(changedFile);

    expect(changedFileObject).toMatchObject(newData);

    fs.unlinkSync(filepathname);
    
});