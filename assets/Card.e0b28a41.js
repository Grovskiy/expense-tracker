import{K as g,L as i,_ as l,g as p,N as c,O as b,l as f,P as y,Q as m,o as s,A as v,w as k,c as t,V as r,S as o,D as u,a as h,T as $,Y as w}from"./entry.d612ae6f.js";const C={base:"overflow-hidden",background:"bg-white dark:bg-gray-900",divide:"divide-y divide-gray-200 dark:divide-gray-800",ring:"ring-1 ring-gray-200 dark:ring-gray-800",rounded:"rounded-lg",shadow:"shadow",body:{base:"",background:"",padding:"px-4 py-5 sm:p-6"},header:{base:"",background:"",padding:"px-4 py-5 sm:px-6"},footer:{base:"",background:"",padding:"px-4 py-4 sm:px-6"}},S=g(i.ui.strategy,i.ui.card,C),B=p({inheritAttrs:!1,props:{as:{type:String,default:"div"},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})}},setup(a){const{ui:e,attrs:d}=c("card",b(a,"ui"),S),n=f(()=>y(m(e.value.base,e.value.rounded,e.value.divide,e.value.ring,e.value.shadow,e.value.background),a.class));return{ui:e,attrs:d,cardClass:n}}});function A(a,e,d,n,N,O){return s(),v(w(a.$attrs.onSubmit?"form":a.as),$({class:a.cardClass},a.attrs),{default:k(()=>[a.$slots.header?(s(),t("div",{key:0,class:o([a.ui.header.base,a.ui.header.padding,a.ui.header.background])},[r(a.$slots,"header")],2)):u("",!0),h("div",{class:o([a.ui.body.base,a.ui.body.padding,a.ui.body.background])},[r(a.$slots,"default")],2),a.$slots.footer?(s(),t("div",{key:1,class:o([a.ui.footer.base,a.ui.footer.padding,a.ui.footer.background])},[r(a.$slots,"footer")],2)):u("",!0)]),_:3},16,["class"])}const j=l(B,[["render",A]]);export{j as _};