'use client';
import {useEffect,useRef,useState} from 'react';
import Script from 'next/script';
import type {Kind} from '@/lib/content';
import type {Locale} from '@/lib/i18n';
import {ui} from '@/lib/i18n';
import {company} from '@/lib/seed-data';
import {Arrow} from './Arrow';

declare global {
 interface Window {turnstile?:{render:(element:HTMLElement,options:{sitekey:string;callback:(token:string)=>void;'expired-callback':()=>void})=>string;remove:(widgetId:string)=>void;reset:(widgetId:string)=>void};}
}
const sitekey=process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
type Form={name:string;phone:string;email:string;organization:string;service:Kind|'unsure';details:string;website:string};
const initial:Form={name:'',phone:'',email:'',organization:'',service:'industrial',details:'',website:''};
export default function ContactForm({locale}:{locale:Locale}){
 const [form,setForm]=useState<Form>(initial);
 const [token,setToken]=useState('');
 const [status,setStatus]=useState<'idle'|'sending'|'sent'|'failed'>('idle');
 const [error,setError]=useState('');
 const box=useRef<HTMLDivElement>(null);
 const widgetId=useRef<string|null>(null);
 const mounted=useRef(true);
 useEffect(()=>{mounted.current=true;return()=>{mounted.current=false;widgetId.current&&window.turnstile?.remove(widgetId.current);};},[]);
 function initCaptcha(){
  if(!sitekey||!box.current||!window.turnstile||widgetId.current)return;
  widgetId.current=window.turnstile.render(box.current, {sitekey,callback:(t)=>{if(mounted.current)setToken(t);},'expired-callback':()=>{if(mounted.current)setToken('');}});
 }
 const change=(key:keyof Form,v:string)=>setForm(p=>({...p,[key]:v}));
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();if(status==='sending'||!sitekey||!token)return;
  setStatus('sending');setError('');
  try{
   const response=await fetch('/api/inquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...form,turnstileToken:token})});
   const result=await response.json() as {status?:string;error?:string};
   if(!response.ok||result.status!=='accepted')throw new Error(result.error||'Service unavailable');
   setForm(initial);setStatus('sent');setToken('');if(widgetId.current)window.turnstile?.reset(widgetId.current);
  } catch (err) {setStatus('failed');setError(err instanceof Error?err.message:'Service unavailable');}
 }
 return <div>
  {sitekey&&<Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onLoad={initCaptcha}/> }
  <form className="inquiry-form" onSubmit={submit}>
   <div className="form-head"><span>PROJECT INQUIRY</span><span>* REQUIRED</span></div>
   <div className="form-cols"><label>{ui[locale].name} *<input autoComplete="name" maxLength={90} required minLength={2} value={form.name} onChange={e=>change('name',e.target.value)}/></label><label>{ui[locale].phone} *<input autoComplete="tel" inputMode="tel" maxLength={24} required minLength={8} value={form.phone} onChange={e=>change('phone',e.target.value)}/></label></div>
   <div className="form-cols"><label>{ui[locale].email}<input type="email" autoComplete="email" maxLength={160} value={form.email} onChange={e=>change('email',e.target.value)}/></label><label>{ui[locale].company}<input autoComplete="organization" maxLength={120} value={form.organization} onChange={e=>change('organization',e.target.value)}/></label></div>
   <label>{ui[locale].sector}<select value={form.service} onChange={e=>change('service',e.target.value)}><option value="industrial">{ui[locale].industrial}</option><option value="civil">{ui[locale].civil}</option><option value="infrastructure">{ui[locale].infrastructure}</option><option value="unsure">{locale==='vi'?'Chưa xác định':'Not sure yet'}</option></select></label>
   <label>{ui[locale].message} *<textarea required minLength={20} maxLength={4000} rows={5} value={form.details} onChange={e=>change('details',e.target.value)} placeholder={locale==='vi'?'Địa điểm, loại công trình, hạng mục kỹ thuật dự kiến...':'Location, project type and technical scope...'}/></label>
   <label className="hp-field" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={e=>change('website',e.target.value)}/></label>
   <div ref={box} aria-label="Anti-spam verification"/>
   {!sitekey&&<div className="v7-contact-fallback"><p>{locale==='vi'?'Biểu mẫu trực tuyến đang được cấu hình bảo mật. Anh/chị có thể liên hệ trực tiếp bằng email ngay bây giờ.':'Secure online inquiry is still being configured. You can email the team directly now.'}</p><a href={`mailto:${company.email}?subject=${encodeURIComponent(locale==='vi'?'Yêu cầu tư vấn dự án — Lương Minh':'Project inquiry — Luong Minh')}`}>{locale==='vi'?'Soạn email yêu cầu tư vấn':'Compose an inquiry email'} ↗</a></div>}
   <div className="form-actions"><button className="submit-btn" type="submit" disabled={!sitekey||!token||status==='sending'}>{status==='sending'?ui[locale].sending:ui[locale].submit}<Arrow size={20}/></button></div>
   {status==='sent'&&<p role="status" className="form-disclaimer">{ui[locale].success}</p>}
   {status==='failed'&&<p role="alert" className="form-disclaimer">{ui[locale].error} ({error}) <a href={`mailto:${company.email}`}>{company.email}</a></p>}
   <p className="form-disclaimer">{locale==='vi'?'Thông tin chỉ dùng để phản hồi yêu cầu hợp tác. Biểu mẫu không tự lưu dữ liệu vào website.':'The inquiry details are used to respond to your request. This form does not store submissions on the website.'}</p>
  </form>
 </div>;
}
