import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {isLocale,locales} from '@/lib/i18n';
import {baseUrl} from '@/lib/seo';
import SiteChrome from '@/components/SiteChrome';
import '../globals.css';

export const metadata:Metadata={metadataBase:new URL(baseUrl),title:{default:'Lương Minh Construction',template:'%s | Lương Minh Construction'},description:'Công ty Cổ phần Xây dựng và Thương mại Lương Minh — công nghiệp, dân dụng, hạ tầng.',robots:{index:(process.env.ALLOW_INDEXING==='true'&&process.env.CONTENT_SIGNED_OFF==='true'),follow:(process.env.ALLOW_INDEXING==='true'&&process.env.CONTENT_SIGNED_OFF==='true')}};
export function generateStaticParams(){return locales.map(locale=>({locale}));}
export default async function LocaleRootLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){
 const {locale}=await params;if(!isLocale(locale))notFound();
 return <html lang={locale}><body><SiteChrome locale={locale}>{children}</SiteChrome></body></html>;
}
