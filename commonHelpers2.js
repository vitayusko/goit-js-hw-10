import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */document.querySelector(".form").addEventListener("submit",function(t){t.preventDefault();const s=parseInt(this.delay.value),i=this.state.value;new Promise((e,o)=>{setTimeout(()=>{i==="fulfilled"?e(s):o(s)},s)}).then(e=>{console.log(`✅ Fulfilled promise in ${e}ms`),iziToast.success({title:"Success",message:`✅ Fulfilled promise in ${e}ms`,position:"topRight"})}).catch(e=>{console.log(`❌ Rejected promise in ${e}ms`),iziToast.error({title:"Error",message:`❌ Rejected promise in ${e}ms`,position:"topRight"})})});
//# sourceMappingURL=commonHelpers2.js.map
