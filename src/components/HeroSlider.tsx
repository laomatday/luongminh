'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import type {ProjectView} from '@/lib/content';
import {sectorName} from '@/lib/presentation';
import type {Locale} from '@/lib/i18n';
import {localePath,ui} from '@/lib/i18n';
import {Arrow} from './Arrow';

export default function HeroSlider({locale,projects}:{locale:Locale;projects:ProjectView[]}){
 const [active,setActive]=useState(0);
 const [paused,setPaused]=useState(false);
 const items=[...projects.filter(p=>['factory-otogi','annehill-international-school','hi-crete-warehouse'].includes(p.id))];
 const slides=items.length?items:projects.slice(0,3);
 useEffect(()=>{
  if(paused||slides.length<2||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const timer=window.setInterval(()=>{if(!document.hidden)setActive(v=>(v+1)%slides.length);},7000);
  return()=>clearInterval(timer);
 },[paused,slides.length]);
 const current=slides[Math.min(active,slides.length-1)];
 return <section className="hero" aria-label={locale==='vi'?'Dự án tiêu biểu':'Featured projects'} onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
  <div className="hero-side" aria-hidden="true"/><div className="hero-grid-overlay" aria-hidden="true"/>
  <div className="hero-media">{slides.map((p,i)=><div key={p.id} className={`hero-scene ${i===active?'active':''}`} aria-hidden={i!==active}>
   {/* eslint-disable-next-line @next/next/no-img-element */}
   <img src={p.approved&&p.photoUrl?p.photoUrl:`/visuals/${p.visual}`} alt=""/>
   <div className="hero-media-shade"/>
  </div>)}</div>
  <div className="hero-copy shell"><span className="hero-kicker"><i/> LUONG MINH CONSTRUCTION <b>—</b> EST. 2014</span>
   <h1>{locale==='vi'?<>Từ bản vẽ.<br/><em>Đến hiện thực.</em></>:<>From blueprint.<br/><em>To reality.</em></>}</h1>
   <p>{locale==='vi'?'Tư vấn kỹ thuật và thi công công trình công nghiệp, dân dụng, hạ tầng — năng lực được thể hiện qua từng dự án.':'Engineering consulting and construction across industrial, civil and infrastructure projects.'}</p>
   <div className="hero-actions"><Link className="cta-solid" href={localePath(locale,'projects')}>{locale==='vi'?'Khám phá công trình':'Explore projects'} <span><Arrow size={20}/></span></Link><Link className="hero-secondary-cta" href={localePath(locale,'contact')}>{locale==='vi'?'Trao đổi công trình':'Discuss a project'} ↗</Link></div>
  </div>
  <div className="hero-gridline" aria-hidden="true"/>
  {current&&<div className="hero-project-dossier" key={current.id}><span>{locale==='vi'?'CÔNG TRÌNH TIÊU BIỂU':'FEATURED PROJECT'} / {String(active+1).padStart(2,'0')}</span><strong>{current.name}</strong><small>{sectorName(current.type,locale)}</small><span className="dossier-watermark">{current.approved&&current.photoUrl?'APPROVED PROJECT IMAGE':'CONCEPT VISUAL / NOT A SITE PHOTOGRAPH'}</span></div>}
  <div className="hero-bottom shell"><div className="hero-micro"><span>01—{String(slides.length).padStart(2,'0')} / {locale==='vi'?'DỰ ÁN TIÊU BIỂU':'FEATURED PROJECTS'}</span><span>{locale==='vi'?'KHÁM PHÁ':'SCROLL TO EXPLORE'} ↓</span></div>
   <div className="hero-selector" role="group" aria-label={locale==='vi'?'Chọn công trình':'Select featured project'}>{slides.map((p,i)=><button type="button" key={p.id} aria-pressed={i===active} className={i===active?'active':''} onClick={()=>{setActive(i);setPaused(true);}}><span>0{i+1}</span><div><strong>{p.name}</strong><small>{sectorName(p.type,locale)}</small></div><i/></button>)}</div>
   {current&&<Link className="hero-open" href={localePath(locale,`projects/${current.id}`)} aria-label={`View ${current.name}`}><Arrow size={19}/></Link>}
  </div>
  {!slides[active]?.photoUrl&&<div className="visual-disclaimer" style={{zIndex:8,right:15,bottom:120}}>{ui[locale].sourceInfo}</div>}
 </section>;
}
