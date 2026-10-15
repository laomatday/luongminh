/** Safe shared client/server presentation helpers. No CMS provider or private env imports. */
import type {Locale} from './i18n';
import type {Kind} from './seed-data';
export {serviceGroups} from './seed-data';
export function sectorName(type:Kind,locale:Locale){
 const map={industrial:{vi:'Công trình công nghiệp',en:'Industrial construction'},civil:{vi:'Công trình dân dụng',en:'Civil construction'},infrastructure:{vi:'Hạ tầng kỹ thuật',en:'Infrastructure'}};
 return map[type][locale];
}
