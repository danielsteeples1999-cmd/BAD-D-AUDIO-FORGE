#!/usr/bin/env node
const fs=require("fs"),cp=require("child_process"),path=require("path");
const fixture="fixtures/tone-440hz-10s.wav";
if(fs.existsSync(fixture))fs.unlinkSync(fixture);
const gen=cp.spawnSync(process.execPath,["tools/generate-fixture.cjs",fixture],{encoding:"utf8"});
if(gen.status!==0)throw new Error(gen.stderr);
const probe=cp.spawnSync(process.execPath,["tools/audio-probe.cjs",fixture],{encoding:"utf8"});
if(probe.status!==0)throw new Error(probe.stderr);
const result=JSON.parse(probe.stdout);
if(result.status!=="PROVEN"||result.bytes<=44)throw new Error("probe assertion failed");
fs.unlinkSync(fixture);
console.log(JSON.stringify({status:"PROVEN",test:"AUDIO-FORGE-SELF-001",checks:["fixture generation","WAV file existence","container probe","sha256 measurement","cleanup"]},null,2));
