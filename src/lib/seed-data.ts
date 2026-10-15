/**
 * Source: xaydungluongminh.com (homepage, About us and Contact), consulted 2026-10-15.
 * These six public PROJECT NAMES and CATEGORY labels are sourced, NOT new claims.
 * Visuals are editorial SVG ILLUSTRATIONS, NOT actual photographs of these projects.
 * No budget, dimensions, completion dates, owner sign-off, certificates or claims are invented.
 */
export type Language = 'vi'|'en';
export type Kind = 'industrial'|'civil'|'infrastructure';
export interface Project {
 id:string;
 name:string;
 type: Kind;
 visual:string;
 index:string;
 summary:{vi:string;en:string};
 context:{vi:string;en:string};
 note:{vi:string;en:string};
}
export const projects: Project[] = [
 {id:'annehill-international-school',name:'ANNEHILL INTERNATIONAL SCHOOL',type:'civil',visual:'school.svg',index:'01',
  summary:{vi:'Công trình trường học trong danh mục xây dựng dân dụng của Lương Minh.',en:'An educational project listed under Luong Minh’s civil works portfolio.'},
  context:{vi:'Hạng mục được website chính thức giới thiệu trong nhóm Civil Works. Hồ sơ chi tiết về phạm vi thi công, tiến độ và quy mô cần được doanh nghiệp xác nhận trước khi công bố.',en:'Published on the official website in the Civil Works category. Detailed scope, schedule and building specifications require confirmation by the company.'},
  note:{vi:'Dự án có tên trong danh mục tiêu biểu; ảnh hiện dùng minh họa concept.',en:'Project appears in the featured list; current image is a concept illustration.'}},
 {id:'industrial-control-room-office-img',name:'INDUSTRIAL CONTROL ROOM & OFFICE – IMG',type:'industrial',visual:'control.svg',index:'02',
  summary:{vi:'Hạng mục khu điều khiển công nghiệp và văn phòng, thuộc nhóm công trình công nghiệp.',en:'Industrial control room and office entry within the industrial portfolio.'},
  context:{vi:'Website gốc liệt kê dự án dưới nhóm Industrial Projects. Đề xuất khi bổ sung hồ sơ: mô tả bản vẽ, giải pháp phối hợp hệ thống kỹ thuật, hình ảnh thi công và nghiệm thu đã được xác minh.',en:'The project is listed in Industrial Projects. A full future case study should include verified technical scope, drawings, construction records and delivery evidence.'},
  note:{vi:'Chưa xác nhận hạng mục cụ thể của Lương Minh trong công trình này.',en:'Luong Minh’s exact contractual scope has not been independently confirmed.'}},
 {id:'vietnam-german-university',name:'VIETNAM GERMAN UNIVERSITY',type:'civil',visual:'uni.svg',index:'03',
  summary:{vi:'Dự án trong nhóm xây dựng dân dụng và công trình giáo dục.',en:'A civil-works project in the education sector.'},
  context:{vi:'Được website doanh nghiệp liệt kê thuộc nhóm Civil Works. Bản trình diễn không tự đưa ra số liệu diện tích, tổng vốn đầu tư hoặc kết quả tiến độ.',en:'Listed by the company under Civil Works. This preview does not infer the floor area, contract value or delivery results.'},
  note:{vi:'Cần đối chiếu vai trò, ảnh thực tế và hồ sơ nghiệm thu.',en:'Contribution, actual photos and handover records require review.'}},
 {id:'factory-otogi',name:'FACTORY OTOGI',type:'industrial',visual:'factory.svg',index:'04',
  summary:{vi:'Dự án nhà máy trong nhóm công trình công nghiệp của Lương Minh.',en:'Factory project featured within Luong Minh’s industrial works.'},
  context:{vi:'Tên dự án nằm trong nhóm Industrial Projects của website gốc. Trang mới đề xuất cấu trúc case study theo mục tiêu kỹ thuật, phạm vi, hình ảnh và bằng chứng chất lượng khi có dữ liệu xác thực.',en:'Listed in the official Industrial Projects section. The eventual case study should be organized around verified technical objectives, scope, imagery and quality evidence.'},
  note:{vi:'Không có thông số nhà máy được xác minh trong bản MVP.',en:'No factory size, equipment scope or metrics are claimed in this MVP.'}},
 {id:'factory-938-national-road',name:'FACTORY 938 NATIONAL ROAD',type:'industrial',visual:'road.svg',index:'05',
  summary:{vi:'Dự án công trình công nghiệp được giới thiệu trên website Lương Minh.',en:'Industrial project presented in the Luong Minh portfolio.'},
  context:{vi:'Được công bố trong danh mục Industrial Projects. Hình minh họa hiện diễn đạt ngôn ngữ hạ tầng – công nghiệp, không đại diện cho thiết kế thật hoặc vị trí nhà máy.',en:'Published in the Industrial Projects listing. The editorial image represents an industrial-infrastructure mood, not the actual factory or its site.'},
  note:{vi:'Tên gọi và phân loại theo website; cần bộ ảnh dự án thực tế.',en:'Name and category follow the website; real project photography is required.'}},
 {id:'hi-crete-warehouse',name:'HI-CRETE WAREHOUSE',type:'industrial',visual:'warehouse.svg',index:'06',
  summary:{vi:'Dự án kho trong danh mục công trình công nghiệp.',en:'A warehouse project listed under industrial works.'},
  context:{vi:'Được website gốc giới thiệu trong nhóm Industrial Projects. Bộ ảnh thực tế, tiêu chuẩn vật liệu và phạm vi phụ trách là phần dữ liệu cần hoàn thiện cho production.',en:'Featured by the source website in Industrial Projects. Actual photography, material specifications and scope must be verified for production.'},
  note:{vi:'Ảnh hiển thị là minh họa kiến trúc concept, không phải công trình Hi-Crete.',en:'Shown artwork is an architecture concept illustration, not the actual Hi-Crete project.'}}
];
export const company={
 established:'10/2014',
 name:{vi:'CÔNG TY CỔ PHẦN XÂY DỰNG VÀ THƯƠNG MẠI LƯƠNG MINH',en:'LUONG MINH CONSTRUCTION & TRADING CORPORATION'},
 phoneDisplay:'090 967 2968',phone:'0909672968',email:'xaydungluongminh@gmail.com',
 address:'29/7/8 Lê Đức Thọ, Phường 7, Gò Vấp, TP. Hồ Chí Minh',
 hours:{vi:'Thứ Hai – Thứ Bảy · 08:00–18:00',en:'Mon – Sat · 08:00–18:00'},
 original:'https://xaydungluongminh.com/'
};
export const serviceGroups:{id:Kind;ordinal:string;title:{vi:string;en:string};desc:{vi:string;en:string};sub:{vi:string;en:string};visual:string}[]=[
 {id:'industrial',ordinal:'01',title:{vi:'Công trình công nghiệp',en:'Industrial Construction'},desc:{vi:'Nhà máy, nhà kho, hạng mục phụ trợ và không gian kỹ thuật.',en:'Factories, warehouses, support facilities and technical workspaces.'},sub:{vi:'CÔNG NGHIỆP / M&E',en:'INDUSTRIAL / M&E'},visual:'factory.svg'},
 {id:'civil',ordinal:'02',title:{vi:'Xây dựng dân dụng',en:'Civil Construction'},desc:{vi:'Công trình giáo dục, kiến trúc dân dụng và các hạng mục xây dựng liên quan.',en:'Education buildings, civil structures and related construction works.'},sub:{vi:'DÂN DỤNG / GIÁM SÁT',en:'CIVIL / SUPERVISION'},visual:'school.svg'},
 {id:'infrastructure',ordinal:'03',title:{vi:'Hạ tầng kỹ thuật',en:'Infrastructure'},desc:{vi:'Hạ tầng cầu đường, thoát nước và hạng mục công trình kỹ thuật.',en:'Road and bridge infrastructure, drainage and technical civil works.'},sub:{vi:'CẦU ĐƯỜNG / HẠ TẦNG',en:'ROADS / INFRASTRUCTURE'},visual:'road.svg'}
];
export const claims={
 about:{vi:'Doanh nghiệp thành lập tháng 10/2014, hoạt động trong tư vấn kỹ thuật và dịch vụ xây dựng, công trình công nghiệp, công trình dân dụng và các lĩnh vực liên quan.',en:'Established in October 2014, Luong Minh describes its core practice as technical consulting and construction services spanning industrial, civil and related projects.'},
 approach:{vi:'Hồ sơ năng lực có giá trị khi thể hiện rõ vai trò, giải pháp kỹ thuật, con người và bằng chứng thực hiện. Đây là định hướng nội dung của bản thiết kế lại.',en:'An effective capability profile makes contractual scope, technical solutions, people and delivery evidence clear. This is the proposed editorial direction.'}
};
