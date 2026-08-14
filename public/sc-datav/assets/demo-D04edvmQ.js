import{l as e,n as t,o as n,s as r,t as i}from"./styled-components.browser.esm-BJd1O9xx.js";import{t as a}from"./index-C_iQfQO6.js";import{A as o,B as s,Cn as c,D as l,G as u,Jt as d,Rt as f,Sn as p,Tt as m,a as h,an as g,c as _,dt as v,en as y,hn as b,in as x,n as ee,tn as te,u as ne,wt as re,x as ie}from"./extends-l6GSDB8O.js";import{c as ae,d as oe,i as se,l as ce,n as le,r as ue,t as de,u as fe}from"./guangquan01-CUAsf8A1.js";import{a as pe,o as me}from"./tslib.es6-B6M658Ib.js";import{A as he,C as ge,Cn as _e,Ft as ve,Kn as S,M as ye,Mn as be,N as xe,O as C,Pt as Se,Qn as Ce,Wn as w,Yn as we,Zt as T,a as Te,c as Ee,dr as De,fr as E,h as Oe,i as ke,j as Ae,l as D,lr as je,n as Me,nn as Ne,nr as Pe,o as Fe,pr as Ie,r as Le,s as Re,t as ze,u as O,un as k,vn as Be,wt as Ve,xt as He,zt as Ue}from"./sc_outline-l-BoRMf8.js";import{t as We}from"./ContactShadows-Djx0LD21.js";import{n as Ge,t as Ke}from"./sc_normal_map-CR1JRxy0.js";function qe(e){if(e){for(var t=[],n=0;n<e.length;n++)t.push(e[n].slice());return t}}function Je(e,t){var n=e.label,r=t&&t.getTextGuideLine();return{dataIndex:e.dataIndex,dataType:e.dataType,seriesIndex:e.seriesModel.seriesIndex,text:e.label.style.text,rect:e.hostRect,labelRect:e.rect,align:n.style.align,verticalAlign:n.style.verticalAlign,labelLinePoints:qe(r&&r.shape.points)}}var Ye=[`align`,`verticalAlign`,`width`,`height`,`fontSize`],A=new _e,j=k(),Xe=k();function M(e,t,n){for(var r=0;r<n.length;r++){var i=n[r];t[i]!=null&&(e[i]=t[i])}}var N=[`x`,`y`,`rotation`],Ze=function(){function e(){this._labelList=[],this._chartViewList=[]}return e.prototype.clearLabels=function(){this._labelList=[],this._chartViewList=[]},e.prototype._addLabel=function(e,t,n,r,i){var a=r.style,o=r.__hostTarget.textConfig||{},s=r.getComputedTransform(),c=r.getBoundingRect().plain();be.applyTransform(c,c,s),s?A.setLocalTransform(s):(A.x=A.y=A.rotation=A.originX=A.originY=0,A.scaleX=A.scaleY=1),A.rotation=Ne(A.rotation);var l=r.__hostTarget,u;if(l){u=l.getBoundingRect().plain();var d=l.getComputedTransform();be.applyTransform(u,u,d)}var f=u&&l.getTextGuideLine();this._labelList.push({label:r,labelLine:f,seriesModel:n,dataIndex:e,dataType:t,layoutOptionOrCb:i,layoutOption:null,rect:c,hostRect:u,priority:u?u.width*u.height:0,defaultAttr:{ignore:r.ignore,labelGuideIgnore:f&&f.ignore,x:A.x,y:A.y,scaleX:A.scaleX,scaleY:A.scaleY,rotation:A.rotation,style:{x:a.x,y:a.y,align:a.align,verticalAlign:a.verticalAlign,width:a.width,height:a.height,fontSize:a.fontSize},cursor:r.cursor,attachedPos:o.position,attachedRot:o.rotation}})},e.prototype.addLabelsOfSeries=function(e){var t=this;this._chartViewList.push(e);var n=e.__model,r=n.get(`labelLayout`);(Ce(r)||Pe(r).length)&&e.group.traverse(function(e){if(e.ignore)return!0;var i=e.getTextContent(),a=T(e);i&&!i.disableLabelLayout&&t._addLabel(a.dataIndex,a.dataType,n,i,r)})},e.prototype.updateLayoutConfig=function(e){var t=e.getWidth(),n=e.getHeight();function r(e,t){return function(){fe(e,t)}}for(var i=0;i<this._labelList.length;i++){var a=this._labelList[i],o=a.label,s=o.__hostTarget,c=a.defaultAttr,l=void 0;l=Ce(a.layoutOptionOrCb)?a.layoutOptionOrCb(Je(a,s)):a.layoutOptionOrCb,l||={},a.layoutOption=l;var u=Math.PI/180;s&&s.setTextConfig({local:!1,position:l.x!=null||l.y!=null?null:c.attachedPos,rotation:l.rotate==null?c.attachedRot:l.rotate*u,offset:[l.dx||0,l.dy||0]});var d=!1;if(l.x==null?(o.x=c.x,o.setStyle(`x`,c.style.x)):(o.x=Be(l.x,t),o.setStyle(`x`,0),d=!0),l.y==null?(o.y=c.y,o.setStyle(`y`,c.style.y)):(o.y=Be(l.y,n),o.setStyle(`y`,0),d=!0),l.labelLinePoints){var f=s.getTextGuideLine();f&&(f.setShape({points:l.labelLinePoints}),d=!1)}var p=j(o);p.needsUpdateLabelLine=d,o.rotation=l.rotate==null?c.rotation:l.rotate*u,o.scaleX=c.scaleX,o.scaleY=c.scaleY;for(var m=0;m<Ye.length;m++){var h=Ye[m];o.setStyle(h,l[h]==null?c.style[h]:l[h])}if(l.draggable){if(o.draggable=!0,o.cursor=`move`,s){var g=a.seriesModel;a.dataIndex!=null&&(g=a.seriesModel.getData(a.dataType).getItemModel(a.dataIndex)),o.on(`drag`,r(s,g.getModel(`labelLine`)))}}else o.off(`drag`),o.cursor=c.cursor}},e.prototype.layout=function(e){var t=e.getWidth(),n=e.getHeight(),r=[];w(this._labelList,function(e){e.defaultAttr.ignore||r.push(Ae({},e))});var i=S(r,function(e){return e.layoutOption.moveOverlap===`shiftX`}),a=S(r,function(e){return e.layoutOption.moveOverlap===`shiftY`});xe(i,0,0,t),xe(a,1,0,n);var o=S(r,function(e){return e.layoutOption.hideOverlap});ye(o),he(o)},e.prototype.processLabelsOverall=function(){var e=this;w(this._chartViewList,function(t){var n=t.__model,r=t.ignoreLabelLineUpdate,i=n.isAnimationEnabled();t.group.traverse(function(t){if(t.ignore&&!t.forceLabelAnimation)return!0;var a=!r,o=t.getTextContent();!a&&o&&(a=j(o).needsUpdateLabelLine),a&&e._updateLabelLine(t,n),i&&e._animateLabels(t,n)})})},e.prototype._updateLabelLine=function(e,t){var n=e.getTextContent(),r=T(e),i=r.dataIndex;if(n&&i!=null){var a=t.getData(r.dataType),o=a.getItemModel(i),s={},c=a.getItemVisual(i,`style`);c&&(s.stroke=c[a.getVisual(`drawType`)]);var l=o.getModel(`labelLine`);ce(e,ae(o),s),fe(e,l)}},e.prototype._animateLabels=function(e,t){var n=e.getTextContent(),r=e.getTextGuideLine();if(n&&(e.forceLabelAnimation||!n.ignore&&!n.invisible&&!e.disableLabelAnimation&&!ve(e))){var i=j(n),a=i.oldLayout,o=T(e),s=o.dataIndex,c={x:n.x,y:n.y,rotation:n.rotation},l=t.getData(o.dataType);if(a){n.attr(a);var u=e.prevStates;u&&(we(u,`select`)>=0&&n.attr(i.oldLayoutSelect),we(u,`emphasis`)>=0&&n.attr(i.oldLayoutEmphasis)),Ue(n,c,t,s)}else if(n.attr(c),!Ve(n).valueAnimation){var d=je(n.style.opacity,1);n.style.opacity=0,Se(n,{style:{opacity:d}},t,s)}if(i.oldLayout=c,n.states.select){var f=i.oldLayoutSelect={};M(f,c,N),M(f,n.states.select,N)}if(n.states.emphasis){var p=i.oldLayoutEmphasis={};M(p,c,N),M(p,n.states.emphasis,N)}He(n,s,l,t,t)}if(r&&!r.ignore&&!r.invisible){var i=Xe(r),a=i.oldLayout,m={points:r.shape.points};a?(r.attr({shape:a}),Ue(r,{shape:m},t)):(r.setShape(m),r.style.strokePercent=0,Se(r,{style:{strokePercent:1}},t)),i.oldLayout=m}},e}(),P=k();function Qe(e){e.registerUpdateLifecycle(`series:beforeupdate`,function(e,t,n){var r=P(t).labelManager;r||=P(t).labelManager=new Ze,r.clearLabels()}),e.registerUpdateLifecycle(`series:layoutlabels`,function(e,t,n){var r=P(t).labelManager;w(n.updatedSeries,function(e){r.addLabelsOfSeries(t.getViewOfSeriesModel(e))}),r.updateLayoutConfig(t),r.layout(t),r.processLabelsOverall()})}var F=e(n(),1),I=me()(Ie((e,t,n)=>({mapPlayComplete:!1,cloud:!0,bar:!0,rotation:!0,heat:!0,mode:!0,toggle:t=>e(e=>({[t]:!e[t]})),reset:()=>e(n.getInitialState())}))),L=t(),$e=i.div`
  position: relative;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`,et=i.div`
  font-size: 36px;
  letter-spacing: 8px;
  color: #fff;
  text-shadow: 0 8px 10px rgba(255, 145, 0, 0.8);
  font-weight: 700;
  background: linear-gradient(to bottom, #ea580c, #ff9100);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;

  &::after {
    content: "SICHUAN SMART BRAIN";
    display: block;
    font-size: 12px;
    letter-spacing: 12px;
    text-align: center;
    color: rgba(255, 145, 0, 0.6);
    margin-top: -5px;
    -webkit-text-fill-color: rgba(255, 145, 0, 0.6);
  }
`,tt=i.svg.attrs({xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 1920 82`,width:`100%`,height:`100%`,preserveAspectRatio:`none`,children:(0,L.jsxs)(L.Fragment,{children:[(0,L.jsxs)(`defs`,{children:[(0,L.jsxs)(`radialGradient`,{id:`radialGradient`,cx:`50%`,cy:`50%`,fx:`100%`,fy:`50%`,r:`50%`,children:[(0,L.jsx)(`stop`,{offset:`0%`,stopColor:`#fff`,stopOpacity:`1`}),(0,L.jsx)(`stop`,{offset:`100%`,stopColor:`#fff`,stopOpacity:`0`})]}),(0,L.jsx)(`mask`,{id:`svgline-1`,children:(0,L.jsx)(`circle`,{r:`100`,cx:`0`,cy:`0`,fill:`url(#radialGradient)`,children:(0,L.jsx)(`animateMotion`,{begin:`0s`,dur:`3s`,path:`M0,60 L620,60 L670,80 L960,80`,rotate:`auto`,keyPoints:`0;1`,keyTimes:`0;1`,repeatCount:`indefinite`})})}),(0,L.jsx)(`mask`,{id:`svgline-2`,children:(0,L.jsx)(`circle`,{r:`100`,cx:`0`,cy:`0`,fill:`url(#radialGradient)`,children:(0,L.jsx)(`animateMotion`,{begin:`0s`,dur:`3s`,path:`M1920,60 L1300,60 L1250,80 L960,80`,rotate:`auto`,keyPoints:`0;1`,keyTimes:`0;1`,repeatCount:`indefinite`})})})]}),(0,L.jsx)(`path`,{d:`M0,0 L1920,0 L1920,60 L1300,60 L1250,80 L670,80 L620,60 L0,60 Z`,fill:`rgb(255, 245, 232)`}),(0,L.jsx)(`path`,{d:`M0,60 L620,60 L670,80 L1250,80 L1300,60 L1920,60`,fill:`none`,stroke:`rgb(234, 88, 12)`,strokeWidth:`1`}),(0,L.jsx)(`path`,{d:`M0,60 L620,60 L670,80 L960,80`,fill:`none`,stroke:`#ff6715`,strokeWidth:`4`,mask:`url(#svgline-1)`}),(0,L.jsx)(`path`,{d:`M1920,60 L1300,60 L1250,80 L960,80`,fill:`none`,stroke:`#ff6715`,strokeWidth:`4`,mask:`url(#svgline-2)`})]})})`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`,nt=i.a.attrs({children:(0,L.jsx)(`svg`,{width:`1em`,height:`1em`,viewBox:`0 0 22 22`,version:`1.1`,children:(0,L.jsx)(`g`,{stroke:`none`,strokeWidth:`1`,fill:`none`,fillRule:`evenodd`,children:(0,L.jsx)(`g`,{transform:`translate(-262.000000, -2480.000000)`,fill:`#000000`,children:(0,L.jsx)(`g`,{transform:`translate(252.000000, 2470.000000)`,children:(0,L.jsx)(`path`,{d:`M29.9006449,27.904446 C28.5016932,29.8668872 26.6944882,31.2248797 24.4790301,31.9784237 C24.2211218,32.0272886 24.0325745,31.9931534 23.9133882,31.876018 C23.7942019,31.7588827 23.7346171,31.6119968 23.7346338,31.4353603 L23.7346338,28.3376019 C23.7346338,27.3880159 23.4865017,26.6930482 22.9902375,26.2526987 C23.5347812,26.1938141 24.024319,26.1058042 24.458851,25.9886688 C24.893383,25.8715335 25.3422785,25.680801 25.8055376,25.4164714 C26.2687966,25.1521418 26.6556591,24.8267354 26.9661251,24.4402521 C27.276591,24.0537688 27.5296112,23.5398222 27.7251857,22.8984123 C27.9207602,22.2570024 28.0185475,21.5203805 28.0185475,20.6885464 C28.0185475,19.504056 27.6414612,18.4959023 26.8872886,17.6640854 C27.240536,16.7733669 27.2023419,15.7752328 26.7727063,14.6696833 C26.5050218,14.5813565 26.1181593,14.6352226 25.6121189,14.8312818 C25.1060784,15.0273409 24.6669591,15.2428141 24.2947609,15.4777015 L23.7502256,15.8300324 C22.8622108,15.5757225 21.9454689,15.4485675 21,15.4485675 C20.0545311,15.4485675 19.1377892,15.5757225 18.2497744,15.8300324 C18.0969813,15.7223001 17.8940788,15.5901353 17.641067,15.433538 C17.3880551,15.2769408 16.9892689,15.0884007 16.4447085,14.8679176 C15.9001481,14.6474346 15.4894467,14.5813479 15.2126043,14.6696576 C14.7921266,15.7758408 14.7588206,16.7739749 15.1126863,17.6640597 C14.3585137,18.4958938 13.9814275,19.5040475 13.9814275,20.6885208 C13.9814275,21.5203548 14.0792147,22.2544676 14.2747892,22.8908591 C14.4703637,23.5272505 14.720944,24.0411971 15.0265302,24.4326988 C15.3321164,24.8242005 15.7165391,25.1521076 16.1797981,25.41642 C16.6430571,25.6807325 17.0919527,25.871465 17.5264847,25.9886174 C17.9610167,26.1057699 18.4505545,26.1937799 18.9950982,26.2526473 C18.6131238,26.60467 18.3790461,27.1085884 18.292865,27.7644025 C18.0924107,27.8621152 17.8775846,27.935404 17.6483866,27.984269 C17.4191886,28.0331339 17.1469167,28.0575663 16.831571,28.0575663 C16.5162253,28.0575663 16.203612,27.9523346 15.8937309,27.7418712 C15.5838499,27.5314078 15.3189144,27.225424 15.0989244,26.8239198 C14.9174043,26.5107253 14.6857747,26.2564154 14.4040358,26.0609899 C14.1222969,25.8655645 13.8860801,25.7481209 13.6953854,25.708659 L13.4084408,25.6644956 C13.2079866,25.6644956 13.069557,25.6864188 12.9931521,25.7302654 C12.9167472,25.7741119 12.8929083,25.8304873 12.9216353,25.8993914 C12.9503623,25.9682956 12.9934529,26.0368829 13.050907,26.1051533 C13.1083611,26.1734238 13.1703941,26.2319915 13.2370061,26.2808564 L13.336924,26.3541538 C13.5471712,26.4518665 13.7549701,26.6378974 13.9603209,26.9122466 C14.1656716,27.1865958 14.3160164,27.4362043 14.4113555,27.661072 L14.554364,27.9983735 C14.67843,28.3704354 14.8886689,28.6714094 15.1850804,28.9012955 C15.481492,29.1311815 15.8014334,29.2780674 16.1449045,29.3419532 C16.4883756,29.405839 16.8202406,29.4399742 17.1404995,29.4443589 C17.4607584,29.4487435 17.7256939,29.4315218 17.935306,29.3926936 L18.2644137,29.3335008 C18.2644137,29.7055627 18.2668619,30.1412107 18.2717584,30.6404447 C18.2766548,31.1396787 18.279103,31.4040083 18.279103,31.4334334 C18.279103,31.6094533 18.21707,31.7563392 18.093004,31.8740912 C17.9689379,31.9918431 17.7779507,32.0259784 17.5200424,31.9764969 C15.3045843,31.22297 13.4973793,29.8649774 12.0984276,27.9025191 C10.6994759,25.9400608 10,23.7305118 10,21.2738721 C10,19.2281225 10.4916769,17.3417791 11.4750308,15.6148418 C12.4583846,13.8879045 13.7928551,12.5202092 15.4784422,11.5117558 C17.1640293,10.5033024 19.0045486,9.99938397 21,10.0000006 C22.9954514,10.0006172 24.8359707,10.5045356 26.5215578,11.5117558 C28.2071449,12.518976 29.5416154,13.8866713 30.5249692,15.6148418 C31.5083231,17.3430123 32,19.2293557 32,21.2738721 C31.9990725,23.7324558 31.2995966,25.9420048 29.9006449,27.904446 Z`})})})})})})`
  position: absolute;
  right: 32px;
  top: 12px;
  width: 36px;
  height: 36px;
  font-size: 36px;
  pointer-events: auto;

  svg {
    display: block;
  }
`;function rt(e){return(0,L.jsxs)($e,{...e,children:[(0,L.jsx)(tt,{}),(0,L.jsx)(et,{children:`江苏省智慧城市数据大脑`}),(0,L.jsx)(nt,{href:`https://github.com/knight-L/datav`,target:`_blank`})]})}var it=i.div`
  position: absolute;
  bottom: 0;
  height: 100px;
  width: 100%;
`,at=i.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: flex-end; /* 按钮底部对齐 */
  gap: 30px;
  z-index: 10;
  padding-bottom: 20px;
`,R=i.button`
  pointer-events: auto;
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(234, 88, 12, 0.2);
  color: #d35400;
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(234, 88, 12, 0.1) 0%,
      transparent 100%
    );
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    transform: translateY(-5px) scale(1.1);
    border-color: #ff6715;
    box-shadow: 0 0 15px rgba(255, 103, 21, 0.4);
    color: #ff6715;
  }

  &:hover::before {
    opacity: 1;
  }

  &.active:hover {
    box-shadow: 0 6px 20px rgba(255, 103, 21, 0.7);
  }

  ${e=>e.$active&&`
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #ff6715 0%, #ff8c00 100%);
        color: white !important;
        border: none;
        box-shadow: 0 4px 15px rgba(255, 103, 21, 0.5);
        margin-bottom: 5px;
    `}
`,ot=()=>(0,L.jsxs)(`svg`,{viewBox:`0 0 1920 100`,preserveAspectRatio:`none`,width:`100%`,height:`100%`,children:[(0,L.jsxs)(`defs`,{children:[(0,L.jsxs)(`linearGradient`,{id:`grad-bottom`,x1:`0%`,y1:`0%`,x2:`0%`,y2:`100%`,children:[(0,L.jsx)(`stop`,{offset:`0%`,stopColor:`#fff5e8`,stopOpacity:`0.5`}),(0,L.jsx)(`stop`,{offset:`100%`,stopColor:`#fff5e8`,stopOpacity:`1`})]}),(0,L.jsx)(`path`,{id:`pulse-path`,d:`M960,100 Q960,40 1300,40`}),(0,L.jsx)(`path`,{id:`pulse-path-left`,d:`M960,100 Q960,40 620,40`})]}),(0,L.jsx)(`path`,{d:`M0,100 H1920 V100 Q1600,100 1450,100 Q1300,80 1200,60 Q960,10 720,60 Q620,80 470,100 Q320,100 0,100 Z`,fill:`url(#grad-bottom)`,stroke:`none`}),(0,L.jsx)(`path`,{d:`M0,100 Q320,100 470,100 Q620,80 720,60 Q960,10 1200,60 Q1300,80 1450,100 Q1600,100 1920,100`,fill:`none`,stroke:`#ff6715`,strokeWidth:`1`,strokeOpacity:`0.4`}),(0,L.jsx)(`path`,{d:`M720,60 Q960,10 1200,60`,fill:`none`,stroke:`#ff6715`,strokeWidth:`2`,strokeLinecap:`round`})]});function st(e){let{cloud:t,rotation:n,mode:r,heat:i,bar:a,toggle:o}=I();return(0,L.jsxs)(it,{...e,children:[(0,L.jsx)(ot,{}),(0,L.jsxs)(at,{children:[(0,L.jsx)(R,{$active:t,onClick:()=>o(`cloud`),children:(0,L.jsx)(`svg`,{fill:`currentColor`,viewBox:`0 0 1024 1024`,width:`24`,height:`24`,children:(0,L.jsx)(`path`,{d:`M746.666667 725.333333c59.733333-12.8 106.666667-64 106.666666-128 0-72.533333-55.466667-128-128-128-17.066667 0-29.866667 4.266667-42.666666 8.533334V469.333333c0-93.866667-76.8-170.666667-170.666667-170.666666s-170.666667 76.8-170.666667 170.666666c0 17.066667 4.266667 29.866667 4.266667 46.933334-8.533333-4.266667-17.066667-4.266667-25.6-4.266667C260.266667 512 213.333333 558.933333 213.333333 618.666667S260.266667 725.333333 320 725.333333h426.666667z m0 85.333334h-426.666667C213.333333 810.666667 128 725.333333 128 618.666667c0-85.333333 55.466667-157.866667 128-183.466667C273.066667 311.466667 379.733333 213.333333 512 213.333333c110.933333 0 209.066667 72.533333 243.2 170.666667 102.4 12.8 183.466667 102.4 183.466667 213.333333s-85.333333 200.533333-192 213.333334z`})})}),(0,L.jsx)(R,{$active:n,onClick:()=>o(`rotation`),children:(0,L.jsx)(`svg`,{fill:`currentColor`,viewBox:`0 0 1024 1024`,width:`24`,height:`24`,children:(0,L.jsx)(`path`,{d:`M492.416 658.176L230.826667 504.32V196.565333L492.373333 42.666667l261.589334 153.898666v307.754667l-261.589334 153.856z m200.064-184.661333V276.565333l-169.301333 103.296v197.888l169.301333-104.234666z m-400.128 0l169.301333 104.192V370.816L292.352 269.354667v204.16z m200.064-369.28L316.672 212.352l179.2 107.306667h6.912l170.624-104.149334-180.992-111.274666zM569.344 858.24L430.848 981.333333v-96.213333C194.901333 864.298667 0 750.208 0 612.053333c0-62.250667 36.949333-119.466667 98.389333-165.632l40.533334 42.666667c-48.64 34.858667-77.354667 77.184-77.354667 122.922667 0 105.813333 167.424 193.365333 369.28 211.541333V735.146667l138.496 123.093333zM646.314667 813.056c161.834667-30.976 276.949333-109.226667 276.949333-201.045333 0-51.2-35.882667-98.218667-95.616-135.168l42.453333-42.453334c71.552 48.128 114.730667 110.037333 114.730667 177.621334 0 122.709333-142.037333 226.645333-338.517333 262.997333v-61.952z`})})}),(0,L.jsx)(R,{$active:r,onClick:()=>o(`mode`),children:(0,L.jsx)(`svg`,{fill:`currentColor`,viewBox:`0 0 1024 1024`,width:`24`,height:`24`,children:(0,L.jsx)(`path`,{d:`M874.666667 21.333333l47.509333 101.824L1024 170.666667l-101.824 47.509333L874.666667 320l-47.509334-101.824L725.333333 170.666667l101.824-47.509334zM512 21.333333l156.138667 334.528L1002.666667 512l-334.528 156.138667L512 1002.666667l-156.138667-334.528L21.333333 512l334.528-156.138667L512 21.333333z m107.968 382.698667L512 172.650667l-107.968 231.381333L172.650667 512l231.381333 107.968 107.946667 231.36 107.989333-231.36L851.328 512l-231.36-107.946667z`})})}),(0,L.jsx)(R,{$active:i,onClick:()=>o(`heat`),children:(0,L.jsx)(`svg`,{fill:`currentColor`,viewBox:`0 0 1024 1024`,width:`24`,height:`24`,children:(0,L.jsx)(`path`,{d:`M781.981888 1014.033538C649.277769 945.497049 431.312619 990.61918 298.608501 972.93895 165.904382 955.25872 80.23377 832.725854 35.111639 706.301971-80.32183 383.00634 113.136746 295.287826 270.483965 302.387223 427.899447 309.691411 362.093496 148.180122 582.720919 27.558632 803.348343-93.062859 862.874059 217.126192 838.367485 287.574057 813.792648 358.021923 796.863316 425.32967 963.357836 601.858915 1129.852355 778.456422 914.686006 1082.706555 781.981888 1014.033538ZM891.408175 606.432565C745.66574 458.778754 743.413046 396.044657 768.397464 329.692597 789.900446 272.214785 777.886081 13.22331 589.478999 113.229243 401.071917 213.30344 457.730569 374.746465 324.207289 370.650659 190.615746 366.554852 7.601475 440.279363 102.28286 701.250477 139.281642 803.236049 225.976205 884.810855 338.474347 897.644381 450.972489 910.54617 634.259813 878.735409 746.211847 932.868314 858.163882 987.069481 1031.0069 747.874403 891.408175 606.432565ZM650.09693 792.51869C581.014333 766.646848 565.723324 679.337914 586.270618 607.388253 606.886175 535.302065 543.947288 435.773976 514.730537 379.866222 485.58205 323.753678 553.708959 197.671113 626.068201 178.352561 743.549573 146.95138 684.365175 331.7405 689.280142 455.092528 694.331636 578.444556 870.314773 658.79062 868.47166 734.28998 866.628548 809.789339 719.111263 818.458796 650.09693 792.51869ZM471.997627 693.058865C411.379696 748.01093 334.105487 776.886363 255.943853 750.604941 177.918747 724.255255 125.902009 596.124786 186.519939 541.991882 310.076758 431.541643 323.04681 547.179903 423.803641 498.098493 524.492209 449.085346 532.547294 638.106799 471.997627 693.058865Z`})})}),(0,L.jsx)(R,{$active:a,onClick:()=>o(`bar`),children:(0,L.jsx)(`svg`,{fill:`currentColor`,viewBox:`0 0 1024 1024`,width:`24`,height:`24`,children:(0,L.jsx)(`path`,{d:`M211.176727 809.425455a34.909091 34.909091 0 0 1-34.909091-34.909091V367.522909a34.909091 34.909091 0 0 1 69.818182 0v406.993455a34.909091 34.909091 0 0 1-34.909091 34.909091z m329.821091-34.909091V90.298182a34.909091 34.909091 0 0 0-69.818182 0v684.218182a34.909091 34.909091 0 0 0 69.818182 0z m289.000727 0V367.522909a34.909091 34.909091 0 0 0-69.818181 0v406.993455a34.909091 34.909091 0 0 0 69.818181 0zM977.454545 933.701818a34.909091 34.909091 0 0 0-34.90909-34.909091H81.454545a34.909091 34.909091 0 0 0 0 69.818182h861.09091a34.909091 34.909091 0 0 0 34.90909-34.909091z`})})})]})]})}var z={南京市:{population:950,gdp:`1.7万亿`,area:`6587平方公里`},无锡市:{population:750,gdp:`1.5万亿`,area:`4627平方公里`},徐州市:{population:900,gdp:`8000亿`,area:`11765平方公里`},常州市:{population:530,gdp:`9500亿`,area:`4385平方公里`},苏州市:{population:1300,gdp:`2.4万亿`,area:`8657平方公里`},南通市:{population:770,gdp:`1.1万亿`,area:`8001平方公里`},连云港市:{population:460,gdp:`4200亿`,area:`7615平方公里`},淮安市:{population:460,gdp:`4800亿`,area:`10072平方公里`},盐城市:{population:670,gdp:`7000亿`,area:`16931平方公里`},扬州市:{population:460,gdp:`7100亿`,area:`6591平方公里`},镇江市:{population:320,gdp:`5000亿`,area:`3840平方公里`},泰州市:{population:450,gdp:`6400亿`,area:`5787平方公里`},宿迁市:{population:500,gdp:`4100亿`,area:`8555平方公里`}},B=[`#fbdf88`,`#ea580c`],ct=Object.keys(z),V=Array.from({length:5},(e,t)=>({name:ct[t],value:z[ct[t]].population}));function lt(){return(0,L.jsx)(C,{use:[ue,O,D,Qe],option:{grid:{top:0,bottom:0,left:`8%`,right:`12%`},xAxis:{show:!1},yAxis:{axisLine:{show:!1},axisTick:{show:!1},axisLabel:{fontSize:14,margin:16,inside:!1,verticalAlign:`middle`,color:`#000000`,formatter:(e,t)=>`{a|NO.${++t}} ${e}`,rich:{a:{color:`rgba(0, 0, 0,0.6)`}}},data:V.map(e=>e.name),type:`category`,inverse:!0,animationDuration:300,animationDurationUpdate:300},series:[{type:`bar`,data:V.map(e=>e.value),realtimeSort:!0,barWidth:8,itemStyle:{borderRadius:4,color:{type:`linear`,x:1,y:0,x2:0,y2:0,colorStops:B.map((e,t)=>({offset:t,color:e})),global:!1}},showBackground:!0,backgroundStyle:{borderRadius:4},label:{show:!0,color:`rgba(0, 0, 0,0.8)`,valueAnimation:!0,fontSize:16,fontWeight:`bold`},labelLayout:e=>({x:`100%`,y:e.rect.y+e.rect.height/2,verticalAlign:`middle`,align:`right`})},{name:`dot`,type:`pictorialBar`,symbol:`circle`,symbolSize:16,z:12,itemStyle:{color:B[0],shadowColor:B[0],shadowBlur:10},data:V.map(e=>({value:e.value,symbolPosition:`end`}))}],animationDuration:0,animationDurationUpdate:1e3,animationEasing:`linear`,animationEasingUpdate:`linear`}})}var H=[`#fbdf88`,`#ea580c`],ut={type1:`今年同期`,type2:`去年同期`},U=[[],[],[]];for(let e=0;e<30;e++)U[0].push(`${e+1}`.padStart(2,`0`)),U[1].push(Math.round(e*Math.random()*1e3)),U[2].push(Math.round(e*Math.random()*1050));function dt(){let e=(0,F.useRef)(null),t=(0,F.useRef)(0);return Te(()=>{e.current&&(e.current?.dispatchAction({type:`dataZoom`,startValue:t.current,endValue:t.current+8}),t.current=(t.current+1)%(U[0].length-8))},2e3),(0,L.jsx)(C,{ref:e,use:[ge,D,O,Re,Fe,Ee],option:{tooltip:{trigger:`axis`,axisPointer:{type:`shadow`},textStyle:{color:`rgba(0, 0, 0,0.8)`},backgroundColor:`rgba(255, 245, 232,0.8)`,borderColor:H[1],borderWidth:1,borderRadius:8},grid:{top:16,bottom:16,left:16,right:16,outerBoundsMode:`same`},legend:{right:16,top:0,data:Object.values(ut).map((e,t)=>({name:e,value:2e3,icon:`none`,textStyle:{color:H[t]}}))},calculable:!0,xAxis:{type:`category`,boundaryGap:!1,axisLine:{lineStyle:{color:`rgba(0, 0, 0, 0.1)`}},axisLabel:{interval:0,color:`rgba(0, 0, 0, 0.6)`},splitLine:{show:!1},axisTick:{show:!1},data:U[0]},yAxis:{type:`value`,axisLabel:{interval:0,color:`rgba(0, 0, 0, 0.6)`},splitLine:{show:!1},axisLine:{show:!0,lineStyle:{color:`rgba(0, 0, 0, 0.1)`}}},dataZoom:{type:`slider`,show:!1,realtime:!0,startValue:0,endValue:8},series:[{name:`今年同期`,type:`line`,symbol:`none`,smooth:!0,itemStyle:{color:H[0]},areaStyle:{color:{type:`linear`,x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:H[0]},{offset:1,color:`rgba(255,255,255,0.1)`}],global:!1}},markPoint:{symbol:`rect`,symbolSize:[50,20],symbolOffset:[0,-10],label:{color:`#ffffff`},data:[{type:`max`,name:`最大值`}]},data:U[1]},{name:`去年同期`,type:`line`,symbol:`none`,smooth:!0,itemStyle:{color:H[1]},areaStyle:{color:{type:`linear`,x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:H[1]},{offset:1,color:`rgba(255,255,255,0.1)`}],global:!1}},markPoint:{symbol:`rect`,symbolSize:[50,20],symbolOffset:[0,-10],label:{color:`#ffffff`},data:[{type:`max`,name:`最大值`}]},data:U[2]}]}})}var ft=Object.keys(z);function pt(){return(0,L.jsx)(ke,{rowHeight:50,styles:{header:{color:`rgba(0, 0, 0, 0.6)`},body:{color:`#000000`}},column:[{title:`省份`,dataIndex:`value1`,noScroll:!0},{title:`专利编号`,dataIndex:`value2`,align:`center`,noScroll:!0},{title:`处罚金额`,dataIndex:`value3`,align:`right`,noScroll:!0},{title:`同比百分比`,dataIndex:`value4`,align:`right`,noScroll:!0}],data:Array.from({length:ft.length},(e,t)=>{let n=Math.random()*100;return{value1:ft[t],value2:`ZL${Math.round(Math.random()*1e7)}`,value3:(Math.random()*1e3).toLocaleString(`zh-CN`,{maximumFractionDigits:2}),value4:(0,L.jsx)(`span`,{style:{color:n>90?`#fbdf88`:n>60?`#ffa800`:`#ea580c`},children:n.toLocaleString(`zh-CN`,{maximumFractionDigits:2}).concat(`%`)})}})})}var W=[`#fbdf88`,`#ea580c`],mt=[270,400,380,420,300,410,400,330,210,290],ht=i.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: 2fr repeat(2, minmax(0, 1fr));
  gap: 16px;
