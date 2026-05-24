import * as fs from 'fs';
import { SUBJECTS as oldSubjects } from './old_mock.ts';
import { SUBJECTS as currentSubjects } from './src/data/mockData.ts';


const oldInspire = oldSubjects.map((s: any) => {
  s.track = "inspire";
  if (s.id === 'english') {
    s.name = "اللغة الإنجليزية (Inspire)";
  }
  if (s.id === 'physics') {
    s.name = "الفيزياء (Inspire)";
  }
  if (s.id === 'chemistry') {
    s.name = "الكيمياء (Inspire)";
  }
  if (s.id === 'biology') {
    s.name = "الأحياء (Inspire)";
  }
  return s;
});

const newBridge = currentSubjects.filter((s: any) => s.id === 'physics' || s.id === 'chemistry' || s.id === 'biology').map((s: any) => {
  s.id = s.id + "_bridge";
  s.name = s.name.replace(" (Bridge)", "") + " (Bridge)"; // Ensure no double Bridge
  s.track = "bridge";
  return s;
});

const finalSubjects = [...oldInspire, ...newBridge];

let text = fs.readFileSync('./old_mock.ts', 'utf-8');
text = text.replace('chapters: Chapter[];\n', 'chapters: Chapter[];\n  track?: "inspire" | "bridge";\n');

const subjectStart = text.indexOf('export const SUBJECTS: Subject[] = [');
const finalCode = text.slice(0, subjectStart) + 'export const SUBJECTS: Subject[] = ' + JSON.stringify(finalSubjects, null, 2) + ';\n';

fs.writeFileSync('./src/data/mockData.ts', finalCode);
console.log('Merged successfully!');
