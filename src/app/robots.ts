import type {MetadataRoute} from 'next';
import {baseUrl} from '@/lib/seo';
export default function robots():MetadataRoute.Robots {
 if(process.env.ALLOW_INDEXING!=='true') return {rules:{userAgent:'*',disallow:'/'} };
 return {rules:{userAgent:'*',allow:'/',disallow:['/api/','/studio/']},sitemap:new URL('/sitemap.xml',baseUrl).toString()};
}
