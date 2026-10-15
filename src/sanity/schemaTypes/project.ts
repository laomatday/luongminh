import {defineField,defineType} from 'sanity';

/** Approved content only. New projects never publish by default. */
export default defineType({
 name:'project', title:'Công trình / Project', type:'document',
 fields:[
  defineField({name:'title',title:'Tên công trình',type:'string',validation:r=>r.required().min(3)}),
  defineField({name:'slug',title:'URL slug',type:'slug',options:{source:'title',maxLength:96},validation:r=>r.required()}),
  defineField({name:'category',title:'Lĩnh vực',type:'string',options:{list:[{title:'Công nghiệp',value:'industrial'},{title:'Dân dụng',value:'civil'},{title:'Hạ tầng',value:'infrastructure'}]},validation:r=>r.required()}),
  defineField({name:'sortOrder',title:'Thứ tự',type:'number',initialValue:100}),
  defineField({name:'summaryVi',title:'Mô tả ngắn (VI)',type:'text',rows:3,validation:r=>r.required().max(280)}),
  defineField({name:'summaryEn',title:'Short summary (EN)',type:'text',rows:3}),
  defineField({name:'descriptionVi',title:'Câu chuyện dự án (VI)',type:'text',rows:8}),
  defineField({name:'descriptionEn',title:'Project story (EN)',type:'text',rows:8}),
  defineField({name:'client',title:'Khách hàng / Chủ đầu tư — cần xác nhận',type:'string'}),
  defineField({name:'location',title:'Địa điểm công trình',type:'string'}),
  defineField({name:'contractRole',title:'Vai trò/phạm vi hợp đồng — cần hồ sơ',type:'text',rows:3}),
  defineField({name:'area',title:'Quy mô / Diện tích — chỉ ghi khi có bằng chứng',type:'string'}),
  defineField({name:'completedYear',title:'Năm hoàn thành — cần xác nhận',type:'number',validation:r=>r.min(2000).max(2100)}),
  defineField({name:'coverImage',title:'Ảnh bìa gốc đã được duyệt',type:'image',options:{hotspot:true},fields:[defineField({name:'altVi',type:'string',title:'Alt VI'}),defineField({name:'altEn',type:'string',title:'Alt EN'}),defineField({name:'rightsConfirmed',type:'boolean',title:'Đã được phép sử dụng?',initialValue:false})]}),
  defineField({name:'gallery',title:'Hình công trình thực tế',type:'array',of:[{type:'image',options:{hotspot:true},fields:[defineField({name:'captionVi',type:'string',title:'Caption VI'}),defineField({name:'captionEn',type:'string',title:'Caption EN'}),defineField({name:'rightsConfirmed',type:'boolean',title:'Quyền sử dụng được xác nhận?',initialValue:false})]}]}),
  defineField({name:'approvalReference',title:'Mã/nguồn xác nhận nội dung',type:'string'}),
  defineField({name:'approvedForPublication',title:'ĐÃ DUYỆT XUẤT BẢN',type:'boolean',initialValue:false,description:'Chỉ bật sau khi kiểm tra hợp đồng, quyền hình ảnh, số liệu và nội dung.'})
 ],
 validation:r=>r.custom((doc)=>{
  if(doc?.approvedForPublication && (!doc?.approvalReference||!doc?.coverImage||!(doc.coverImage as {rightsConfirmed?:boolean})?.rightsConfirmed))return 'Thiếu ảnh bìa hoặc nguồn phê duyệt, không thể xuất bản.';
  return true;
 }),
 preview:{select:{title:'title',subtitle:'category',media:'coverImage'}}
});
