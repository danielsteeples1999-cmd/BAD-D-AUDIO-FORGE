#!/usr/bin/env node
const fs=require("fs"),crypto=require("crypto");
const path=process.argv[2];
if(!path){console.error("usage: node tools/audio-probe.cjs <audio-file>");process.exit(2);}
if(!fs.existsSync(path)){console.error(JSON.stringify({status:"BLOCKED",reason:"fixture_missing",path}));process.exit(3);}
const b=fs.readFileSync(path);
console.log(JSON.stringify({status:"PROVEN",path,bytes:b.length,sha256:crypto.createHash("sha256").update(b).digest("hex"),note:"Container-level probe only; decoded PCM/playback claims require a decoder/runtime."},null,2));
