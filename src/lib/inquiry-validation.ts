export type InquiryInput={name:string;phone:string;email:string;organization:string;service:'industrial'|'civil'|'infrastructure'|'unsure';details:string;turnstileToken:string;website:string};
export type ParseResult={ok:true;value:InquiryInput}|{ok:false;error:string};
const safe=(v:unknown)=>typeof v==='string'?v.trim():'';
export function parseInquiry(input:unknown):ParseResult {
 if(!input||typeof input!=='object'||Array.isArray(input))return {ok:false,error:'Invalid request'};
 const x=input as Record<string,unknown>;
 const name=safe(x.name),phone=safe(x.phone),email=safe(x.email),organization=safe(x.organization),details=safe(x.details),service=safe(x.service),turnstileToken=safe(x.turnstileToken),website=safe(x.website);
 if(website) return {ok:false,error:'Invalid request'}; // honeypot field
 if(name.length<2||name.length>90)return {ok:false,error:'Name must be between 2 and 90 characters'};
 if(!/^[+0-9()\s.-]{8,24}$/.test(phone))return {ok:false,error:'Invalid phone number'};
 if(email&&(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>160))return {ok:false,error:'Invalid email address'};
 if(organization.length>120)return {ok:false,error:'Organization too long'};
 if(!['industrial','civil','infrastructure','unsure'].includes(service))return {ok:false,error:'Invalid project category'};
 if(details.length<20||details.length>4000)return {ok:false,error:'Project brief must be between 20 and 4000 characters'};
 if(turnstileToken.length<10||turnstileToken.length>4000)return {ok:false,error:'Anti-spam verification is required'};
 return {ok:true,value:{name,phone,email,organization,details,service:service as InquiryInput['service'],turnstileToken,website:''}};
}
