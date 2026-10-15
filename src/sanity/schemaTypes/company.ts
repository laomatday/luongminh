import {defineField,defineType} from 'sanity';
export default defineType({name:'company',type:'document',title:'Thông tin doanh nghiệp',fields:[
 defineField({name:'nameVi',type:'string',title:'Tên doanh nghiệp VI'}),
 defineField({name:'nameEn',type:'string',title:'Company name EN'}),
 defineField({name:'phone',type:'string',title:'Hotline'}),
 defineField({name:'email',type:'string',title:'Email',validation:r=>r.email()}),
 defineField({name:'addressVi',type:'text',title:'Địa chỉ VI đã kiểm chứng',rows:2}),
 defineField({name:'addressEn',type:'text',title:'Address EN',rows:2}),
 defineField({name:'logo',type:'image',title:'Logo chính thức — quyền sử dụng phải xác nhận'}),
 defineField({name:'approvedForPublication',type:'boolean',title:'Xác nhận dữ liệu doanh nghiệp',initialValue:false})
]});
