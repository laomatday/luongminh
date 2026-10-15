import {NextResponse} from 'next/server';
import {Resend} from 'resend';
import {parseInquiry} from '@/lib/inquiry-validation';
export const runtime='nodejs';

function reply(status:number,body:Record<string,string>) {return NextResponse.json(body,{status,headers:{'Cache-Control':'no-store'}});}

export async function POST(request:Request) {
 // Fail closed: no fake "success" message when credentials or anti-spam are absent.
 const secret=process.env.TURNSTILE_SECRET_KEY;
 const apiKey=process.env.RESEND_API_KEY;
 const from=process.env.INQUIRY_FROM_EMAIL;
 const to=process.env.INQUIRY_TO_EMAIL;
 if(!secret||!apiKey||!from||!to) return reply(503,{error:'Inquiry service is not configured'});
 const siteUrl=process.env.NEXT_PUBLIC_SITE_URL;
 const origin=request.headers.get('origin');
 if(siteUrl&&origin&&origin!==new URL(siteUrl).origin)return reply(403,{error:'Origin not allowed'});
 const ct=request.headers.get('content-type')||'';
 if(!ct.startsWith('application/json'))return reply(415,{error:'Only JSON is supported'});
 const len=Number(request.headers.get('content-length')||'0');
 if(len>10000)return reply(413,{error:'Request too large'});
 let payload:unknown;
 try {const raw=await request.text();if(raw.length>10000)return reply(413,{error:'Request too large'});payload=JSON.parse(raw);}catch{return reply(400,{error:'Invalid JSON'});}
 const validation=parseInquiry(payload);
 if(!validation.ok)return reply(400,{error:validation.error});
 const form=validation.value;
 try {
  const turnstile=new URLSearchParams({secret,response:form.turnstileToken});
  const check=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:turnstile,cache:'no-store',signal:AbortSignal.timeout(8000)});
  if(!check.ok)return reply(502,{error:'Anti-spam provider unavailable'});
  const verified=await check.json() as {success?:boolean;hostname?:string};
  const host=siteUrl?new URL(siteUrl).hostname:undefined;
  if(!verified.success||(host&&verified.hostname!==host))return reply(403,{error:'Anti-spam verification failed'});
  const lines=[`Họ tên: ${form.name}`,`Số điện thoại: ${form.phone}`,`Email: ${form.email||'Chưa cung cấp'}`,`Đơn vị: ${form.organization||'Chưa cung cấp'}`,`Lĩnh vực: ${form.service}`,'', 'Nội dung yêu cầu:',form.details];
  const resend=new Resend(apiKey);
  const {data,error}=await resend.emails.send({from,to,replyTo:form.email||undefined,subject:`Yêu cầu dự án LMC — ${form.service}`,text:lines.join('\n')});
  if(error||!data?.id) {console.error('Email transport declined inquiry; no personal data logged.');return reply(502,{error:'Email delivery failed'});}
  return reply(200,{status:'accepted'});
 } catch {console.error('Inquiry dependency unavailable; no personal data logged.');return reply(502,{error:'Inquiry service temporarily unavailable'});}
}
