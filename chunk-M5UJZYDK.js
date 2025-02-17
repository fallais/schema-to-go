import{Ea as w,Fa as F,Ia as x,O as h,Pa as B,Ra as S,Sa as C,Y as b,Z as j,ha as M}from"./chunk-YXQ6IHYH.js";import{f as A}from"./chunk-4IDNTCH7.js";function re(){let r=window,c=document,f="hljs-ln",m="hljs-ln-line",L="hljs-ln-code",D="hljs-ln-numbers",p="hljs-ln-n",g="data-line-number",E=/\r\n|\r|\n/g;r.hljs?(r.hljs.initLineNumbersOnLoad=k,r.hljs.lineNumbersBlock=T,r.hljs.lineNumbersValue=G,V()):r.console.error("highlight.js not detected!");function H(e){let t=e;for(;t;){if(t.className&&t.className.indexOf("hljs-ln-code")!==-1)return!0;t=t.parentNode}return!1}function I(e){let t=e;for(;t.nodeName!=="TABLE";)t=t.parentNode;return t}function R(e){let t=e.toString(),n=e.anchorNode;for(;n.nodeName!=="TD";)n=n.parentNode;let i=e.focusNode;for(;i.nodeName!=="TD";)i=i.parentNode;let s=parseInt(n.dataset.lineNumber),l=parseInt(i.dataset.lineNumber);if(s!=l){let a=n.textContent,u=i.textContent;if(s>l){let o=s;s=l,l=o,o=a,a=u,u=o}for(;t.indexOf(a)!==0;)a=a.slice(1);for(;t.lastIndexOf(u)===-1;)u=u.slice(0,-1);let N=a,Z=I(n);for(let o=s+1;o<l;++o){let $=d('.{0}[{1}="{2}"]',[L,g,o]),ee=Z.querySelector($);N+=`
`+ee.textContent}return N+=`
`+u,N}else return t}document.addEventListener("copy",function(e){let t=window.getSelection();if(H(t.anchorNode)){let n;window.navigator.userAgent.indexOf("Edge")!==-1?n=R(t):n=t.toString(),e.clipboardData.setData("text/plain",n),e.preventDefault()}});function V(){let e=c.createElement("style");e.type="text/css",e.innerHTML=d(".{0}{border-collapse:collapse}.{0} td{padding:0}.{1}:before{content:attr({2})}",[f,p,g]),c.getElementsByTagName("head")[0].appendChild(e)}function k(e){c.readyState==="interactive"||c.readyState==="complete"?O(e):r.addEventListener("DOMContentLoaded",function(){O(e)})}function O(e){try{let t=c.querySelectorAll("code.hljs,code.nohighlight");for(let n in t)t.hasOwnProperty(n)&&(P(t[n])||T(t[n],e))}catch(t){r.console.error("LineNumbers error: ",t)}}function P(e){return e.classList.contains("nohljsln")}function T(e,t){typeof e=="object"&&Q(function(){e.innerHTML=_(e,t)})}function G(e,t){if(typeof e!="string")return;let n=document.createElement("code");return n.innerHTML=e,_(n,t)}function _(e,t){let n=K(e,t);return v(e),q(e.innerHTML,n)}function q(e,t){let n=y(e);if(n[n.length-1].trim()===""&&n.pop(),n.length>1||t.singleLine){let i="";for(let s=0,l=n.length;s<l;s++)i+=d('<tr><td class="{0} {1}" {3}="{5}"><div class="{2}" {3}="{5}"></div></td><td class="{0} {4}" {3}="{5}">{6}</td></tr>',[m,D,p,g,L,s+t.startFrom,n[s].length>0?n[s]:" "]);return d('<table class="{0}">{1}</table>',[f,i])}return e}function K(e,t){return t=t||{},{singleLine:U(t),startFrom:J(e,t)}}function U(e){return e.singleLine?e.singleLine:!1}function J(e,t){let i=1;isFinite(t.startFrom)&&(i=t.startFrom);let s=W(e,"data-ln-start-from");return s!==null&&(i=Y(s,1)),i}function v(e){let t=e.childNodes;for(let n in t)if(t.hasOwnProperty(n)){let i=t[n];z(i.textContent)>0&&(i.childNodes.length>0?v(i):X(i.parentNode))}}function X(e){let t=e.className;if(!/hljs-/.test(t))return;let n=y(e.innerHTML),i="";for(let s=0;s<n.length;s++){let l=n[s].length>0?n[s]:" ";i+=d(`<span class="{0}">{1}</span>
`,[t,l])}e.innerHTML=i.trim()}function y(e){return e.length===0?[]:e.split(E)}function z(e){return(e.trim().match(E)||[]).length}function Q(e){r.setTimeout(e,0)}function d(e,t){return e.replace(/\{(\d+)\}/g,function(n,i){return t[i]!==void 0?t[i]:n})}function W(e,t){return e.hasAttribute(t)?e.getAttribute(t):null}function Y(e,t){if(!e)return t;let n=Number(e);return isFinite(n)?n:t}}var le=(()=>{class r{constructor(){this.options=h(B)?.lineNumbersOptions,this._hljs=h(S),this._highlight=h(C),this._nativeElement=h(j).nativeElement,this.startFrom=b(this.options?.startFrom,{transform:F}),this.singleLine=b(this.options?.singleLine,{transform:w}),x({write:()=>{this._highlight.highlightResult()&&this.addLineNumbers()}})}addLineNumbers(){this.destroyLineNumbersObserver(),requestAnimationFrame(()=>A(this,null,function*(){yield this._hljs.lineNumbersBlock(this._nativeElement,{startFrom:this.startFrom(),singleLine:this.singleLine()}),this._lineNumbersObs=new MutationObserver(()=>{this._nativeElement.firstElementChild?.tagName.toUpperCase()==="TABLE"&&this._nativeElement.classList.add("hljs-line-numbers"),this.destroyLineNumbersObserver()}),this._lineNumbersObs.observe(this._nativeElement,{childList:!0})}))}destroyLineNumbersObserver(){this._lineNumbersObs&&(this._lineNumbersObs.disconnect(),this._lineNumbersObs=null)}static{this.\u0275fac=function(m){return new(m||r)}}static{this.\u0275dir=M({type:r,selectors:[["","highlight","","lineNumbers",""],["","highlightAuto","","lineNumbers",""]],inputs:{startFrom:[1,"startFrom"],singleLine:[1,"singleLine"]}})}}return r})();export{le as HighlightLineNumbers,re as activateLineNumbers};
