'use client';
import * as React from 'react';
import {ConstructionEngine,ConstructionCanvasEngine} from './engine3d';
import type {VisualMode,BuildingLayer} from './engine3d';
import {CINEMATIC_SCENES,SCENE_DURATION_MS,SCENE_TRANSITION_MS} from './cinematic-scenes';

/**
 * LMC V6: real-time 3D film player. Auto-rotates through five camera/mode scenes.
 * Uses independent engine camera animation; React only changes scenes and controls.
 * No scroll hijacking. Offscreen / document-hidden / reduced-motion safeguards.
 */
type Lang='vi'|'en';
type Playback='playing'|'paused'|'manual';
interface Props {lang:Lang;compact?:boolean;projectsHref?:string}
interface State {
 mode:VisualMode;layer:BuildingLayer;progress:number;zoom:number;
 ready:boolean;fallback:boolean;scene:number;playback:Playback;reduced:boolean;
}
const T={
 vi:{complete:'Hoàn thiện',structure:'Khung kết cấu',exploded:'Tách lớp',reset:'Đặt lại góc nhìn',zoomIn:'Phóng to',zoomOut:'Thu nhỏ',rotateLeft:'Xoay trái',rotateRight:'Xoay phải',layer:'KHÁM PHÁ CẤU KIỆN',all:'Toàn bộ',foundation:'Móng & nền',steel:'Khung thép',envelope:'Vỏ bao che',roof:'Hệ mái',phase:'TIẾN ĐỘ MÔ PHỎNG',phases:['Nền móng','Kết cấu','Bao che','Hoàn thiện'],note:'Mô hình 3D minh họa nguyên lý — không phải hồ sơ BIM hoặc công trình thực tế của Lương Minh.',hint:'Kéo xoay · Ctrl+cuộn hoặc +/− để phóng to',fallback:'Không thể khởi tạo 3D tương tác trên thiết bị này; đang dùng bản minh họa SVG.',sections:{all:'Tổng thể các hệ cấu kiện và quan hệ lắp dựng.',foundation:'Nền móng, bản nền và giai đoạn đầu của trình tự thi công.',steel:'Hệ cột, kèo, xà gồ và giằng chịu lực.',envelope:'Tấm bao che, mảng kính và bộ phận mặt đứng.',roof:'Mái và các đường mép mái.'},player:'CINEMATIC 3D / V6',auto:'TỰ ĐỘNG',paused:'TẠM DỪNG',manual:'THỦ CÔNG',pause:'Tạm dừng',play:'Tiếp tục',replay:'Phát lại',explore:'Khám phá thủ công',chapter:'CẢNH',portfolio:'Xem công trình thực tế',interaction:'Tương tác thủ công: phim sẽ tiếp tục sau 7 giây.',motionOff:'Đã tắt tự động theo tùy chọn giảm chuyển động của thiết bị.'},
 en:{complete:'Finished',structure:'Structure',exploded:'Exploded',reset:'Reset camera',zoomIn:'Zoom in',zoomOut:'Zoom out',rotateLeft:'Rotate left',rotateRight:'Rotate right',layer:'EXPLORE BUILDING SYSTEMS',all:'All systems',foundation:'Foundations',steel:'Steel frame',envelope:'Envelope',roof:'Roof system',phase:'SIMULATED CONSTRUCTION',phases:['Foundation','Structure','Envelope','Completion'],note:'Conceptual 3D model of building systems — not BIM or an actual Luong Minh project.',hint:'Drag to orbit · Ctrl+scroll or +/− to zoom',fallback:'Interactive 3D cannot initialize on this device. Showing an SVG illustration.',sections:{all:'Inspect the building and relationships among systems.',foundation:'Foundation and slab are the first conceptual building stage.',steel:'Structural frames, roof trusses, purlins and bracing.',envelope:'Wall cladding, glazing and facade elements.',roof:'Roof surfaces and flashing.'},player:'CINEMATIC 3D / V6',auto:'AUTOPLAY',paused:'PAUSED',manual:'MANUAL',pause:'Pause',play:'Play',replay:'Replay',explore:'Explore manually',chapter:'SCENE',portfolio:'View published projects',interaction:'Manual interaction: film resumes after 7 seconds.',motionOff:'Autoplay is off because Reduced Motion is enabled.'}
};
function Illustration(){return <svg className="fallback-isometric" viewBox="0 0 720 530" role="img" aria-label="Concept industrial warehouse, isometric view"><defs><linearGradient id="b3" x1="0" x2="1"><stop stopColor="#9bb9b2"/><stop offset="1" stopColor="#526d6c"/></linearGradient></defs><path d="M101 343 373 207 638 345 373 480z" fill="#425852"/><path d="M157 322 362 217 592 327 374 435z" fill="#c5d0c7"/><path d="M160 304 373 199 585 307 374 417z" fill="#b9c8c0"/><path d="M160 304v-127l212-90v112z" fill="#77938d"/><path d="M372 199V87l212 90v130z" fill="url(#b3)"/><path d="M160 177 374 65 584 176 372 287z" fill="#516e6b"/><path d="M160 177 374 65 374 287z" fill="#6a8481"/><path d="M372 287 584 176 584 306 372 417z" fill="#aabbb3"/><path d="M405 303 462 271v84l-57 29zM479 264l53-28v84l-53 27z" fill="#345b63"/><path d="M405 303 462 271m17-7 53-28" stroke="#d4e1da" strokeWidth="5"/><path d="m160 177 214-112 210 111" fill="none" stroke="#e2b18b" strokeWidth="8"/><path d="M372 287v130" stroke="#607e79" strokeWidth="6"/></svg>}

