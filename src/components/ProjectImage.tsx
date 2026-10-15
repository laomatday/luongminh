'use client';
import {useEffect,useState} from 'react';
import type {ProjectView} from '@/lib/content';
import type {Locale} from '@/lib/i18n';
/** Original images require CMS rights approval. Other images are Unsplash or source concept placeholders. */
const photos:Record<string,{url:string;source:string;fallback:string}>={
 'annehill-international-school':{url:'https://images.unsplash.com/photo-1574958269340-fa927503f3dd?auto=format&fit=crop&w=1600&q=80',source:'Unsplash',fallback:'/visuals/school.svg'},
 'industrial-control-room-office-img':{url:'https://images.unsplash.com/photo-1766475554436-82d116d96c60?auto=format&fit=crop&w=1600&q=80',source:'Unsplash',fallback:'/visuals/control.svg'},
 'vietnam-german-university':{url:'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1600&q=80',source:'Unsplash',fallback:'/visuals/uni.svg'},
 'factory-otogi':{url:'https://images.unsplash.com/photo-1681043993766-9c530b095c99?auto=format&fit=crop&w=1600&q=80',source:'Unsplash',fallback:'/visuals/factory.svg'},
 'factory-938-national-road':{url:'https://images.unsplash.com/photo-1766475554436-82d116d96c60?auto=format&fit=crop&w=1600&q=80',source:'Unsplash',fallback:'/visuals/road.svg'},
 'hi-crete-warehouse':{url:'https://images.unsplash.com/photo-1681043993766-9c530b095c99?auto=format&fit=crop&w=1600&q=80',source:'Unsplash',fallback:'/visuals/warehouse.svg'}
};
export default function ProjectImage({project,locale,className='',priority=false}:{project:ProjectView;locale:Locale;className?:string;priority?:boolean}){
 const real=project.approved&&Boolean(project.photoUrl);
 const source=photos[project.id]||{url:`/visuals/${project.visual}`,fallback:`/visuals/${project.visual}`,source:'concept'};
 const desired=real?project.photoUrl!:source.url;
 const [src,setSrc]=useState(desired);
 useEffect(()=>setSrc(desired),[desired]);
 return <div className={`architecture-image architecture-image-premium ${className}`}>
   {/* eslint-disable-next-line @next/next/no-img-element */}
   <img src={src} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'} decoding="async"
     onError={()=>{if(src!==source.fallback)setSrc(source.fallback);}}
     alt={real?`${project.name} — approved project photograph`:`${locale==='vi'?'Ảnh minh họa lĩnh vực xây dựng, không phải ảnh công trình':'Illustrative construction photograph, not the actual project'}: ${project.name}`}/>
   <div className="image-tint" aria-hidden="true"/>
   <span className="image-watermark">LMC / ${project.type.toUpperCase()}</span>
   {!real&&<span className="visual-disclaimer">{locale==='vi'?'ẢNH MINH HỌA · KHÔNG PHẢI CÔNG TRÌNH THỰC TẾ':'ILLUSTRATIVE PHOTO · NOT THE ACTUAL PROJECT'}</span>}
 </div>;
}