'use client';
import {useState} from 'react';
import Link from 'next/link';
import type {Locale} from '@/lib/i18n';
import {localePath} from '@/lib/i18n';
import {serviceGroups} from '@/lib/presentation';
import {Arrow} from './Arrow';
/** Sticky-side narrative with keyboard-responsive service image preview. */
export default function ServiceExplorer({locale}:{locale:Locale}){
 const [focus,setFocus]=useState(serviceGroups[0]?.id);
 return <section className="expertise"><div className="expertise-inner shell">
  <div className="expertise-left"><span className="section-index">03 / {locale==='vi'?'NĂNG LỰC CỐT LÕI':'CORE CAPABILITIES'}</span><h2>{locale==='vi'?<>Năng lực<br/><em>thi công.</em></>:<>Technical<br/><em>capabilities.</em></>}</h2><p>{locale==='vi'?'Ba nhóm hoạt động được doanh nghiệp công khai. Hồ sơ năng lực chi tiết cần được xác nhận trước khi công bố.':'Three publicly listed sectors. Detailed credentials require review before publication.'}</p><Link className="light-link" href={localePath(locale,'services')}>{locale==='vi'?'Xem lĩnh vực':'Explore services'} <Arrow size={18}/></Link></div>
  <div className="expertise-right">{serviceGroups.map((g,i)=><Link key={g.id} href={localePath(locale,'services')} className={`expertise-row ${focus===g.id?'focus':''}`} onMouseEnter={()=>setFocus(g.id)} onFocus={()=>setFocus(g.id)}><span>{String(i+1).padStart(2,'0')}</span><div><h3>{g.title[locale]}</h3><p>{g.desc[locale]}</p></div><Arrow size={19}/></Link>)}<div className="expertise-media">{serviceGroups.map(g=><div key={g.id} className={`service-preview ${focus===g.id?'show':''}`}><img src={`/visuals/${g.visual}`} alt=""/><small>{locale==='vi'?'MINH HỌA CONCEPT · KHÔNG PHẢI ẢNH CÔNG TRÌNH':'CONCEPT ILLUSTRATION · NOT A PROJECT PHOTO'}</small></div>)}</div></div>
 </div></section>;
}
