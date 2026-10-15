import Link from 'next/link';
import type {Locale} from '@/lib/i18n';
import {localePath} from '@/lib/i18n';
import Deferred3D from './Deferred3D';
import {Arrow} from './Arrow';

/** Hero contains a conceptual warehouse, never presented as a verified project. */
export default function Hero3D({locale}:{locale:Locale}){
 const vi=locale==='vi';
 return <section className="hero v5-hero" aria-label={vi?'Khám phá mô hình kiến trúc 3D':'Explore an interactive 3D concept building'}>
   <div className="v5-hero-noise"/>
   <div className="v5-hero-layout shell">
    <div className="v5-hero-copy">
      <span className="v5-hero-kicker"><i/> LUONG MINH CONSTRUCTION — EST. 2014</span>
      <h1>{vi?'Năng lực':'Engineering'}<br/><em>{vi?'kiến tạo công trình.':'built to last.'}</em></h1>
      <p>{vi?'Tư vấn kỹ thuật, công nghiệp, dân dụng và hạ tầng — giải pháp thực thi từ nền tảng chuyên môn.':'Technical consulting, industrial, civil and infrastructure delivery grounded in engineering expertise.'}</p>
      <div className="v5-hero-actions"><Link className="cta-solid" href={localePath(locale,'3d')}>{vi?'Khám phá mô hình 3D':'Explore 3D model'} <Arrow size={19}/></Link><Link className="hero-secondary-cta" href={localePath(locale,'projects')}>{vi?'Xem công trình':'View projects'} ↗</Link></div>
      <div className="v7-proof-mini"><span><b>2014</b><small>{vi?'NĂM THÀNH LẬP':'FOUNDED'}</small></span><span><b>03</b><small>{vi?'NHÓM LĨNH VỰC':'CORE SECTORS'}</small></span><span><b>06</b><small>{vi?'DỰ ÁN TRONG DANH MỤC':'LISTED PROJECTS'}</small></span></div>
      <span className="v5-hero-cred">ILLUSTRATIVE MODEL + STOCK PHOTO / NOT ACTUAL LMC PROJECTS</span>
    </div>
    <div className="v5-hero-three"><div className="v5-hero-three-top"><span>DESIGN + ENGINEERING</span><span>LIVE 3D · AUTOPLAY / V6</span></div><Deferred3D lang={locale} compact projectsHref={localePath(locale,'projects')}/><div className="v5-hero-three-bottom"><span>INDUSTRIAL HALL / CONCEPT GEOMETRY</span><Link href={localePath(locale,'3d')}>{vi?'MỞ 3D EXPLORER':'OPEN 3D EXPLORER'} <Arrow size={16}/></Link></div></div>
   </div>
   <div className="v5-hero-ruler"><span>01 / STRUCTURE</span><span>{vi?'TỰ XOAY · 5 CẢNH 3D':'AUTO-ROTATE · 5 CINEMATIC SCENES'}</span><span>SCROLL ↓</span></div>
  </section>;
}
