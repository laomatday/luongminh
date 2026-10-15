import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {isLocale,localePath,ui} from '@/lib/i18n';
import {pageMetadata} from '@/lib/seo';
import {claims} from '@/lib/seed-data';
import {Arrow} from '@/components/Arrow';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;if(!isLocale(locale))notFound();return pageMetadata(locale,locale==='vi'?'Giới thiệu doanh nghiệp':'About Luong Minh',locale==='vi'?'Giới thiệu Lương Minh Construction, hoạt động từ năm 2014.':'Luong Minh Construction company information since 2014.','about');}
export default async function About({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <div className="page about-page"><section className="subpage-head about-head shell"><span>ABOUT / LUONG MINH · EST. 2014</span><h1>{locale==='vi'?<>Nền tảng<br/><em>vững chắc.</em></>:<>Built on<br/><em>expertise.</em></>}</h1><p>{claims.about[locale]}</p></section><div className="about-visual"><img src="/visuals/control.svg" alt=""/><span>{ui[locale].sourceInfo}</span></div><div className="about-story shell"><div><span>01 / OUR JOURNEY</span><h2>2014 <span>→</span> {locale==='vi'?'Hiện tại':'Today'}</h2></div><div><p>{claims.about[locale]}</p><p>{claims.approach[locale]}</p><Link className="text-arrow" href={localePath(locale,'contact')}>{ui[locale].cta}<Arrow size={18}/></Link></div></div></div>}
