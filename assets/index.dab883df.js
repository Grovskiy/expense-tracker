import{u as U,_ as V,a as N}from"./CurrenciesList.vue.902d2e50.js";import{g as h,s as S,i as w,r as F,j as R,k as T,l as f,o as u,c as l,a as r,b as y,m as s,n as $,d as g,t as a,F as C,q as x,v as j}from"./entry.f29eb4ec.js";import{r as q}from"./request.a9b6d6f5.js";import"./usePopper.01768693.js";import"./hidden.7a747e98.js";import"./Skeleton.d8a4c260.js";function A(){function _(m,d,c){return q("/api/Budget/summary",{method:"get",query:{dateFrom:m,dateTo:d,currencyId:c}})}return{getBudget:_}}const M={class:"flex space-x-2 mt-4 mb-2"},L=r("br",null,null,-1),H=r("br",null,null,-1),K=r("br",null,null,-1),O=r("h2",{class:"mt-4"},"Витрати",-1),P=r("h2",{class:"mt-4"},"Надходження",-1),z=h({__name:"MyBudget",setup(_){const m=U(),{currencies:d}=S(w()),c=F({start:m().add(-30,"day").utc().format(),end:m().utc().format()}),e=R({totalIncomes:0,totalExpenses:0,netIncome:0,expensesByCategory:[],incomesByCategory:[],currencyId:"",currentCurrency:""});T(()=>e.currencyId,(t,o)=>{o===""&&I()});const B=f(()=>e.currentCurrency?i(e.currentCurrency,e.totalIncomes):e.totalIncomes),v=f(()=>e.currentCurrency?i(e.currentCurrency,e.totalExpenses):e.totalExpenses),b=f(()=>e.currentCurrency?i(e.currentCurrency,e.netIncome):e.netIncome);async function I(){const t=await A().getBudget(c.value.start,c.value.end,e.currencyId);e.totalIncomes=t.totalIncomes,e.totalExpenses=t.totalExpenses,e.netIncome=t.netIncome,e.expensesByCategory=t.expensesByCategory,e.incomesByCategory=t.incomesByCategory,e.currentCurrency=d.value.filter(o=>o.id===e.currencyId)[0].code}const k=t=>{e.currencyId=t.id},i=(t,o)=>{const p=new Map([["USD","en-IN"],["EUR","es-ES"],["UAH","uk-UK"]]);return Intl.NumberFormat(p.get(t),{style:"currency",currency:t,maximumSignificantDigits:3}).format(o)};return(t,o)=>{const p=V,E=N,D=j;return u(),l(C,null,[r("div",M,[y(p,{modelValue:s(c),"onUpdate:modelValue":o[0]||(o[0]=n=>$(c)?c.value=n:null)},null,8,["modelValue"]),y(E,{onUpdate:k}),y(D,{onClick:I,label:"Ok"})]),g(" Надходження після оподаткування: "+a(s(b))+" ",1),L,g(" Надходження до оподаткування: "+a(s(B))+" ",1),H,g(" Витрати з урухуванням сплати податку: "+a(s(v))+" ",1),K,O,(u(!0),l(C,null,x(s(e).expensesByCategory,n=>(u(),l("div",{key:n.id},[r("div",null,a(n.name)+": "+a(i(s(e).currentCurrency,n.totalAmount)),1)]))),128)),P,(u(!0),l(C,null,x(s(e).incomesByCategory,n=>(u(),l("div",{key:n.id},[r("div",null,a(n.name)+": "+a(i(s(e).currentCurrency,n.totalAmount)),1)]))),128))],64)}}}),G=r("h1",{class:"font-bold"},"Dashboard",-1),ee=h({__name:"index",setup(_){return(m,d)=>(u(),l("div",null,[G,y(z)]))}});export{ee as default};
