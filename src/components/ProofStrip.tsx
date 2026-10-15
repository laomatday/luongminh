import type {Locale} from '@/lib/i18n';
/** Only public, verified values: founded 2014, three sectors, six published sample project names. */
export default function ProofStrip({locale,projectsCount=6}:{locale:Locale;projectsCount?:number}) {
 const facts = [
  {number:'2014',label:locale==='vi'?'Năm thành lập':'Established',detail:locale==='vi'?'Nền tảng hoạt động':'Company history'},
  {number:'03',label:locale==='vi'?'Lĩnh vực chính':'Core sectors',detail:locale==='vi'?'Công nghiệp · Dân dụng · Hạ tầng':'Industrial · Civil · Infrastructure'},
  {number:String(projectsCount).padStart(2,'0'),label:locale==='vi'?'Dự án hiển thị':'Visible projects',detail:locale==='vi'?'Danh mục công khai / CMS được duyệt':'Public listing / approved CMS'}
 ];
 return <section className="proof-bar shell" aria-label={locale==='vi'?'Thông tin năng lực công khai':'Public company facts'}>
   <div className="proof-label"><span>LUONG MINH / IN BRIEF</span><span>01—03</span></div>
   {facts.map((f,i)=><div className="proof-fact" key={i}><span className="proof-no">{String(i+1).padStart(2,'0')}</span><strong>{f.number}</strong><div><span>{f.label}</span><small>{f.detail}</small></div></div>)}
 </section>;
}
