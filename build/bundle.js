var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function r(t){t.forEach(e)}function o(t){return"function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(t){return null==t?"":t}function l(t,e){t.appendChild(e)}function c(t,e,n){t.insertBefore(e,n||null)}function a(t){t.parentNode.removeChild(t)}function u(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function f(t){return document.createElement(t)}function d(t){return document.createTextNode(t)}function _(){return d(" ")}function h(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function p(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function g(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function b(t,e,n){t.classList[n?"add":"remove"](e)}let m;function w(t){m=t}const y=[],v=[],S=[],$=[],k=Promise.resolve();let G=!1;function I(t){S.push(t)}let U=!1;const E=new Set;function x(){if(!U){U=!0;do{for(let t=0;t<y.length;t+=1){const e=y[t];w(e),O(e.$$)}for(w(null),y.length=0;v.length;)v.pop()();for(let t=0;t<S.length;t+=1){const e=S[t];E.has(e)||(E.add(e),e())}S.length=0}while(y.length);for(;$.length;)$.pop()();G=!1,U=!1,E.clear()}}function O(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(I)}}const A=new Set;let C;function D(t,e){t&&t.i&&(A.delete(t),t.i(e))}function K(t,n,s,i){const{fragment:l,on_mount:c,on_destroy:a,after_update:u}=t.$$;l&&l.m(n,s),i||I((()=>{const n=c.map(e).filter(o);a?a.push(...n):r(n),t.$$.on_mount=[]})),u.forEach(I)}function Z(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function P(t,e){-1===t.$$.dirty[0]&&(y.push(t),G||(G=!0,k.then(x)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function R(e,o,s,i,l,c,u,f=[-1]){const d=m;w(e);const _=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:l,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(o.context||(d?d.$$.context:[])),callbacks:n(),dirty:f,skip_bound:!1,root:o.target||d.$$.root};u&&u(_.root);let h=!1;if(_.ctx=s?s(e,o.props||{},((t,n,...r)=>{const o=r.length?r[0]:n;return _.ctx&&l(_.ctx[t],_.ctx[t]=o)&&(!_.skip_bound&&_.bound[t]&&_.bound[t](o),h&&P(e,t)),n})):[],_.update(),h=!0,r(_.before_update),_.fragment=!!i&&i(_.ctx),o.target){if(o.hydrate){const t=function(t){return Array.from(t.childNodes)}(o.target);_.fragment&&_.fragment.l(t),t.forEach(a)}else _.fragment&&_.fragment.c();o.intro&&D(e.$$.fragment),K(e,o.target,o.anchor,o.customElement),x()}w(d)}class M{$destroy(){Z(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const V=new Array(32).fill(void 0);function j(t){return V[t]}V.push(void 0,null,!0,!1);let L=V.length;function W(t){const e=j(t);return function(t){t<36||(V[t]=L,L=t)}(t),e}let H=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});H.decode();let B=null;function N(t,e){return H.decode((null!==B&&B.buffer===C.memory.buffer||(B=new Uint8Array(C.memory.buffer)),B).subarray(t,t+e))}function T(t){L===V.length&&V.push(V.length+1);const e=L;return L=V[e],V[e]=t,e}let q=null;function J(){return null!==q&&q.buffer===C.memory.buffer||(q=new Int32Array(C.memory.buffer)),q}class z{static __wrap(t){const e=Object.create(z.prototype);return e.ptr=t,e}__destroy_into_raw(){const t=this.ptr;return this.ptr=0,t}free(){const t=this.__destroy_into_raw();C.__wbg_exportedresults_free(t)}get is_done(){return 0!==C.__wbg_get_exportedresults_is_done(this.ptr)}set is_done(t){C.__wbg_set_exportedresults_is_done(this.ptr,t)}}async function F(t){void 0===t&&(t=new URL("index_bg.wasm",document.currentScript&&document.currentScript.src||new URL("bundle.js",document.baseURI).href));const e={wbg:{}};e.wbg.__wbindgen_object_drop_ref=function(t){W(t)},e.wbg.__wbg_buffer_397eaa4d72ee94dd=function(t){return T(j(t).buffer)},e.wbg.__wbg_newwithbyteoffsetandlength_4b9b8c4e3f5adbff=function(t,e,n){return T(new Uint8Array(j(t),e>>>0,n>>>0))},e.wbg.__wbg_new_a7ce447f15ff496f=function(t){return T(new Uint8Array(j(t)))},e.wbg.__wbg_set_969ad0a60e51d320=function(t,e,n){j(t).set(j(e),n>>>0)},e.wbg.__wbg_length_1eb8fc608a0d4cdb=function(t){return j(t).length},e.wbg.__wbindgen_throw=function(t,e){throw new Error(N(t,e))},e.wbg.__wbindgen_memory=function(){return T(C.memory)},("string"==typeof t||"function"==typeof Request&&t instanceof Request||"function"==typeof URL&&t instanceof URL)&&(t=fetch(t));const{instance:n,module:r}=await async function(t,e){if("function"==typeof Response&&t instanceof Response){if("function"==typeof WebAssembly.instantiateStreaming)try{return await WebAssembly.instantiateStreaming(t,e)}catch(e){if("application/wasm"==t.headers.get("Content-Type"))throw e;console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",e)}const n=await t.arrayBuffer();return await WebAssembly.instantiate(n,e)}{const n=await WebAssembly.instantiate(t,e);return n instanceof WebAssembly.Instance?{instance:n,module:t}:n}}(await t,e);return C=n.exports,F.__wbindgen_wasm_module=r,C}var Q=Object.freeze({__proto__:null,greet:function(){try{const n=C.__wbindgen_add_to_stack_pointer(-16);C.greet(n);var t=J()[n/4+0],e=J()[n/4+1];return N(t,e)}finally{C.__wbindgen_add_to_stack_pointer(16),C.__wbindgen_free(t,e)}},return_named_struct:function(t){var e=C.return_named_struct(t);return z.__wrap(e)},solve:function(t,e,n){return function(t,e){if(!(t instanceof e))throw new Error(`expected instance of ${e.name}`);t.ptr}(n,z),W(C.solve(T(t),T(e),n.ptr))},ExportedResults:z,default:F});function X(t,e,n){const r=t.slice();return r[17]=e[n],r}function Y(t,e,n){const r=t.slice();return r[20]=e[n],r[17]=n,r}function tt(t){let e,n,o,s,u,m,w,y=(0==t[20]?"":t[20])+"";return{c(){e=f("div"),n=d(y),o=_(),p(e,"class",s=i(t[1]==t[17]||parseInt(t[17]/3)%3==parseInt(t[1]/3)%3&&parseInt(t[17]/27)==parseInt(t[1]/27)||t[17]%9==t[1]%9||parseInt(t[17]/9,10)==parseInt(t[1]/9,10)?"cell cell_hover":"cell")+" svelte-1oshksa"),p(e,"pos",u=t[17]),b(e,"cell_selected",t[2]==t[17])},m(r,s){c(r,e,s),l(e,n),l(e,o),t[11](e),m||(w=[h(e,"click",t[4]),h(e,"mouseover",t[5])],m=!0)},p(t,r){8&r&&y!==(y=(0==t[20]?"":t[20])+"")&&g(n,y),2&r&&s!==(s=i(t[1]==t[17]||parseInt(t[17]/3)%3==parseInt(t[1]/3)%3&&parseInt(t[17]/27)==parseInt(t[1]/27)||t[17]%9==t[1]%9||parseInt(t[17]/9,10)==parseInt(t[1]/9,10)?"cell cell_hover":"cell")+" svelte-1oshksa")&&p(e,"class",s),6&r&&b(e,"cell_selected",t[2]==t[17])},d(n){n&&a(e),t[11](null),m=!1,r(w)}}}function et(t){let e,n,r,o;function s(){return t[12](t[17])}return{c(){e=f("div"),n=d(t[17]),p(e,"class","number border svelte-1oshksa")},m(t,i){c(t,e,i),l(e,n),r||(o=h(e,"click",s),r=!0)},p(e,n){t=e},d(t){t&&a(e),r=!1,o()}}}function nt(e){let n,o,s,i,b,m,w,y,v,S,$,k,G,I,U,E,x,O,A,C=e[3],D=[];for(let t=0;t<C.length;t+=1)D[t]=tt(Y(e,C,t));let K=[1,2,3,4,5,6,7,8,9],Z=[];for(let t=0;t<9;t+=1)Z[t]=et(X(e,K,t));return{c(){n=f("div"),o=f("button"),o.textContent="Generate",s=_(),i=f("button"),i.textContent="Solve",b=_(),m=f("button"),m.textContent="SolveJS",w=_(),y=f("div"),v=f("div");for(let t=0;t<D.length;t+=1)D[t].c();S=_(),$=f("div"),k=f("div");for(let t=0;t<9;t+=1)Z[t].c();G=_(),I=f("div"),I.textContent="Clear",U=_(),E=f("div"),x=d(e[0]),p(o,"class","button svelte-1oshksa"),p(i,"class","button svelte-1oshksa"),p(m,"class","button svelte-1oshksa"),p(n,"class","mainMenu svelte-1oshksa"),p(v,"class","sudoku_board svelte-1oshksa"),p(k,"class","numpad svelte-1oshksa"),p(I,"class","number svelte-1oshksa"),p(E,"class","possibleValues svelte-1oshksa"),p($,"class","pad svelte-1oshksa"),p(y,"class","container svelte-1oshksa")},m(t,r){c(t,n,r),l(n,o),l(n,s),l(n,i),l(n,b),l(n,m),c(t,w,r),c(t,y,r),l(y,v);for(let t=0;t<D.length;t+=1)D[t].m(v,null);l(y,S),l(y,$),l($,k);for(let t=0;t<9;t+=1)Z[t].m(k,null);l($,G),l($,I),l($,U),l($,E),l(E,x),O||(A=[h(o,"click",e[6]),h(i,"click",e[7]),h(m,"click",e[8]),h(I,"click",e[13])],O=!0)},p(t,[e]){if(62&e){let n;for(C=t[3],n=0;n<C.length;n+=1){const r=Y(t,C,n);D[n]?D[n].p(r,e):(D[n]=tt(r),D[n].c(),D[n].m(v,null))}for(;n<D.length;n+=1)D[n].d(1);D.length=C.length}if(512&e){let n;for(K=[1,2,3,4,5,6,7,8,9],n=0;n<9;n+=1){const r=X(t,K,n);Z[n]?Z[n].p(r,e):(Z[n]=et(r),Z[n].c(),Z[n].m(k,null))}for(;n<9;n+=1)Z[n].d(1)}1&e&&g(x,t[0])},i:t,o:t,d(t){t&&a(n),t&&a(w),t&&a(y),u(D,t),u(Z,t),O=!1,r(A)}}}function rt(t,e,n){let{possibleValues:r=[]}=e,{currentElementHovered:o=-1}=e,{currentElementSelected:s=-1}=e,{data:i}=e,l=null;class c{constructor(){this._SUDOKU_SIZE=9,this._data=new Uint8Array(this._SUDOKU_SIZE*this._SUDOKU_SIZE),this._gridCoord=null}Init(){this._gridCoord=this._CreateCoordGrid();for(let t=0;t<this._data.length;t++)this._data[t]=0}GetGrid(){return this._data}IsInBlock(t,e){return this._gridCoord[t]===this._gridCoord[e]}GetPos(t,e){return e*this._SUDOKU_SIZE+t}GetCoord(t){return[t%this._SUDOKU_SIZE,parseInt(t/this._SUDOKU_SIZE)]}GetPossibleValues(t,e){const[n,r]=this.GetCoord(t);let o=[1,2,3,4,5,6,7,8,9];for(let s=n-3;s<n+3;s++)for(let n=r-3;n<r+3;n++){let r=this.GetPos(s,n);if(this.IsInBlock(t,r)){const t=e[r];0!==t&&(o[t-1]=0)}}for(let t=0;t<this._SUDOKU_SIZE;t++){const n=e[this.GetPos(t,r)];0!==n&&(o[n-1]=0)}for(let t=0;t<this._SUDOKU_SIZE;t++){const r=e[this.GetPos(n,t)];0!==r&&(o[r-1]=0)}return o.filter((t=>0!==t))}Reset(){for(let t=0;t<this._data.length;++t)this._data[t]=0}SetGrid(t){this._data=t}_CreateCoordGrid(){let t=new Uint8Array(this._SUDOKU_SIZE*this._SUDOKU_SIZE);for(let e=0;e<t.length;++e)t[e]=parseInt(e/3)%3+3*parseInt(e/27);return t}SolveJS(t,e){return new Promise(((e,n)=>{let r=t,o=[];o.push([t.slice(),0,0]);let s=!1;for(;o.length>0&&!s;){let[t,e,n]=o.pop(),i=0;for(i=e;i<t.length;++i){if(0!==t[i])continue;let e=this.GetPossibleValues(i,t);if(!(e.length>n))break;t[i]=e[n],e.length>1&&o.push([t.slice(),i,++n]),n=0}s=i===t.length,s&&(r=t)}e([s,r])}))}Solve(t,e){return new Promise(((e,n)=>{let r=l.return_named_struct(!1),o=l.solve(t,this._gridCoord,r);console.log(r.isDone),e([!0,o])}))}Generate(){function t(t,e){t=Math.ceil(t),e=Math.floor(e);return Math.floor(Math.random()*(e-t)+t)}console.log("Generate"),this.Reset();const e=(this._SUDOKU_SIZE*this._SUDOKU_SIZE-1)/8;for(let n=0;n<e;n++){const e=t(0,this._SUDOKU_SIZE*this._SUDOKU_SIZE);if(0!==this._data[e])continue;const n=this.GetPossibleValues(e,this._data);n.length>0&&(this._data[e]=n[t(0,n.length)])}}}function a(t){console.log(l.greet()),u.GetGrid()[s]=t,n(3,i=u.GetGrid())}!async function(){l=await(async(t={})=>{let{importHook:e,serverPath:n}=t,r="./build/assets/SudokuHelper-12396908.wasm";return null!=n&&(r=n+/[^\/\\]*$/.exec(r)[0]),null!=e&&(r=e(r)),await F(r),Q})()}();let{sudoku:u=new c}=e;u.Init(),i=u.GetGrid();return t.$$set=t=>{"possibleValues"in t&&n(0,r=t.possibleValues),"currentElementHovered"in t&&n(1,o=t.currentElementHovered),"currentElementSelected"in t&&n(2,s=t.currentElementSelected),"data"in t&&n(3,i=t.data),"sudoku"in t&&n(10,u=t.sudoku)},[r,o,s,i,function(t){n(2,s=t.target.getAttribute("pos"))},function(t){n(1,o=t.target.getAttribute("pos")),n(0,r=u.GetPossibleValues(o,u.GetGrid()))},function(){u.Generate(),n(3,i=u.GetGrid())},async function(){u.Solve(u.GetGrid(),(t=>{console.log(t),n(3,i=t)})).then((([t,e])=>{t?(u.SetGrid(e),n(3,i=u.GetGrid())):console.log("No solution")}))},async function(){u.SolveJS(u.GetGrid(),(t=>{console.log(t),n(3,i=t)})).then((([t,e])=>{t?(u.SetGrid(e),n(3,i=u.GetGrid())):console.log("No solution")}))},a,u,function(t){v[t?"unshift":"push"]((()=>{o=t,n(1,o)}))},t=>{a(t)},()=>{a(0)}]}class ot extends M{constructor(t){super(),R(this,t,rt,nt,s,{possibleValues:0,currentElementHovered:1,currentElementSelected:2,data:3,sudoku:10})}}function st(e){let n,r,o,s,i;return s=new ot({}),{c(){var t;n=f("main"),r=f("h1"),r.textContent="Sudoku!",o=_(),(t=s.$$.fragment)&&t.c(),p(r,"class","svelte-1e6s4d4"),p(n,"class","svelte-1e6s4d4")},m(t,e){c(t,n,e),l(n,r),l(n,o),K(s,n,null),i=!0},p:t,i(t){i||(D(s.$$.fragment,t),i=!0)},o(t){!function(t,e,n,r){if(t&&t.o){if(A.has(t))return;A.add(t),(void 0).c.push((()=>{A.delete(t),r&&(n&&t.d(1),r())})),t.o(e)}}(s.$$.fragment,t),i=!1},d(t){t&&a(n),Z(s)}}}return new class extends M{constructor(t){super(),R(this,t,null,st,s,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
