const {atualizarArquivoJson} = require('../../utils');
const fs = require('fs');


test("testar funcao atualizarArquivoJson", async () => {

    let fileTest = [{'teste': 1} , {'teste': 2 }];
 
    filepathname = 'tests/unit/utilsDataTest.json';

    
    fs.writeFile(filepathname, JSON.stringify(fileTest) ,  (err) => {
        if (err) throw err;
    });

    const newData = [...fileTest, {'teste': 3}, {'teste': 4}];

    atualizarArquivoJson(filepathname , newData );


    fs.readFile(filepathname, 'utf8', (err, changedFile) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            return
        }
           // const result = JSON.parse(changedFile)

           // console.log("dsdss");

            expect(newData).toMatchObject(changedFile);

            fs.unlink(filepathname,function(err){
                if (err) throw err;
            }); 

    });
    
});