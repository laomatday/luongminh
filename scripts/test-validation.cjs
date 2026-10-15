// No external dependencies: transpile pure TS to CommonJS and test validation boundaries.
const fs=require('node:fs'),vm=require('node:vm');
const ts=require('typescript');
const path=require('node:path');
const file=path.join(__dirname,'../src/lib/inquiry-validation.ts');
const source=fs.readFileSync(file,'utf8');
const compiled=ts.transpileModule(source,{fileName:file,compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS}}).outputText;
const moduleExports={};const mod={exports:moduleExports};const context={module:mod,exports:moduleExports,console};vm.runInNewContext(compiled,context);
const {parseInquiry}=mod.exports;
const base={name:'Nguyễn Văn A',phone:'0901234567',email:'client@example.com',organization:'LMC buyer',service:'industrial',details:'Xây dựng nhà xưởng với diện tích và yêu cầu kỹ thuật đang khảo sát.',turnstileToken:'0xverify-valid-token',website:''};
const cases=[
 ['valid input',base,true],
 ['missing name',{...base,name:''},false],
 ['bad phone',{...base,phone:'abc'},false],
 ['bad email',{...base,email:'oops'},false],
 ['invalid sector',{...base,service:'casino'},false],
 ['short brief',{...base,details:'too short'},false],
 ['missing captcha',{...base,turnstileToken:''},false],
 ['honeypot filled',{...base,website:'spambot'},false],
 ['long name',{...base,name:'A'.repeat(200)},false],
 ['optional email',{...base,email:''},true]
];
let passed=0;
for(const [name,input,expected] of cases){const result=parseInquiry(input);const ok=result.ok===expected;if(ok)passed++;else process.exitCode=1;process.stdout.write(`${ok?'PASS':'FAIL'} ${name}\n`);}
process.stdout.write(`${passed}/${cases.length} checks passed\n`);
