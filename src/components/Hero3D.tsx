import Link from 'next/link';
import type {Locale} from '@/lib/i18n';
import {localePath} from '@/lib/i18n';
import Construction3D from './Construction3D';
import {Arrow} from './Arrow';

/** Hero contains a conceptual warehouse, never presented as a verified project. */
export default function Hero3D({locale}:{locale:Locale}){
 const vi=locale==='vi';
 return <section className="hero v5-hero" aria-label={vi?'Khám phá mô hình kiến trúc 3D':'Explore an interactive 3D concept building'}>
   <div className="v5-hero-noise"/>
   <div className="v5-hero-layout shell">
    <div className="v5-hero-copy">
      <span className="v5-hero-kicker"><i/> LUONG MINH CONSTRUCTION — EST. 2014</span>
      <h1>{vi?'Từ bản vẽ.':'From drawing.'}<br/><em>{vi?'Đến hiện thực.':'To built reality.'}</em></h1>
      <p>{vi?'Tư vấn kỹ thuật, công nghiệp, dân dụng và hạ tầng — giải pháp thực thi từ nền tảng chuyên môn.':'Technical consulting, industrial, civil and infrastructure delivery grounded in engineering expertise.'}</p>
      <div className="v5-hero-actions"><Link className="cta-solid" href={localePath(locale,'3d')}>{vi?'Khám phá mô hình 3D':'Explore 3D model'} <Arrow size={19}/></Link><Link className="hero-secondary-cta" href={localePath(locale,'projects')}>{vi?'Xem công trình':'View projects'} ↗</Link></div>
      <span className="v5-hero-cred">CONCEPT MODEL / NOT AN ACTUAL LMC PROJECT</span>
    </div>
    <div className="v5-hero-three"><div className="v5-hero-three-top"><span>DESIGN + ENGINEERING</span><span>LIVE 3D · AUTOPLAY / V6</span></div><Construction3D lang={locale} compact projectsHref={localePath(locale,'projects')}/><div className="v5-hero-three-bottom"><span>INDUSTRIAL HALL / CONCEPT GEOMETRY</span><Link href={localePath(locale,'3d')}>{vi?'MỞ 3D EXPLORER':'OPEN 3D EXPLORER'} <Arrow size={16}/></Link></div></div>
   </div>
   <div className="v5-hero-ruler"><span>01 / STRUCTURE</span><span>{vi?'TỰ XOAY · 5 CẢNH 3D':'AUTO-ROTATE · 5 CINEMATIC SCENES'}</span><span>SCROLL ↓</span></div>
  </section>;
}
