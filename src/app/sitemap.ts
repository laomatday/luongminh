import type {MetadataRoute} from 'next';
import {getProjects} from '@/lib/content';
import {locales,localePath} from '@/lib/i18n';
import {baseUrl} from '@/lib/seo';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{
 const projects=await getProjects();
 const paths=['','projects','services','3d','about','contact',...projects.map(p=>`projects/${p.id}`)];
 return locales.flatMap(locale=>paths.map(path=>({url:new URL(localePath(locale,path),baseUrl).toString(),lastModified:new Date(),changeFrequency:'monthly' as const,priority:path===''?1:path==='projects'?0.8:0.6})));
}
