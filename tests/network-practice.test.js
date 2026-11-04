import test from 'node:test';
import assert from 'node:assert/strict';
import {parseIPv4,formatIPv4,subnetIPv4,prefixForHosts,transmissionMs,propagationMs,totalMs,bdpKbits,NETWORK_PRACTICE_TOPICS,generateNetworkQuestion,checkNetworkAnswer} from '../assets/network-practice.js';
test('ตรวจ IP และ subnet /0, /26, /31, /32',()=>{
 assert.equal(formatIPv4(parseIPv4('192.168.1.10')),'192.168.1.10');
 assert.throws(()=>parseIPv4('256.1.2.3'));
 assert.throws(()=>parseIPv4('01.2.3.4'));
 const s=subnetIPv4('192.168.1.130',26);
 assert.deepEqual([s.mask,s.network,s.broadcast,s.firstHost,s.lastHost,s.usable],['255.255.255.192','192.168.1.128','192.168.1.191','192.168.1.129','192.168.1.190',62]);
 assert.equal(subnetIPv4('10.1.3.250',23).network,'10.1.2.0');
 assert.equal(subnetIPv4('10.1.3.250',23).broadcast,'10.1.3.255');
 assert.equal(subnetIPv4('1.2.3.4',0).broadcast,'255.255.255.255');
 assert.equal(subnetIPv4('10.0.0.8',31).usable,2);
 assert.equal(subnetIPv4('10.0.0.8',31).broadcast,null);
 assert.equal(subnetIPv4('10.0.0.8',32).usable,1);
});
test('สูตรหา Prefix, Delay และ BDP',()=>{
 assert.equal(prefixForHosts(30).prefix,27);
 assert.equal(prefixForHosts(62).prefix,26);
 assert.equal(prefixForHosts(63).prefix,25);
 assert.equal(transmissionMs(1500,1),12);
 assert.equal(propagationMs(200,200000),1);
 assert.equal(totalMs(1500,1,200,200000),13);
 assert.equal(bdpKbits(10,20),200);
});
test('สุ่มโจทย์ทุกหมวดแล้วตรวจคำตอบจริงได้',()=>{
 for(const type of NETWORK_PRACTICE_TOPICS)for(const seed of [0,0.3,0.7,0.99]){
  const q=generateNetworkQuestion(type.id,()=>seed);
  assert.ok(q.steps.length>=2&&q.formula&&q.hint,q.id);
  assert.equal(checkNetworkAnswer(q,q.answer).correct,true,type.id);
  assert.equal(checkNetworkAnswer(q,'').valid,false);
  const wrong=q.kind==='ip'?'1.2.3.4':String(Number(q.answer)+10);
  if(wrong!==q.answer)assert.equal(checkNetworkAnswer(q,wrong).correct,false,type.id);
 }
});
