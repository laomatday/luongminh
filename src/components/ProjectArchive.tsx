'use client';
import {useMemo,useState} from 'react';
import Link from 'next/link';
import type {ProjectView,Kind} from '@/lib/content';
import {sectorName} from '@/lib/presentation';
import type {Locale} from '@/lib/i18n';
import {ui,localePath} from '@/lib/i18n';
import ProjectImage from './ProjectImage';
import {Arrow} from './Arrow';

export default function ProjectArchive({locale,projects}:{locale:Locale;projects:ProjectView[]}) {
 const [category,setCategory]=useState<'all'|Kind>('all');
 const [search,setSearch]=useState('');
 const [view,setView]=useState<'grid'|'list'>('grid');
 const found=useMemo(()=>projects.filter(p=>(category==='all'||category===p.type)&&`${p.name} ${p.summary[locale]}`.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())),[projects,category,search,locale]);
 const filters:[('all'|Kind),string][]=[['all',ui[locale].filterAll],['industrial',ui[locale].industrial],['civil',ui[locale].civil],['infrastructure',ui[locale].infrastructure]];
 return <div className="project-archive">
  <div className="archive-toolbar shell"><div className="filters" role="group" aria-label="Project category">{filters.map(([kind,name])=><button type="button" key={kind} className={category===kind?'active':''} aria-pressed={category===kind} onClick={()=>setCategory(kind)}>{name}<sup>{kind==='all'?projects.length:projects.filter(p=>p.type===kind).length}</sup></button>)}</div>
  <div className="archive-controls"><label className="search-field"><span aria-hidden="true">⌕</span><input id="search-projects" type="search" aria-label={ui[locale].search} value={search} onChange={e=>setSearch(e.target.value)} placeholder={ui[locale].search}/></label>
  <div className="view-switch" role="group" aria-label="View"><button type="button" onClick={()=>setView('grid')} className={view==='grid'?'active':''} aria-pressed={view==='grid'} aria-label="Grid view">▦</button><button type="button" onClick={()=>setView('list')} className={view==='list'?'active':''} aria-pressed={view==='list'} aria-label="List view">☷</button></div></div></div>
  <div className="archive-count shell"><span>{String(found.length).padStart(2,'0')} {locale==='vi'?'DỰ ÁN':'PROJECTS'}</span><span>LMC / SELECTED PROJECTS</span></div>
  {found.length?view==='grid'?<div className="archive-grid shell">{found.map((p,i)=><Link key={p.id} href={localePath(locale,`projects/${p.id}`)} className="archive-card"><div className="archive-card-art"><ProjectImage project={p} locale={locale}/><span className="archive-card-arrow"><Arrow size={24}/></span></div><div className="archive-card-text"><span>{String(i+1).padStart(2,'0')} / {String(projects.length).padStart(2,'0')}</span><div><h3>{p.name}</h3><p>{sectorName(p.type,locale)}</p></div><Arrow size={16}/></div></Link>)}</div>:
    <div className="archive-list shell">{found.map((p,i)=><Link className="archive-row" href={localePath(locale,`projects/${p.id}`)} key={p.id}><span>{String(i+1).padStart(2,'0')}</span><strong>{p.name}</strong><span>{sectorName(p.type,locale)}</span><Arrow size={20}/></Link>)}</div>:
    <div className="empty-state shell"><h3>{ui[locale].noResults}</h3><button type="button" onClick={()=>{setCategory('all');setSearch('');}}>{locale==='vi'?'Đặt lại bộ lọc':'Reset filters'} ↗</button></div>}
  <div className="archive-footer shell"><span>END OF INDEX / {found.length}</span><span>LMC / CORPORATE CAPABILITIES</span></div>
 </div>;
}
