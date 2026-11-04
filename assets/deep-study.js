import { networkDeepSteps } from './deep-network.js';
// คู่มือที่อิงสถานการณ์จริงในบทเรียน คัดหัวข้อที่มีวิธีอธิบายละเอียดโดยเฉพาะ
export const deepStudyGuides = {...networkDeepSteps};
export function deepStudySteps(title){return deepStudyGuides[String(title??'').trim()]||[];}
