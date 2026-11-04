import { networkDeepSteps } from './deep-network.js';
import { databaseDeepSteps } from './deep-database.js';
import { physicalDeepSteps } from './deep-physical.js';
import { discreteDeepSteps } from './deep-discrete.js';
import { multimediaMidtermDeepSteps } from './deep-multimedia-midterm.js';
import { multimediaFinalDeepSteps } from './deep-multimedia-final.js';
// คู่มือที่อิงสถานการณ์จริงในบทเรียน คัดหัวข้อที่มีวิธีอธิบายละเอียดโดยเฉพาะ
export const deepStudyGuides = {...networkDeepSteps,...databaseDeepSteps,...physicalDeepSteps,...discreteDeepSteps,...multimediaMidtermDeepSteps,...multimediaFinalDeepSteps};
export function deepStudySteps(title){return deepStudyGuides[String(title??'').trim()]||[];}
