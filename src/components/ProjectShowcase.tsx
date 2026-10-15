'use client';
import {useState} from 'react';
import Link from 'next/link';
import type {ProjectView} from '@/lib/content';
import {sectorName} from '@/lib/presentation';
import type {Locale} from '@/lib/i18n';
import {localePath} from '@/lib/i18n';
import {Arrow} from './Arrow';
import ProjectImage from './ProjectImage';

/** Adapted interaction pattern, NOT copied code: 21st.dev Project Showcase (Jatin Yadav).
 * The source is original React code with keyboard and mobile-select support.
 */
export default function ProjectShowcase({locale,projects}:{locale:Locale;projects:ProjectView[]}) {
 const [index,setIndex]=useState(0);
 if(!projects.length)return null;
 const current=projects[Math.min(index,projects.length-1)];
 return <section className="project-showcase shell">
  <div className="section-kicker"><span>02B / {locale==='vi'?'DANH MỤC CÔNG TRÌNH':'PROJECT DIRECTORY'}</span><span>{locale==='vi'?'CHỈ DÙNG ẢNH CÔNG TRÌNH ĐƯỢC DUYỆT':'ONLY APPROVED PROJECT IMAGES'}</span></div>
  <div className="showcase-heading"><h2>{locale==='vi'?<>Hồ sơ công trình.<br/><em>Năng lực thực thi.</em></>:<>Built work.<br/><em>Verified experience.</em></>}</h2><p>{locale==='vi'?'Chọn tên dự án để xem trước và mở hồ sơ. Hình ảnh concept luôn được gắn nhãn khi chưa có ảnh gốc.':'Select a project for a preview. Concept illustrations remain labelled until approved photography is provided.'}</p></div>
  <div className="showcase-frame"><div className="showcase-list">{projects.map((p,i)=><div key={p.id} className={`showcase-item ${index===i?'showcase-active':''}`} onMouseEnter={()=>setIndex(i)}><button type="button" className="showcase-select" onFocus={()=>setIndex(i)} onClick={()=>setIndex(i)} aria-label={`${locale==='vi'?'Xem trước':'Preview'} ${p.name}`} aria-pressed={index===i}><span>{String(i+1).padStart(2,'0')}</span><span><strong>{p.name}</strong><small>{sectorName(p.type,locale)}</small></span></button><Link className="showcase-open" href={localePath(locale,`projects/${p.id}`)} aria-label={`${locale==='vi'?'Xem hồ sơ':'Open project'} ${p.name}`}><Arrow size={18}/></Link></div>)}</div>
  <div className="showcase-display"><div className="showcase-display-media">{projects.map((p,i)=><div key={p.id} className={`showcase-preview ${index===i?'showcase-preview-active':''}`} aria-hidden={index!==i}><ProjectImage project={p} locale={locale}/></div>)}</div><div className="showcase-display-bottom"><span>{String(index+1).padStart(2,'0')} / {String(projects.length).padStart(2,'0')}</span><div><b>{current.name}</b><small>{current.approved&&current.photoUrl?'APPROVED PROJECT IMAGE':'ILLUSTRATIVE CONCEPT VISUAL'}</small></div><Arrow size={18}/></div></div></div>
 </section>;
}
