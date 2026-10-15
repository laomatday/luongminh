import type {VisualMode,BuildingLayer} from './engine3d';

/**
 * V6 cinematic storyboard — client-side illustrated industrial hall.
 * 5 stages × 4.8s = 24s loop. Mode and camera transitions are interpolated
 * inside the renderer rather than implemented as full-page scroll hijacks.
 */
export const SCENE_DURATION_MS=4800;
export const SCENE_TRANSITION_MS=960;
export type SceneId='finish'|'structure'|'explode'|'assembly'|'portfolio';
export interface CinematicScene {
 id:SceneId;
 no:string;
 mode:VisualMode;
 layer:BuildingLayer;
 progress:number;
 zoom:number;
 yaw:number;
 pitch:number;
 label:{vi:string;en:string};
 title:{vi:string;en:string};
 description:{vi:string;en:string};
}
export const CINEMATIC_SCENES:CinematicScene[]=[
 {
  id:'finish',no:'01',mode:'complete',layer:'all',progress:100,zoom:1.06,yaw:-.64,pitch:.50,
  label:{vi:'KHUNG HÌNH 01 / TOÀN CẢNH',en:'SCENE 01 / ESTABLISHING'},
  title:{vi:'Công trình hoàn thiện',en:'The finished building'},
  description:{vi:'Tổng thể nhà xưởng và hình khối kiến trúc.',en:'Architecture, massing and finished envelope.'}
 },
 {
  id:'structure',no:'02',mode:'structure',layer:'all',progress:100,zoom:1.12,yaw:.39,pitch:.42,
  label:{vi:'KHUNG HÌNH 02 / KẾT CẤU',en:'SCENE 02 / STRUCTURE'},
  title:{vi:'Bên trong hệ khung',en:'Inside the structure'},
  description:{vi:'Hệ cột, kèo và các đường truyền lực mô phỏng.',en:'Structural columns, beams and bracing in view.'}
 },
 {
  id:'explode',no:'03',mode:'exploded',layer:'all',progress:100,zoom:1.28,yaw:1.61,pitch:.61,
  label:{vi:'KHUNG HÌNH 03 / CẤU TẠO',en:'SCENE 03 / ANATOMY'},
  title:{vi:'Nhìn rõ từng lớp',en:'Explore every layer'},
  description:{vi:'Tách mái và hệ bao che để khám phá cấu tạo.',en:'Separate roof and envelope to reveal assembly.'}
 },
 {
  id:'assembly',no:'04',mode:'complete',layer:'all',progress:8,zoom:1.08,yaw:2.88,pitch:.49,
  label:{vi:'KHUNG HÌNH 04 / THI CÔNG',en:'SCENE 04 / ASSEMBLY'},
  title:{vi:'Công trình hình thành',en:'Building in sequence'},
  description:{vi:'Theo dõi mô phỏng lắp dựng từ móng đến mái.',en:'Watch the conceptual construction progress.'}
 },
 {
  id:'portfolio',no:'05',mode:'complete',layer:'all',progress:100,zoom:1.02,yaw:4.10,pitch:.44,
  label:{vi:'KHUNG HÌNH 05 / CÔNG TRÌNH',en:'SCENE 05 / DISCOVER'},
  title:{vi:'Từ mô hình đến dự án',en:'From concept to projects'},
  description:{vi:'Khám phá danh mục công trình thực tế đã được công bố.',en:'Continue into the published project archive.'}
 }
];
