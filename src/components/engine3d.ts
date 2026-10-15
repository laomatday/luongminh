/**
 * Construction structure concept renderer — true WebGL2 instanced meshes.
 * No downloaded models, photographs or BIM geometry are represented as authentic.
 * Render on demand. No scroll interception and no persistent 60fps idle loop.
 */
export type VisualMode='complete'|'structure'|'exploded';
export type BuildingLayer='all'|'foundation'|'steel'|'envelope'|'roof';
type V3=[number,number,number];
type Mat=Float32Array;
type Group='foundation'|'steel'|'envelope'|'roof'|'glass'|'context';
type Part={base:Mat; tint:V3; group:Group;center:V3; side?:V3;step:number};
export type SceneState={mode:VisualMode;layer:BuildingLayer;progress:number; zoom:number};
const C={concrete:[0.67,0.72,0.68] as V3,steel:[0.72,0.80,0.79] as V3,beam:[0.60,0.70,0.70] as V3,roof:[0.32,0.46,0.47] as V3,wall:[0.70,0.77,0.74] as V3,glass:[0.28,0.47,0.50] as V3,accent:[0.82,0.48,0.29] as V3,site:[0.21,0.34,0.32] as V3,grid:[0.31,0.43,0.41] as V3};
const norm=(v:V3):V3=>{const l=Math.hypot(...v)||1;return [v[0]/l,v[1]/l,v[2]/l]};
const cross=(a:V3,b:V3):V3=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const eye=(tx=0,ty=0,tz=0):Mat=>new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,tx,ty,tz,1]);
const boxMatrix=(at:V3,size:V3,basis?:[V3,V3,V3]):Mat=>{const b=basis||[[1,0,0],[0,1,0],[0,0,1]] as [V3,V3,V3];return new Float32Array([b[0][0]*size[0],b[0][1]*size[0],b[0][2]*size[0],0,b[1][0]*size[1],b[1][1]*size[1],b[1][2]*size[1],0,b[2][0]*size[2],b[2][1]*size[2],b[2][2]*size[2],0,...at,1])};
const between=(a:V3,b:V3,thick:number):Mat=>{const dir=norm([b[0]-a[0],b[1]-a[1],b[2]-a[2]]);const bx=norm(cross(Math.abs(dir[2])>.9?[1,0,0]:[0,0,1],dir));const bz=norm(cross(bx,dir));return boxMatrix([(a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2],[thick,Math.hypot(b[0]-a[0],b[1]-a[1],b[2]-a[2]),thick],[bx,dir,bz])};
function buildParts():Part[]{
 const items:Part[]=[];
 const box=(group:Group,at:V3,size:V3,color:V3,step:number,side:V3=[0,0,0])=>items.push({base:boxMatrix(at,size),center:at,tint:color,group,step,side});
 const beam=(group:Group,a:V3,b:V3,width:number,color:V3,step:number,side:V3=[0,0,0])=>items.push({base:between(a,b,width),center:[(a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2],tint:color,group,step,side});
 // A procedural conceptual warehouse — NOT a BIM model of a named Luong Minh project.
 box('context',[0,-.58,0],[22,.10,18],C.site,0);
 for(let i=-9;i<=9;i+=1.5){box('context',[i,-.515,0],[.014,.015,18],C.grid,0);}
 for(let j=-7.5;j<=7.5;j+=1.5){box('context',[0,-.514,j],[22,.015,.014],C.grid,0);}
 box('foundation',[0,-.24,0],[16,.57,9.7],C.concrete,3);
 box('foundation',[0,.055,0],[15.4,.13,9.25],[.78,.80,.73],9);
 for(const x of [-6.2,-3.1,0,3.1,6.2]){
  for(const z of [-4.25,4.25]){
   box('foundation',[x,-.10,z],[.89,.34,.89],[.59,.65,.62],13);
   box('steel',[x,2.75,z],[.20,5.52,.20],C.steel,29);
   box('steel',[x,5.50,z],[.48,.13,.47],C.accent,31);
  }
  beam('steel',[x,5.5,-4.25],[x,6.95,0],.20,C.beam,34);
  beam('steel',[x,6.95,0],[x,5.5,4.25],.20,C.beam,34);
  beam('steel',[x,4.5,-4.25],[x,6.65,0],.095,C.steel,39);
  beam('steel',[x,6.65,0],[x,4.5,4.25],.095,C.steel,39);
  beam('steel',[x,4.5,-4.25],[x,4.5,4.25],.12,C.steel,41);
  beam('steel',[x,6.15,-2.3],[x,4.5,0],.08,C.steel,45);
  beam('steel',[x,4.5,0],[x,6.15,2.3],.08,C.steel,45);
 }
 // Purlins, horizontal bracing, safety rail strip.
 for(const z of [-3.35,-2.15,-.9,.9,2.15,3.35]){
  const y=6.95-Math.abs(z)*(1.45/4.25);
  beam('steel',[-7.52,y,z],[7.52,y,z],.105,C.beam,47);
 }
 for(const y of [1.55,3.55,5.25]){
  beam('steel',[-7.55,y,-4.26],[7.55,y,-4.26],.09,C.steel,47);
  beam('steel',[-7.55,y,4.26],[7.55,y,4.26],.09,C.steel,47);
 }
 // Side walls. Sections break up facade, revealing the structure in skeleton mode.
 for(const x of [-5.4,-2.5,.4,3.3,6.15]){
  box('envelope',[x,3.09,4.39],[2.84,4.35,.115],C.wall,63,[0,0,1.9]);
  box('envelope',[x,3.09,-4.39],[2.84,4.35,.115],C.wall,63,[0,0,-1.9]);
  box('glass',[x,4.05,-4.474],[2.43,.70,.022],C.glass,72,[0,0,-2.0]);
  box('glass',[x,4.05,4.474],[2.43,.70,.022],C.glass,72,[0,0,2.0]);
 }
 // Glazed office facade and industrial loading doors at the gable ends.
 for(const z of [-3.35,-1.65,0,1.65,3.35]){
  const endSide=z<0?-1:1;
  box('envelope',[7.63,4.50,z],[.12,2.1,1.57],[.57,.67,.65],68,[2.2,0,0]);
  box('envelope',[-7.63,4.47,z],[.12,2.15,1.57],[.57,.67,.65],68,[-2.2,0,0]);
  if(Math.abs(z)>.1){box('glass',[7.71,2.2,z],[.06,2.05,1.34],C.glass,72,[2.4,0,0]);}
 }
 // Entry canopy + orange accent frame. Separate mesh group, visually legible.
 box('glass',[7.85,3.6,-1.68],[.27,.17,3.1],C.accent,80,[2.7,0,0]);
 box('glass',[7.85,1.38,-3.25],[.25,4.5,.18],C.accent,80,[2.7,0,0]);
 box('glass',[7.85,1.38,-.12],[.25,4.5,.18],C.accent,80,[2.7,0,0]);
 box('roof',[0,5.95,-2.18],[15.6,.12,4.95],C.roof,88,[0,2.7,-.30]);
 box('roof',[0,5.95,2.18],[15.6,.12,4.95],C.roof,88,[0,2.7,.30]);
 // Rotation for pitched roof planes, thin-panel transform.
 const tilt=Math.atan2(1.45,4.25);
 for(const it of items.filter(p=>p.group==='roof')){
   const sign=it.center[2]<0?-1:1; // outward slope, positive z goes downhill
   const c=Math.cos(tilt),s=Math.sin(tilt)*sign;
   const R0:V3=[1,0,0],R1:V3=[0,c,s],R2:V3=[0,-s,c];
   it.base=boxMatrix([0,6.95-(Math.abs(it.center[2])*1.45/4.25),it.center[2]],[15.6,.13,4.95],[R0,R1,R2]);
 }
 // Ridge, rain gutters, flashing.
 beam('roof',[-7.85,7.00,0],[7.85,7.00,0],.13,C.accent,90,[0,2.6,0]);
 beam('roof',[-7.85,5.52,-4.39],[7.85,5.52,-4.39],.10,C.accent,91,[0,2.4,-.9]);
 beam('roof',[-7.85,5.52,4.39],[7.85,5.52,4.39],.10,C.accent,91,[0,2.4,.9]);
 // No company/project specs here; proportions are intentionally illustrative.
 return items;
}
const UNIT_POS=new Float32Array([
 -.5,-.5,.5, .5,-.5,.5, .5,.5,.5,-.5,.5,.5, // front
 .5,-.5,-.5,-.5,-.5,-.5,-.5,.5,-.5,.5,.5,-.5, // back
 -.5,-.5,-.5,-.5,-.5,.5,-.5,.5,.5,-.5,.5,-.5, // left
 .5,-.5,.5,.5,-.5,-.5,.5,.5,-.5,.5,.5,.5, // right
 -.5,.5,.5,.5,.5,.5,.5,.5,-.5,-.5,.5,-.5, // top
 -.5,-.5,-.5,.5,-.5,-.5,.5,-.5,.5,-.5,-.5,.5 // bottom
]);
const UNIT_NORMALS=new Float32Array(Array.from({length:6},(_,i)=>Array.from({length:4},()=>[[0,0,1],[0,0,-1],[-1,0,0],[1,0,0],[0,1,0],[0,-1,0]][i])).flat(2));
const INDICES=new Uint16Array(Array.from({length:6},(_,i)=>[i*4,i*4+1,i*4+2,i*4,i*4+2,i*4+3]).flat());
function perspective(fov:number,aspect:number,near:number,far:number):Mat{const f=1/Math.tan(fov/2),nf=1/(near-far);return new Float32Array([f/aspect,0,0,0,0,f,0,0,0,0,(far+near)*nf,-1,0,0,2*far*near*nf,0]);}
function lookAt(eyePos:V3,center:V3,up:V3=[0,1,0]):Mat{const z=norm([eyePos[0]-center[0],eyePos[1]-center[1],eyePos[2]-center[2]]),x=norm(cross(up,z)),y=cross(z,x);return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-(x[0]*eyePos[0]+x[1]*eyePos[1]+x[2]*eyePos[2]),-(y[0]*eyePos[0]+y[1]*eyePos[1]+y[2]*eyePos[2]),-(z[0]*eyePos[0]+z[1]*eyePos[1]+z[2]*eyePos[2]),1]);}
const smooth=(x:number)=>x*x*(3-2*x);
const clamp=(x:number,a:number,b:number)=>Math.min(b,Math.max(a,x));
const VERSION=2;
export class ConstructionEngine {
 public readonly isReal3D=true;
 private gl:WebGL2RenderingContext;private program:WebGLProgram;private vao:WebGLVertexArrayObject;private instanceBuffer:WebGLBuffer;
 private uProj:WebGLUniformLocation|null;private uView:WebGLUniformLocation|null;
 private parts=buildParts();private current:SceneState={mode:'complete',layer:'all',progress:100,zoom:1};private target:SceneState={mode:'complete',layer:'all',progress:100,zoom:1};
 private yaw=-.60;private pitch=.49;private targetYaw=-.60;private targetPitch=.49;private explode=0;private hideShell=0;
 private raf=0;private alive=true;private visible=true;private cinematic=false;private lastMotion=0;private basePitch=.49;private pointerId:number|null=null;private px=0;private py=0;private userDragged=false;private start=performance.now();private intro=true;
 private onDown:(e:PointerEvent)=>void;private onMove:(e:PointerEvent)=>void;private onUp:(e:PointerEvent)=>void;private onWheel:(e:WheelEvent)=>void;
 private onLose:(e:Event)=>void;private resizeObserver:ResizeObserver|null=null;private observer:IntersectionObserver|null=null;
 private get reduced(){return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false;}
 constructor(private canvas:HTMLCanvasElement,private options:{compact?:boolean;onLost?:()=>void;onInteract?:()=>void}={}){
  const gl=canvas.getContext('webgl2',{alpha:true,antialias:true,depth:true,stencil:false,powerPreference:'low-power',premultipliedAlpha:false});
  if(!gl)throw new Error('WebGL2 is not available');this.gl=gl;
  this.program=this.createProgram(`#version 300 es\nprecision highp float;layout(location=0) in vec3 aPos;layout(location=1) in vec3 aNormal;layout(location=2) in vec4 i0;layout(location=3) in vec4 i1;layout(location=4) in vec4 i2;layout(location=5) in vec4 i3;layout(location=6) in vec3 iColor;uniform mat4 uProj;uniform mat4 uView;out vec3 vNormal;out vec3 vColor;out float vDepth;void main(){mat4 model=mat4(i0,i1,i2,i3);vec4 viewPos=uView*model*vec4(aPos,1.0);gl_Position=uProj*viewPos;mat3 b=mat3(normalize(i0.xyz),normalize(i1.xyz),normalize(i2.xyz));vNormal=normalize(b*aNormal);vColor=iColor;vDepth=-viewPos.z;}`,`#version 300 es\nprecision highp float;in vec3 vNormal;in vec3 vColor;in float vDepth;out vec4 outColor;void main(){vec3 sun=normalize(vec3(-0.52,0.85,0.40));float diffuse=max(dot(normalize(vNormal),sun),0.0);float wrap=max(dot(normalize(vNormal),normalize(vec3(0.3,0.3,-0.7))),0.0)*0.12;vec3 base=vColor*(0.47+diffuse*0.59+wrap);float fog=smoothstep(15.0,42.0,vDepth)*0.18;outColor=vec4(mix(base,vec3(0.10,0.15,0.14),fog),1.0);}`);
  const vao=gl.createVertexArray(),inst=gl.createBuffer();if(!vao||!inst)throw new Error('GPU buffers not allocated');this.vao=vao;this.instanceBuffer=inst;gl.bindVertexArray(vao);
  const pbuf=gl.createBuffer(),nbuf=gl.createBuffer(),ibuf=gl.createBuffer();if(!pbuf||!nbuf||!ibuf)throw new Error('Geometry buffers not allocated');
  gl.bindBuffer(gl.ARRAY_BUFFER,pbuf);gl.bufferData(gl.ARRAY_BUFFER,UNIT_POS,gl.STATIC_DRAW);gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,3,gl.FLOAT,false,0,0);
  gl.bindBuffer(gl.ARRAY_BUFFER,nbuf);gl.bufferData(gl.ARRAY_BUFFER,UNIT_NORMALS,gl.STATIC_DRAW);gl.enableVertexAttribArray(1);gl.vertexAttribPointer(1,3,gl.FLOAT,false,0,0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ibuf);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,INDICES,gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER,inst);gl.bufferData(gl.ARRAY_BUFFER,this.parts.length*19*4,gl.DYNAMIC_DRAW);
  const stride=19*4;for(let a=0;a<4;a++){gl.enableVertexAttribArray(2+a);gl.vertexAttribPointer(2+a,4,gl.FLOAT,false,stride,a*16);gl.vertexAttribDivisor(2+a,1)}gl.enableVertexAttribArray(6);gl.vertexAttribPointer(6,3,gl.FLOAT,false,stride,64);gl.vertexAttribDivisor(6,1);
  gl.bindVertexArray(null);this.uProj=gl.getUniformLocation(this.program,'uProj');this.uView=gl.getUniformLocation(this.program,'uView');
  gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.enable(gl.CULL_FACE);gl.cullFace(gl.BACK);
  this.onDown=e=>{if(e.button!==0)return;this.options.onInteract?.();this.setAutoMotion(false);this.intro=false;this.userDragged=true;this.pointerId=e.pointerId;this.px=e.clientX;this.py=e.clientY;this.canvas.setPointerCapture(e.pointerId);};
  this.onMove=e=>{if(this.pointerId!==e.pointerId)return;const dx=e.clientX-this.px,dy=e.clientY-this.py;this.px=e.clientX;this.py=e.clientY;this.targetYaw+=dx*.0065;this.targetPitch=clamp(this.targetPitch+dy*.005,.12,1.3);this.invalidate();};
  this.onUp=e=>{if(this.pointerId===e.pointerId)this.pointerId=null;};
  this.onWheel=e=>{if(!e.ctrlKey)return;e.preventDefault();this.options.onInteract?.();this.setAutoMotion(false);this.zoom(clamp(this.target.zoom+(e.deltaY>0?.12:-.12),.65,1.65));};
  this.onLose=(e:Event)=>{e.preventDefault();this.visible=false;this.stop();this.options.onLost?.();};
  canvas.addEventListener('pointerdown',this.onDown);canvas.addEventListener('pointermove',this.onMove);canvas.addEventListener('pointerup',this.onUp);canvas.addEventListener('pointercancel',this.onUp);canvas.addEventListener('wheel',this.onWheel,{passive:false});canvas.addEventListener('webglcontextlost',this.onLose);
  if(typeof ResizeObserver !== 'undefined'){this.resizeObserver=new ResizeObserver(()=>this.invalidate());this.resizeObserver.observe(canvas);}else window.addEventListener('resize',this.invalidate);
  if(typeof IntersectionObserver !== 'undefined'){this.observer=new IntersectionObserver((entries)=>{this.visible=entries[0].isIntersecting;if(this.visible)this.invalidate();else this.stop();},{threshold:0.02});this.observer.observe(canvas);}
  this.invalidate();
 }
 private shader(type:number,source:string):WebGLShader{const sh=this.gl.createShader(type);if(!sh)throw Error('Failed to create shader');this.gl.shaderSource(sh,source);this.gl.compileShader(sh);if(!this.gl.getShaderParameter(sh,this.gl.COMPILE_STATUS))throw Error('Shader compile: '+this.gl.getShaderInfoLog(sh));return sh;}
 private createProgram(v:string,f:string):WebGLProgram{const gl=this.gl,vs=this.shader(gl.VERTEX_SHADER,v),fs=this.shader(gl.FRAGMENT_SHADER,f),p=gl.createProgram();if(!p)throw Error('Failed to create program');gl.attachShader(p,vs);gl.attachShader(p,fs);gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error('Shader link: '+gl.getProgramInfoLog(p));gl.deleteShader(vs);gl.deleteShader(fs);return p;}
 update(state:Partial<SceneState>){this.target={...this.target,...state};this.intro=false;this.invalidate();}
 orbit(dx:number,dy=0){this.targetYaw+=dx;this.targetPitch=clamp(this.targetPitch+dy,.12,1.3);this.intro=false;this.invalidate();}
 zoom(value:number){this.target.zoom=clamp(value,.65,1.65);this.invalidate();}
 reset(){this.targetYaw=-.60;this.targetPitch=.49;this.target.zoom=1;this.basePitch=.49;this.intro=false;this.invalidate();}
 /** Continuous cinematic rotation is opt-in and suspended while the canvas is offscreen. */
 setAutoMotion(active:boolean){this.cinematic=active&&!this.reduced;this.intro=false;this.lastMotion=0;this.invalidate();}
 setCameraPose(yaw:number,pitch:number,zoom:number,forwardOnly=false){
  // Manual selection takes the shortest turn; autoplay continues forward.
  yaw+=Math.round((this.targetYaw-yaw)/(Math.PI*2))*Math.PI*2;
  if(forwardOnly&&yaw<this.targetYaw-.06)yaw+=Math.PI*2;
  this.targetYaw=yaw;this.basePitch=clamp(pitch,.14,1.26);this.targetPitch=this.basePitch;
  this.target.zoom=clamp(zoom,.65,1.65);this.intro=false;this.invalidate();
 }
 private invalidate=()=>{if(!this.raf&&this.alive&&this.visible)this.raf=requestAnimationFrame(this.frame)};
 private stop(){if(this.raf)cancelAnimationFrame(this.raf);this.raf=0;}
 private frame=(now:number)=>{
  this.raf=0;if(!this.alive||!this.visible)return;
  const rect=this.canvas.getBoundingClientRect();if(rect.width<2||rect.height<2)return;
  const dpr=Math.min(window.devicePixelRatio||1,this.options.compact?1.2:1.5);const W=Math.floor(rect.width*dpr),H=Math.floor(rect.height*dpr);
  if(this.canvas.width!==W||this.canvas.height!==H){this.canvas.width=W;this.canvas.height=H;this.gl.viewport(0,0,W,H)}
  if(this.cinematic&&!this.reduced){
   const dt=this.lastMotion?Math.min(55,now-this.lastMotion):16;
   this.targetYaw+=Math.max(0,dt)*.000078;
   this.targetPitch=clamp(this.basePitch+Math.sin(now*.00048)*.024,.14,1.26);
  }
  this.lastMotion=now;
  if(this.intro&&!this.userDragged&&!this.reduced){const t=Math.min(1,(now-this.start)/1700);this.targetYaw=-1.05+smooth(t)*.45;if(t>=1)this.intro=false;}
  const eased=(a:number,b:number)=>a+(b-a)*(this.reduced?1:.17);
  this.yaw=eased(this.yaw,this.targetYaw);this.pitch=eased(this.pitch,this.targetPitch);this.current.zoom=eased(this.current.zoom,this.target.zoom);this.current.progress=eased(this.current.progress,this.target.progress);this.explode=eased(this.explode,this.target.mode==='exploded'?1:0);this.hideShell=eased(this.hideShell,this.target.mode==='structure'?1:0);
  const gl=this.gl;
  const size=this.options.compact?23:24;const rad=size*this.current.zoom;const center:V3=[0,2.4,0];const eyePos:V3=[Math.cos(this.yaw)*Math.cos(this.pitch)*rad,Math.sin(this.pitch)*rad+center[1],Math.sin(this.yaw)*Math.cos(this.pitch)*rad];
  const proj=perspective((this.options.compact?43:44)*Math.PI/180,W/H,.1,150),view=lookAt(eyePos,center);
  const data=new Float32Array(this.parts.length*19);
  let count=0;
  for(const part of this.parts){
   const group=part.group;
   let alpha=1;
   if(group!=='context'){
    if(group==='envelope'||group==='glass'||group==='roof')alpha*=1-this.hideShell;
    if(this.target.layer!=='all'){
     const active=this.target.layer==='foundation'?'foundation':this.target.layer==='steel'?'steel':this.target.layer==='envelope'?'envelope':this.target.layer==='roof'?'roof':'all';
     if(group!==active&&(active!=='envelope'||group!=='glass'))alpha=this.target.mode==='exploded'?.22:.06;
    }
    const p=clamp((this.current.progress-part.step)/12,0,1);alpha*=smooth(p);
   }
   if(alpha<.015)continue;
   const m=new Float32Array(part.base);
   if(this.explode>.001&&group!=='context'){
    const o=part.side||[0,0,0];
    const dx=(group==='envelope'||group==='glass')?o[0]:0,dy=group==='roof'?o[1]:0,dz=(group==='envelope'||group==='glass'||group==='roof')?o[2]:0;
    m[12]+=dx*this.explode;m[13]+=dy*this.explode;m[14]+=dz*this.explode;
   }
   // Shrink dimmed non-focused components while preserving a legible spatial cue.
   if(alpha<.99){for(let i=0;i<12;i++){if(i%4!==3)m[i]*=Math.max(.02,alpha)}}
   const ofs=count*19;data.set(m,ofs);data[ofs+16]=part.tint[0]*(alpha<.97?.45:1);data[ofs+17]=part.tint[1]*(alpha<.97?.58:1);data[ofs+18]=part.tint[2]*(alpha<.97?.53:1);count++;
  }
  gl.viewport(0,0,W,H);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  gl.useProgram(this.program);gl.uniformMatrix4fv(this.uProj,false,proj);gl.uniformMatrix4fv(this.uView,false,view);gl.bindVertexArray(this.vao);gl.bindBuffer(gl.ARRAY_BUFFER,this.instanceBuffer);gl.bufferSubData(gl.ARRAY_BUFFER,0,data.subarray(0,count*19));gl.drawElementsInstanced(gl.TRIANGLES,INDICES.length,gl.UNSIGNED_SHORT,0,count);gl.bindVertexArray(null);
  const unsettled=Math.abs(this.yaw-this.targetYaw)+Math.abs(this.pitch-this.targetPitch)+Math.abs(this.current.zoom-this.target.zoom)+Math.abs(this.current.progress-this.target.progress)+Math.abs(this.explode-(this.target.mode==='exploded'?1:0))+Math.abs(this.hideShell-(this.target.mode==='structure'?1:0));
  if(this.intro||this.cinematic||unsettled>.002)this.invalidate();
 };
 destroy(){this.alive=false;this.stop();this.canvas.removeEventListener('pointerdown',this.onDown);this.canvas.removeEventListener('pointermove',this.onMove);this.canvas.removeEventListener('pointerup',this.onUp);this.canvas.removeEventListener('pointercancel',this.onUp);this.canvas.removeEventListener('wheel',this.onWheel);this.canvas.removeEventListener('webglcontextlost',this.onLose);this.resizeObserver?.disconnect();this.observer?.disconnect();window.removeEventListener('resize',this.invalidate);this.gl.deleteVertexArray(this.vao);this.gl.deleteBuffer(this.instanceBuffer);this.gl.deleteProgram(this.program);}
}

