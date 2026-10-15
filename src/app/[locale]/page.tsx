import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {getProjects,sectorName,serviceGroups} from '@/lib/content';
import {localePath,isLocale,ui} from '@/lib/i18n';
import {pageMetadata} from '@/lib/seo';
import Hero3D from '@/components/Hero3D';
import ProjectImage from '@/components/ProjectImage';
import {Arrow} from '@/components/Arrow';
import ProofStrip from '@/components/ProofStrip';
import ProjectShowcase from '@/components/ProjectShowcase';
import ServiceExplorer from '@/components/ServiceExplorer';
import EditorialProof from '@/components/EditorialProof';

type Params={params:Promise<{locale:string}>};
export async function generateMetadata({params}:Params):Promise<Metadata>{const {locale}=await params;if(!isLocale(locale))notFound();return pageMetadata(locale,locale==='vi'?'Trang chủ':'Home',locale==='vi'?'Tư vấn và thi công công trình công nghiệp, dân dụng và hạ tầng.':'Construction and engineering services across industrial, civil and infrastructure sectors.');}
export default async function Home({params}:Params){const {locale}=await params;if(!isLocale(locale))notFound();const list=await getProjects();return <div className="page">
  <Hero3D locale={locale}/><ProofStrip locale={locale} projectsCount={list.length}/><EditorialProof locale={locale}/>
  <section className="foundation shell"><div className="foundation-grid"><div><span className="section-index">01 / LMC · 2014</span><h2>{locale==='vi'?<>Được xây dựng<br/><em>từ năng lực.</em></>:<>Built on<br/><em>capability.</em></>}</h2></div><p>{locale==='vi'?'Từ tháng 10/2014, Lương Minh hoạt động trong các lĩnh vực tư vấn kỹ thuật và xây dựng. Hồ sơ năng lực được thể hiện qua dự án và các bằng chứng thực thi có xác nhận.':'Since October 2014, Luong Minh has worked across engineering consultancy and construction projects. Its credentials should be demonstrated through verified project evidence.'}</p></div></section>
  <section className="selected shell"><div className="selected-top"><div><span className="section-index">02 / PROJECT SELECTION</span><h2>{locale==='vi'?<>Công trình<br/><em>tiêu biểu.</em></>:<>Selected<br/><em>projects.</em></>}</h2></div><Link className="text-arrow" href={localePath(locale,'projects')}>{ui[locale].viewAll}<Arrow size={18}/></Link></div><div className="selected-grid">{list.slice(0,4).map((p,i)=><Link href={localePath(locale,`projects/${p.id}`)} className={`selected-card selected-card-${i+1}`} key={p.id}><div className="selected-media"><ProjectImage project={p} locale={locale}/></div><div className="selected-card-info"><span>0{i+1}</span><h3>{p.name}</h3><span>{sectorName(p.type,locale)}</span></div></Link>)}</div></section>
  <ProjectShowcase locale={locale} projects={list}/><ServiceExplorer locale={locale}/>
  </div>;
}
