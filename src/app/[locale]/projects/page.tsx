import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {getProjects} from '@/lib/content';
import {isLocale} from '@/lib/i18n';
import {pageMetadata} from '@/lib/seo';
import ProjectArchive from '@/components/ProjectArchive';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;if(!isLocale(locale))notFound();return pageMetadata(locale,locale==='vi'?'Công trình tiêu biểu':'Selected projects',locale==='vi'?'Danh mục công trình công nghiệp và dân dụng của Lương Minh.':'Luong Minh industrial and civil projects.','projects');}
export default async function Projects({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();const list=await getProjects();return <div className="page listing-page"><header className="listing-intro shell"><div className="listing-meta"><span>PROJECT ARCHIVE / LMC</span><span>INDUSTRIAL · CIVIL · INFRASTRUCTURE</span></div><h1>{locale==='vi'?<>Dấu ấn<br/><em>công trình.</em></>:<>Selected<br/><em>projects.</em></>}</h1><p>{locale==='vi'?'Một số hạng mục được giới thiệu trên website doanh nghiệp, phân loại theo lĩnh vực thi công.':'A selected overview of projects listed by Luong Minh, grouped by construction discipline.'}</p></header><ProjectArchive locale={locale} projects={list}/></div>}
