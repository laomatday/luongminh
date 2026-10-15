'use client';
import {useEffect,useRef,useState} from 'react';
import dynamic from 'next/dynamic';
import type {Locale} from '@/lib/i18n';
const Construction3D=dynamic(()=>import('./Construction3D'),{ssr:false,loading:()=>null});
/** Lazy-mount the WebGL engine only when the 3D area approaches the viewport. */
export default function Deferred3D({lang,compact,projectsHref}:{lang:Locale;compact?:boolean;projectsHref?:string}){
 const root=useRef<HTMLDivElement|null>(null);
 const [ready,setReady]=useState(false);
 useEffect(()=>{
  const el=root.current;if(!el)return;
  if(!('IntersectionObserver' in window)){setReady(true);return;}
  const obs=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setReady(true);obs.disconnect();}},{rootMargin:'250px 0px',threshold:0});
  obs.observe(el);return()=>obs.disconnect();
 },[]);
 return <div ref={root} className="v7-deferred-3d">
   {ready?<Construction3D lang={lang} compact={compact} projectsHref={projectsHref}/>:<div className="v7-3d-placeholder" aria-live="polite">{lang==='vi'?'ĐANG TẢI TRẢI NGHIỆM 3D':'PREPARING 3D EXPERIENCE'}</div>}
 </div>;
}