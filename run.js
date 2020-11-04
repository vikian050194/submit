const exec = require('child_process').exec;
const myShellScript = exec('bash run.sh');
myShellScript.stdout.on('data', (data)=>{
    console.log(data); 
});
myShellScript.stderr.on('data', (data)=>{
    console.error(data);
});