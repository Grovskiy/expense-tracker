import{j as S,i as j,H as v,m,o as E,a as x,f as H}from"./hidden.7a747e98.js";import{r as d,G as b,g as p,h,J as f,l as B,C as F,I as y,H as w,ax as L,j as M}from"./entry.f29eb4ec.js";var O=(e=>(e[e.Forwards=0]="Forwards",e[e.Backwards=1]="Backwards",e))(O||{});function N(){let e=d(0);return S("keydown",t=>{t.key==="Tab"&&(e.value=t.shiftKey?1:0)}),e}function U(e,t,n,r){j.isServer||b(s=>{e=e??window,e.addEventListener(t,n,r),s(()=>e.removeEventListener(t,n,r))})}let T=Symbol("ForcePortalRootContext");function R(){return f(T,!1)}let $=p({name:"ForcePortalRoot",props:{as:{type:[Object,String],default:"template"},force:{type:Boolean,default:!1}},setup(e,{slots:t,attrs:n}){return h(T,e.force),()=>{let{force:r,...s}=e;return v({theirProps:s,ourProps:{},slot:{},slots:t,attrs:n,name:"ForcePortalRoot"})}}});function k(e){let t=m(e);if(!t){if(e===null)return null;throw new Error(`[Headless UI]: Cannot find ownerDocument for contextElement: ${e}`)}let n=t.getElementById("headlessui-portal-root");if(n)return n;let r=t.createElement("div");return r.setAttribute("id","headlessui-portal-root"),t.body.appendChild(r)}let A=p({name:"Portal",props:{as:{type:[Object,String],default:"div"}},setup(e,{slots:t,attrs:n}){let r=d(null),s=B(()=>m(r)),a=R(),u=f(C,null),l=d(a===!0||u==null?k(r.value):u.resolveTarget());b(()=>{a||u!=null&&(l.value=u.resolveTarget())});let o=f(c,null);return F(()=>{let i=E(r);i&&o&&y(o.register(i))}),y(()=>{var i,P;let g=(i=s.value)==null?void 0:i.getElementById("headlessui-portal-root");g&&l.value===g&&l.value.children.length<=0&&((P=l.value.parentElement)==null||P.removeChild(l.value))}),()=>{if(l.value===null)return null;let i={ref:r,"data-headlessui-portal":""};return w(L,{to:l.value},v({ourProps:i,theirProps:e,slot:{},attrs:n,slots:t,name:"Portal"}))}}}),c=Symbol("PortalParentContext");function q(){let e=f(c,null),t=d([]);function n(a){return t.value.push(a),e&&e.register(a),()=>r(a)}function r(a){let u=t.value.indexOf(a);u!==-1&&t.value.splice(u,1),e&&e.unregister(a)}let s={register:n,unregister:r,portals:t};return[t,p({name:"PortalWrapper",setup(a,{slots:u}){return h(c,s),()=>{var l;return(l=u.default)==null?void 0:l.call(u)}}})]}let C=Symbol("PortalGroupContext"),D=p({name:"PortalGroup",props:{as:{type:[Object,String],default:"template"},target:{type:Object,default:null}},setup(e,{attrs:t,slots:n}){let r=M({resolveTarget(){return e.target}});return h(C,r),()=>{let{target:s,...a}=e;return v({theirProps:a,ourProps:{},slot:{},attrs:t,slots:n,name:"PortalGroup"})}}});function J({defaultContainers:e=[],portals:t,mainTreeNodeRef:n}={}){let r=d(null),s=m(r);function a(){var u;let l=[];for(let o of e)o!==null&&(o instanceof HTMLElement?l.push(o):"value"in o&&o.value instanceof HTMLElement&&l.push(o.value));if(t!=null&&t.value)for(let o of t.value)l.push(o);for(let o of(u=s==null?void 0:s.querySelectorAll("html > *, body > *"))!=null?u:[])o!==document.body&&o!==document.head&&o instanceof HTMLElement&&o.id!=="headlessui-portal-root"&&(o.contains(E(r))||l.some(i=>o.contains(i))||l.push(o));return l}return{resolveContainers:a,contains(u){return a().some(l=>l.contains(u))},mainTreeNodeRef:r,MainTreeNode(){return n!=null?null:w(H,{features:x.Hidden,ref:r})}}}export{U as E,$ as P,A as U,q as V,D as _,O as d,N as n,J as p};
