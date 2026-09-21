#!/usr/bin/env node
const fs=require("fs"),path=require("path");
const out=process.argv[2]||"fixtures/tone-440hz-10s.wav";
const sr=48000,ch=2,secs=10,n=sr*secs,bits=16,data=n*ch*2;
const b=Buffer.alloc(44+data); let o=0;
b.write("RIFF",o);o+=4;b.writeUInt32LE(36+data,o);o+=4;b.write("WAVEfmt ",o);o+=8;b.writeUInt32LE(16,o);o+=4;b.writeUInt16LE(1,o);o+=2;b.writeUInt16LE(ch,o);o+=2;b.writeUInt32LE(sr,o);o+=4;b.writeUInt32LE(sr*ch*2,o);o+=4;b.writeUInt16LE(ch*2,o);o+=2;b.writeUInt16LE(bits,o);o+=2;b.write("data",o);o+=4;b.writeUInt32LE(data,o);o+=4;
for(let i=0;i<n;i++){const s=Math.round(Math.sin(2*Math.PI*440*i/sr)*0.25*32767);for(let c=0;c<ch;c++){b.writeInt16LE(s,o);o+=2;}}
fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,b);
console.log(JSON.stringify({status:"PROVEN",fixture_id:"tone-440hz-10s",path:out,sample_rate:sr,channels:ch,duration_seconds:secs,format:"WAV PCM16",bytes:b.length},null,2));
