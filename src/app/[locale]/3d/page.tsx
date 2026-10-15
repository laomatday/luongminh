import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {isLocale,localePath} from '@/lib/i18n';
import {pageMetadata} from '@/lib/seo';
import {Arrow} from '@/components/Arrow';
import Construction3D from '@/components/Construction3D';

type Props={params:Promise<{locale:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {locale}=await params;if(!isLocale(locale))notFound();
 return pageMetadata(locale,'3D Explorer',locale==='vi'?'Tương tác với mô hình kết cấu nhà xưởng minh họa; không đại diện dự án thật.':'Explore a procedural concept building structure; not an actual project or BIM file.');
}
export default async function Explorer({params}:Props){const {locale}=await params;if(!isLocale(locale))notFound();const vi=locale==='vi';return <div className="v5-lab-page">
 <section className="v5-lab-head shell"><div className="v5-lab-eyebrow">LMC / DIGITAL ENGINEERING <span>CINEMATIC / V6 AUTOPLAY</span></div>
  <h1>{vi?'Khám phá':'Explore the'}<br/><em>{vi?'từng lớp kết cấu.':'built anatomy.'}</em></h1>
  <div className="v5-lab-head-bottom"><p>{vi?'Mô hình hình học ba chiều với móng, khung thép, bao che và hệ mái. Thử tương tác với các lớp kết cấu và tiến độ dựng hình.':'A procedural 3D model of foundations, steel structure, facade and roof. Explore the systems and simulated assembly sequence.'}</p><Link href={localePath(locale,'projects')}>{vi?'DANH MỤC CÔNG TRÌNH THẬT':'REAL PROJECT ARCHIVE'} <Arrow size={16}/></Link></div>
 </section>
 <section className="v5-lab-full shell"><Construction3D lang={locale} projectsHref={localePath(locale,'projects')}/></section>
 <section className="v5-lab-principles shell"><div><span>01 / BUILDING SYSTEMS</span><h2>{vi?'Từ nền móng đến hình khối.':'From foundations to form.'}</h2></div><div><p>{vi?'3D làm rõ mối liên hệ giữa các bộ phận công trình. Đối với công trình thực tế, mô hình chỉ được chuyển thành BIM Viewer khi doanh nghiệp cung cấp dữ liệu được phê duyệt.':'This model helps explain systems and construction sequence. For actual projects, a BIM viewer requires client-approved data.'}</p><p className="v5-lab-honesty">{vi?'Đây là mô hình minh họa phát triển bằng mã, không đại diện nhà xưởng có thật, không chứa thông số thiết kế và không được sử dụng trong thi công.':'Illustrative procedural geometry, not real BIM, engineering calculations or an as-built Luong Minh building.'}</p></div></section>
 </div>}