/**
 * Progressive enhancement: software perspective rendering in Canvas2D.
 * Uses the very same 3D geometry and controls if WebGL2 is blocked or unavailable.
 * This is a genuinely orbitable geometric model, not a static placeholder image.
 */
export class ConstructionCanvasEngine {
 public readonly isReal3D=true;
 private ctx:CanvasRenderingContext2D;private parts=buildParts();private target:SceneState={mode:'complete',layer:'all',progress:100,zoom:1};private curProgress=100;private explode=0;private hideShell=0;
 private yaw=-.69;private pitch=.48;private wantYaw=-.69;private wantPitch=.48;private basePitch=.48;private cinematic=false;private lastMotion=0;private lastCanvasDraw=0;private adaptiveFrameMs=55;private zoomValue=1;private raf=0;private alive=true;private visible=true;private pointer:number|null=null;private x=0;private y=0;private intro=true;private begin=performance.now();
 private move:(e:PointerEvent)=>void;private down:(e:PointerEvent)=>void;private up:(e:PointerEvent)=>void;private observer:IntersectionObserver|null=null;private resizeObserver:ResizeObserver|null=null;
 private reduced(){return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false;}
 constructor(private canvas:HTMLCanvasElement,private options:{compact?:boolean;onInteract?:()=>void}={}){
  const c=canvas.getContext('2d',{alpha:true});if(!c)throw Error('Neither WebGL2 nor Canvas2D is available');this.ctx=c;
  this.down=e=>{if(e.button!==0)return;this.options.onInteract?.();this.setAutoMotion(false);this.intro=false;this.pointer=e.pointerId;this.x=e.clientX;this.y=e.clientY;this.canvas.setPointerCapture(e.pointerId)};
  this.move=e=>{if(this.pointer!==e.pointerId)return;this.wantYaw+=(e.clientX-this.x)*.0075;this.wantPitch=clamp(this.wantPitch+(e.clientY-this.y)*.006,.14,1.26);this.x=e.clientX;this.y=e.clientY;this.invalidate()};
  this.up=e=>{if(this.pointer===e.pointerId)this.pointer=null};
  canvas.addEventListener('pointerdown',this.down);canvas.addEventListener('pointermove',this.move);canvas.addEventListener('pointerup',this.up);canvas.addEventListener('pointercancel',this.up);
  if(typeof ResizeObserver !== 'undefined'){this.resizeObserver=new ResizeObserver(this.invalidate);this.resizeObserver.observe(canvas)}
  if(typeof IntersectionObserver !== 'undefined'){this.observer=new IntersectionObserver(entries=>{this.visible=entries[0].isIntersecting;if(this.visible)this.invalidate();else this.stop()},{threshold:.01});this.observer.observe(canvas)}
  this.invalidate();
 }
 update(s:Partial<SceneState>){this.target={...this.target,...s};this.intro=false;this.invalidate()}
 orbit(dx:number,dy=0){this.wantYaw+=dx;this.wantPitch=clamp(this.wantPitch+dy,.14,1.26);this.intro=false;this.invalidate()}
 zoom(v:number){this.target.zoom=clamp(v,.65,1.65);this.invalidate()}
 reset(){this.wantYaw=-.69;this.wantPitch=.48;this.basePitch=.48;this.target.zoom=1;this.intro=false;this.invalidate()}
 setAutoMotion(active:boolean){this.cinematic=active&&!this.reduced();this.intro=false;this.lastMotion=0;this.invalidate();}
 setCameraPose(yaw:number,pitch:number,zoom:number,forwardOnly=false){
  yaw+=Math.round((this.wantYaw-yaw)/(Math.PI*2))*Math.PI*2;
  if(forwardOnly&&yaw<this.wantYaw-.06)yaw+=Math.PI*2;
  this.wantYaw=yaw;this.basePitch=clamp(pitch,.14,1.26);this.wantPitch=this.basePitch;
  this.target.zoom=clamp(zoom,.65,1.65);this.intro=false;this.invalidate();
 }
 private invalidate=()=>{if(!this.raf&&this.alive&&this.visible)this.raf=requestAnimationFrame(this.frame)};
 private stop(){if(this.raf)cancelAnimationFrame(this.raf);this.raf=0}
 private frame=(now:number)=>{
  this.raf=0;if(!this.alive||!this.visible)return;
  const w=this.canvas.clientWidth,h=this.canvas.clientHeight;if(!w||!h)return;
  // Software fallback: cap expensive depth-sorted geometry to 20/25 FPS.
  const minFrame=this.options.compact?Math.max(55,this.adaptiveFrameMs):Math.max(40,this.adaptiveFrameMs);
  if(this.cinematic&&this.lastCanvasDraw&&now-this.lastCanvasDraw<minFrame){this.invalidate();return;}
  this.lastCanvasDraw=now;
  const drawingStarted=performance.now();
  if(this.cinematic&&!this.reduced()){
   const dt=this.lastMotion?Math.min(70,now-this.lastMotion):minFrame;
   this.wantYaw+=Math.max(0,dt)*.000075;
   this.wantPitch=clamp(this.basePitch+Math.sin(now*.00042)*.02,.14,1.26);
  }
  this.lastMotion=now;
  const dpr=Math.min(window.devicePixelRatio||1,this.options.compact?1.25:1.5), W=Math.floor(w*dpr),H=Math.floor(h*dpr);
  if(this.canvas.width!==W||this.canvas.height!==H){this.canvas.width=W;this.canvas.height=H}
  const reduced=this.reduced(),speed=reduced?1:.16;
  if(this.intro&&!reduced){const u=clamp((now-this.begin)/1600,0,1);this.wantYaw=-1.1+smooth(u)*.41;if(u>=1)this.intro=false;}
  const lerp=(a:number,b:number)=>a+(b-a)*speed;
  this.yaw=lerp(this.yaw,this.wantYaw);this.pitch=lerp(this.pitch,this.wantPitch);this.zoomValue=lerp(this.zoomValue,this.target.zoom);this.curProgress=lerp(this.curProgress,this.target.progress);
  this.explode=lerp(this.explode,this.target.mode==='exploded'?1:0);this.hideShell=lerp(this.hideShell,this.target.mode==='structure'?1:0);
  const center:V3=[0,2.2,0],radius=25*this.zoomValue;
  const camera:V3=[Math.cos(this.yaw)*Math.cos(this.pitch)*radius,Math.sin(this.pitch)*radius+center[1],Math.sin(this.yaw)*Math.cos(this.pitch)*radius];
  const forward=norm([center[0]-camera[0],center[1]-camera[1],center[2]-camera[2]]),right=norm(cross(forward,[0,1,0])),up=norm(cross(right,forward));
  const f=H/(2*Math.tan((this.options.compact?40:43)*Math.PI/360));
  const ctx=this.ctx;ctx.clearRect(0,0,W,H);const polys:{xy:[number,number][],color:string,depth:number,edge:boolean}[]=[];
  const corners:V3[]=[[-.5,-.5,-.5],[.5,-.5,-.5],[.5,.5,-.5],[-.5,.5,-.5],[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5]];
  const faces=[[4,5,6,7],[1,0,3,2],[0,4,7,3],[5,1,2,6],[7,6,2,3],[0,1,5,4]];
  const light=norm([-0.55,0.86,0.42]);
  for(const part of this.parts){
   const g=part.group;
   let a=1;
   if(g!=='context'){
    if(g==='envelope'||g==='glass'||g==='roof')a*=1-this.hideShell;
    if(this.target.layer!=='all' && g!==this.target.layer && !(this.target.layer==='envelope'&&g==='glass'))a*=.19;
    a*=smooth(clamp((this.curProgress-part.step)/14,0,1));
   }
   if(a<.015)continue;
   const mat=part.base;let tx=mat[12],ty=mat[13],tz=mat[14];
   const off=part.side||[0,0,0];if(g==='roof'){ty+=off[1]*this.explode;tz+=off[2]*this.explode;}if(g==='envelope'||g==='glass'){tx+=off[0]*this.explode;tz+=off[2]*this.explode;}
   const scale=a<.99?Math.max(.02,a):1;
   const transformed=corners.map(v=>[tx+(mat[0]*v[0]+mat[4]*v[1]+mat[8]*v[2])*scale,ty+(mat[1]*v[0]+mat[5]*v[1]+mat[9]*v[2])*scale,tz+(mat[2]*v[0]+mat[6]*v[1]+mat[10]*v[2])*scale] as V3);
   for(const ids of faces){
    const q=ids.map(i=>transformed[i]);
    const ed1:V3=[q[1][0]-q[0][0],q[1][1]-q[0][1],q[1][2]-q[0][2]],ed2:V3=[q[2][0]-q[1][0],q[2][1]-q[1][1],q[2][2]-q[1][2]];
    const normal=norm(cross(ed1,ed2));const faceCenter:V3=[q.reduce((s,v)=>s+v[0],0)/4,q.reduce((s,v)=>s+v[1],0)/4,q.reduce((s,v)=>s+v[2],0)/4];
    if(normal[0]*(camera[0]-faceCenter[0])+normal[1]*(camera[1]-faceCenter[1])+normal[2]*(camera[2]-faceCenter[2])<.001)continue;
    const shade=Math.max(.20,normal[0]*light[0]+normal[1]*light[1]+normal[2]*light[2])*.48+.48;
    const color=part.tint.map(v=>clamp(Math.round(255*v*shade*(a<.97?.55:1)),0,255));
    const xy:[number,number][]=q.map(v=>{const pos:V3=[v[0]-camera[0],v[1]-camera[1],v[2]-camera[2]];const depth=Math.max(.3,pos[0]*forward[0]+pos[1]*forward[1]+pos[2]*forward[2]);return [W/2+f*(pos[0]*right[0]+pos[1]*right[1]+pos[2]*right[2])/depth,H*.56-f*(pos[0]*up[0]+pos[1]*up[1]+pos[2]*up[2])/depth]});
    const dp=(faceCenter[0]-camera[0])*forward[0]+(faceCenter[1]-camera[1])*forward[1]+(faceCenter[2]-camera[2])*forward[2];
    polys.push({xy,color:`rgb(${color.join(',')})`,depth:dp,edge:g==='steel'||g==='roof'||g==='glass'});
   }
  }
  polys.sort((a,b)=>b.depth-a.depth);
  for(const poly of polys){ctx.beginPath();ctx.moveTo(poly.xy[0][0],poly.xy[0][1]);for(let i=1;i<4;i++)ctx.lineTo(poly.xy[i][0],poly.xy[i][1]);ctx.closePath();ctx.fillStyle=poly.color;ctx.fill();if(poly.edge){ctx.strokeStyle='rgba(20,42,36,.24)';ctx.lineWidth=.6*dpr;ctx.stroke()}}
  const diff=Math.abs(this.wantYaw-this.yaw)+Math.abs(this.wantPitch-this.pitch)+Math.abs(this.target.zoom-this.zoomValue)+Math.abs(this.target.progress-this.curProgress)+Math.abs(this.explode-(this.target.mode==='exploded'?1:0))+Math.abs(this.hideShell-(this.target.mode==='structure'?1:0));
  const renderCost=performance.now()-drawingStarted;
  this.adaptiveFrameMs=Math.min(115,Math.max(40,renderCost*2.25));
  if(this.intro||this.cinematic||diff>.003)this.invalidate();
 };
 destroy(){this.alive=false;this.stop();this.resizeObserver?.disconnect();this.observer?.disconnect();this.canvas.removeEventListener('pointerdown',this.down);this.canvas.removeEventListener('pointermove',this.move);this.canvas.removeEventListener('pointerup',this.up);this.canvas.removeEventListener('pointercancel',this.up)}
}