export default class Construction3D extends React.Component<Props,State>{
 state:State={mode:'complete',layer:'all',progress:100,zoom:1.06,ready:false,fallback:false,scene:0,playback:'playing',reduced:false};
 private root:HTMLDivElement|null=null;
 private canvas:HTMLCanvasElement|null=null;
 private engine:ConstructionEngine|ConstructionCanvasEngine|null=null;
 private intersect:IntersectionObserver|null=null;
 private motionQuery:MediaQueryList|null=null;
 private visible=true;
 private timer=0;
 private resumeTimer=0;
 private elapsed=0;
 private lastTick=0;
 private lastPercentage=0;
 private destroyed=false;
 private readonly INTERACTION_RESUME_MS=7000;

 componentDidMount(){
  this.destroyed=false;
  this.motionQuery=window.matchMedia?.('(prefers-reduced-motion: reduce)')??null;
  const reduced=!!this.motionQuery?.matches;
  document.addEventListener('visibilitychange',this.syncPlayback);
  this.motionQuery?.addEventListener?.('change',this.onReducedChanged);
  if(typeof IntersectionObserver!=='undefined' && this.root){
   this.intersect=new IntersectionObserver(entries=>{this.visible=entries[0]?.isIntersecting??false;this.syncPlayback();},{threshold:.035});
   this.intersect.observe(this.root);
  }
  if(!this.canvas)return;
  try {
   this.engine=new ConstructionEngine(this.canvas,{compact:!!this.props.compact,onInteract:this.onUserInteract,onLost:()=>this.setState({fallback:true})});
   this.setState({ready:true,reduced,playback:reduced?'manual':'playing'},()=>{this.applyScene(0);this.syncPlayback();});
  } catch {
   try {
    this.engine=new ConstructionCanvasEngine(this.canvas,{compact:!!this.props.compact,onInteract:this.onUserInteract});
    this.setState({ready:true,reduced,playback:reduced?'manual':'playing'},()=>{this.applyScene(0);this.syncPlayback();});
   } catch {this.setState({fallback:true,playback:'manual',reduced});}
  }
 }
 componentDidUpdate(_p:Props,prev:State){
  if(this.engine&&(prev.mode!==this.state.mode||prev.layer!==this.state.layer||prev.progress!==this.state.progress||prev.zoom!==this.state.zoom)){
   this.engine.update({mode:this.state.mode,layer:this.state.layer,progress:this.state.progress,zoom:this.state.zoom});
  }
  if(prev.playback!==this.state.playback||prev.ready!==this.state.ready||prev.reduced!==this.state.reduced)this.syncPlayback();
 }
 componentWillUnmount(){
  this.destroyed=true;this.stopClock();window.clearTimeout(this.resumeTimer);
  this.intersect?.disconnect();document.removeEventListener('visibilitychange',this.syncPlayback);
  this.motionQuery?.removeEventListener?.('change',this.onReducedChanged);
  this.engine?.destroy();this.engine=null;
 }
 onReducedChanged=(event:MediaQueryListEvent)=>{
  window.clearTimeout(this.resumeTimer);
  this.setState({reduced:event.matches,playback:event.matches?'manual':this.state.playback});
  if(event.matches)this.engine?.setAutoMotion(false);
 };
 private hasPlayback=()=>this.state.ready&&this.state.playback==='playing'&&this.visible&&!document.hidden&&!this.state.fallback;
 private stopClock=()=>{if(this.timer){window.clearInterval(this.timer);this.timer=0;}};
 syncPlayback=()=>{
  if(this.destroyed)return;
  const running=this.hasPlayback();
  this.engine?.setAutoMotion(running&&!this.state.reduced);
  if(running){
   if(!this.timer){this.lastTick=performance.now();this.timer=window.setInterval(this.onClock,85);}
  }else{this.stopClock();this.lastTick=0;}
 };
 private onClock=()=>{
  if(!this.hasPlayback())return;
  const now=performance.now(),dt=this.lastTick?Math.min(180,Math.max(0,now-this.lastTick)):85;
  this.lastTick=now;this.elapsed+=dt;
  if(this.elapsed>=SCENE_DURATION_MS){this.applyScene((this.state.scene+1)%CINEMATIC_SCENES.length,true);return;}
  const pct=100*this.elapsed/SCENE_DURATION_MS;
  this.root?.style.setProperty('--cinematic-progress',pct.toFixed(1)+'%');
  // Scene 04: live reconstruction; React UI updates at most every ~5%.
  if(CINEMATIC_SCENES[this.state.scene].id==='assembly'){
   const progress=Math.min(100,Math.round(8+92*Math.min(1,this.elapsed/(SCENE_DURATION_MS-SCENE_TRANSITION_MS*.35))));
   this.engine?.update({progress});
   if(Math.abs(progress-this.lastPercentage)>=5||progress===100){this.lastPercentage=progress;this.setState({progress});}
  }
 };
 private applyScene=(index:number,forwardOnly=false)=>{
  const scene=CINEMATIC_SCENES[index];
  this.elapsed=0;this.lastPercentage=scene.progress;
  this.root?.style.setProperty('--cinematic-progress','0%');
  this.engine?.update({mode:scene.mode,layer:scene.layer,progress:scene.progress,zoom:scene.zoom});
  this.engine?.setCameraPose(scene.yaw,scene.pitch,scene.zoom,forwardOnly);
  this.setState({scene:index,mode:scene.mode,layer:scene.layer,progress:scene.progress,zoom:scene.zoom});
 };
 private cancelIdleResume=()=>{window.clearTimeout(this.resumeTimer);this.resumeTimer=0;};
 private pauseExplicit=()=>{this.cancelIdleResume();this.setState({playback:'paused'});};
 private play=()=>{this.cancelIdleResume();if(this.state.fallback)return;this.setState({playback:'playing'});};
 private replay=()=>{this.cancelIdleResume();this.applyScene(0);if(!this.state.fallback)this.setState({playback:'playing'});};
 private manual=()=>{this.cancelIdleResume();this.setState({playback:'manual'});};
 private toggle=()=>{this.state.playback==='playing'?this.pauseExplicit():this.play();};
 private selectScene=(index:number)=>{this.manual();this.applyScene(index);};
 /** User drag briefly pauses the film; a deliberate Manual click pauses indefinitely. */
 onUserInteract=()=>{
  if(this.state.playback!=='playing')return;
  this.setState({playback:'paused'});
  this.cancelIdleResume();
  this.resumeTimer=window.setTimeout(()=>{if(!this.destroyed&&this.state.playback==='paused')this.setState({playback:'playing'});},this.INTERACTION_RESUME_MS);
 };
 private setMode=(mode:VisualMode)=>{this.manual();this.setState({mode,progress:100,layer:'all'});};
 private setLayer=(layer:BuildingLayer)=>{this.manual();this.setState({layer,progress:100,mode:'complete'});};
 private setProgress=(progress:number)=>{this.manual();this.setState({progress,mode:'complete',layer:'all'});};
 private zoom=(delta:number)=>{this.onUserInteract();const z=Math.min(1.65,Math.max(.65,this.state.zoom+delta));this.engine?.zoom(z);this.setState({zoom:z});};
 private rotate=(x:number,y=0)=>{this.onUserInteract();this.engine?.orbit(x,y);};
 private reset=()=>{this.manual();this.engine?.reset();this.applyScene(0);};
 private onCanvasKeyDown=(e:React.KeyboardEvent<HTMLCanvasElement>)=>{
  if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){
   e.preventDefault();this.onUserInteract();
   if(e.key==='ArrowLeft')this.engine?.orbit(-.18);
   if(e.key==='ArrowRight')this.engine?.orbit(.18);
   if(e.key==='ArrowUp')this.engine?.orbit(0,-.10);
   if(e.key==='ArrowDown')this.engine?.orbit(0,.10);
  }
 };
 render(){const {lang,compact}=this.props,t=T[lang],s=CINEMATIC_SCENES[this.state.scene],playing=this.state.playback==='playing';
  return <div ref={el=>{this.root=el;}} className={`lmc-3d v6-cinematic ${compact?'lmc-3d-compact':'lmc-3d-lab'} ${playing?'v6-playing':'v6-idle'}`} data-scene={s.id} data-scene-index={this.state.scene} data-playback={this.state.playback} data-visibility={this.visible?'visible':'hidden'} data-renderer={this.state.fallback?'svg':this.engine instanceof ConstructionCanvasEngine?'canvas2d':this.state.ready?'webgl2':'loading'} style={{'--cinematic-progress':'0%','--cinematic-transition':`${SCENE_TRANSITION_MS}ms`} as React.CSSProperties}>
   <div className="lmc-3d-stage">
    <div className="lmc-3d-grid" aria-hidden="true"/>
    <div className="lmc-3d-scene-title"><span className="lmc-3d-led"/> REAL-TIME 3D <span> / {this.state.fallback?'SVG':this.engine instanceof ConstructionCanvasEngine?'CANVAS':'WEBGL2'} · V6 FILM</span></div>
    <div className="lmc-3d-coordinate">X 15.0 · Y 7.0 · Z 9.0 <small>CONCEPT UNITS</small></div>
    <canvas ref={el=>{this.canvas=el;}} className="lmc-3d-canvas" tabIndex={0} aria-label={lang==='vi'?'Mô hình 3D nhà xưởng đang tự trình diễn 5 cảnh. Kéo để xoay hoặc dùng phím mũi tên.':'Five-scene cinematic 3D industrial building. Drag or use arrow keys to orbit.'} onKeyDown={this.onCanvasKeyDown}/>
    {this.state.fallback&&<div className="lmc-3d-fallback"><Illustration/><span>{t.fallback}</span></div>}
    <div className="lmc-3d-corner-mark top-left"/><div className="lmc-3d-corner-mark top-right"/><div className="lmc-3d-corner-mark bottom-left"/><div className="lmc-3d-corner-mark bottom-right"/>
    <div className="v6-scene-overlay" key={`${s.id}-${lang}`}>
     <div className="v6-scene-overline">{s.label[lang]}</div>
     <h3>{s.title[lang]}</h3>
     <p>{s.description[lang]}</p>
     {s.id==='portfolio'&&<a href={this.props.projectsHref||"#/projects"} className="v6-scene-cta">{t.portfolio} <span aria-hidden="true">↗</span></a>}
    </div>
    <span className="lmc-3d-model-stamp">PROCEDURAL CONCEPT / NOT A REAL PROJECT</span>
    <div className="lmc-3d-zoom" role="group" aria-label={t.zoomIn}><button type="button" onClick={()=>this.rotate(-.23)} aria-label={t.rotateLeft}>↶</button><button type="button" onClick={()=>this.rotate(.23)} aria-label={t.rotateRight}>↷</button><button type="button" onClick={()=>this.zoom(-.15)} aria-label={t.zoomIn}>+</button><button type="button" onClick={()=>this.zoom(.15)} aria-label={t.zoomOut}>−</button><button type="button" onClick={this.reset} aria-label={t.reset}>⌖</button></div>
   </div>
   <div className="v6-film-controls">
    <div className="v6-film-header"><div className="v6-film-identity"><span className="v6-film-pulse"/>{t.player}<span className="v6-film-state">{this.state.playback==='manual'?t.manual:playing?t.auto:t.paused}</span></div><div className="v6-film-buttons" role="group" aria-label={lang==='vi'?'Điều khiển trình chiếu':'Cinematic playback controls'}><button type="button" data-testid="v6-play-toggle" onClick={this.toggle} aria-pressed={!playing}>{playing?'Ⅱ '+t.pause:'▶ '+t.play}</button><button type="button" data-testid="v6-replay" onClick={this.replay}>↺ {t.replay}</button><button type="button" data-testid="v6-manual" onClick={this.manual} className={this.state.playback==='manual'?'active':''} aria-pressed={this.state.playback==='manual'}>◉ {t.explore}</button></div></div>
    <div className="v6-film-timeline" role="group" aria-label={lang==='vi'?'Chọn cảnh 3D':'Select a 3D scene'}>{CINEMATIC_SCENES.map((item,i)=><button key={item.id} type="button" data-testid={`v6-scene-${item.id}`} onClick={()=>this.selectScene(i)} className={this.state.scene===i?'active':''} aria-pressed={this.state.scene===i} aria-label={`${t.chapter} ${i+1}: ${item.title[lang]}`}><span className="v6-timeline-bar"><i style={{width:this.state.scene===i?'var(--cinematic-progress)':this.state.scene>i?'100%':'0%'}}/></span><span className="v6-timeline-label"><b>{item.no}</b>{item.title[lang]}</span></button>)}</div>
    {this.state.reduced&&<p className="v6-reduced-note">{t.motionOff}</p>}
   </div>
   <div className="lmc-3d-controls">
    <div className="lmc-3d-toolbar" role="group" aria-label={lang==='vi'?'Chế độ dựng hình':'Model mode'}>{(['complete','structure','exploded'] as VisualMode[]).map((m,i)=><button key={m} type="button" className={this.state.mode===m?'active':''} aria-pressed={this.state.mode===m} onClick={()=>this.setMode(m)}><b>0{i+1}</b>{t[m]}</button>)}</div>
    {!compact&&<div className="lmc-3d-detail-controls">
      <div className="lmc-3d-layers"><div className="lmc-3d-control-caption">{t.layer}</div><div className="lmc-3d-layer-list" role="group" aria-label={t.layer}>{(['all','foundation','steel','envelope','roof'] as BuildingLayer[]).map((layer,i)=><button type="button" key={layer} className={this.state.layer===layer?'active':''} aria-pressed={this.state.layer===layer} onClick={()=>this.setLayer(layer)}><span>{String(i).padStart(2,'0')}</span>{t[layer]}</button>)}</div><p className="lmc-3d-layer-note">{t.sections[this.state.layer]}</p></div>
      <div className="lmc-3d-phase"><div className="lmc-3d-control-caption">{t.phase} <strong>{this.state.progress}%</strong></div><input aria-label={t.phase} type="range" min="0" max="100" step="1" value={this.state.progress} onChange={e=>this.setProgress(Number(e.target.value))} style={{'--value':`${this.state.progress}%`} as React.CSSProperties}/><div className="lmc-3d-phase-labels">{t.phases.map((p,i)=><button key={p} type="button" onClick={()=>this.setProgress([18,42,72,100][i])}>{String(i+1).padStart(2,'0')} {p}</button>)}</div></div>
    </div>}
    <div className="lmc-3d-bottom-note"><span>↕ {t.hint}</span><span>{t.note}</span></div>
   </div>
  </div>
 }
}
