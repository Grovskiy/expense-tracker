import{G as re,r as L,g as z,l as f,ad as R,h as xe,C as oe,k as ne,H as be,F as Oe,I as Me,a6 as j,J as ke,K as he,a0 as Qe,L as W,ae as Ye,_ as Pe,M as Ae,af as we,N as ye,O as pe,U as Xe,Z as Ze,P as Te,Q as le,ag as _e,ah as ea,R as aa,o as F,A as Q,w as ae,c as H,S as D,D as K,Y as ie,V as _,a as Y,T as ce,b as ve,t as te,W as ta,q as la,X as oa,d as na,a1 as ua}from"./entry.e20b5c4d.js";import{d as Ve,q as Le,b as De,a as ia,u as ra}from"./usePopper.8186a50e.js";import{m as Be,u as N,o as I,y as Fe,c as $e,l as X,f as Ee,K as Ne,a as je,H as G,e as Se,t as ee,b as ue,p as He,O as qe,d as w,w as sa,h as da}from"./request.7a6498a6.js";import{o as va,n as pa}from"./disposables.ed35e013.js";const ca={base:"animate-pulse",background:"bg-gray-100 dark:bg-gray-800",rounded:"rounded-md"};function ba(e){throw new Error("Unexpected object: "+e)}var P=(e=>(e[e.First=0]="First",e[e.Previous=1]="Previous",e[e.Next=2]="Next",e[e.Last=3]="Last",e[e.Specific=4]="Specific",e[e.Nothing=5]="Nothing",e))(P||{});function ze(e,u){let v=u.resolveItems();if(v.length<=0)return null;let i=u.resolveActiveIndex(),a=i??-1,t=(()=>{switch(e.focus){case 0:return v.findIndex(r=>!u.resolveDisabled(r));case 1:{let r=v.slice().reverse().findIndex((c,p,n)=>a!==-1&&n.length-p-1>=a?!1:!u.resolveDisabled(c));return r===-1?r:v.length-1-r}case 2:return v.findIndex((r,c)=>c<=a?!1:!u.resolveDisabled(r));case 3:{let r=v.slice().reverse().findIndex(c=>!u.resolveDisabled(c));return r===-1?r:v.length-1-r}case 4:return v.findIndex(r=>u.resolveId(r)===e.id);case 5:return null;default:ba(e)}})();return t===-1?i:t}function fa({container:e,accept:u,walk:v,enabled:i}){re(()=>{let a=e.value;if(!a||i!==void 0&&!i.value)return;let t=Be(e);if(!t)return;let r=Object.assign(p=>u(p),{acceptNode:u}),c=t.createTreeWalker(a,NodeFilter.SHOW_ELEMENT,r,!1);for(;c.nextNode();)v(c.currentNode)})}function Ie(e){return[e.screenX,e.screenY]}function Ue(){let e=L([-1,-1]);return{wasMoved(u){let v=Ie(u);return e.value[0]===v[0]&&e.value[1]===v[1]?!1:(e.value=v,!0)},update(u){e.value=Ie(u)}}}function ma(e,u){return e===u}var ga=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(ga||{}),ya=(e=>(e[e.Single=0]="Single",e[e.Multi=1]="Multi",e))(ya||{}),Oa=(e=>(e[e.Pointer=0]="Pointer",e[e.Other=1]="Other",e))(Oa||{});let Ke=Symbol("ComboboxContext");function se(e){let u=ke(Ke,null);if(u===null){let v=new Error(`<${e} /> is missing a parent <Combobox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(v,se),v}return u}let ha=z({name:"Combobox",emits:{"update:modelValue":e=>!0},props:{as:{type:[Object,String],default:"template"},disabled:{type:[Boolean],default:!1},by:{type:[String,Function],default:()=>ma},modelValue:{type:[Object,String,Number,Boolean],default:void 0},defaultValue:{type:[Object,String,Number,Boolean],default:void 0},form:{type:String,optional:!0},name:{type:String,optional:!0},nullable:{type:Boolean,default:!1},multiple:{type:[Boolean],default:!1}},inheritAttrs:!1,setup(e,{slots:u,attrs:v,emit:i}){let a=L(1),t=L(null),r=L(null),c=L(null),p=L(null),n=L({static:!1,hold:!1}),l=L([]),O=L(null),x=L(1),M=L(!1);function A(y=S=>S){let S=O.value!==null?l.value[O.value]:null,k=qe(y(l.value.slice()),T=>I(T.dataRef.domRef)),h=S?k.indexOf(S):null;return h===-1&&(h=null),{options:k,activeOptionIndex:h}}let B=f(()=>e.multiple?1:0),C=f(()=>e.nullable),[o,g]=Ve(f(()=>e.modelValue),y=>i("update:modelValue",y),f(()=>e.defaultValue)),s=f(()=>o.value===void 0?N(B.value,{1:[],0:void 0}):o.value),m=null,b=null,d={comboboxState:a,value:s,mode:B,compare(y,S){if(typeof e.by=="string"){let k=e.by;return(y==null?void 0:y[k])===(S==null?void 0:S[k])}return e.by(y,S)},defaultValue:f(()=>e.defaultValue),nullable:C,inputRef:r,labelRef:t,buttonRef:c,optionsRef:p,disabled:f(()=>e.disabled),options:l,change(y){g(y)},activeOptionIndex:f(()=>{if(M.value&&O.value===null&&l.value.length>0){let y=l.value.findIndex(S=>!S.dataRef.disabled);y!==-1&&(O.value=y)}return O.value}),activationTrigger:x,optionsPropsRef:n,closeCombobox(){M.value=!1,!e.disabled&&a.value!==1&&(a.value=1,O.value=null)},openCombobox(){if(M.value=!0,e.disabled||a.value===0)return;let y=l.value.findIndex(S=>{let k=R(S.dataRef.value);return N(B.value,{0:()=>d.compare(R(d.value.value),R(k)),1:()=>R(d.value.value).some(h=>d.compare(R(h),R(k)))})});y!==-1&&(O.value=y),a.value=0},goToOption(y,S,k){M.value=!1,m!==null&&cancelAnimationFrame(m),m=requestAnimationFrame(()=>{if(e.disabled||p.value&&!n.value.static&&a.value===1)return;let h=A();if(h.activeOptionIndex===null){let $=h.options.findIndex(Z=>!Z.dataRef.disabled);$!==-1&&(h.activeOptionIndex=$)}let T=ze(y===P.Specific?{focus:P.Specific,id:S}:{focus:y},{resolveItems:()=>h.options,resolveActiveIndex:()=>h.activeOptionIndex,resolveId:$=>$.id,resolveDisabled:$=>$.dataRef.disabled});O.value=T,x.value=k??1,l.value=h.options})},selectOption(y){let S=l.value.find(h=>h.id===y);if(!S)return;let{dataRef:k}=S;g(N(B.value,{0:()=>k.value,1:()=>{let h=R(d.value.value).slice(),T=R(k.value),$=h.findIndex(Z=>d.compare(T,R(Z)));return $===-1?h.push(T):h.splice($,1),h}}))},selectActiveOption(){if(d.activeOptionIndex.value===null)return;let{dataRef:y,id:S}=l.value[d.activeOptionIndex.value];g(N(B.value,{0:()=>y.value,1:()=>{let k=R(d.value.value).slice(),h=R(y.value),T=k.findIndex($=>d.compare(h,R($)));return T===-1?k.push(h):k.splice(T,1),k}})),d.goToOption(P.Specific,S)},registerOption(y,S){b&&cancelAnimationFrame(b);let k={id:y,dataRef:S},h=A(T=>(T.push(k),T));if(O.value===null){let T=S.value.value;N(B.value,{0:()=>d.compare(R(d.value.value),R(T)),1:()=>R(d.value.value).some($=>d.compare(R($),R(T)))})&&(h.activeOptionIndex=h.options.indexOf(k))}l.value=h.options,O.value=h.activeOptionIndex,x.value=1,h.options.some(T=>!I(T.dataRef.domRef))&&(b=requestAnimationFrame(()=>{let T=A();l.value=T.options,O.value=T.activeOptionIndex}))},unregisterOption(y){var S;d.activeOptionIndex.value!==null&&((S=d.options.value[d.activeOptionIndex.value])==null?void 0:S.id)===y&&(M.value=!0);let k=A(h=>{let T=h.findIndex($=>$.id===y);return T!==-1&&h.splice(T,1),h});l.value=k.options,O.value=k.activeOptionIndex,x.value=1}};Fe([r,c,p],()=>d.closeCombobox(),f(()=>a.value===0)),xe(Ke,d),$e(f(()=>N(a.value,{0:X.Open,1:X.Closed})));let V=f(()=>d.activeOptionIndex.value===null?null:l.value[d.activeOptionIndex.value].dataRef.value),E=f(()=>{var y;return(y=I(r))==null?void 0:y.closest("form")});return oe(()=>{ne([E],()=>{if(!E.value||e.defaultValue===void 0)return;function y(){d.change(e.defaultValue)}return E.value.addEventListener("reset",y),()=>{var S;(S=E.value)==null||S.removeEventListener("reset",y)}},{immediate:!0})}),()=>{let{name:y,disabled:S,form:k,...h}=e,T={open:a.value===0,disabled:S,activeIndex:d.activeOptionIndex.value,activeOption:V.value,value:s.value};return be(Oe,[...y!=null&&s.value!=null?Le({[y]:s.value}).map(([$,Z])=>be(Ee,Ne({features:je.Hidden,key:$,as:"input",type:"hidden",hidden:!0,readOnly:!0,form:k,name:$,value:Z}))):[],G({theirProps:{...v,...Se(h,["modelValue","defaultValue","nullable","multiple","onUpdate:modelValue","by"])},ourProps:{},slot:T,slots:u,attrs:v,name:"Combobox"})])}}}),Sa=z({name:"ComboboxButton",props:{as:{type:[Object,String],default:"button"},id:{type:String,default:()=>`headlessui-combobox-button-${ee()}`}},setup(e,{attrs:u,slots:v,expose:i}){let a=se("ComboboxButton");i({el:a.buttonRef,$el:a.buttonRef});function t(p){a.disabled.value||(a.comboboxState.value===0?a.closeCombobox():(p.preventDefault(),a.openCombobox()),j(()=>{var n;return(n=I(a.inputRef))==null?void 0:n.focus({preventScroll:!0})}))}function r(p){switch(p.key){case w.ArrowDown:p.preventDefault(),p.stopPropagation(),a.comboboxState.value===1&&a.openCombobox(),j(()=>{var n;return(n=a.inputRef.value)==null?void 0:n.focus({preventScroll:!0})});return;case w.ArrowUp:p.preventDefault(),p.stopPropagation(),a.comboboxState.value===1&&(a.openCombobox(),j(()=>{a.value.value||a.goToOption(P.Last)})),j(()=>{var n;return(n=a.inputRef.value)==null?void 0:n.focus({preventScroll:!0})});return;case w.Escape:if(a.comboboxState.value!==0)return;p.preventDefault(),a.optionsRef.value&&!a.optionsPropsRef.value.static&&p.stopPropagation(),a.closeCombobox(),j(()=>{var n;return(n=a.inputRef.value)==null?void 0:n.focus({preventScroll:!0})});return}}let c=De(f(()=>({as:e.as,type:u.type})),a.buttonRef);return()=>{var p,n;let l={open:a.comboboxState.value===0,disabled:a.disabled.value,value:a.value.value},{id:O,...x}=e,M={ref:a.buttonRef,id:O,type:c.value,tabindex:"-1","aria-haspopup":"listbox","aria-controls":(p=I(a.optionsRef))==null?void 0:p.id,"aria-expanded":a.comboboxState.value===0,"aria-labelledby":a.labelRef.value?[(n=I(a.labelRef))==null?void 0:n.id,O].join(" "):void 0,disabled:a.disabled.value===!0?!0:void 0,onKeydown:r,onClick:t};return G({ourProps:M,theirProps:x,slot:l,attrs:u,slots:v,name:"ComboboxButton"})}}}),Ia=z({name:"ComboboxInput",props:{as:{type:[Object,String],default:"input"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},displayValue:{type:Function},defaultValue:{type:String,default:void 0},id:{type:String,default:()=>`headlessui-combobox-input-${ee()}`}},emits:{change:e=>!0},setup(e,{emit:u,attrs:v,slots:i,expose:a}){let t=se("ComboboxInput"),r=f(()=>Be(I(t.inputRef))),c={value:!1};a({el:t.inputRef,$el:t.inputRef});function p(){t.change(null);let o=I(t.optionsRef);o&&(o.scrollTop=0),t.goToOption(P.Nothing)}let n=f(()=>{var o;let g=t.value.value;return I(t.inputRef)?typeof e.displayValue<"u"&&g!==void 0?(o=e.displayValue(g))!=null?o:"":typeof g=="string"?g:"":""});oe(()=>{ne([n,t.comboboxState,r],([o,g],[s,m])=>{if(c.value)return;let b=I(t.inputRef);b&&((m===0&&g===1||o!==s)&&(b.value=o),requestAnimationFrame(()=>{var d;if(c.value||!b||((d=r.value)==null?void 0:d.activeElement)!==b)return;let{selectionStart:V,selectionEnd:E}=b;Math.abs((E??0)-(V??0))===0&&V===0&&b.setSelectionRange(b.value.length,b.value.length)}))},{immediate:!0}),ne([t.comboboxState],([o],[g])=>{if(o===0&&g===1){if(c.value)return;let s=I(t.inputRef);if(!s)return;let m=s.value,{selectionStart:b,selectionEnd:d,selectionDirection:V}=s;s.value="",s.value=m,V!==null?s.setSelectionRange(b,d,V):s.setSelectionRange(b,d)}})});let l=L(!1);function O(){l.value=!0}function x(){va().nextFrame(()=>{l.value=!1})}function M(o){switch(c.value=!0,o.key){case w.Enter:if(c.value=!1,t.comboboxState.value!==0||l.value)return;if(o.preventDefault(),o.stopPropagation(),t.activeOptionIndex.value===null){t.closeCombobox();return}t.selectActiveOption(),t.mode.value===0&&t.closeCombobox();break;case w.ArrowDown:return c.value=!1,o.preventDefault(),o.stopPropagation(),N(t.comboboxState.value,{0:()=>t.goToOption(P.Next),1:()=>t.openCombobox()});case w.ArrowUp:return c.value=!1,o.preventDefault(),o.stopPropagation(),N(t.comboboxState.value,{0:()=>t.goToOption(P.Previous),1:()=>{t.openCombobox(),j(()=>{t.value.value||t.goToOption(P.Last)})}});case w.Home:if(o.shiftKey)break;return c.value=!1,o.preventDefault(),o.stopPropagation(),t.goToOption(P.First);case w.PageUp:return c.value=!1,o.preventDefault(),o.stopPropagation(),t.goToOption(P.First);case w.End:if(o.shiftKey)break;return c.value=!1,o.preventDefault(),o.stopPropagation(),t.goToOption(P.Last);case w.PageDown:return c.value=!1,o.preventDefault(),o.stopPropagation(),t.goToOption(P.Last);case w.Escape:if(c.value=!1,t.comboboxState.value!==0)return;o.preventDefault(),t.optionsRef.value&&!t.optionsPropsRef.value.static&&o.stopPropagation(),t.nullable.value&&t.mode.value===0&&t.value.value===null&&p(),t.closeCombobox();break;case w.Tab:if(c.value=!1,t.comboboxState.value!==0)return;t.mode.value===0&&t.selectActiveOption(),t.closeCombobox();break}}function A(o){u("change",o),t.nullable.value&&t.mode.value===0&&o.target.value===""&&p(),t.openCombobox()}function B(){c.value=!1}let C=f(()=>{var o,g,s,m;return(m=(s=(g=e.defaultValue)!=null?g:t.defaultValue.value!==void 0?(o=e.displayValue)==null?void 0:o.call(e,t.defaultValue.value):null)!=null?s:t.defaultValue.value)!=null?m:""});return()=>{var o,g,s,m,b,d;let V={open:t.comboboxState.value===0},{id:E,displayValue:y,onChange:S,...k}=e,h={"aria-controls":(o=t.optionsRef.value)==null?void 0:o.id,"aria-expanded":t.comboboxState.value===0,"aria-activedescendant":t.activeOptionIndex.value===null||(g=t.options.value[t.activeOptionIndex.value])==null?void 0:g.id,"aria-labelledby":(b=(s=I(t.labelRef))==null?void 0:s.id)!=null?b:(m=I(t.buttonRef))==null?void 0:m.id,"aria-autocomplete":"list",id:E,onCompositionstart:O,onCompositionend:x,onKeydown:M,onInput:A,onBlur:B,role:"combobox",type:(d=v.type)!=null?d:"text",tabIndex:0,ref:t.inputRef,defaultValue:C.value,disabled:t.disabled.value===!0?!0:void 0};return G({ourProps:h,theirProps:k,slot:V,attrs:v,slots:i,features:ue.RenderStrategy|ue.Static,name:"ComboboxInput"})}}}),Ca=z({name:"ComboboxOptions",props:{as:{type:[Object,String],default:"ul"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},hold:{type:[Boolean],default:!1}},setup(e,{attrs:u,slots:v,expose:i}){let a=se("ComboboxOptions"),t=`headlessui-combobox-options-${ee()}`;i({el:a.optionsRef,$el:a.optionsRef}),re(()=>{a.optionsPropsRef.value.static=e.static}),re(()=>{a.optionsPropsRef.value.hold=e.hold});let r=He(),c=f(()=>r!==null?(r.value&X.Open)===X.Open:a.comboboxState.value===0);return fa({container:f(()=>I(a.optionsRef)),enabled:f(()=>a.comboboxState.value===0),accept(p){return p.getAttribute("role")==="option"?NodeFilter.FILTER_REJECT:p.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT},walk(p){p.setAttribute("role","none")}}),()=>{var p,n,l;let O={open:a.comboboxState.value===0},x={"aria-labelledby":(l=(p=I(a.labelRef))==null?void 0:p.id)!=null?l:(n=I(a.buttonRef))==null?void 0:n.id,id:t,ref:a.optionsRef,role:"listbox","aria-multiselectable":a.mode.value===1?!0:void 0},M=Se(e,["hold"]);return G({ourProps:x,theirProps:M,slot:O,attrs:u,slots:v,features:ue.RenderStrategy|ue.Static,visible:c.value,name:"ComboboxOptions"})}}}),Ra=z({name:"ComboboxOption",props:{as:{type:[Object,String],default:"li"},value:{type:[Object,String,Number,Boolean]},disabled:{type:Boolean,default:!1}},setup(e,{slots:u,attrs:v,expose:i}){let a=se("ComboboxOption"),t=`headlessui-combobox-option-${ee()}`,r=L(null);i({el:r,$el:r});let c=f(()=>a.activeOptionIndex.value!==null?a.options.value[a.activeOptionIndex.value].id===t:!1),p=f(()=>N(a.mode.value,{0:()=>a.compare(R(a.value.value),R(e.value)),1:()=>R(a.value.value).some(C=>a.compare(R(C),R(e.value)))})),n=f(()=>({disabled:e.disabled,value:e.value,domRef:r}));oe(()=>a.registerOption(t,n)),Me(()=>a.unregisterOption(t)),re(()=>{a.comboboxState.value===0&&c.value&&a.activationTrigger.value!==0&&j(()=>{var C,o;return(o=(C=I(r))==null?void 0:C.scrollIntoView)==null?void 0:o.call(C,{block:"nearest"})})});function l(C){if(e.disabled)return C.preventDefault();a.selectOption(t),a.mode.value===0&&a.closeCombobox(),pa()||requestAnimationFrame(()=>{var o;return(o=I(a.inputRef))==null?void 0:o.focus()})}function O(){if(e.disabled)return a.goToOption(P.Nothing);a.goToOption(P.Specific,t)}let x=Ue();function M(C){x.update(C)}function A(C){x.wasMoved(C)&&(e.disabled||c.value||a.goToOption(P.Specific,t,0))}function B(C){x.wasMoved(C)&&(e.disabled||c.value&&(a.optionsPropsRef.value.hold||a.goToOption(P.Nothing)))}return()=>{let{disabled:C}=e,o={active:c.value,selected:p.value,disabled:C},g={id:t,ref:r,role:"option",tabIndex:C===!0?void 0:-1,"aria-disabled":C===!0?!0:void 0,"aria-selected":p.value,disabled:void 0,onClick:l,onFocus:O,onPointerenter:M,onMouseenter:M,onPointermove:A,onMousemove:A,onPointerleave:B,onMouseleave:B};return G({ourProps:g,theirProps:e,slot:o,attrs:v,slots:u,name:"ComboboxOption"})}}}),Ce=/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;function Re(e){var u,v;let i=(u=e.innerText)!=null?u:"",a=e.cloneNode(!0);if(!(a instanceof HTMLElement))return i;let t=!1;for(let c of a.querySelectorAll('[hidden],[aria-hidden],[role="img"]'))c.remove(),t=!0;let r=t?(v=a.innerText)!=null?v:"":i;return Ce.test(r)&&(r=r.replace(Ce,"")),r}function xa(e){let u=e.getAttribute("aria-label");if(typeof u=="string")return u.trim();let v=e.getAttribute("aria-labelledby");if(v){let i=v.split(" ").map(a=>{let t=document.getElementById(a);if(t){let r=t.getAttribute("aria-label");return typeof r=="string"?r.trim():Re(t).trim()}return null}).filter(Boolean);if(i.length>0)return i.join(", ")}return Re(e).trim()}function Ma(e){let u=L(""),v=L("");return()=>{let i=I(e);if(!i)return"";let a=i.innerText;if(u.value===a)return v.value;let t=xa(i).trim().toLowerCase();return u.value=a,v.value=t,t}}function ka(e,u){return e===u}var Pa=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(Pa||{}),Aa=(e=>(e[e.Single=0]="Single",e[e.Multi=1]="Multi",e))(Aa||{}),wa=(e=>(e[e.Pointer=0]="Pointer",e[e.Other=1]="Other",e))(wa||{});function Ta(e){requestAnimationFrame(()=>requestAnimationFrame(e))}let We=Symbol("ListboxContext");function fe(e){let u=ke(We,null);if(u===null){let v=new Error(`<${e} /> is missing a parent <Listbox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(v,fe),v}return u}let Va=z({name:"Listbox",emits:{"update:modelValue":e=>!0},props:{as:{type:[Object,String],default:"template"},disabled:{type:[Boolean],default:!1},by:{type:[String,Function],default:()=>ka},horizontal:{type:[Boolean],default:!1},modelValue:{type:[Object,String,Number,Boolean],default:void 0},defaultValue:{type:[Object,String,Number,Boolean],default:void 0},form:{type:String,optional:!0},name:{type:String,optional:!0},multiple:{type:[Boolean],default:!1}},inheritAttrs:!1,setup(e,{slots:u,attrs:v,emit:i}){let a=L(1),t=L(null),r=L(null),c=L(null),p=L([]),n=L(""),l=L(null),O=L(1);function x(s=m=>m){let m=l.value!==null?p.value[l.value]:null,b=qe(s(p.value.slice()),V=>I(V.dataRef.domRef)),d=m?b.indexOf(m):null;return d===-1&&(d=null),{options:b,activeOptionIndex:d}}let M=f(()=>e.multiple?1:0),[A,B]=Ve(f(()=>e.modelValue),s=>i("update:modelValue",s),f(()=>e.defaultValue)),C=f(()=>A.value===void 0?N(M.value,{1:[],0:void 0}):A.value),o={listboxState:a,value:C,mode:M,compare(s,m){if(typeof e.by=="string"){let b=e.by;return(s==null?void 0:s[b])===(m==null?void 0:m[b])}return e.by(s,m)},orientation:f(()=>e.horizontal?"horizontal":"vertical"),labelRef:t,buttonRef:r,optionsRef:c,disabled:f(()=>e.disabled),options:p,searchQuery:n,activeOptionIndex:l,activationTrigger:O,closeListbox(){e.disabled||a.value!==1&&(a.value=1,l.value=null)},openListbox(){e.disabled||a.value!==0&&(a.value=0)},goToOption(s,m,b){if(e.disabled||a.value===1)return;let d=x(),V=ze(s===P.Specific?{focus:P.Specific,id:m}:{focus:s},{resolveItems:()=>d.options,resolveActiveIndex:()=>d.activeOptionIndex,resolveId:E=>E.id,resolveDisabled:E=>E.dataRef.disabled});n.value="",l.value=V,O.value=b??1,p.value=d.options},search(s){if(e.disabled||a.value===1)return;let m=n.value!==""?0:1;n.value+=s.toLowerCase();let b=(l.value!==null?p.value.slice(l.value+m).concat(p.value.slice(0,l.value+m)):p.value).find(V=>V.dataRef.textValue.startsWith(n.value)&&!V.dataRef.disabled),d=b?p.value.indexOf(b):-1;d===-1||d===l.value||(l.value=d,O.value=1)},clearSearch(){e.disabled||a.value!==1&&n.value!==""&&(n.value="")},registerOption(s,m){let b=x(d=>[...d,{id:s,dataRef:m}]);p.value=b.options,l.value=b.activeOptionIndex},unregisterOption(s){let m=x(b=>{let d=b.findIndex(V=>V.id===s);return d!==-1&&b.splice(d,1),b});p.value=m.options,l.value=m.activeOptionIndex,O.value=1},theirOnChange(s){e.disabled||B(s)},select(s){e.disabled||B(N(M.value,{0:()=>s,1:()=>{let m=R(o.value.value).slice(),b=R(s),d=m.findIndex(V=>o.compare(b,R(V)));return d===-1?m.push(b):m.splice(d,1),m}}))}};Fe([r,c],(s,m)=>{var b;o.closeListbox(),sa(m,da.Loose)||(s.preventDefault(),(b=I(r))==null||b.focus())},f(()=>a.value===0)),xe(We,o),$e(f(()=>N(a.value,{0:X.Open,1:X.Closed})));let g=f(()=>{var s;return(s=I(r))==null?void 0:s.closest("form")});return oe(()=>{ne([g],()=>{if(!g.value||e.defaultValue===void 0)return;function s(){o.theirOnChange(e.defaultValue)}return g.value.addEventListener("reset",s),()=>{var m;(m=g.value)==null||m.removeEventListener("reset",s)}},{immediate:!0})}),()=>{let{name:s,modelValue:m,disabled:b,form:d,...V}=e,E={open:a.value===0,disabled:b,value:C.value};return be(Oe,[...s!=null&&C.value!=null?Le({[s]:C.value}).map(([y,S])=>be(Ee,Ne({features:je.Hidden,key:y,as:"input",type:"hidden",hidden:!0,readOnly:!0,form:d,name:y,value:S}))):[],G({ourProps:{},theirProps:{...v,...Se(V,["defaultValue","onUpdate:modelValue","horizontal","multiple","by"])},slot:E,slots:u,attrs:v,name:"Listbox"})])}}}),La=z({name:"ListboxButton",props:{as:{type:[Object,String],default:"button"},id:{type:String,default:()=>`headlessui-listbox-button-${ee()}`}},setup(e,{attrs:u,slots:v,expose:i}){let a=fe("ListboxButton");i({el:a.buttonRef,$el:a.buttonRef});function t(n){switch(n.key){case w.Space:case w.Enter:case w.ArrowDown:n.preventDefault(),a.openListbox(),j(()=>{var l;(l=I(a.optionsRef))==null||l.focus({preventScroll:!0}),a.value.value||a.goToOption(P.First)});break;case w.ArrowUp:n.preventDefault(),a.openListbox(),j(()=>{var l;(l=I(a.optionsRef))==null||l.focus({preventScroll:!0}),a.value.value||a.goToOption(P.Last)});break}}function r(n){switch(n.key){case w.Space:n.preventDefault();break}}function c(n){a.disabled.value||(a.listboxState.value===0?(a.closeListbox(),j(()=>{var l;return(l=I(a.buttonRef))==null?void 0:l.focus({preventScroll:!0})})):(n.preventDefault(),a.openListbox(),Ta(()=>{var l;return(l=I(a.optionsRef))==null?void 0:l.focus({preventScroll:!0})})))}let p=De(f(()=>({as:e.as,type:u.type})),a.buttonRef);return()=>{var n,l;let O={open:a.listboxState.value===0,disabled:a.disabled.value,value:a.value.value},{id:x,...M}=e,A={ref:a.buttonRef,id:x,type:p.value,"aria-haspopup":"listbox","aria-controls":(n=I(a.optionsRef))==null?void 0:n.id,"aria-expanded":a.listboxState.value===0,"aria-labelledby":a.labelRef.value?[(l=I(a.labelRef))==null?void 0:l.id,x].join(" "):void 0,disabled:a.disabled.value===!0?!0:void 0,onKeydown:t,onKeyup:r,onClick:c};return G({ourProps:A,theirProps:M,slot:O,attrs:u,slots:v,name:"ListboxButton"})}}}),Da=z({name:"ListboxOptions",props:{as:{type:[Object,String],default:"ul"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},id:{type:String,default:()=>`headlessui-listbox-options-${ee()}`}},setup(e,{attrs:u,slots:v,expose:i}){let a=fe("ListboxOptions"),t=L(null);i({el:a.optionsRef,$el:a.optionsRef});function r(n){switch(t.value&&clearTimeout(t.value),n.key){case w.Space:if(a.searchQuery.value!=="")return n.preventDefault(),n.stopPropagation(),a.search(n.key);case w.Enter:if(n.preventDefault(),n.stopPropagation(),a.activeOptionIndex.value!==null){let l=a.options.value[a.activeOptionIndex.value];a.select(l.dataRef.value)}a.mode.value===0&&(a.closeListbox(),j(()=>{var l;return(l=I(a.buttonRef))==null?void 0:l.focus({preventScroll:!0})}));break;case N(a.orientation.value,{vertical:w.ArrowDown,horizontal:w.ArrowRight}):return n.preventDefault(),n.stopPropagation(),a.goToOption(P.Next);case N(a.orientation.value,{vertical:w.ArrowUp,horizontal:w.ArrowLeft}):return n.preventDefault(),n.stopPropagation(),a.goToOption(P.Previous);case w.Home:case w.PageUp:return n.preventDefault(),n.stopPropagation(),a.goToOption(P.First);case w.End:case w.PageDown:return n.preventDefault(),n.stopPropagation(),a.goToOption(P.Last);case w.Escape:n.preventDefault(),n.stopPropagation(),a.closeListbox(),j(()=>{var l;return(l=I(a.buttonRef))==null?void 0:l.focus({preventScroll:!0})});break;case w.Tab:n.preventDefault(),n.stopPropagation();break;default:n.key.length===1&&(a.search(n.key),t.value=setTimeout(()=>a.clearSearch(),350));break}}let c=He(),p=f(()=>c!==null?(c.value&X.Open)===X.Open:a.listboxState.value===0);return()=>{var n,l,O,x;let M={open:a.listboxState.value===0},{id:A,...B}=e,C={"aria-activedescendant":a.activeOptionIndex.value===null||(n=a.options.value[a.activeOptionIndex.value])==null?void 0:n.id,"aria-multiselectable":a.mode.value===1?!0:void 0,"aria-labelledby":(x=(l=I(a.labelRef))==null?void 0:l.id)!=null?x:(O=I(a.buttonRef))==null?void 0:O.id,"aria-orientation":a.orientation.value,id:A,onKeydown:r,role:"listbox",tabIndex:0,ref:a.optionsRef};return G({ourProps:C,theirProps:B,slot:M,attrs:u,slots:v,features:ue.RenderStrategy|ue.Static,visible:p.value,name:"ListboxOptions"})}}}),Ba=z({name:"ListboxOption",props:{as:{type:[Object,String],default:"li"},value:{type:[Object,String,Number,Boolean]},disabled:{type:Boolean,default:!1},id:{type:String,default:()=>`headlessui-listbox.option-${ee()}`}},setup(e,{slots:u,attrs:v,expose:i}){let a=fe("ListboxOption"),t=L(null);i({el:t,$el:t});let r=f(()=>a.activeOptionIndex.value!==null?a.options.value[a.activeOptionIndex.value].id===e.id:!1),c=f(()=>N(a.mode.value,{0:()=>a.compare(R(a.value.value),R(e.value)),1:()=>R(a.value.value).some(o=>a.compare(R(o),R(e.value)))})),p=f(()=>N(a.mode.value,{1:()=>{var o;let g=R(a.value.value);return((o=a.options.value.find(s=>g.some(m=>a.compare(R(m),R(s.dataRef.value)))))==null?void 0:o.id)===e.id},0:()=>c.value})),n=Ma(t),l=f(()=>({disabled:e.disabled,value:e.value,get textValue(){return n()},domRef:t}));oe(()=>a.registerOption(e.id,l)),Me(()=>a.unregisterOption(e.id)),oe(()=>{ne([a.listboxState,c],()=>{a.listboxState.value===0&&c.value&&N(a.mode.value,{1:()=>{p.value&&a.goToOption(P.Specific,e.id)},0:()=>{a.goToOption(P.Specific,e.id)}})},{immediate:!0})}),re(()=>{a.listboxState.value===0&&r.value&&a.activationTrigger.value!==0&&j(()=>{var o,g;return(g=(o=I(t))==null?void 0:o.scrollIntoView)==null?void 0:g.call(o,{block:"nearest"})})});function O(o){if(e.disabled)return o.preventDefault();a.select(e.value),a.mode.value===0&&(a.closeListbox(),j(()=>{var g;return(g=I(a.buttonRef))==null?void 0:g.focus({preventScroll:!0})}))}function x(){if(e.disabled)return a.goToOption(P.Nothing);a.goToOption(P.Specific,e.id)}let M=Ue();function A(o){M.update(o)}function B(o){M.wasMoved(o)&&(e.disabled||r.value||a.goToOption(P.Specific,e.id,0))}function C(o){M.wasMoved(o)&&(e.disabled||r.value&&a.goToOption(P.Nothing))}return()=>{let{disabled:o}=e,g={active:r.value,selected:c.value,disabled:o},{id:s,value:m,disabled:b,...d}=e,V={id:s,ref:t,role:"option",tabIndex:o===!0?void 0:-1,"aria-disabled":o===!0?!0:void 0,"aria-selected":c.value,disabled:void 0,onClick:O,onFocus:x,onPointerenter:A,onMouseenter:A,onPointermove:B,onMousemove:B,onPointerleave:C,onMouseleave:C};return G({ourProps:V,theirProps:d,slot:g,attrs:v,slots:u,name:"ListboxOption"})}}});const U=he(W.ui.strategy,W.ui.select,Qe),ge=he(W.ui.strategy,W.ui.selectMenu,Ye),Fa=z({components:{HCombobox:ha,HComboboxButton:Sa,HComboboxOptions:Ca,HComboboxOption:Ra,HComboboxInput:Ia,HListbox:Va,HListboxButton:La,HListboxOptions:Da,HListboxOption:Ba,UIcon:Ae,UAvatar:we},inheritAttrs:!1,props:{modelValue:{type:[String,Number,Object,Array],default:""},by:{type:String,default:void 0},options:{type:Array,default:()=>[]},id:{type:String,default:null},name:{type:String,default:null},required:{type:Boolean,default:!1},icon:{type:String,default:null},loadingIcon:{type:String,default:()=>U.default.loadingIcon},leadingIcon:{type:String,default:null},trailingIcon:{type:String,default:()=>U.default.trailingIcon},trailing:{type:Boolean,default:!1},leading:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},selectedIcon:{type:String,default:()=>ge.default.selectedIcon},disabled:{type:Boolean,default:!1},multiple:{type:Boolean,default:!1},searchable:{type:[Boolean,Function],default:!1},searchablePlaceholder:{type:String,default:"Search..."},clearSearchOnClose:{type:Boolean,default:()=>ge.default.clearOnClose},debounce:{type:Number,default:200},creatable:{type:Boolean,default:!1},placeholder:{type:String,default:null},padded:{type:Boolean,default:!0},size:{type:String,default:null,validator(e){return Object.keys(U.size).includes(e)}},color:{type:String,default:()=>U.default.color,validator(e){return[...W.ui.colors,...Object.keys(U.color)].includes(e)}},variant:{type:String,default:()=>U.default.variant,validator(e){return[...Object.keys(U.variant),...Object.values(U.color).flatMap(u=>Object.keys(u))].includes(e)}},optionAttribute:{type:String,default:"label"},valueAttribute:{type:String,default:null},searchAttributes:{type:Array,default:null},popper:{type:Object,default:()=>({})},selectClass:{type:String,default:null},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})},uiMenu:{type:Object,default:()=>({})}},emits:["update:modelValue","open","close","change"],setup(e,{emit:u,slots:v}){const{ui:i,attrs:a}=ye("select",pe(e,"ui"),U,pe(e,"class")),{ui:t}=ye("selectMenu",pe(e,"uiMenu"),ge),r=f(()=>Xe({},e.popper,t.value.popper)),[c,p]=ia(r.value),{size:n,rounded:l}=Ze({ui:i,props:e}),{emitFormBlur:O,emitFormChange:x,inputId:M,color:A,size:B,name:C}=ra(e,U),o=f(()=>n.value||B.value),g=L(""),s=L(),m=f(()=>{var J,de;const q=((de=(J=i.value.color)==null?void 0:J[A.value])==null?void 0:de[e.variant])||i.value.variant[e.variant];return Te(le(i.value.base,t.value.select,l.value,i.value.size[o.value],i.value.gap[o.value],e.padded?i.value.padding[o.value]:"p-0",q==null?void 0:q.replaceAll("{color}",A.value),(b.value||v.leading)&&i.value.leading.padding[o.value],(d.value||v.trailing)&&i.value.trailing.padding[o.value]),e.selectClass)}),b=f(()=>e.icon&&e.leading||e.icon&&!e.trailing||e.loading&&!e.trailing||e.leadingIcon),d=f(()=>e.icon&&e.trailing||e.loading&&e.trailing||e.trailingIcon),V=f(()=>e.loading?e.loadingIcon:e.leadingIcon||e.icon),E=f(()=>e.loading&&!b.value?e.loadingIcon:e.trailingIcon||e.icon),y=f(()=>le(i.value.icon.leading.wrapper,i.value.icon.leading.pointer,i.value.icon.leading.padding[o.value])),S=f(()=>le(i.value.icon.base,A.value&&W.ui.colors.includes(A.value)&&i.value.icon.color.replaceAll("{color}",A.value),i.value.icon.size[o.value],e.loading&&i.value.icon.loading)),k=f(()=>le(i.value.icon.trailing.wrapper,i.value.icon.trailing.pointer,i.value.icon.trailing.padding[o.value])),h=f(()=>le(i.value.icon.base,A.value&&W.ui.colors.includes(A.value)&&i.value.icon.color.replaceAll("{color}",A.value),i.value.icon.size[o.value],e.loading&&!b.value&&i.value.icon.loading)),T=typeof e.searchable=="function"?_e(e.searchable,e.debounce):void 0,$=ea(async()=>e.searchable&&T?await T(g.value):g.value===""?e.options:e.options.filter(q=>{var J;return((J=e.searchAttributes)!=null&&J.length?e.searchAttributes:[e.optionAttribute]).some(de=>{if(["string","number"].includes(typeof q))return String(q).search(new RegExp(g.value,"i"))!==-1;const me=ua(q,de);return me!=null&&String(me).search(new RegExp(g.value,"i"))!==-1})})),Z=f(()=>g.value===""?null:{[e.optionAttribute]:g.value});function Ge(){e.clearSearchOnClose&&(g.value="")}ne(p,q=>{q?u("open"):(Ge(),u("close"),O())});function Je(q){var J;g.value&&((J=s.value)!=null&&J.$el)&&(g.value="",s.value.$el.value=""),u("update:modelValue",q),u("change",q),x()}return{ui:i,uiMenu:t,attrs:a,name:C,inputId:M,popper:r,trigger:c,container:p,isLeading:b,isTrailing:d,selectClass:m,leadingIconName:V,leadingIconClass:S,leadingWrapperIconClass:y,trailingIconName:E,trailingIconClass:h,trailingWrapperIconClass:k,filteredOptions:$,queryOption:Z,query:g,onUpdate:Je}}}),$a=["value","required"],Ea=["id","disabled"],Na={class:"truncate"};function ja(e,u,v,i,a,t){const r=Ae,c=aa("HComboboxInput"),p=we;return F(),Q(ie(e.searchable?"HCombobox":"HListbox"),{by:e.by,name:e.name,"model-value":e.modelValue,multiple:e.multiple,disabled:e.disabled||e.loading,as:"div",class:D(e.ui.wrapper),"onUpdate:modelValue":e.onUpdate},{default:ae(({open:n})=>[e.required?(F(),H("input",{key:0,value:e.modelValue,required:e.required,class:D(e.uiMenu.required),tabindex:"-1","aria-hidden":"true"},null,10,$a)):K("",!0),(F(),Q(ie(e.searchable?"HComboboxButton":"HListboxButton"),{ref:"trigger",as:"div",role:"button",class:D(e.uiMenu.trigger)},{default:ae(()=>[_(e.$slots,"default",{open:n,disabled:e.disabled,loading:e.loading},()=>[Y("button",ce({id:e.inputId,class:e.selectClass,disabled:e.disabled||e.loading,type:"button"},e.attrs),[e.isLeading&&e.leadingIconName||e.$slots.leading?(F(),H("span",{key:0,class:D(e.leadingWrapperIconClass)},[_(e.$slots,"leading",{disabled:e.disabled,loading:e.loading},()=>[ve(r,{name:e.leadingIconName,class:D(e.leadingIconClass)},null,8,["name","class"])])],2)):K("",!0),_(e.$slots,"label",{},()=>[e.multiple&&Array.isArray(e.modelValue)&&e.modelValue.length?(F(),H("span",{key:0,class:D(e.uiMenu.label)},te(e.modelValue.length)+" selected",3)):!e.multiple&&e.modelValue?(F(),H("span",{key:1,class:D(e.uiMenu.label)},te(["string","number"].includes(typeof e.modelValue)?e.modelValue:e.modelValue[e.optionAttribute]),3)):(F(),H("span",{key:2,class:D(e.uiMenu.label)},te(e.placeholder||" "),3))]),e.isTrailing&&e.trailingIconName||e.$slots.trailing?(F(),H("span",{key:1,class:D(e.trailingWrapperIconClass)},[_(e.$slots,"trailing",{disabled:e.disabled,loading:e.loading},()=>[ve(r,{name:e.trailingIconName,class:D(e.trailingIconClass),"aria-hidden":"true"},null,8,["name","class"])])],2)):K("",!0)],16,Ea)])]),_:2},1032,["class"])),n?(F(),H("div",{key:1,ref:"container",class:D([e.uiMenu.container,e.uiMenu.width])},[ve(ta,ce({appear:""},e.uiMenu.transition),{default:ae(()=>[Y("div",null,[e.popper.arrow?(F(),H("div",{key:0,"data-popper-arrow":"",class:D(Object.values(e.uiMenu.arrow))},null,2)):K("",!0),(F(),Q(ie(e.searchable?"HComboboxOptions":"HListboxOptions"),{static:"",class:D([e.uiMenu.base,e.uiMenu.ring,e.uiMenu.rounded,e.uiMenu.shadow,e.uiMenu.background,e.uiMenu.padding,e.uiMenu.height])},{default:ae(()=>[e.searchable?(F(),Q(c,{key:0,ref:"searchInput","display-value":()=>e.query,name:"q",placeholder:e.searchablePlaceholder,autofocus:"",autocomplete:"off",class:D(e.uiMenu.input),onChange:u[0]||(u[0]=l=>e.query=l.target.value)},null,8,["display-value","placeholder","class"])):K("",!0),(F(!0),H(Oe,null,la(e.filteredOptions,(l,O)=>(F(),Q(ie(e.searchable?"HComboboxOption":"HListboxOption"),{key:O,as:"template",value:e.valueAttribute?l[e.valueAttribute]:l,disabled:l.disabled},{default:ae(({active:x,selected:M,disabled:A})=>[Y("li",{class:D([e.uiMenu.option.base,e.uiMenu.option.rounded,e.uiMenu.option.padding,e.uiMenu.option.size,e.uiMenu.option.color,x?e.uiMenu.option.active:e.uiMenu.option.inactive,M&&e.uiMenu.option.selected,A&&e.uiMenu.option.disabled])},[Y("div",{class:D(e.uiMenu.option.container)},[_(e.$slots,"option",{option:l,active:x,selected:M},()=>[l.icon?(F(),Q(r,{key:0,name:l.icon,class:D([e.uiMenu.option.icon.base,x?e.uiMenu.option.icon.active:e.uiMenu.option.icon.inactive,l.iconClass]),"aria-hidden":"true"},null,8,["name","class"])):l.avatar?(F(),Q(p,ce({key:1},{size:e.uiMenu.option.avatar.size,...l.avatar},{class:e.uiMenu.option.avatar.base,"aria-hidden":"true"}),null,16,["class"])):l.chip?(F(),H("span",{key:2,class:D(e.uiMenu.option.chip.base),style:oa({background:`#${l.chip}`})},null,6)):K("",!0),Y("span",Na,te(["string","number"].includes(typeof l)?l:l[e.optionAttribute]),1)])],2),M?(F(),H("span",{key:0,class:D([e.uiMenu.option.selectedIcon.wrapper,e.uiMenu.option.selectedIcon.padding])},[ve(r,{name:e.selectedIcon,class:D(e.uiMenu.option.selectedIcon.base),"aria-hidden":"true"},null,8,["name","class"])],2)):K("",!0)],2)]),_:2},1032,["value","disabled"]))),128)),e.creatable&&e.queryOption&&!e.filteredOptions.length?(F(),Q(ie(e.searchable?"HComboboxOption":"HListboxOption"),{key:1,value:e.queryOption,as:"template"},{default:ae(({active:l,selected:O})=>[Y("li",{class:D([e.uiMenu.option.base,e.uiMenu.option.rounded,e.uiMenu.option.padding,e.uiMenu.option.size,e.uiMenu.option.color,l?e.uiMenu.option.active:e.uiMenu.option.inactive])},[Y("div",{class:D(e.uiMenu.option.container)},[_(e.$slots,"option-create",{option:e.queryOption,active:l,selected:O},()=>[Y("span",{class:D(e.uiMenu.option.create)},'Create "'+te(e.queryOption[e.optionAttribute])+'"',3)])],2)],2)]),_:3},8,["value"])):e.searchable&&e.query&&!e.filteredOptions.length?(F(),H("p",{key:2,class:D(e.uiMenu.option.empty)},[_(e.$slots,"option-empty",{query:e.query},()=>[na(' No results for "'+te(e.query)+'". ',1)])],2)):K("",!0)]),_:3},8,["class"]))])]),_:3},16)],2)):K("",!0)]),_:3},8,["by","name","model-value","multiple","disabled","class","onUpdate:modelValue"])}const Ja=Pe(Fa,[["render",ja]]),Ha=he(W.ui.strategy,W.ui.skeleton,ca),qa=z({inheritAttrs:!1,props:{class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})}},setup(e){const{ui:u,attrs:v}=ye("skeleton",pe(e,"ui"),Ha),i=f(()=>Te(le(u.value.base,u.value.background,u.value.rounded),e.class));return{ui:u,attrs:v,skeletonClass:i}}});function za(e,u,v,i,a,t){return F(),H("div",ce({class:e.skeletonClass},e.attrs),null,16)}const Qa=Pe(qa,[["render",za]]);export{Ja as _,Qa as a};
