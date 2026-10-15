import type {Metadata} from 'next';
import type {Locale} from './i18n';
import {localePath} from './i18n';
export const baseUrl=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';
export function pageMetadata(locale:Locale,title:string,description:string,path:string=''):Metadata{
 const canonical=localePath(locale,path);
 return {
  title:`${title} | Lương Minh Construction`,description,
  alternates:{canonical,languages:{vi:localePath('vi',path),en:localePath('en',path),'x-default':localePath('vi',path)}},
  openGraph:{type:'website',siteName:'Lương Minh Construction',title,description,url:canonical,locale:locale==='vi'?'vi_VN':'en_US'},
  robots:(process.env.ALLOW_INDEXING==='true'&&process.env.CONTENT_SIGNED_OFF==='true')?{index:true,follow:true}:{index:false,follow:false}
 };
}
