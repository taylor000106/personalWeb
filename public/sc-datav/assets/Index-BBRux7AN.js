import{l as e,n as t,o as n,r,t as i}from"./styled-components.browser.esm-BJd1O9xx.js";import{n as a}from"./index-C_iQfQO6.js";import{A as o,Cn as s,Ht as c,Sn as l,St as u,c as d,n as f,s as p,t as m,u as h,wn as g}from"./extends-l6GSDB8O.js";import{t as _}from"./maath.esm-CeG_mnun.js";import{n as v,t as y}from"./constants-xeQYK3iN.js";import{t as b}from"./Texture-D8iVoMT8.js";var x=e(n());e(r());var S=x.createContext(null);function C(){return x.useContext(S)}function w({eps:e=1e-5,enabled:t=!0,infinite:n,horizontal:r,pages:i=1,distance:a=1,damping:o=.25,maxSpeed:s=1/0,prepend:c=!1,style:l={},children:u}){let{get:f,setEvents:p,gl:m,size:g,invalidate:v,events:y}=h(),[b]=x.useState(()=>document.createElement(`div`)),[C]=x.useState(()=>document.createElement(`div`)),[w]=x.useState(()=>document.createElement(`div`)),T=m.domElement.parentNode,E=x.useRef(0),D=x.useMemo(()=>({el:b,eps:e,fill:C,fixed:w,horizontal:r,damping:o,offset:0,delta:0,scroll:E,pages:i,range(e,t,n=0){let r=e-n,i=r+t+n*2;return this.offset<r?0:this.offset>i?1:(this.offset-r)/(i-r)},curve(e,t,n=0){return Math.sin(this.range(e,t,n)*Math.PI)},visible(e,t,n=0){let r=e-n,i=r+t+n*2;return this.offset>=r&&this.offset<=i}}),[e,o,r,i]);x.useEffect(()=>{b.style.position=`absolute`,b.style.width=`100%`,b.style.height=`100%`,b.style[r?`overflowX`:`overflowY`]=`auto`,b.style[r?`overflowY`:`overflowX`]=`hidden`,b.style.top=`0px`,b.style.left=`0px`;for(let e in l)b.style[e]=l[e];w.style.position=`sticky`,w.style.top=`0px`,w.style.left=`0px`,w.style.width=`100%`,w.style.height=`100%`,w.style.overflow=`hidden`,b.appendChild(w),C.style.height=r?`100%`:`${i*a*100}%`,C.style.width=r?`${i*a*100}%`:`100%`,C.style.pointerEvents=`none`,b.appendChild(C),c?T.prepend(b):T.appendChild(b),b[r?`scrollLeft`:`scrollTop`]=1;let e=y.connected||m.domElement;requestAnimationFrame(()=>y.connect==null?void 0:y.connect(b));let t=f().events.compute;return p({compute(e,t){let{left:n,top:r}=T.getBoundingClientRect(),i=e.clientX-n,a=e.clientY-r;t.pointer.set(i/t.size.width*2-1,-(a/t.size.height)*2+1),t.raycaster.setFromCamera(t.pointer,t.camera)}}),()=>{T.removeChild(b),p({compute:t}),y.connect==null||y.connect(e)}},[i,a,r,b,C,w,T]),x.useEffect(()=>{if(y.connected===b){let e=g[r?`width`:`height`],i=b[r?`scrollWidth`:`scrollHeight`],a=i-e,o=0,s=!0,c=!0,l=()=>{if(!(!t||c)&&(v(),o=b[r?`scrollLeft`:`scrollTop`],E.current=o/a,n)){if(!s){if(o>=a){let e=1-D.offset;b[r?`scrollLeft`:`scrollTop`]=1,E.current=D.offset=-e,s=!0}else if(o<=0){let e=1+D.offset;b[r?`scrollLeft`:`scrollTop`]=i,E.current=D.offset=e,s=!0}}s&&setTimeout(()=>s=!1,40)}};b.addEventListener(`scroll`,l,{passive:!0}),requestAnimationFrame(()=>c=!1);let u=e=>b.scrollLeft+=e.deltaY/2;return r&&b.addEventListener(`wheel`,u,{passive:!0}),()=>{b.removeEventListener(`scroll`,l),r&&b.removeEventListener(`wheel`,u)}}},[b,y,g,n,D,v,r,t]);let O=0;return d((t,n)=>{O=D.offset,_.damp(D,`offset`,E.current,o,n,s,void 0,e),_.damp(D,`delta`,Math.abs(O-D.offset),o,n,s,void 0,e),D.delta>e&&v()}),x.createElement(S.Provider,{value:D},u)}var T=v({color:new o(`white`),scale:new l(1,1),imageBounds:new l(1,1),resolution:1024,map:null,zoom:1,radius:0,grayscale:0,opacity:1},`
  varying vec2 vUv;
  varying vec2 vPos;
  void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
    vUv = uv;
    vPos = position.xy;
  }
`,`
  // mostly from https://gist.github.com/statico/df64c5d167362ecf7b34fca0b1459a44
  varying vec2 vUv;
  varying vec2 vPos;
  uniform vec2 scale;
  uniform vec2 imageBounds;
  uniform float resolution;
  uniform vec3 color;
  uniform sampler2D map;
  uniform float radius;
  uniform float zoom;
  uniform float grayscale;
  uniform float opacity;
  const vec3 luma = vec3(.299, 0.587, 0.114);
  vec4 toGrayscale(vec4 color, float intensity) {
    return vec4(mix(color.rgb, vec3(dot(color.rgb, luma)), intensity), color.a);
  }
  vec2 aspect(vec2 size) {
    return size / min(size.x, size.y);
  }
  
  const float PI = 3.14159265;
    
  // from https://iquilezles.org/articles/distfunctions
  float udRoundBox( vec2 p, vec2 b, float r ) {
    return length(max(abs(p)-b+r,0.0))-r;
  }

  void main() {
    vec2 s = aspect(scale);
    vec2 i = aspect(imageBounds);
    float rs = s.x / s.y;
    float ri = i.x / i.y;
    vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
    vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
    vec2 uv = vUv * s / new + offset;
    vec2 zUv = (uv - vec2(0.5, 0.5)) / zoom + vec2(0.5, 0.5);

    vec2 res = vec2(scale * resolution);
    vec2 halfRes = 0.5 * res;
    float b = udRoundBox(vUv.xy * res - halfRes, halfRes, resolution * radius);    
	  vec3 a = mix(vec3(1.0,0.0,0.0), vec3(0.0,0.0,0.0), smoothstep(0.0, 1.0, b));
    gl_FragColor = toGrayscale(texture2D(map, zUv) * vec4(color, opacity * a), grayscale);
    
    #include <tonemapping_fragment>
    #include <${y>=154?`colorspace_fragment`:`encodings_fragment`}>
  }
`),E=x.forwardRef(({children:e,color:t,segments:n=1,scale:r=1,zoom:i=1,grayscale:a=0,opacity:o=1,radius:s=0,texture:c,toneMapped:l,transparent:u,side:d,...f},g)=>{p({ImageMaterial:T});let _=x.useRef(null),v=h(e=>e.size),y=Array.isArray(r)?[r[0],r[1]]:[r,r],b=[c.image.width,c.image.height],S=Math.max(v.width,v.height);return x.useImperativeHandle(g,()=>_.current,[]),x.useLayoutEffect(()=>{_.current.geometry.parameters&&_.current.material.scale.set(y[0]*_.current.geometry.parameters.width,y[1]*_.current.geometry.parameters.height)},[y[0],y[1]]),x.createElement(`mesh`,m({ref:_,scale:Array.isArray(r)?[...r,1]:r},f),x.createElement(`planeGeometry`,{args:[1,1,n,n]}),x.createElement(`imageMaterial`,{color:t,map:c,zoom:i,grayscale:a,opacity:o,scale:y,imageBounds:b,resolution:S,radius:s,toneMapped:l,transparent:u,side:d,key:T.key}),e)}),D=x.forwardRef(({url:e,...t},n)=>{let r=b(e);return x.createElement(E,m({},t,{texture:r,ref:n}))}),O=x.forwardRef(({url:e,...t},n)=>x.createElement(E,m({},t,{ref:n}))),k=x.forwardRef((e,t)=>{if(e.url)return x.createElement(D,m({},e,{ref:t}));if(e.texture)return x.createElement(O,m({},e,{ref:t}));throw Error(`<Image /> requires a url or texture`)}),A=t(),j=p(v({u_time:0,u_resolution:new g,u_aspect:0,u_noiseFreq:0,blur:0,speed:0},` varying vec2 vUv;
    uniform float u_time;
    uniform float u_noiseFreq;

    
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}


 float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  
  // First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;
  
  // Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
  
  // Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
           
  // Gradients: 7x7 points over a square, mapped onto an octahedron.
  // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  
  // Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  
  // Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}

 void main() {
   vUv = uv;

   vec3 pos = position;
   float noiseFreq = 10.5;
   float noiseAmp = 1.5; 
   vec3 noisePos = vec3(pos.x + u_time, pos.y, pos.z);
   pos.z += snoise(noisePos) * u_noiseFreq;

   gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0 );
 }`,`varying vec2 vUv;
    uniform float u_time;
    uniform float u_aspect;


float hue2rgb(float f1, float f2, float hue) {
    if (hue < 0.0)
        hue += 1.0;
    else if (hue > 1.0)
        hue -= 1.0;
    float res;
    if ((6.0 * hue) < 1.0)
        res = f1 + (f2 - f1) * 6.0 * hue;
    else if ((2.0 * hue) < 1.0)
        res = f2;
    else if ((3.0 * hue) < 2.0)
        res = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;
    else
        res = f1;
    return res;
}

vec3 hsl2rgb(vec3 hsl) {
    vec3 rgb;
    
    if (hsl.y == 0.0) {
        rgb = vec3(hsl.z); // Luminance
    } else {
        float f2;
        
        if (hsl.z < 0.5)
            f2 = hsl.z * (1.0 + hsl.y);
        else
            f2 = hsl.z + hsl.y - hsl.y * hsl.z;
            
        float f1 = 2.0 * hsl.z - f2;
        
        rgb.r = hue2rgb(f1, f2, hsl.x + (1.0/3.0));
        rgb.g = hue2rgb(f1, f2, hsl.x);
        rgb.b = hue2rgb(f1, f2, hsl.x - (1.0/3.0));
    }   
    return rgb;
}

vec3 hsl2rgb(float h, float s, float l) {
    return hsl2rgb(vec3(h, s, l));
}

vec3 random3(vec3 c) {
	float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
	vec3 r;
	r.z = fract(512.0*j);
	j *= .125;
	r.x = fract(512.0*j);
	j *= .125;
	r.y = fract(512.0*j);
	return r-0.5;
}

const float F3 =  0.3333333;
const float G3 =  0.1666667;

float simplex3d(vec3 p) {
	 vec3 s = floor(p + dot(p, vec3(F3)));
	 vec3 x = p - s + dot(s, vec3(G3));
	 
	 vec3 e = step(vec3(0.0), x - x.yzx);
	 vec3 i1 = e*(1.0 - e.zxy);
	 vec3 i2 = 1.0 - e.zxy*(1.0 - e);
	 	
	 vec3 x1 = x - i1 + G3;
	 vec3 x2 = x - i2 + 2.0*G3;
	 vec3 x3 = x - 1.0 + 3.0*G3;
	 
	 vec4 w, d;
	 
	 w.x = dot(x, x);
	 w.y = dot(x1, x1);
	 w.z = dot(x2, x2);
	 w.w = dot(x3, x3);
	 
	 w = max(0.6 - w, 0.0);
	 
	 d.x = dot(random3(s), x);
	 d.y = dot(random3(s + i1), x1);
	 d.z = dot(random3(s + i2), x2);
	 d.w = dot(random3(s + 1.0), x3);
	 
	 w *= w;
	 w *= w;
	 d *= w;
	 
	 return dot(d, vec4(52.0));
}

float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }

uniform float blur;
uniform float speed;

    
void main() {

    vec2 center = vUv - 0.5;
	float dist = length(center);
    float alpha = smoothstep(0.5, blur, dist);
    float n = simplex3d(vec3(vUv.xy, u_time * speed));

    vec3 color = hsl2rgb(
        0.6 + n * 0.2,
        0.5,
        0.5
    );

    float val = hash(vUv + u_time);

	gl_FragColor = vec4(color + vec3(val / 20.), alpha);
}`));function M(){let e=h(),t=(0,x.useRef)(null);return d(e=>{t.current.uniforms.u_time.value=e.clock.getElapsedTime()}),(0,A.jsx)(`group`,{position:[0,-3,-10],children:(0,A.jsxs)(`mesh`,{children:[(0,A.jsx)(`planeGeometry`,{args:[6,6,16,16]}),(0,A.jsx)(j,{transparent:!0,ref:t,wireframe:!1,u_aspect:e.viewport.aspect,blur:0,speed:.5,u_noiseFreq:1})]})})}var N=i.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`,P=p(class extends c{constructor(e,t,n,r,i){super(t,n,r,i);let a=this.parameters.width*.5,o=new l(-a,0),s=new l(0,e),c=new l(a,0),u=new l().subVectors(o,s),d=new l().subVectors(s,c),f=new l().subVectors(o,c),p=new l(0,e-u.length()*d.length()*f.length()/(2*Math.abs(u.cross(f)))),m=(new l().subVectors(o,p).angle()-Math.PI*.5)*2,h=this.attributes.uv,g=this.attributes.position,_=new l;for(let e=0;e<h.count;e++){let t=h.getX(e),n=g.getY(e);_.copy(c).rotateAround(p,m*t),g.setXYZ(e,_.x,n,-_.y)}g.needsUpdate=!0}}),F=i.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.6;
`,I=i.circle`
  @keyframes scroll-drop {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(15px);
      opacity: 0;
    }
  }

  animation: scroll-drop 1.5s ease-in-out infinite;
`;function L(){return(0,A.jsxs)(N,{children:[(0,A.jsxs)(f,{camera:{position:[0,0,100],fov:15},children:[(0,A.jsx)(`fog`,{attach:`fog`,args:[`#6e6e6e`,8.5,12]}),(0,A.jsx)(w,{pages:4,infinite:!0,children:(0,A.jsx)(R,{rotation:[0,0,.15],children:(0,A.jsx)(z,{})})}),(0,A.jsx)(M,{})]}),(0,A.jsx)(F,{children:(0,A.jsxs)(`svg`,{width:`20`,height:`32.5`,viewBox:`0 0 40 65`,children:[(0,A.jsx)(`rect`,{x:`2.5`,y:`2.5`,width:`35`,height:`60`,rx:`17.5`,ry:`17.5`,fill:`none`,stroke:`currentColor`,strokeWidth:`3`}),(0,A.jsx)(I,{cx:`20`,cy:`15`,r:`3`,fill:`currentColor`})]})})]})}function R(e){let t=(0,x.useRef)(null),n=C(),r=(0,x.useRef)(new s(1,1,1));return d((e,i)=>{t.current.rotation.y=-n.offset*(Math.PI*2),e.events.update?.(),r.current.set(-e.pointer.x*2,e.pointer.y+1.5,10),e.camera.position.lerp(r.current,1-Math.exp(-8*i)),e.camera.lookAt(0,0,0)}),(0,A.jsx)(`group`,{ref:t,...e})}function z({radius:e=1.4,count:t=8}){let n=a();return Array.from({length:t},(r,i)=>(0,A.jsx)(B,{url:`/sc-datav/demo_${i%4}.jpg`,position:[Math.sin(i/t*Math.PI*2)*e,0,Math.cos(i/t*Math.PI*2)*e],rotation:[0,Math.PI+i/t*Math.PI*2,0],onClick:e=>{e.stopPropagation(),n([`/demo0`,`/demo1`,`/demo2`,`/demo3`][i%4])}},i))}function B(e){let t=(0,x.useRef)(null),n=(0,x.useRef)(new s(1,1,1)),r=(0,x.useRef)(.1),i=(0,x.useRef)(1.5);return d((e,a)=>{t.current.scale.lerp(n.current,1-Math.exp(-10*a)),t.current.material.radius=u.lerp(t.current.material.radius,r.current,1-Math.exp(-8*a)),t.current.material.zoom=u.lerp(t.current.material.zoom,i.current,1-Math.exp(-8*a))}),(0,A.jsx)(k,{ref:t,transparent:!0,toneMapped:!1,side:2,onPointerOver:e=>{e.stopPropagation(),n.current.setScalar(1.15),r.current=.25,i.current=1,document.body.style.cursor=`pointer`},onPointerOut:()=>{n.current.setScalar(1),r.current=.1,i.current=1.5,document.body.style.cursor=`auto`},...e,children:(0,A.jsx)(P,{args:[.1,1,1,20,20]})})}export{L as default};