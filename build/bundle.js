var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function r(t){t.forEach(e)}function o(t){return"function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(t){return null==t?"":t}function c(t,e){t.appendChild(e)}function u(t,e,n){t.insertBefore(e,n||null)}function l(t){t.parentNode.removeChild(t)}function a(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function f(t){return document.createElement(t)}function d(t){return document.createTextNode(t)}function _(){return d(" ")}function b(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function g(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function h(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function w(t,e,n){t.classList[n?"add":"remove"](e)}let p;function m(t){p=t}const y=[],v=[],$=[],S=[],k=Promise.resolve();let G=!1;function I(t){$.push(t)}let U=!1;const x=new Set;function E(){if(!U){U=!0;do{for(let t=0;t<y.length;t+=1){const e=y[t];m(e),A(e.$$)}for(m(null),y.length=0;v.length;)v.pop()();for(let t=0;t<$.length;t+=1){const e=$[t];x.has(e)||(x.add(e),e())}$.length=0}while(y.length);for(;S.length;)S.pop()();G=!1,U=!1,x.clear()}}function A(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(I)}}const C=new Set;let O;function R(t,e){t&&t.i&&(C.delete(t),t.i(e))}function D(t,n,s,i){const{fragment:c,on_mount:u,on_destroy:l,after_update:a}=t.$$;c&&c.m(n,s),i||I((()=>{const n=u.map(e).filter(o);l?l.push(...n):r(n),t.$$.on_mount=[]})),a.forEach(I)}function P(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function j(t,e){-1===t.$$.dirty[0]&&(y.push(t),G||(G=!0,k.then(E)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function K(e,o,s,i,c,u,a,f=[-1]){const d=p;m(e);const _=e.$$={fragment:null,ctx:null,props:u,update:t,not_equal:c,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(o.context||(d?d.$$.context:[])),callbacks:n(),dirty:f,skip_bound:!1,root:o.target||d.$$.root};a&&a(_.root);let b=!1;if(_.ctx=s?s(e,o.props||{},((t,n,...r)=>{const o=r.length?r[0]:n;return _.ctx&&c(_.ctx[t],_.ctx[t]=o)&&(!_.skip_bound&&_.bound[t]&&_.bound[t](o),b&&j(e,t)),n})):[],_.update(),b=!0,r(_.before_update),_.fragment=!!i&&i(_.ctx),o.target){if(o.hydrate){const t=function(t){return Array.from(t.childNodes)}(o.target);_.fragment&&_.fragment.l(t),t.forEach(l)}else _.fragment&&_.fragment.c();o.intro&&R(e.$$.fragment),D(e,o.target,o.anchor,o.customElement),E()}m(d)}class V{$destroy(){P(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const Z=new Array(32).fill(void 0);function L(t){return Z[t]}Z.push(void 0,null,!0,!1);let M=Z.length;function T(t){const e=L(t);return function(t){t<36||(Z[t]=M,M=t)}(t),e}function W(t){M===Z.length&&Z.push(Z.length+1);const e=M;return M=Z[e],Z[e]=t,e}let H=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});H.decode();let q=null;function B(){return null!==q&&q.buffer===O.memory.buffer||(q=new Uint8Array(O.memory.buffer)),q}function N(t,e){return H.decode(B().subarray(t,t+e))}function F(t,e){try{return t.apply(this,e)}catch(t){O.__wbindgen_exn_store(W(t))}}function J(t,e){return B().subarray(t/1,t/1+e)}class z{static __wrap(t){const e=Object.create(z.prototype);return e.ptr=t,e}__destroy_into_raw(){const t=this.ptr;return this.ptr=0,t}free(){const t=this.__destroy_into_raw();O.__wbg_exportedresults_free(t)}get is_done(){return 0!==O.__wbg_get_exportedresults_is_done(this.ptr)}set is_done(t){O.__wbg_set_exportedresults_is_done(this.ptr,t)}}async function Q(t){void 0===t&&(t=new URL("index_bg.wasm",document.currentScript&&document.currentScript.src||new URL("bundle.js",document.baseURI).href));const e={wbg:{}};e.wbg.__wbindgen_object_drop_ref=function(t){T(t)},e.wbg.__wbg_randomFillSync_64cc7d048f228ca8=function(){return F((function(t,e,n){L(t).randomFillSync(J(e,n))}),arguments)},e.wbg.__wbg_getRandomValues_98117e9a7e993920=function(){return F((function(t,e){L(t).getRandomValues(L(e))}),arguments)},e.wbg.__wbg_process_2f24d6544ea7b200=function(t){return W(L(t).process)},e.wbg.__wbindgen_is_object=function(t){const e=L(t);return"object"==typeof e&&null!==e},e.wbg.__wbg_versions_6164651e75405d4a=function(t){return W(L(t).versions)},e.wbg.__wbg_node_4b517d861cbcb3bc=function(t){return W(L(t).node)},e.wbg.__wbindgen_is_string=function(t){return"string"==typeof L(t)},e.wbg.__wbg_modulerequire_3440a4bcf44437db=function(){return F((function(t,e){return W(r.require(N(t,e)))}),arguments)},e.wbg.__wbg_crypto_98fc271021c7d2ad=function(t){return W(L(t).crypto)},e.wbg.__wbg_msCrypto_a2cdb043d2bfe57f=function(t){return W(L(t).msCrypto)},e.wbg.__wbg_newnoargs_be86524d73f67598=function(t,e){return W(new Function(N(t,e)))},e.wbg.__wbg_call_888d259a5fefc347=function(){return F((function(t,e){return W(L(t).call(L(e)))}),arguments)},e.wbg.__wbindgen_object_clone_ref=function(t){return W(L(t))},e.wbg.__wbg_self_c6fbdfc2918d5e58=function(){return F((function(){return W(self.self)}),arguments)},e.wbg.__wbg_window_baec038b5ab35c54=function(){return F((function(){return W(window.window)}),arguments)},e.wbg.__wbg_globalThis_3f735a5746d41fbd=function(){return F((function(){return W(globalThis.globalThis)}),arguments)},e.wbg.__wbg_global_1bc0b39582740e95=function(){return F((function(){return W(global.global)}),arguments)},e.wbg.__wbindgen_is_undefined=function(t){return void 0===L(t)},e.wbg.__wbg_buffer_397eaa4d72ee94dd=function(t){return W(L(t).buffer)},e.wbg.__wbg_newwithbyteoffsetandlength_4b9b8c4e3f5adbff=function(t,e,n){return W(new Uint8Array(L(t),e>>>0,n>>>0))},e.wbg.__wbg_new_a7ce447f15ff496f=function(t){return W(new Uint8Array(L(t)))},e.wbg.__wbg_set_969ad0a60e51d320=function(t,e,n){L(t).set(L(e),n>>>0)},e.wbg.__wbg_length_1eb8fc608a0d4cdb=function(t){return L(t).length},e.wbg.__wbg_newwithlength_929232475839a482=function(t){return W(new Uint8Array(t>>>0))},e.wbg.__wbg_subarray_8b658422a224f479=function(t,e,n){return W(L(t).subarray(e>>>0,n>>>0))},e.wbg.__wbindgen_throw=function(t,e){throw new Error(N(t,e))},e.wbg.__wbindgen_memory=function(){return W(O.memory)},("string"==typeof t||"function"==typeof Request&&t instanceof Request||"function"==typeof URL&&t instanceof URL)&&(t=fetch(t));const{instance:n,module:r}=await async function(t,e){if("function"==typeof Response&&t instanceof Response){if("function"==typeof WebAssembly.instantiateStreaming)try{return await WebAssembly.instantiateStreaming(t,e)}catch(e){if("application/wasm"==t.headers.get("Content-Type"))throw e;console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",e)}const n=await t.arrayBuffer();return await WebAssembly.instantiate(n,e)}{const n=await WebAssembly.instantiate(t,e);return n instanceof WebAssembly.Instance?{instance:n,module:t}:n}}(await t,e);return O=n.exports,Q.__wbindgen_wasm_module=r,O}var X=Object.freeze({__proto__:null,return_named_struct:function(t){var e=O.return_named_struct(t);return z.__wrap(e)},generate_wasm:function(t){return T(O.generate_wasm(t))},solve_wasm:function(t,e){return function(t,e){if(!(t instanceof e))throw new Error(`expected instance of ${e.name}`);t.ptr}(e,z),T(O.solve_wasm(W(t),e.ptr))},ExportedResults:z,default:Q});function Y(t,e,n){const r=t.slice();return r[19]=e[n],r}function tt(t,e,n){const r=t.slice();return r[22]=e[n],r[19]=n,r}function et(t){let e,n,o,s,a,p,m,y=(0==t[22]?"":t[22])+"";return{c(){e=f("div"),n=d(y),o=_(),g(e,"class",s=i(t[1]==t[19]||parseInt(t[19]/3)%3==parseInt(t[1]/3)%3&&parseInt(t[19]/27)==parseInt(t[1]/27)||t[19]%9==t[1]%9||parseInt(t[19]/9,10)==parseInt(t[1]/9,10)?"cell cell_hover":"cell")+" svelte-1oshksa"),g(e,"pos",a=t[19]),w(e,"cell_selected",t[2]==t[19])},m(r,s){u(r,e,s),c(e,n),c(e,o),t[13](e),p||(m=[b(e,"click",t[4]),b(e,"mouseover",t[5])],p=!0)},p(t,r){8&r&&y!==(y=(0==t[22]?"":t[22])+"")&&h(n,y),2&r&&s!==(s=i(t[1]==t[19]||parseInt(t[19]/3)%3==parseInt(t[1]/3)%3&&parseInt(t[19]/27)==parseInt(t[1]/27)||t[19]%9==t[1]%9||parseInt(t[19]/9,10)==parseInt(t[1]/9,10)?"cell cell_hover":"cell")+" svelte-1oshksa")&&g(e,"class",s),6&r&&w(e,"cell_selected",t[2]==t[19])},d(n){n&&l(e),t[13](null),p=!1,r(m)}}}function nt(t){let e,n,r,o;function s(){return t[14](t[19])}return{c(){e=f("div"),n=d(t[19]),g(e,"class","number border svelte-1oshksa")},m(t,i){u(t,e,i),c(e,n),r||(o=b(e,"click",s),r=!0)},p(e,n){t=e},d(t){t&&l(e),r=!1,o()}}}function rt(e){let n,o,s,i,w,p,m,y,v,$,S,k,G,I,U,x,E,A,C=e[3],O=[];for(let t=0;t<C.length;t+=1)O[t]=et(tt(e,C,t));let R=[1,2,3,4,5,6,7,8,9],D=[];for(let t=0;t<9;t+=1)D[t]=nt(Y(e,R,t));return{c(){n=f("div"),o=f("button"),o.textContent="Generate",s=_(),i=f("button"),i.textContent="Solve",w=_(),p=_(),m=f("div"),y=f("div");for(let t=0;t<O.length;t+=1)O[t].c();v=_(),$=f("div"),S=f("div");for(let t=0;t<9;t+=1)D[t].c();k=_(),G=f("div"),G.textContent="Clear",I=_(),U=f("div"),x=d(e[0]),g(o,"class","button svelte-1oshksa"),g(i,"class","button svelte-1oshksa"),g(n,"class","mainMenu svelte-1oshksa"),g(y,"class","sudoku_board svelte-1oshksa"),g(S,"class","numpad svelte-1oshksa"),g(G,"class","number svelte-1oshksa"),g(U,"class","possibleValues svelte-1oshksa"),g($,"class","pad svelte-1oshksa"),g(m,"class","container svelte-1oshksa")},m(t,r){u(t,n,r),c(n,o),c(n,s),c(n,i),c(n,w),u(t,p,r),u(t,m,r),c(m,y);for(let t=0;t<O.length;t+=1)O[t].m(y,null);c(m,v),c(m,$),c($,S);for(let t=0;t<9;t+=1)D[t].m(S,null);c($,k),c($,G),c($,I),c($,U),c(U,x),E||(A=[b(window,"keydown",e[10]),b(o,"click",e[6]),b(i,"click",e[7]),b(G,"click",e[15])],E=!0)},p(t,[e]){if(62&e){let n;for(C=t[3],n=0;n<C.length;n+=1){const r=tt(t,C,n);O[n]?O[n].p(r,e):(O[n]=et(r),O[n].c(),O[n].m(y,null))}for(;n<O.length;n+=1)O[n].d(1);O.length=C.length}if(512&e){let n;for(R=[1,2,3,4,5,6,7,8,9],n=0;n<9;n+=1){const r=Y(t,R,n);D[n]?D[n].p(r,e):(D[n]=nt(r),D[n].c(),D[n].m(S,null))}for(;n<9;n+=1)D[n].d(1)}1&e&&h(x,t[0])},i:t,o:t,d(t){t&&l(n),t&&l(p),t&&l(m),a(O,t),a(D,t),E=!1,r(A)}}}function ot(t,e,n){let{possibleValues:r=[]}=e,{currentElementHovered:o=-1}=e,{currentElementSelected:s=-1}=e,{data:i}=e,c=null;class u{constructor(){this._SUDOKU_SIZE=9,this._data=new Uint8Array(this._SUDOKU_SIZE*this._SUDOKU_SIZE),this._gridCoord=null}Init(){this._gridCoord=this._CreateCoordGrid();for(let t=0;t<this._data.length;t++)this._data[t]=0}GetGrid(){return this._data}IsInBlock(t,e){return this._gridCoord[t]===this._gridCoord[e]}GetPos(t,e){return e*this._SUDOKU_SIZE+t}GetCoord(t){return[t%this._SUDOKU_SIZE,parseInt(t/this._SUDOKU_SIZE)]}GetPossibleValues(t,e){const[n,r]=this.GetCoord(t);let o=[1,2,3,4,5,6,7,8,9];for(let s=n-3;s<n+3;s++)for(let n=r-3;n<r+3;n++){let r=this.GetPos(s,n);if(this.IsInBlock(t,r)){const t=e[r];0!==t&&(o[t-1]=0)}}for(let t=0;t<this._SUDOKU_SIZE;t++){const n=e[this.GetPos(t,r)];0!==n&&(o[n-1]=0)}for(let t=0;t<this._SUDOKU_SIZE;t++){const r=e[this.GetPos(n,t)];0!==r&&(o[r-1]=0)}return o.filter((t=>0!==t))}Reset(){for(let t=0;t<this._data.length;++t)this._data[t]=0}SetGrid(t){this._data=t}_CreateCoordGrid(){let t=new Uint8Array(this._SUDOKU_SIZE*this._SUDOKU_SIZE);for(let e=0;e<t.length;++e)t[e]=parseInt(e/3)%3+3*parseInt(e/27);return t}SolveJS(t,e){return new Promise(((e,n)=>{let r=t,o=[];o.push([t.slice(),0,0]);let s=!1;for(;o.length>0&&!s;){let[t,e,n]=o.pop(),i=0;for(i=e;i<t.length;++i){if(0!==t[i])continue;let e=this.GetPossibleValues(i,t);if(!(e.length>n))break;t[i]=e[n],e.length>1&&o.push([t.slice(),i,++n]),n=0}s=i===t.length,s&&(r=t)}e([s,r])}))}Solve(t,e){return new Promise(((e,n)=>{let r=c.return_named_struct(!1),o=c.solve_wasm(t,r);console.log(r.is_done),e([r.is_done,o])}))}Generate(){return new Promise(((t,e)=>{t(c.generate_wasm(2))}))}}function l(t){s>=0&&s<81&&(a.GetGrid()[s]=t,n(3,i=a.GetGrid()))}!async function(){c=await(async(t={})=>{let{importHook:e,serverPath:n}=t,r="./build/assets/SudokuHelper-ffee626d.wasm";return null!=n&&(r=n+/[^\/\\]*$/.exec(r)[0]),null!=e&&(r=e(r)),await Q(r),X})()}();let{sudoku:a=new u}=e;a.Init(),i=a.GetGrid();return t.$$set=t=>{"possibleValues"in t&&n(0,r=t.possibleValues),"currentElementHovered"in t&&n(1,o=t.currentElementHovered),"currentElementSelected"in t&&n(2,s=t.currentElementSelected),"data"in t&&n(3,i=t.data),"sudoku"in t&&n(12,a=t.sudoku)},[r,o,s,i,function(t){n(2,s=parseInt(t.target.getAttribute("pos"))),console.log(s)},function(t){n(1,o=t.target.getAttribute("pos")),n(0,r=a.GetPossibleValues(o,a.GetGrid()))},async function(){a.Generate().then((t=>{a.SetGrid(t),n(3,i=a.GetGrid())}))},async function(){a.Solve(a.GetGrid(),(t=>{console.log(t),n(3,i=t)})).then((([t,e])=>{t?(a.SetGrid(e),n(3,i=a.GetGrid())):console.log("No solution")}))},async function(){a.SolveJS(a.GetGrid(),(t=>{console.log(t),n(3,i=t)})).then((([t,e])=>{t?(a.SetGrid(e),n(3,i=a.GetGrid())):console.log("No solution")}))},l,function(t){const e=(t,e,n)=>Math.min(Math.max(t,e),n),r=t.key;switch(r){case"ArrowDown":n(2,s=e(s+9,0,80));break;case"ArrowRight":n(2,s=e(s+1,0,80));break;case"ArrowLeft":n(2,s=e(s-1,0,80));break;case"ArrowUp":n(2,s=e(s-9,0,80));break;default:r>=0&&r<=9&&l(r)}n(1,o=s)},function(){console.log(a.GetGrid())},a,function(t){v[t?"unshift":"push"]((()=>{o=t,n(1,o)}))},t=>{l(t)},()=>{l(0)}]}class st extends V{constructor(t){super(),K(this,t,ot,rt,s,{possibleValues:0,currentElementHovered:1,currentElementSelected:2,data:3,sudoku:12})}}function it(e){let n,r,o,s,i;return s=new st({}),{c(){var t;n=f("main"),r=f("h1"),r.textContent="Sudoku!",o=_(),(t=s.$$.fragment)&&t.c(),g(r,"class","svelte-1e6s4d4"),g(n,"class","svelte-1e6s4d4")},m(t,e){u(t,n,e),c(n,r),c(n,o),D(s,n,null),i=!0},p:t,i(t){i||(R(s.$$.fragment,t),i=!0)},o(t){!function(t,e,n,r){if(t&&t.o){if(C.has(t))return;C.add(t),(void 0).c.push((()=>{C.delete(t),r&&(n&&t.d(1),r())})),t.o(e)}}(s.$$.fragment,t),i=!1},d(t){t&&l(n),P(s)}}}return new class extends V{constructor(t){super(),K(this,t,null,it,s,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