`,gt=i.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`,_t=i.div`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.7);
`,vt=i(le)`
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-size: 28px;
  font-weight: 600;
  color: #ea580c;

  &::after {
    content: "亿万元";
    display: inline-block;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.7);
    font-weight: normal;
  }
`,yt=i.div`
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.8);
`,bt=i(le)`
  font-size: 20px;
  font-weight: 600;
  margin-left: 16px;
  color: #ea580c;
`,xt=i.svg.attrs({viewBox:`0 0 1024 1024`,width:`1em`,height:`1em`,fill:W[0],children:(0,L.jsx)(`path`,{d:`M597.479619 154.063238V852.358095h52.150857V320.658286l169.252572 58.88a56.32 56.32 0 0 1 25.795047 42.959238l0.170667 4.388571V852.358095H902.095238V926.47619H121.904762v-74.093714h56.953905v-566.613333c0-19.456 10.166857-37.546667 26.843428-47.85981l304.444953-131.705904c38.034286-23.503238 87.332571 3.510857 87.332571 47.859809zM471.771429 482.816l-167.107048 68.266667v80.115809l167.107048-68.242286v-80.14019z m0-175.225905L304.664381 377.904762v80.530286l167.107048-70.339048v-80.457143z`})})`
  vertical-align: middle;
  margin-right: 4px;
`;function St(){return(0,L.jsxs)(ht,{children:[(0,L.jsx)(C,{use:[ge],option:{tooltip:{trigger:`axis`,axisPointer:{type:`shadow`},textStyle:{color:`rgba(0, 0, 0,0.8)`},backgroundColor:`rgba(255, 245, 232,0.8)`,borderColor:W[1],borderWidth:1,borderRadius:8},grid:{top:16,bottom:16,left:16,right:16,outerBoundsMode:`same`},calculable:!0,xAxis:{show:!1,data:mt,boundaryGap:!1},yAxis:{show:!1,type:`value`},series:{name:`series1`,type:`line`,symbol:`none`,itemStyle:{color:W[0]},areaStyle:{color:{type:`linear`,x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:W[0]},{offset:1,color:`rgba(255,255,255,0.1)`}],global:!1}},data:mt}}}),(0,L.jsxs)(gt,{children:[(0,L.jsx)(_t,{children:`收益总计`}),(0,L.jsx)(vt,{value:99608,options:{minimumFractionDigits:2,maximumFractionDigits:2}})]}),Array.from({length:4},(e,t)=>(0,L.jsxs)(yt,{children:[(0,L.jsx)(xt,{}),`企业数量`,(0,L.jsx)(bt,{value:7792,options:{maximumFractionDigits:0}})]},t))]})}var G=[`#fbdf88`,`#ffa800`,`#ff5b00`,`#ff3000`],Ct=[{name:`第一季度`,value:20},{name:`第二季度`,value:10},{name:`第三季度`,value:30},{name:`第四季度`,value:40}].reduce((e,t,n)=>(e?.push({value:t.value,name:t.name,itemStyle:{borderRadius:10,shadowBlur:20,color:G[n],shadowColor:G[n]}},{value:2,name:``,itemStyle:{color:`rgba(0, 0, 0, 0)`,borderColor:`rgba(0, 0, 0, 0)`,borderWidth:0}}),e),[]);function wt(){return(0,L.jsx)(C,{use:[se,D,Re],option:{color:G[0],tooltip:{show:!1},legend:{icon:`circle`,orient:`vertical`,data:[`第一季度`,`第二季度`,`第三季度`,`第四季度`],top:`middle`,right:`10%`,textStyle:{color:`#000000`},itemGap:20},series:{name:``,type:`pie`,center:[`30%`,`50%`],radius:[70,80],label:{show:!1},labelLine:{show:!1},data:Ct}}})}var Tt=[3e3,2e3,4e3,5e3,4500],K=[`#fbdf88`,`#ea580c`],Et=[`50万以下`,`50～100万`,`100～500万`,`500～1000万`,`1000万以上`];function Dt(){let e=(0,F.useRef)(null),t=(0,F.useRef)(0);return Te(()=>{e.current&&(e.current?.dispatchAction({type:`showTip`,seriesIndex:0,dataIndex:t.current}),t.current=(t.current+1)%Tt.length)},3e3,!0),(0,L.jsx)(C,{ref:e,use:[Oe,D,O],option:{tooltip:{trigger:`axis`,backgroundColor:`rgba(255, 245, 232,0.8)`,borderColor:K[1],borderWidth:1,borderRadius:8,textStyle:{color:`rgba(0, 0, 0,0.8)`,fontSize:13,align:`left`},axisPointer:{type:`line`,lineStyle:{width:1,type:`dotted`,color:K[0]}}},grid:{top:`20%`,bottom:`5%`,left:10,right:10,outerBoundsMode:`same`},xAxis:{type:`category`,axisLine:{lineStyle:{color:`rgba(0, 0, 0, 0.1)`}},axisLabel:{interval:0,color:`rgba(0, 0, 0, 0.6)`},axisTick:{show:!1},data:Et},yAxis:{type:`value`,splitLine:{show:!1},axisLine:{show:!1},axisLabel:{color:`rgba(0, 0, 0, 0.6)`},axisTick:{show:!1}},series:[{name:``,type:`bar`,barWidth:30,label:{show:!0,position:`top`,color:`rgba(0, 0, 0, 0.8)`},itemStyle:{borderRadius:[15,15,0,0],color:{type:`linear`,x:0,y:0,x2:0,y2:1,colorStops:K.map((e,t)=>({offset:t,color:e})),global:!1}},data:Tt}]}})}var Ot=i.div`
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: repeat(6, minmax(0, 1fr));
  gap: 20px;
  padding: 20px;
`,q=i.div`
  position: relative;
  background: rgba(255, 245, 232, 0.65);
  border: 1px solid rgba(255, 145, 0, 0.3);
  position: relative;
  padding: 15px;
  backdrop-filter: blur(4px);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  pointer-events: auto;
  z-index: 9999;

  &::before {
    content: "";
    position: absolute;
    top: -1px;
    left: -1px;
    width: 10px;
    height: 10px;
    border-top: 2px solid #ea580c;
    border-left: 2px solid #ea580c;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -1px;
    right: -1px;
    width: 10px;
    height: 10px;
    border-bottom: 2px solid #ea580c;
    border-right: 2px solid #ea580c;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  &:hover::before,
  &:hover::after {
    width: 100%;
    height: 100%;
    opacity: 0.5;
  }
`,J=i.div`
  font-size: 18px;
  margin-bottom: 10px;
  padding-left: 10px;
  border-left: 4px solid #fdb961;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #5a4a42;

  span {
    font-size: 10px;
    color: rgba(0, 0, 0, 0.4);
    font-weight: normal;
  }
`;function kt(){let e=E(`toBottom`,.6),t=E(`toRight`,.8,.5),n=E(`toRight`,.8,.6),r=E(`toRight`,.8,.7),i=E(`toLeft`,.8,.5),a=E(`toLeft`,.8,.6),o=E(`toLeft`,.8,.7),s=E(`toTop`,.8,.5);return(0,F.useEffect)(()=>{let c=I.subscribe(e=>e.mapPlayComplete,c=>{c&&(e.restart(),s.restart(),t.restart(),n.restart(),r.restart(),i.restart(),a.restart(),o.restart())}),l=I.subscribe(e=>e.mode,s=>{s?(e.restart(),t.restart(),n.restart(),r.restart(),i.restart(),a.restart(),o.restart()):(e.reverse(),t.reverse(),n.reverse(),r.reverse(),i.reverse(),a.reverse(),o.reverse())});return()=>{c(),l()}},[]),(0,L.jsxs)(De,{children:[(0,L.jsx)(rt,{ref:e.ref}),(0,L.jsxs)(Ot,{children:[(0,L.jsxs)(q,{ref:t.ref,style:{gridArea:`1 / 1 / 3 / 2`},children:[(0,L.jsxs)(J,{children:[`2025年规模指标分析`,(0,L.jsx)(`span`,{children:`INDICATOR ANALYSIS`})]}),(0,L.jsx)(lt,{})]}),(0,L.jsxs)(q,{ref:n.ref,style:{gridArea:`3 / 1 / 5 / 2`},children:[(0,L.jsxs)(J,{children:[`企业税收分析`,(0,L.jsx)(`span`,{children:`TAX ANALYSIS`})]}),(0,L.jsx)(dt,{})]}),(0,L.jsxs)(q,{ref:r.ref,style:{gridArea:`5 / 1 / 7 / 2`},children:[(0,L.jsxs)(J,{children:[`行政处罚信息`,(0,L.jsx)(`span`,{children:`PENALTY INFORMATION`})]}),(0,L.jsx)(pt,{})]}),(0,L.jsxs)(q,{ref:i.ref,style:{gridArea:`1 / 4 / 3 / 5`},children:[(0,L.jsxs)(J,{children:[`企业收益总数统计`,(0,L.jsx)(`span`,{children:`REVENUE STATISTICS`})]}),(0,L.jsx)(St,{})]}),(0,L.jsxs)(q,{ref:a.ref,style:{gridArea:`3 / 4 / 5 / 5`},children:[(0,L.jsxs)(J,{children:[`企业能耗分析`,(0,L.jsx)(`span`,{children:`ENERGY CONSUMPTION ANALYSIS`})]}),(0,L.jsx)(wt,{})]}),(0,L.jsxs)(q,{ref:o.ref,style:{gridArea:`5 / 4 / 7 / 5`},children:[(0,L.jsxs)(J,{children:[`企业税收分析`,(0,L.jsx)(`span`,{children:`TAX ANALYSIS`})]}),(0,L.jsx)(Dt,{})]})]}),(0,L.jsx)(st,{ref:s.ref})]})}function At(){let e=(0,F.useRef)(null);return(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)(`ambientLight`,{intensity:2}),(0,L.jsx)(`directionalLight`,{ref:e,intensity:12,position:[0,200,20],color:`#fff5e8`})]})}function Y(e,t){return new Promise((n,r)=>{new b().load(e,e=>{t?.(e),n(e)},void 0,r)})}var jt=Y(`/sc-datav/assets/cloud-CNTXtzoi.png`),Mt=new re,X=new c,Z=new d,Nt=new c,Pt=new d,Q=new c,$=(e,t)=>{e.updateRanges[0]=t},Ft=(0,F.createContext)(null),It=({children:e,range:t,limit:n=200,frustumCulled:r,...i})=>{let a=(0,F.useRef)(null),o=(0,F.useRef)([]),l=(0,F.useMemo)(()=>new Float32Array(Array.from({length:n},()=>1)),[n]),u=(0,F.useMemo)(()=>new Float32Array(Array.from({length:n},()=>[1,1,1]).flat()),[n]),f=(0,F.use)(jt),p=0,m=0,h,g=new d,v=new c(0,0,1),y=new c;_((e,t)=>{for(p=e.clock.elapsedTime,Mt.copy(a.current.matrixWorld).invert(),e.camera.matrixWorld.decompose(Nt,Pt,Q),m=0;m<o.current.length;m++)h=o.current[m],h.ref?.current.matrixWorld.decompose(X,Z,Q),X.add(y.copy(h.position).applyQuaternion(Z).multiply(Q)),Z.copy(Pt).multiply(g.setFromAxisAngle(v,h.rotation+=t*h.rotationFactor)),Q.multiplyScalar(h.volume+(1+Math.sin(p*h.density*h.speed))/2*h.growth),h.matrix.compose(X,Z,Q).premultiply(Mt),h.dist=X.distanceTo(Nt);for(o.current.sort((e,t)=>t.dist-e.dist),m=0;m<o.current.length;m++)h=o.current[m],l[m]=h.opacity*(h.dist<h.fade-1?h.dist/h.fade:1),a.current.setMatrixAt(m,h.matrix),a.current.setColorAt(m,h.color);a.current.geometry.attributes.cloudOpacity.needsUpdate=!0,a.current.instanceMatrix.needsUpdate=!0,a.current.instanceColor&&(a.current.instanceColor.needsUpdate=!0)}),(0,F.useLayoutEffect)(()=>{let e=Math.min(n,t===void 0?n:t,o.current.length);a.current.count=e,$(a.current.instanceMatrix,{start:0,count:e*16}),a.current.instanceColor&&$(a.current.instanceColor,{start:0,count:e*3}),$(a.current.geometry.attributes.cloudOpacity,{start:0,count:e})});let b=[f.image.width??1,f.image.height??1],x=Math.max(b[0],b[1]);return b=[b[0]/x,b[1]/x],(0,L.jsx)(`group`,{...i,children:(0,L.jsxs)(Ft.Provider,{value:o,children:[e,(0,L.jsxs)(`instancedMesh`,{matrixAutoUpdate:!1,ref:a,args:[void 0,void 0,n],frustumCulled:r,children:[(0,L.jsx)(`instancedBufferAttribute`,{usage:s,attach:`instanceColor`,args:[u,3]}),(0,L.jsx)(`planeGeometry`,{args:[...b],children:(0,L.jsx)(`instancedBufferAttribute`,{usage:s,attach:`attributes-cloudOpacity`,args:[l,1]})}),(0,L.jsx)(`meshLambertMaterial`,{transparent:!0,map:f,depthWrite:!1,onBeforeCompile:e=>{let t=parseInt(`183`.replace(/\D+/g,``))>=154?`opaque_fragment`:`output_fragment`;e.vertexShader=`attribute float cloudOpacity;
               varying float vOpacity;
              `+e.vertexShader.replace(`#include <fog_vertex>`,`#include <fog_vertex>
                 vOpacity = cloudOpacity;
                `),e.fragmentShader=`varying float vOpacity;
              `+e.fragmentShader.replace(`#include <${t}>`,`#include <${t}>
                 gl_FragColor = vec4(outgoingLight, diffuseColor.a * vOpacity);
                `)}})]})]})})},Lt=({opacity:e=1,speed:t=0,bounds:n=[5,1,1],segments:r=20,color:i=`#ffffff`,fade:a=10,volume:s=6,smallestVolume:l=.25,distribute:u,growth:d=4,concentrate:f=`inside`,seed:p=Math.random(),ref:m,...g})=>{function _(){let e=Math.sin(p++)*1e4;return e-Math.floor(e)}let v=(0,F.useContext)(Ft),y=(0,F.useRef)(null),b=(0,F.useId)(),x=(0,F.useMemo)(()=>[...Array(r)].map((e,t)=>({segments:r,bounds:new c(1,1,1),position:new c,uuid:b,index:t,ref:y,dist:0,matrix:new re,color:new o,rotation:t*(Math.PI/r)})),[r,b]);return(0,F.useLayoutEffect)(()=>{x.forEach((o,c)=>{h(o,{volume:s,color:i,speed:t,growth:d,opacity:e,fade:a,bounds:n,density:Math.max(.5,_()),rotationFactor:Math.max(.2,.5*_())*t});let p=u?.(o,c);(p||r>1)&&o.position.copy(o.bounds).multiply(p?.point??{x:_()*2-1,y:_()*2-1,z:_()*2-1});let m=Math.abs(o.position.x),g=Math.abs(o.position.y),v=Math.abs(o.position.z),y=Math.max(m,g,v);o.length=1,m===y&&(o.length-=m/o.bounds.x),g===y&&(o.length-=g/o.bounds.y),v===y&&(o.length-=v/o.bounds.z),o.volume=(p?.volume===void 0?Math.max(Math.max(0,l),f===`random`?_():f===`inside`?o.length:1-o.length):p.volume)*s})},[f,n,a,i,e,d,s,p,r,t]),(0,F.useLayoutEffect)(()=>{let e=x;return v.current=[...v.current,...e],()=>{v.current=v.current.filter(e=>e.uuid!==b)}},[x]),(0,F.useImperativeHandle)(m,()=>y.current,[]),(0,L.jsx)(`group`,{ref:y,...g})},Rt=e=>(0,F.useContext)(Ft)?(0,L.jsx)(Lt,{...e}):(0,L.jsx)(It,{children:(0,L.jsx)(Lt,{...e})});function zt(){let e=(0,F.useRef)(null),t=(0,F.useRef)(null),n=I(e=>e.cloud);return _((n,r)=>{e.current.rotation.y=Math.cos(n.clock.elapsedTime/2)/2,e.current.rotation.x=Math.sin(n.clock.elapsedTime/2)/2,t.current.rotation.y-=r/5}),(0,L.jsxs)(It,{ref:e,visible:n,children:[(0,L.jsx)(Rt,{ref:t,bounds:[50,10,10],position:[100,60,20],volume:50,opacity:.5,fade:50}),(0,L.jsx)(Rt,{bounds:[50,10,10],position:[-60,60,60],volume:50,opacity:.5,fade:50})]})}function Bt(e){let{ref:t,args:n,bbox:r,children:i,...a}=e,o=(0,F.useRef)(null);return(0,F.useImperativeHandle)(t,()=>o.current),(0,F.useLayoutEffect)(()=>{let{geometry:e}=o.current,t=e.attributes.position,n=r.max.x-r.min.x,i=r.max.y-r.min.y,a=[],s=0,c=0,l=0,d=0;for(let e=0;e<t.count;e++)s=t.getX(e),c=t.getY(e),l=(s-r.min.x)/n,d=(c-r.min.y)/i,a.push(l,d);e.setAttribute(`uv`,new u(a,2))}),(0,L.jsxs)(`mesh`,{ref:o,...a,children:[(0,L.jsx)(`shapeGeometry`,{attach:`geometry`,args:n}),i]})}var Vt=i.div`
  background: rgba(255, 245, 232, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 12px 16px;
  color: #656565;
  font-size: 12px;
  pointer-events: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  min-width: 120px;
`,Ht=i.div`
  font-weight: bold;
  margin-bottom: 8px;
  color: #ea580c;
`,Ut=i.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`;function Wt(e){let{ref:t,data:n,position:r}=e,[i,a]=(0,F.useState)(!1);return(0,F.useImperativeHandle)(t,()=>({open:()=>a(!0),close:()=>a(!1)})),i&&(0,L.jsx)(oe,{center:!0,position:r,distanceFactor:100,zIndexRange:[-499],style:{pointerEvents:`none`},children:(0,L.jsxs)(Vt,{children:[(0,L.jsx)(Ht,{children:n.city}),(0,L.jsxs)(Ut,{children:[(0,L.jsx)(`span`,{children:`人口:`}),(0,L.jsxs)(`span`,{children:[n.population,`万`]})]}),(0,L.jsxs)(Ut,{children:[(0,L.jsx)(`span`,{children:`GDP:`}),(0,L.jsx)(`span`,{children:n.gdp})]}),(0,L.jsxs)(Ut,{children:[(0,L.jsx)(`span`,{children:`面积:`}),(0,L.jsx)(`span`,{children:n.area})]})]})})}var Gt=Promise.all([Y(de),Y(`/sc-datav/assets/huiguang-DZ0AatIE.png`,e=>{e.colorSpace=te,e.wrapS=e.wrapT=y})]);function Kt(e){let{position:t,value:n=Math.floor(Math.random()*1e3)+100,children:r,uColor1:i=new o(16506760),uColor2:a=new o(15357964),dir:s=`y`,factor:c=5,max:l=1e3}=e,u={x:1,y:2,z:3},d=(0,F.useRef)(null),p=I(e=>e.bar),[m,h]=(0,F.use)(Gt),g=(0,F.useMemo)(()=>4*c*(n/l),[]);_((e,t)=>{d.current.rotation.z+=t+.02});let v=(0,F.useRef)(null);return(0,F.useEffect)(()=>{let e=[0,60,120],t=new f;e.forEach((e,n)=>{t.rotation.set(Math.PI/2,Math.PI/180*e,0),t.updateMatrix(),v.current.setMatrixAt(n,t.matrix)}),v.current.instanceMatrix.needsUpdate=!0},[]),(0,L.jsxs)(`group`,{visible:p,position:t,children:[(0,L.jsxs)(`mesh`,{renderOrder:5,position:[0,0,g/2],raycast:()=>null,children:[(0,L.jsxs)(`instancedMesh`,{ref:v,matrixAutoUpdate:!1,args:[void 0,void 0,3],renderOrder:10,"rotation-x":Math.PI/2,raycast:()=>null,children:[(0,L.jsx)(`planeGeometry`,{args:[3.5,g]}),(0,L.jsx)(`meshBasicMaterial`,{transparent:!0,color:a,map:h,opacity:.4,depthWrite:!1,side:2,blending:2})]}),(0,L.jsx)(`boxGeometry`,{args:[.1*c,.1*c,g],translate:[0,0,g/2]}),(0,L.jsx)(`meshBasicMaterial`,{transparent:!0,color:`#ffffff`,opacity:1,depthTest:!1,fog:!1,onBeforeCompile:e=>{e.uniforms={...e.uniforms,uColor1:{value:i},uColor2:{value:a},uDir:{value:u[s]},uSize:{value:g}},e.vertexShader=e.vertexShader.replace(`void main() {`,`
                attribute float alpha;
                varying vec3 vPosition;
                varying float vAlpha;
                void main() {
                  vAlpha = alpha;
                  vPosition = position;
              `),e.fragmentShader=e.fragmentShader.replace(`void main() {`,`
                varying vec3 vPosition;
                varying float vAlpha;
                uniform vec3 uColor1;
                uniform vec3 uColor2;
                uniform float uDir;
                uniform float uSize;

                void main() {
              `),e.fragmentShader=e.fragmentShader.replace(`#include <opaque_fragment>`,`
              #ifdef OPAQUE
              diffuseColor.a = 1.0;
              #endif

              // https://github.com/mrdoob/three.js/pull/22425
              #ifdef USE_TRANSMISSION
              diffuseColor.a *= transmissionAlpha + 0.1;
              #endif
              // vec3 gradient = mix(uColor1, uColor2, vPosition.x / 15.0);
              vec3 gradient = vec3(0.0,0.0,0.0);
              if(uDir==1.0){
                gradient = mix(uColor1, uColor2, vPosition.x/ uSize);
              }else if(uDir==2.0){
                gradient = mix(uColor1, uColor2, vPosition.z/ uSize);
              }else if(uDir==3.0){
                gradient = mix(uColor1, uColor2, vPosition.y/ uSize);
              }
              outgoingLight = outgoingLight * gradient;

              gl_FragColor = vec4( outgoingLight, diffuseColor.a  );
              `)}})]}),(0,L.jsxs)(`mesh`,{renderOrder:6,ref:d,raycast:()=>null,children:[(0,L.jsx)(`planeGeometry`,{args:[5,5]}),(0,L.jsx)(`meshBasicMaterial`,{transparent:!0,color:16777215,map:m,alphaMap:m,opacity:1,depthTest:!1,fog:!1,blending:2})]}),typeof r==`function`?r?.(g):r]})}var qt=i(oe)`
  pointer-events: none;
  width: max-content;
  display: flex;
  background: #ffffff;
  border: 1px solid currentColor;
  color: #fdb961;
  font-size: 14px;
  padding-inline: 4px;
  border-radius: 4px;
`;function Jt(e){let{data:t,bbox:n,depth:r,map:i,normalMap:a}=e,o=(0,F.useRef)(null),s=(0,F.useRef)(null),l=(0,F.useRef)(new c(1,1,1)),[u,d]=(0,F.useMemo)(()=>{let e=t.points.map(e=>new x(e));return[e,new g(e)]},[t.points]);return _(()=>{o.current.scale.lerp(l.current,.1)}),(0,L.jsxs)(`group`,{ref:o,onPointerOver:e=>{e.stopPropagation(),l.current.setZ(1.5),s.current.open(),document.body.style.cursor=`pointer`},onPointerOut:()=>{l.current.setZ(1),s.current.close(),document.body.style.cursor=`auto`},children:[(0,L.jsx)(Bt,{"position-z":r+.1,bbox:n,args:[u],children:(0,L.jsx)(`meshStandardMaterial`,{map:i,normalMap:a})}),(0,L.jsxs)(`mesh`,{castShadow:!0,receiveShadow:!0,children:[(0,L.jsx)(`extrudeGeometry`,{args:[u,{depth:r,steps:1,bevelEnabled:!1}]}),(0,L.jsx)(`meshStandardMaterial`,{transparent:!0,opacity:0,metalness:.2,roughness:.5,side:2,color:`#f9f3e7`})]}),(0,L.jsxs)(`lineSegments`,{"position-z":r+.2,raycast:()=>null,children:[(0,L.jsx)(`edgesGeometry`,{args:[d]}),(0,L.jsx)(`lineBasicMaterial`,{transparent:!0,opacity:0,color:`#ffffff`})]}),(0,L.jsx)(Kt,{position:t.cityId,value:z[t.city]?.population??0,children:e=>(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)(qt,{center:!0,position:[0,0,e+.2],distanceFactor:100,zIndexRange:[-900],children:t.city}),(0,L.jsx)(Wt,{ref:s,data:{city:t.city,...z[t.city]},position:[0,0,e+7],visible:!1})]})})]})}var Yt=e(r(((e,t)=>{(function(e,n,r){t!==void 0&&t.exports?t.exports=r():typeof define==`function`&&define.amd?define(r):n[e]=r()})(`h337`,e,function(){var e={defaultRadius:40,defaultRenderer:`canvas2d`,defaultGradient:{.25:`rgb(0,0,255)`,.55:`rgb(0,255,0)`,.85:`yellow`,1:`rgb(255,0,0)`},defaultMaxOpacity:1,defaultMinOpacity:0,defaultBlur:.85,defaultXField:`x`,defaultYField:`y`,defaultValueField:`value`,plugins:{}},t=(function(){var t=function(e){this._coordinator={},this._data=[],this._radi=[],this._min=10,this._max=1,this._xField=e.xField||e.defaultXField,this._yField=e.yField||e.defaultYField,this._valueField=e.valueField||e.defaultValueField,e.radius&&(this._cfgRadius=e.radius)},n=e.defaultRadius;return t.prototype={_organiseData:function(e,t){var r=e[this._xField],i=e[this._yField],a=this._radi,o=this._data,s=this._max,c=this._min,l=e[this._valueField]||1,u=e.radius||this._cfgRadius||n;o[r]||(o[r]=[],a[r]=[]),o[r][i]?o[r][i]+=l:(o[r][i]=l,a[r][i]=u);var d=o[r][i];return d>s?(t?this.setDataMax(d):this._max=d,!1):d<c?(t?this.setDataMin(d):this._min=d,!1):{x:r,y:i,value:l,radius:u,min:c,max:s}},_unOrganizeData:function(){var e=[],t=this._data,n=this._radi;for(var r in t)for(var i in t[r])e.push({x:r,y:i,radius:n[r][i],value:t[r][i]});return{min:this._min,max:this._max,data:e}},_onExtremaChange:function(){this._coordinator.emit(`extremachange`,{min:this._min,max:this._max})},addData:function(){if(arguments[0].length>0)for(var e=arguments[0],t=e.length;t--;)this.addData.call(this,e[t]);else{var n=this._organiseData(arguments[0],!0);n&&(this._data.length===0&&(this._min=this._max=n.value),this._coordinator.emit(`renderpartial`,{min:this._min,max:this._max,data:[n]}))}return this},setData:function(e){var t=e.data,n=t.length;this._data=[],this._radi=[];for(var r=0;r<n;r++)this._organiseData(t[r],!1);return this._max=e.max,this._min=e.min||0,this._onExtremaChange(),this._coordinator.emit(`renderall`,this._getInternalData()),this},removeData:function(){},setDataMax:function(e){return this._max=e,this._onExtremaChange(),this._coordinator.emit(`renderall`,this._getInternalData()),this},setDataMin:function(e){return this._min=e,this._onExtremaChange(),this._coordinator.emit(`renderall`,this._getInternalData()),this},setCoordinator:function(e){this._coordinator=e},_getInternalData:function(){return{max:this._max,min:this._min,data:this._data,radi:this._radi}},getData:function(){return this._unOrganizeData()}},t})(),n=(function(){var e=function(e){var t=e.gradient||e.defaultGradient,n=document.createElement(`canvas`),r=n.getContext(`2d`);n.width=256,n.height=1;var i=r.createLinearGradient(0,0,256,1);for(var a in t)i.addColorStop(a,t[a]);return r.fillStyle=i,r.fillRect(0,0,256,1),r.getImageData(0,0,256,1).data},t=function(e,t){var n=document.createElement(`canvas`),r=n.getContext(`2d`),i=e,a=e;if(n.width=n.height=e*2,t==1)r.beginPath(),r.arc(i,a,e,0,2*Math.PI,!1),r.fillStyle=`rgba(0,0,0,1)`,r.fill();else{var o=r.createRadialGradient(i,a,e*t,i,a,e);o.addColorStop(0,`rgba(0,0,0,1)`),o.addColorStop(1,`rgba(0,0,0,0)`),r.fillStyle=o,r.fillRect(0,0,2*e,2*e)}return n},n=function(e){for(var t=[],n=e.min,r=e.max,i=e.radi,e=e.data,a=Object.keys(e),o=a.length;o--;)for(var s=a[o],c=Object.keys(e[s]),l=c.length;l--;){var u=c[l],d=e[s][u],f=i[s][u];t.push({x:s,y:u,value:d,radius:f})}return{min:n,max:r,data:t}};function r(t){var n=t.container,r=this.shadowCanvas=document.createElement(`canvas`),i=this.canvas=t.canvas||document.createElement(`canvas`);this._renderBoundaries=[1e4,1e4,0,0];var a=getComputedStyle(t.container)||{};i.className=`heatmap-canvas`,this._width=i.width=r.width=t.width||+a.width.replace(/px/,``),this._height=i.height=r.height=t.height||+a.height.replace(/px/,``),this.shadowCtx=r.getContext(`2d`),this.ctx=i.getContext(`2d`),i.style.cssText=r.style.cssText=`position:absolute;left:0;top:0;`,n.style.position=`relative`,n.appendChild(i),this._palette=e(t),this._templates={},this._setStyles(t)}return r.prototype={renderPartial:function(e){e.data.length>0&&(this._drawAlpha(e),this._colorize())},renderAll:function(e){this._clear(),e.data.length>0&&(this._drawAlpha(n(e)),this._colorize())},_updateGradient:function(t){this._palette=e(t)},updateConfig:function(e){e.gradient&&this._updateGradient(e),this._setStyles(e)},setDimensions:function(e,t){this._width=e,this._height=t,this.canvas.width=this.shadowCanvas.width=e,this.canvas.height=this.shadowCanvas.height=t},_clear:function(){this.shadowCtx.clearRect(0,0,this._width,this._height),this.ctx.clearRect(0,0,this._width,this._height)},_setStyles:function(e){this._blur=e.blur==0?0:e.blur||e.defaultBlur,e.backgroundColor&&(this.canvas.style.backgroundColor=e.backgroundColor),this._width=this.canvas.width=this.shadowCanvas.width=e.width||this._width,this._height=this.canvas.height=this.shadowCanvas.height=e.height||this._height,this._opacity=(e.opacity||0)*255,this._maxOpacity=(e.maxOpacity||e.defaultMaxOpacity)*255,this._minOpacity=(e.minOpacity||e.defaultMinOpacity)*255,this._useGradientOpacity=!!e.useGradientOpacity},_drawAlpha:function(e){for(var n=this._min=e.min,r=this._max=e.max,e=e.data||[],i=e.length,a=1-this._blur;i--;){var o=e[i],s=o.x,c=o.y,l=o.radius,u=Math.min(o.value,r),d=s-l,f=c-l,p=this.shadowCtx,m;this._templates[l]?m=this._templates[l]:this._templates[l]=m=t(l,a);var h=(u-n)/(r-n);p.globalAlpha=h<.01?.01:h,p.drawImage(m,d,f),d<this._renderBoundaries[0]&&(this._renderBoundaries[0]=d),f<this._renderBoundaries[1]&&(this._renderBoundaries[1]=f),d+2*l>this._renderBoundaries[2]&&(this._renderBoundaries[2]=d+2*l),f+2*l>this._renderBoundaries[3]&&(this._renderBoundaries[3]=f+2*l)}},_colorize:function(){var e=this._renderBoundaries[0],t=this._renderBoundaries[1],n=this._renderBoundaries[2]-e,r=this._renderBoundaries[3]-t,i=this._width,a=this._height,o=this._opacity,s=this._maxOpacity,c=this._minOpacity,l=this._useGradientOpacity;e<0&&(e=0),t<0&&(t=0),e+n>i&&(n=i-e),t+r>a&&(r=a-t);for(var u=this.shadowCtx.getImageData(e,t,n,r),d=u.data,f=d.length,p=this._palette,m=3;m<f;m+=4){var h=d[m],g=h*4;if(g){var _=o>0?o:h<s?h<c?c:h:s;d[m-3]=p[g],d[m-2]=p[g+1],d[m-1]=p[g+2],d[m]=l?p[g+3]:_}}this.ctx.putImageData(u,e,t),this._renderBoundaries=[1e3,1e3,0,0]},getValueAt:function(e){var t,n=this.shadowCtx.getImageData(e.x,e.y,1,1).data[3],r=this._max,i=this._min;return t=Math.abs(r-i)*(n/255)>>0,t},getDataURL:function(){return this.canvas.toDataURL()}},r})(),r=(function(){var t=!1;return e.defaultRenderer===`canvas2d`&&(t=n),t})(),i={merge:function(){for(var e={},t=arguments.length,n=0;n<t;n++){var r=arguments[n];for(var i in r)e[i]=r[i]}return e}},a=(function(){var n=(function(){function e(){this.cStore={}}return e.prototype={on:function(e,t,n){var r=this.cStore;r[e]||(r[e]=[]),r[e].push((function(e){return t.call(n,e)}))},emit:function(e,t){var n=this.cStore;if(n[e])for(var r=n[e].length,i=0;i<r;i++){var a=n[e][i];a(t)}}},e})(),a=function(e){var t=e._renderer,n=e._coordinator,r=e._store;n.on(`renderpartial`,t.renderPartial,t),n.on(`renderall`,t.renderAll,t),n.on(`extremachange`,function(t){e._config.onExtremaChange&&e._config.onExtremaChange({min:t.min,max:t.max,gradient:e._config.gradient||e._config.defaultGradient})}),r.setCoordinator(n)};function o(){var o=this._config=i.merge(e,arguments[0]||{});if(this._coordinator=new n,o.plugin){var s=o.plugin;if(e.plugins[s]){var c=e.plugins[s];this._renderer=new c.renderer(o),this._store=new c.store(o)}else throw Error(`Plugin '`+s+`' not found. Maybe it was not registered.`)}else this._renderer=new r(o),this._store=new t(o);a(this)}return o.prototype={addData:function(){return this._store.addData.apply(this._store,arguments),this},removeData:function(){return this._store.removeData&&this._store.removeData.apply(this._store,arguments),this},setData:function(){return this._store.setData.apply(this._store,arguments),this},setDataMax:function(){return this._store.setDataMax.apply(this._store,arguments),this},setDataMin:function(){return this._store.setDataMin.apply(this._store,arguments),this},configure:function(e){return this._config=i.merge(this._config,e),this._renderer.updateConfig(this._config),this._coordinator.emit(`renderall`,this._store._getInternalData()),this},repaint:function(){return this._coordinator.emit(`renderall`,this._store._getInternalData()),this},getData:function(){return this._store.getData()},getDataURL:function(){return this._renderer.getDataURL()},getValueAt:function(e){return this._store.getValueAt?this._store.getValueAt(e):this._renderer.getValueAt?this._renderer.getValueAt(e):null}},o})();return{create:function(e){return new a(e)},register:function(t,n){e.plugins[t]=n}}})}))(),1),Xt={type:`FeatureCollection`,features:[{type:`Feature`,properties:{gid:1,geometry:`Point`,value:1463},geometry:{type:`Point`,coordinates:[118.94546675892052,31.661732022924692]}},{type:`Feature`,properties:{gid:2,geometry:`Point`,value:1109},geometry:{type:`Point`,coordinates:[118.66929229766244,31.72586723997408]}},{type:`Feature`,properties:{gid:3,geometry:`Point`,value:1078},geometry:{type:`Point`,coordinates:[118.97155764119604,32.147346557914716]}},{type:`Feature`,properties:{gid:4,geometry:`Point`,value:1091},geometry:{type:`Point`,coordinates:[118.91121275871431,31.6655243005098]}},{type:`Feature`,properties:{gid:5,geometry:`Point`,value:954},geometry:{type:`Point`,coordinates:[118.65091458236252,31.930724961337884]}},{type:`Feature`,properties:{gid:6,geometry:`Point`,value:1759},geometry:{type:`Point`,coordinates:[118.89073954405704,32.048696983236546]}},{type:`Feature`,properties:{gid:7,geometry:`Point`,value:913},geometry:{type:`Point`,coordinates:[118.65217643542849,31.97771478297051]}},{type:`Feature`,properties:{gid:8,geometry:`Point`,value:1765},geometry:{type:`Point`,coordinates:[119.02903315699083,31.73713521717106]}},{type:`Feature`,properties:{gid:9,geometry:`Point`,value:1589},geometry:{type:`Point`,coordinates:[120.1898383615626,31.381797519894597]}},{type:`Feature`,properties:{gid:10,geometry:`Point`,value:1635},geometry:{type:`Point`,coordinates:[120.0232101935639,31.50748828835691]}},{type:`Feature`,properties:{gid:11,geometry:`Point`,value:988},geometry:{type:`Point`,coordinates:[120.54490905644325,31.63281557756546]}},{type:`Feature`,properties:{gid:12,geometry:`Point`,value:1675},geometry:{type:`Point`,coordinates:[120.46247525068569,31.595016731214635]}},{type:`Feature`,properties:{gid:13,geometry:`Point`,value:1640},geometry:{type:`Point`,coordinates:[120.00682313865492,31.458908837587973]}},{type:`Feature`,properties:{gid:14,geometry:`Point`,value:993},geometry:{type:`Point`,coordinates:[120.35580950167974,31.68928922828036]}},{type:`Feature`,properties:{gid:15,geometry:`Point`,value:1063},geometry:{type:`Point`,coordinates:[120.4145473229974,31.72764727084167]}},{type:`Feature`,properties:{gid:16,geometry:`Point`,value:1678},geometry:{type:`Point`,coordinates:[120.5503854047106,31.77995985338295]}},{type:`Feature`,properties:{gid:17,geometry:`Point`,value:1647},geometry:{type:`Point`,coordinates:[117.36614652217706,34.43157728878807]}},{type:`Feature`,properties:{gid:18,geometry:`Point`,value:1446},geometry:{type:`Point`,coordinates:[117.28542286800923,34.27454559212742]}},{type:`Feature`,properties:{gid:19,geometry:`Point`,value:1046},geometry:{type:`Point`,coordinates:[117.662839219421,34.45838069270054]}},{type:`Feature`,properties:{gid:20,geometry:`Point`,value:1401},geometry:{type:`Point`,coordinates:[117.59795670396689,34.17143164299094]}},{type:`Feature`,properties:{gid:21,geometry:`Point`,value:1349},geometry:{type:`Point`,coordinates:[117.28594674563334,34.28808904738429]}},{type:`Feature`,properties:{gid:22,geometry:`Point`,value:1014},geometry:{type:`Point`,coordinates:[117.6507949756929,34.5475910753063]}},{type:`Feature`,properties:{gid:23,geometry:`Point`,value:1546},geometry:{type:`Point`,coordinates:[117.33189865037488,34.093570136586266]}},{type:`Feature`,properties:{gid:24,geometry:`Point`,value:1544},geometry:{type:`Point`,coordinates:[117.45238035091565,34.11265961891847]}},{type:`Feature`,properties:{gid:25,geometry:`Point`,value:1839},geometry:{type:`Point`,coordinates:[119.4408175808379,31.623116505315675]}},{type:`Feature`,properties:{gid:26,geometry:`Point`,value:1438},geometry:{type:`Point`,coordinates:[119.39198911330944,31.421739978934283]}},{type:`Feature`,properties:{gid:27,geometry:`Point`,value:1717},geometry:{type:`Point`,coordinates:[119.81488866815658,31.583469943284964]}},{type:`Feature`,properties:{gid:28,geometry:`Point`,value:1183},geometry:{type:`Point`,coordinates:[119.54537651059954,31.902049435673927]}},{type:`Feature`,properties:{gid:29,geometry:`Point`,value:996},geometry:{type:`Point`,coordinates:[119.64864740557351,31.39445627081732]}},{type:`Feature`,properties:{gid:30,geometry:`Point`,value:1227},geometry:{type:`Point`,coordinates:[119.89475103676668,31.429138138835025]}},{type:`Feature`,properties:{gid:31,geometry:`Point`,value:1030},geometry:{type:`Point`,coordinates:[119.84643455505407,31.57995658140782]}},{type:`Feature`,properties:{gid:32,geometry:`Point`,value:1858},geometry:{type:`Point`,coordinates:[119.56131611817216,31.67724451988223]}},{type:`Feature`,properties:{gid:33,geometry:`Point`,value:923},geometry:{type:`Point`,coordinates:[120.6811860415694,31.646668891463623]}},{type:`Feature`,properties:{gid:34,geometry:`Point`,value:1999},geometry:{type:`Point`,coordinates:[120.78700438717956,31.167013976070866]}},{type:`Feature`,properties:{gid:35,geometry:`Point`,value:1596},geometry:{type:`Point`,coordinates:[120.83642045971412,31.533280290288168]}},{type:`Feature`,properties:{gid:36,geometry:`Point`,value:1829},geometry:{type:`Point`,coordinates:[120.3888925215171,31.346333540374697]}},{type:`Feature`,properties:{gid:37,geometry:`Point`,value:1439},geometry:{type:`Point`,coordinates:[120.3130777212712,31.50723655433355]}},{type:`Feature`,properties:{gid:38,geometry:`Point`,value:1939},geometry:{type:`Point`,coordinates:[120.99112766920908,31.52956383146915]}},{type:`Feature`,properties:{gid:39,geometry:`Point`,value:1511},geometry:{type:`Point`,coordinates:[120.94964548754136,31.59035539910859]}},{type:`Feature`,properties:{gid:40,geometry:`Point`,value:1307},geometry:{type:`Point`,coordinates:[120.89997454372072,31.38715621390747]}},{type:`Feature`,properties:{gid:41,geometry:`Point`,value:1986},geometry:{type:`Point`,coordinates:[120.80491548798474,32.329340048042084]}},{type:`Feature`,properties:{gid:42,geometry:`Point`,value:1900},geometry:{type:`Point`,coordinates:[121.34087344607698,32.23774296729773]}},{type:`Feature`,properties:{gid:43,geometry:`Point`,value:1529},geometry:{type:`Point`,coordinates:[120.71156171967009,32.42262922510818]}},{type:`Feature`,properties:{gid:44,geometry:`Point`,value:1061},geometry:{type:`Point`,coordinates:[120.86554461723664,32.037222091770445]}},{type:`Feature`,properties:{gid:45,geometry:`Point`,value:1041},geometry:{type:`Point`,coordinates:[120.75788541644752,32.1744886594573]}},{type:`Feature`,properties:{gid:46,geometry:`Point`,value:1157},geometry:{type:`Point`,coordinates:[121.38251714557413,32.200649454936524]}},{type:`Feature`,properties:{gid:47,geometry:`Point`,value:1238},geometry:{type:`Point`,coordinates:[120.78780202514984,32.168492131735285]}},{type:`Feature`,properties:{gid:48,geometry:`Point`,value:1766},geometry:{type:`Point`,coordinates:[120.88346764025805,32.39089650300774]}},{type:`Feature`,properties:{gid:49,geometry:`Point`,value:1311},geometry:{type:`Point`,coordinates:[119.46983803420522,34.77626655608122]}},{type:`Feature`,properties:{gid:50,geometry:`Point`,value:1664},geometry:{type:`Point`,coordinates:[119.2938482809734,34.479510687998555]}},{type:`Feature`,properties:{gid:51,geometry:`Point`,value:1147},geometry:{type:`Point`,coordinates:[119.10145405874016,34.54591747097993]}},{type:`Feature`,properties:{gid:52,geometry:`Point`,value:943},geometry:{type:`Point`,coordinates:[118.9683179295662,34.29192950194275]}},{type:`Feature`,properties:{gid:53,geometry:`Point`,value:1351},geometry:{type:`Point`,coordinates:[119.20660010292006,34.38493925025408]}},{type:`Feature`,properties:{gid:54,geometry:`Point`,value:1020},geometry:{type:`Point`,coordinates:[118.79981758728955,34.65246593006713]}},{type:`Feature`,properties:{gid:55,geometry:`Point`,value:1576},geometry:{type:`Point`,coordinates:[118.9550432486678,34.763110207283425]}},{type:`Feature`,properties:{gid:56,geometry:`Point`,value:1894},geometry:{type:`Point`,coordinates:[118.84438414492206,34.389357595246636]}},{type:`Feature`,properties:{gid:57,geometry:`Point`,value:1868},geometry:{type:`Point`,coordinates:[118.77099976515932,33.14642063528601]}},{type:`Feature`,properties:{gid:58,geometry:`Point`,value:1733},geometry:{type:`Point`,coordinates:[118.791132069677,33.33719084804897]}},{type:`Feature`,properties:{gid:59,geometry:`Point`,value:1782},geometry:{type:`Point`,coordinates:[118.75432094005332,33.12660725596814]}},{type:`Feature`,properties:{gid:60,geometry:`Point`,value:1010},geometry:{type:`Point`,coordinates:[118.86904229661268,33.302543274587855]}},{type:`Feature`,properties:{gid:61,geometry:`Point`,value:1101},geometry:{type:`Point`,coordinates:[119.09238918310533,33.62345851836494]}},{type:`Feature`,properties:{gid:62,geometry:`Point`,value:1123},geometry:{type:`Point`,coordinates:[118.66346287185392,33.48012560952706]}},{type:`Feature`,properties:{gid:63,geometry:`Point`,value:1818},geometry:{type:`Point`,coordinates:[118.7950934337442,33.17884298872685]}},{type:`Feature`,properties:{gid:64,geometry:`Point`,value:1847},geometry:{type:`Point`,coordinates:[118.71916160796634,33.17507930004085]}},{type:`Feature`,properties:{gid:65,geometry:`Point`,value:1807},geometry:{type:`Point`,coordinates:[120.02354451351746,33.75360973559457]}},{type:`Feature`,properties:{gid:66,geometry:`Point`,value:1100},geometry:{type:`Point`,coordinates:[120.41429557131218,33.71592245978229]}},{type:`Feature`,properties:{gid:67,geometry:`Point`,value:930},geometry:{type:`Point`,coordinates:[119.88409183066742,33.79617918231113]}},{type:`Feature`,properties:{gid:68,geometry:`Point`,value:1384},geometry:{type:`Point`,coordinates:[120.52697738009932,33.75534651048456]}},{type:`Feature`,properties:{gid:69,geometry:`Point`,value:1337},geometry:{type:`Point`,coordinates:[119.96509777742274,33.508540030252405]}},{type:`Feature`,properties:{gid:70,geometry:`Point`,value:1237},geometry:{type:`Point`,coordinates:[120.45393527582117,33.74194900468591]}},{type:`Feature`,properties:{gid:71,geometry:`Point`,value:1443},geometry:{type:`Point`,coordinates:[120.11396118328383,33.78835395251665]}},{type:`Feature`,properties:{gid:72,geometry:`Point`,value:1484},geometry:{type:`Point`,coordinates:[120.49724265149152,33.67625343980471]}},{type:`Feature`,properties:{gid:73,geometry:`Point`,value:1896},geometry:{type:`Point`,coordinates:[119.42582424019312,32.99332187888142]}},{type:`Feature`,properties:{gid:74,geometry:`Point`,value:1019},geometry:{type:`Point`,coordinates:[119.23807677769184,32.623380382276956]}},{type:`Feature`,properties:{gid:75,geometry:`Point`,value:1542},geometry:{type:`Point`,coordinates:[119.5351452035714,32.76085331276959]}},{type:`Feature`,properties:{gid:76,geometry:`Point`,value:1929},geometry:{type:`Point`,coordinates:[119.16973469103525,32.78436345289702]}},{type:`Feature`,properties:{gid:77,geometry:`Point`,value:1016},geometry:{type:`Point`,coordinates:[119.77328999158246,32.7546546357515]}},{type:`Feature`,properties:{gid:78,geometry:`Point`,value:1280},geometry:{type:`Point`,coordinates:[119.80226423229212,32.502086420534724]}},{type:`Feature`,properties:{gid:79,geometry:`Point`,value:1381},geometry:{type:`Point`,coordinates:[119.17768393289266,32.49528208349042]}},{type:`Feature`,properties:{gid:80,geometry:`Point`,value:1404},geometry:{type:`Point`,coordinates:[119.4123618859228,32.98451783124829]}},{type:`Feature`,properties:{gid:81,geometry:`Point`,value:1067},geometry:{type:`Point`,coordinates:[119.51342634025504,31.75628333088188]}},{type:`Feature`,properties:{gid:82,geometry:`Point`,value:1970},geometry:{type:`Point`,coordinates:[119.40164044073512,32.06088448200309]}},{type:`Feature`,properties:{gid:83,geometry:`Point`,value:1543},geometry:{type:`Point`,coordinates:[119.32964189218372,31.88005678953804]}},{type:`Feature`,properties:{gid:84,geometry:`Point`,value:1514},geometry:{type:`Point`,coordinates:[119.2752631668311,31.955668074203107]}},{type:`Feature`,properties:{gid:85,geometry:`Point`,value:1048},geometry:{type:`Point`,coordinates:[119.42824020079932,32.25427826575509]}},{type:`Feature`,properties:{gid:86,geometry:`Point`,value:1104},geometry:{type:`Point`,coordinates:[119.11470381981898,32.08187718307614]}},{type:`Feature`,properties:{gid:87,geometry:`Point`,value:1443},geometry:{type:`Point`,coordinates:[119.15946550476974,31.853394414869545]}},{type:`Feature`,properties:{gid:88,geometry:`Point`,value:1040},geometry:{type:`Point`,coordinates:[119.20090259925654,31.92947294758013]}},{type:`Feature`,properties:{gid:89,geometry:`Point`,value:1223},geometry:{type:`Point`,coordinates:[120.32633016973918,32.49836816969378]}},{type:`Feature`,properties:{gid:90,geometry:`Point`,value:1519},geometry:{type:`Point`,coordinates:[120.0175702011054,32.595635058866485]}},{type:`Feature`,properties:{gid:91,geometry:`Point`,value:1983},geometry:{type:`Point`,coordinates:[120.13901543600817,32.84428351563364]}},{type:`Feature`,properties:{gid:92,geometry:`Point`,value:1513},geometry:{type:`Point`,coordinates:[119.71631717500652,32.74901131566466]}},{type:`Feature`,properties:{gid:93,geometry:`Point`,value:1175},geometry:{type:`Point`,coordinates:[120.36307022760523,32.3494414410742]}},{type:`Feature`,properties:{gid:94,geometry:`Point`,value:1218},geometry:{type:`Point`,coordinates:[119.89596714504098,32.789672115923196]}},{type:`Feature`,properties:{gid:95,geometry:`Point`,value:1602},geometry:{type:`Point`,coordinates:[119.90148474862036,32.630137703136924]}},{type:`Feature`,properties:{gid:96,geometry:`Point`,value:1440},geometry:{type:`Point`,coordinates:[119.8533591186292,32.646606256975645]}},{type:`Feature`,properties:{gid:97,geometry:`Point`,value:1004},geometry:{type:`Point`,coordinates:[118.5301383406686,33.645340901159145]}},{type:`Feature`,properties:{gid:98,geometry:`Point`,value:1466},geometry:{type:`Point`,coordinates:[118.24096092739892,33.74191543263569]}},{type:`Feature`,properties:{gid:99,geometry:`Point`,value:1167},geometry:{type:`Point`,coordinates:[118.20721273325934,33.69150466161885]}},{type:`Feature`,properties:{gid:100,geometry:`Point`,value:1804},geometry:{type:`Point`,coordinates:[118.62233136411096,33.65140794696324]}},{type:`Feature`,properties:{gid:101,geometry:`Point`,value:919},geometry:{type:`Point`,coordinates:[118.56252829478848,33.74421767462918]}},{type:`Feature`,properties:{gid:102,geometry:`Point`,value:1205},geometry:{type:`Point`,coordinates:[118.25466371641254,34.03394152586612]}},{type:`Feature`,properties:{gid:103,geometry:`Point`,value:1203},geometry:{type:`Point`,coordinates:[118.55826520244386,33.97208621113617]}},{type:`Feature`,properties:{gid:104,geometry:`Point`,value:1646},geometry:{type:`Point`,coordinates:[118.47720269901654,33.528137160574566]}}]};function Zt(e){let{projection:t,size:n=500,...r}=e,i=(0,F.useRef)(null),a=I(e=>e.heat);return(0,F.useEffect)(()=>{let e=document.createElement(`div`);e.style=`position:absolute;top:-9999px;left:-9999px;`,document.body.appendChild(e);let r=Yt.default.create({container:e,gradient:{.5:`#1fc2e1`,.6:`#24d560`,.7:`#9cd522`,.8:`#f1e12a`,.9:`#ffbf3a`,1:`#ff0000`},blur:1,radius:10,maxOpacity:1,width:n,height:n}),a=Yt.default.create({container:e,gradient:{0:`black`,1:`white`},radius:10,maxOpacity:1,width:n,height:n}),o=Xt.features.map(e=>{let[r=0,i=0]=t(e.geometry.coordinates)??[];return{x:Math.floor(r+n/2),y:Math.floor(i+n/2),value:e.properties.value}}),s=1e3,c=2e3;r.setData({max:s,min:c,data:o}),a.setData({max:s,min:c,data:o});let u=new l(r._renderer.canvas);u.needsUpdate=!0;let d=new l(a._renderer.canvas);return d.needsUpdate=!0,i.current.material.uniforms.heatMap.value=u,i.current.material.uniforms.greyMap.value=d,()=>{a._renderer.canvas.remove(),a._renderer.canvas.remove(),document.body.removeChild(e)}},[]),(0,L.jsx)(`group`,{visible:a,...r,children:(0,L.jsxs)(`mesh`,{ref:i,children:[(0,L.jsx)(`planeGeometry`,{args:[n,n,300,300]}),(0,L.jsx)(`shaderMaterial`,{transparent:!0,side:2,vertexShader:`
            varying vec2 vUv;
            uniform float z_scale;
            uniform sampler2D greyMap;
            void main() {
                vUv = uv;
                vec4 frgColor = texture2D(greyMap, uv);
                float height = z_scale * frgColor.a;
                vec3 transformed = vec3( position.x, position.y, height);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
            }
        `,fragmentShader:`
            #ifdef GL_ES
            precision highp float;
            #endif
            varying vec2 vUv;
            uniform sampler2D heatMap;
            uniform vec3 u_color;//基础颜色
            uniform float u_opacity; // 透明度
            void main() {
                gl_FragColor = vec4(u_color, u_opacity) * texture2D(heatMap, vUv);
            }
        `,uniforms:{heatMap:{value:{value:void 0}},greyMap:{value:{value:void 0}},z_scale:{value:4},u_color:{value:new o(`#ffffff`)},u_opacity:{value:1}}})]})})}var Qt=Promise.all([Y(Ge,e=>{e.wrapS=e.wrapT=y}),Y(Ke,e=>{e.wrapS=e.wrapT=y})]);function $t(e){let{data:t,depth:n=6}=e,r=(0,F.useRef)(null),i=ne(e=>e.camera),[o,s]=(0,F.use)(Qt),c=(0,F.useMemo)(()=>Le().center([119.486506,32.983991]).scale(900).translate([0,0]),[t]),{regions:l,bbox:u}=(0,F.useMemo)(()=>{let e=[],r=new ie,i=e=>{let[t,n]=c(e),i=new p(t,-n);return r.expandByPoint(i),i};return t.features.forEach(t=>{let r=t.geometry.coordinates.reduce((e,t)=>[...e,...t.map(e=>e.map(i))],[]),[a,o]=c(t.properties.centroid??t.properties.center);e.push({city:t.properties.name,cityId:[a,-o,n+.1],points:r})}),{regions:e,bbox:r}},[c,t,n]);return(0,F.useLayoutEffect)(()=>{if(!r.current)return;let e=a.timeline({onComplete:()=>{I.setState({mapPlayComplete:!0})}});return e.to(i.position,{x:60,y:125,z:160,duration:2,ease:`circ.out`}),e.to(r.current.scale,{x:1,y:1,z:1,duration:1,ease:`circ.out`},2),r.current.traverse(t=>{(t instanceof m||t instanceof v)&&e.to(t.material,{opacity:1,duration:1,ease:`circ.out`},2)}),()=>{e.kill()}},[i]),(0,L.jsxs)(`group`,{ref:r,rotation:[-Math.PI/2,0,0],"scale-z":.01,"position-x":20,children:[l.map((e,t)=>(0,L.jsx)(Jt,{depth:n,bbox:u,data:e,map:o,normalMap:s},t)),(0,L.jsx)(Zt,{renderOrder:11,projection:c,"position-z":n+1})]})}var en=Promise.all([Y(`/sc-datav/assets/gaoguang1-DEGqXsnZ.png`,e=>{e.colorSpace=te,e.wrapS=e.wrapT=y,e.repeat.set(1,1)}),Y(`/sc-datav/assets/grid-CwTkbZjd.png`,e=>{e.wrapS=e.wrapT=y,e.repeat.set(80,80)}),Y(`/sc-datav/assets/gridBlack-D2rBj0ur.png`,e=>{e.wrapS=e.wrapT=y,e.repeat.set(80,80)}),Y(`/sc-datav/assets/rotationBorder1-CAivvQWo.png`),Y(`/sc-datav/assets/rotationBorder2-B1TYmmxk.png`)]);function tn(){let e=(0,F.useRef)({uTime:{value:0},uSpeed:{value:10},uWidth:{value:20},uColor:{value:new o(15357964)},uDir:{value:2}}),t=(0,F.useRef)(null),n=(0,F.useRef)(null),r=I(e=>e.rotation),[i,a,s,c,l]=(0,F.use)(en);return _((r,i)=>{e.current.uTime.value+=i*10,e.current.uTime.value>100&&(e.current.uTime.value=0),t.current.rotation.z+=.001,n.current.rotation.z+=-.004}),(0,L.jsxs)(`group`,{visible:r,"rotation-x":-Math.PI/2,"position-y":-.1,children:[(0,L.jsxs)(`mesh`,{children:[(0,L.jsx)(`planeGeometry`,{args:[300,300]}),(0,L.jsx)(`meshBasicMaterial`,{transparent:!0,blending:1,map:i,color:`#fbdf88`})]}),(0,L.jsxs)(`mesh`,{ref:t,"position-z":.1,children:[(0,L.jsx)(`planeGeometry`,{args:[240,240]}),(0,L.jsx)(`meshBasicMaterial`,{transparent:!0,map:c,color:`#fbdf88`,opacity:.2,depthWrite:!1,blending:1})]}),(0,L.jsxs)(`mesh`,{ref:n,"position-z":.1,children:[(0,L.jsx)(`planeGeometry`,{args:[225,225]}),(0,L.jsx)(`meshBasicMaterial`,{transparent:!0,map:l,color:`#fbdf88`,opacity:.4,depthWrite:!1,blending:1})]}),(0,L.jsxs)(`mesh`,{"position-z":.05,children:[(0,L.jsx)(`planeGeometry`,{args:[1e3,1e3]}),(0,L.jsx)(`meshBasicMaterial`,{transparent:!0,map:a,alphaMap:s,color:`#fbdf88`,opacity:.1,depthWrite:!1,blending:1})]}),(0,L.jsxs)(`mesh`,{"position-z":.05,children:[(0,L.jsx)(`planeGeometry`,{args:[1e3,1e3]}),(0,L.jsx)(`meshBasicMaterial`,{transparent:!0,map:a,alphaMap:s,color:`#ea580c`,opacity:.5,depthWrite:!1,blending:1,onBeforeCompile:t=>{t.uniforms={...t.uniforms,...e.current},t.vertexShader=t.vertexShader.replace(`void main() {`,`
                varying vec3 vPosition;
                void main(){
                vPosition = position;
            `),t.fragmentShader=t.fragmentShader.replace(`void main() {`,`
                uniform float uTime;
                uniform float uSpeed;
                uniform float uWidth;
                uniform vec3 uColor;
                uniform float uDir;
                varying vec3 vPosition;
                
                void main(){
            `),t.fragmentShader=t.fragmentShader.replace(`#include <opaque_fragment>`,`
                #ifdef OPAQUE
                diffuseColor.a = 1.0;
                #endif
                
                #ifdef USE_TRANSMISSION
                diffuseColor.a *= material.transmissionAlpha;
                #endif
                
                float r = uTime * uSpeed;
                //光环宽度
                float w = 0.0; 
                if(w>uWidth){
                    w = uWidth;
                }else{
                    w = uTime * 5.0;
                }
                //几何中心点
                vec2 center = vec2(0.0, 0.0); 
                // 距离圆心的距离
                float rDistance = distance(vPosition.xz, center);
                if(uDir==2.0){
                    rDistance = distance(vPosition.xy, center);
                }
                if(rDistance > r && rDistance < r + 2.0 * w) {
                float per = 0.0;
                if(rDistance < r + w) {
                    per = (rDistance - r) / w;
                    outgoingLight = mix(outgoingLight, uColor, per);
                    // 获取0->透明度的插值
                    float alphaV = mix(0.0,diffuseColor.a,per);
                    gl_FragColor = vec4(outgoingLight,  alphaV);
                } else {
                    per = (rDistance - r - w) / w;
                    outgoingLight = mix(uColor, outgoingLight, per);
                    // 获取0->透明度的插值
                    float alphaV = mix(diffuseColor.a,0.0,per);
                    gl_FragColor = vec4(outgoingLight,  alphaV);
                }
                } else {
                    gl_FragColor = vec4(outgoingLight, 0.0);
                }
            `)}})]})]})}var nn=Me,rn=ze;function an(){return(0,L.jsxs)(F.Suspense,{fallback:null,children:[(0,L.jsx)(zt,{}),(0,L.jsx)($t,{data:nn,outlineData:rn}),(0,L.jsx)(tn,{})]})}var on=i.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;function sn(){return(0,L.jsx)(on,{children:(0,L.jsxs)(ee,{flat:!0,shadows:!0,camera:{position:[-50,125,250],fov:50,far:2e3,near:1},dpr:[1,2],children:[(0,L.jsx)(`color`,{attach:`background`,args:[`#fff5e8`]}),(0,L.jsx)(At,{}),(0,L.jsx)(an,{}),(0,L.jsx)(We,{opacity:.5,scale:300,blur:.5,resolution:256,color:`#000000`}),(0,L.jsx)(pe,{enablePan:!0,enableZoom:!0,enableRotate:!0,zoomSpeed:.3,minDistance:100,maxDistance:300,maxPolarAngle:1.5})]})})}var cn=i.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;function ln(){return(0,F.useEffect)(()=>I.getState().reset(),[]),(0,L.jsxs)(cn,{children:[(0,L.jsx)(sn,{}),(0,L.jsx)(kt,{})]})}export{ln as default};