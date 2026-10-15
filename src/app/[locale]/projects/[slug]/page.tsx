import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {getProject,getProjects,sectorName} from '@/lib/content';
import {isLocale,localePath,ui,locales} from '@/lib/i18n';
import {pageMetadata} from '@/lib/seo';
import ProjectImage from '@/components/ProjectImage';
import {Arrow} from '@/components/Arrow';

type PageProps={params:Promise<{locale:string;slug:string}>};
export async function generateStaticParams(){const list=await getProjects();return locales.flatMap(locale=>list.map(p=>({locale,slug:p.id})));}
export async function generateMetadata({params}:PageProps):Promise<Metadata>{const {locale,slug}=await params;if(!isLocale(locale))notFound();const project=await getProject(slug);if(!project)notFound();return pageMetadata(locale,project.name,project.summary[locale]||`${project.name} – Luong Minh Construction`,`projects/${slug}`);}
export default async function ProjectPage({params}:PageProps){const {locale,slug}=await params;if(!isLocale(locale))notFound();const p=await getProject(slug);if(!p)notFound();const list=await getProjects();const idx=list.findIndex(x=>x.id===p.id);const next=list[(idx+1)%list.length];return <div className="page detail-page">
  <div className="detail-toolbar shell"><Link href={localePath(locale,'projects')}>← {locale==='vi'?'Tất cả công trình':'All projects'}</Link><span>PROJECT / {String(idx+1).padStart(2,'0')}</span></div>
  <div className="detail-hero"><div className="detail-photo"><ProjectImage project={p} locale={locale}/><div className="detail-photo-shade"/></div><div className="detail-hero-text shell"><span>{sectorName(p.type,locale).toUpperCase()} / LMC PORTFOLIO</span><h1>{p.name}</h1><p>{p.summary[locale]}</p></div></div>
  <div className="detail-facts shell"><div><small>{locale==='vi'?'Lĩnh vực':'Discipline'}</small><strong>{sectorName(p.type,locale)}</strong></div><div><small>{locale==='vi'?'Nguồn':'Source'}</small><strong>{p.approved?(locale==='vi'?'Đã được duyệt nội dung':'Approved editorial content'):(locale==='vi'?'Danh mục từ website nguồn':'Original public listing')}</strong></div><div><small>{locale==='vi'?'Tình trạng ảnh':'Image status'}</small><strong>{p.approved&&p.photoUrl?(locale==='vi'?'Hình đã duyệt':'Approved image'):(locale==='vi'?'Đang chờ ảnh gốc':'Awaiting owner-provided photos')}</strong></div></div>
  <div className="detail-editorial shell"><div><span>01 / PROJECT STORY</span></div><div><h2>{locale==='vi'?'Thông tin công trình.':'Project overview.'}</h2><p>{p.description[locale]}</p><h3>{locale==='vi'?'Bằng chứng triển khai':'Delivery evidence'}</h3><p>{p.approved&&p.contractRole?p.contractRole:ui[locale].verifiedInfo}</p><Link href={localePath(locale,'contact')} className="text-arrow">{ui[locale].cta}<Arrow size={18}/></Link></div></div>
  <div className="detail-blueprints shell"><div className="blueprint-visual"><ProjectImage project={p} locale={locale}/></div><div className="detail-note"><span>LMC / VERIFIED WORKFLOW</span><h3>{locale==='vi'?'Minh bạch hồ sơ.':'Evidence first.'}</h3><p>{locale==='vi'?'Thông tin quy mô, tiến độ, vai trò hợp đồng, đơn vị đầu tư và ảnh công trình chỉ được xuất bản sau khi được xác nhận.':'Dimensions, contractual role, delivery dates and photographs are published after verification by the company.'}</p></div></div>
  {next&&<Link className="next-project" href={localePath(locale,`projects/${next.id}`)}><span>{locale==='vi'?'Công trình tiếp theo':'Next project'}</span><strong>{next.name}</strong><Arrow size={34}/></Link>}
 </div>;
}
