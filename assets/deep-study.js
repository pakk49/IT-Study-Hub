import { networkDeepSteps } from './deep-network.js';
import { databaseDeepSteps } from './deep-database.js';
// คู่มือที่อิงสถานการณ์จริงในบทเรียน คัดหัวข้อที่มีวิธีอธิบายละเอียดโดยเฉพาะ
export const deepStudyGuides = {...networkDeepSteps,...databaseDeepSteps};
export function deepStudySteps(title){return deepStudyGuides[String(title??'').trim()]||[];}
