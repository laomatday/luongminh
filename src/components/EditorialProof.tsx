import Link from 'next/link';
import type {Locale} from '@/lib/i18n';
import {localePath} from '@/lib/i18n';
import {Arrow} from './Arrow';
/** B2B story: no unverified project scope, construction metrics or client endorsements. */
export default function EditorialProof({locale}:{locale:Locale}){
 const vi=locale==='vi';
 return <section className="v7-editorial shell" aria-labelledby="v7-editorial-title">
  <header className="v7-editorial-heading"><span>01B / {vi?'GÓC NHÌN KỸ THUẬT':'ENGINEERING APPROACH'}</span><span>LMC · FROM CONTEXT TO CONSTRUCTION</span></header>
  <div className="v7-editorial-grid"><figure className="v7-editorial-visual">
    {/* Free-to-use stock photo under Unsplash License; not an LMC site. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1681043993766-9c530b095c99?auto=format&fit=crop&w=1700&q=80" alt={vi?'Ảnh stock minh họa kết cấu không gian công nghiệp':'Stock photo illustrating an industrial structure'}/>
    <figcaption>{vi?'ẢNH STOCK MINH HỌA · KHÔNG PHẢI CÔNG TRÌNH LƯƠNG MINH':'STOCK REFERENCE · NOT AN LMC PROJECT'}</figcaption>
   </figure><div className="v7-editorial-copy">
     <span>CAPABILITY / DESIGN / CONSTRUCTION</span>
     <h2 id="v7-editorial-title">{vi?<>Từ yêu cầu kỹ thuật<br/><em>đến phương án rõ ràng.</em></>:<>From technical brief<br/><em>to clear execution.</em></>}</h2>
     <p>{vi?'Chủ đầu tư cần đánh giá năng lực qua phạm vi công việc, giải pháp kỹ thuật và bằng chứng thực hiện. Website mới tổ chức mỗi hồ sơ công trình theo đúng hành trình xem xét đó.':'Project owners assess construction partners through scope, technical approach and evidence. The new website structures every case dossier to answer those questions.'}</p>
     <div className="v7-editorial-steps"><span><b>01</b>{vi?'Bài toán':'Challenge'}</span><span><b>02</b>{vi?'Giải pháp':'Approach'}</span><span><b>03</b>{vi?'Minh chứng':'Evidence'}</span></div>
     <Link href={localePath(locale,'services')}>{vi?'Khám phá năng lực':'Explore capabilities'} <Arrow size={18}/></Link>
    </div></div></section>;
}