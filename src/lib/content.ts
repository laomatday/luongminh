import {createClient} from 'next-sanity';
import {projects as seed, company, serviceGroups} from './seed-data';
import type {Kind} from './seed-data';
import type {Locale} from './i18n';

export {company,serviceGroups};
export type {Kind};
export type ProjectView = {
  id:string;
  name:string;
  type:Kind;
  summary:{vi:string;en:string};
  description:{vi:string;en:string};
  photoUrl:string|null;
  visual:string;
  client?:string;
  location?:string;
  contractRole?:string;
  area?:string;
  completedYear?:number;
  approved:boolean;
  source:'verified-cms'|'source-listing';
};

const fallbacks:ProjectView[]=seed.map(p=>({
  id:p.id,name:p.name,type:p.type,summary:p.summary,description:p.context,
  photoUrl:null,visual:p.visual,approved:false,source:'source-listing'
}));

type SanityProject={
  id:string;name:string;type:Kind;summaryVi?:string;summaryEn?:string;
  descriptionVi?:string;descriptionEn?:string;photoUrl?:string;
  client?:string;location?:string;contractRole?:string;
  area?:string;completedYear?:number;
};
const id=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||'production';
const version=process.env.SANITY_API_VERSION||'2026-10-01';
const client=id?createClient({projectId:id,dataset,apiVersion:version,useCdn:true}):null;
const query=`*[_type == "project" && approvedForPublication == true && coverImage.rightsConfirmed == true && defined(slug.current)] | order(sortOrder asc){
  "id":slug.current,"name":title,"type":category,
  summaryVi,summaryEn,descriptionVi,descriptionEn,
  "photoUrl":coverImage.asset->url,client,location,contractRole,area,completedYear
}`;

function valid(v:SanityProject):v is SanityProject {return Boolean(v && typeof v.id==='string' && v.id.length>1 && typeof v.name==='string' && ['industrial','civil','infrastructure'].includes(v.type));}

export async function getProjects():Promise<ProjectView[]> {
  if(!client) return fallbacks;
  try {
    const rows=await client.fetch<SanityProject[]>(query,{},{next:{revalidate:600}});
    const approved=(rows||[]).filter(valid).map(p=>({
      id:p.id,name:p.name,type:p.type,
      summary:{vi:p.summaryVi||'',en:p.summaryEn||p.summaryVi||''},
      description:{vi:p.descriptionVi||'',en:p.descriptionEn||p.descriptionVi||''},
      photoUrl:p.photoUrl||null,visual:seed.find(s=>s.id===p.id)?.visual||'factory.svg',
      client:p.client,location:p.location,contractRole:p.contractRole,
      area:p.area,completedYear:p.completedYear,approved:true,source:'verified-cms' as const
    }));
    // A configured CMS with zero approved projects is intentionally EMPTY.
    // Never substitute demo projects as verified production projects.
    return approved;
  } catch(e) {
    console.error('CMS read unavailable; suppressing projects until data service recovers.');
    return [];
  }
}
export async function getProject(slug:string):Promise<ProjectView|undefined>{return (await getProjects()).find(p=>p.id===slug);}
export {sectorName} from './presentation';
