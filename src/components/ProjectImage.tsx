import type {ProjectView} from '@/lib/content';
import type {Locale} from '@/lib/i18n';
import {ui} from '@/lib/i18n';
/** Never imply that SVG architectural studies show a real project. */
export default function ProjectImage({project,locale,className=''}:{project:ProjectView;locale:Locale;className?:string}){
 const isApprovedPhoto=project.approved&&Boolean(project.photoUrl);
 const src=isApprovedPhoto?project.photoUrl!:`/visuals/${project.visual}`;
 return <div className={`architecture-image ${className}`}>
   {/* Images are either local concept SVG or CMS-approved URLs. */}
   {/* eslint-disable-next-line @next/next/no-img-element */}
   <img src={src} loading="lazy" alt={isApprovedPhoto?`${project.name} — ${locale==='vi'?'hình ảnh công trình':'approved project photograph'}`:''}/>
   <div className="image-tint" aria-hidden="true"/>
   <span className="image-watermark">LMC / PROJECT</span>
   {!isApprovedPhoto&&<span className="visual-disclaimer">{ui[locale].sourceInfo}</span>}
 </div>;
}
