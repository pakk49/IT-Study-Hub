import { networkDeepSteps } from './deep-network.js';
import { databaseDeepSteps } from './deep-database.js';
import { physicalDeepSteps } from './deep-physical.js';
import { discreteDeepSteps } from './deep-discrete.js';
// คู่มือที่อิงสถานการณ์จริงในบทเรียน คัดหัวข้อที่มีวิธีอธิบายละเอียดโดยเฉพาะ
export const deepStudyGuides = {...networkDeepSteps,...databaseDeepSteps,...physicalDeepSteps,...discreteDeepSteps};
export function deepStudySteps(title){return deepStudyGuides[String(title??'').trim()]||[];}
