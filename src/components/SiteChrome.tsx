'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import type {Locale} from '@/lib/i18n';
import {localePath,ui} from '@/lib/i18n';
import {company} from '@/lib/seed-data';
import {Arrow} from './Arrow';

export default function SiteChrome({locale,children}:{locale:Locale;children:React.ReactNode}) {
 const path=usePathname();
 const [menu,setMenu]=useState(false);
 const [scrolled,setScrolled]=useState(false);
 const homepage=path===localePath(locale);
 const labels=ui[locale];
 useEffect(()=>{const fn=()=>setScrolled(window.scrollY>24);fn();window.addEventListener('scroll',fn,{passive:true});return ()=>window.removeEventListener('scroll',fn);},[path]);
 useEffect(()=>{setMenu(false);},[path]);
 useEffect(()=>{document.body.style.overflow=menu?'hidden':'';return()=>{document.body.style.overflow='';};},[menu]);
 const suffix=path.replace(/^\/(vi|en)/,'')||'';
 const targetOther=localePath(locale==='vi'?'en':'vi',suffix);
 const entries:[string,string][]=[['',labels.home],['projects',labels.projects],['services',labels.services],['3d','3D Explorer'],['about',labels.about],['contact',labels.contact]];
 return <div className={`website ${homepage?'route-home':''}`}>
  <a href="#main" className="skip-link">Skip to main content</a>
  <header className={`site-header ${scrolled?'scrolled':''}`}><div className="header-inner">
   <Link className="brand" href={localePath(locale)} aria-label="Lương Minh — Home"><span className="brand-emblem">L<span>M</span><i>.</i></span><span className="brand-text">LƯƠNG MINH<small>CONSTRUCTION</small></span></Link>
   <nav className="main-nav" aria-label="Primary navigation">{entries.slice(0,5).map(([seg,name])=><Link key={seg} href={localePath(locale,seg)} className={(path===localePath(locale,seg)||(seg==='projects'&&path.includes('/projects/')))?'active':''}>{name}</Link>)}</nav>
   <div className="header-actions"><div className="language-switch" role="group" aria-label="Language"><Link href={localePath('vi',suffix)} aria-current={locale==='vi'?'true':undefined}>VI</Link><i>/</i><Link href={localePath('en',suffix)} aria-current={locale==='en'?'true':undefined}>EN</Link></div><Link className="header-contact" href={localePath(locale,'contact')}>{labels.cta}<Arrow size={16}/></Link></div>
   <button className={`menu-toggle ${menu?'open':''}`} aria-expanded={menu} aria-label={menu?'Close navigation':'Open navigation'} onClick={()=>setMenu(v=>!v)}><span/><span/></button>
  </div></header>
  {menu&&<div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation"><div className="mobile-top">LUONG MINH / NAVIGATION <span>↗</span></div><nav>{entries.map(([seg,name],i)=><Link key={seg} href={localePath(locale,seg)} onClick={()=>setMenu(false)}><span>0{i+1}</span>{name}<Arrow size={22}/></Link>)}</nav><div className="mobile-bottom"><span>{company.email}</span><Link href={targetOther}>{locale==='vi'?'ENGLISH':'TIẾNG VIỆT'}</Link></div></div>}
  <main id="main" tabIndex={-1}>{children}</main>
  <footer className="footer"><div className="footer-main shell"><div><span className="footer-label">LMC / BUILD WITH CONFIDENCE</span><h2>{locale==='vi'?<>Kiến tạo giá trị.<br/><em>Cùng phát triển.</em></>:<>Engineering progress.<br/><em>Building trust.</em></>}</h2></div><Link className="footer-round" href={localePath(locale,'contact')} aria-label={labels.cta}><Arrow size={37}/></Link></div><div className="footer-lower shell"><div className="footer-brand">LƯƠNG MINH<small>CONSTRUCTION & TRADING CORPORATION</small></div><div className="footer-links">{entries.slice(1).map(([seg,name])=><Link key={seg} href={localePath(locale,seg)}>{name}</Link>)}</div><div className="footer-last">© {new Date().getFullYear()} LMC <span>CONSTRUCTION · VIETNAM</span></div></div></footer>
  </div>;
}
