(()=>{"use strict";var t={797:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.BasicComponent=void 0,e.BasicComponent=class{constructor(t,e){this.el=t,this.defaultState={},this.defaultTemplate="",this.defaultEvents={defaultEvent:()=>null},this.state=this.defaultState,e?(this.state=e,this.setState(this.state)):(this.state=this.defaultState,this.setState(this.state)),this.events=this.defaultEvents,this.onMountFlag=!1,this.onMount(t)}subscribeToEvents(){Object.keys(this.events).forEach((t=>{const[e,s]=t.split("@");document.querySelector(`.${s}`).addEventListener(e,this.events[t],!0)}))}onMount(t){this.onMountFlag=!0}template(t,e){return t.replace(/{{if (\w+)}}\n?([a-zA-Z0-9{}<>"#!.,/= ]{1,})\n?{{endif}}/gm,((t,s,i)=>e[s]?i:"")).replace(/{{for \w+ as (\w+)}}\n?([a-zA-Z0-9{}()<>"#!.,/= ]{1,})\n?(_{{isFirst ([a-zA-Z0-9{}()<>"#!.,/= ]{1,})}})?\n?(_{{isLast ([a-zA-Z0-9{}()<>"#!.,/= ]{1,})}})?/g,((t,s,i,...n)=>{let a,o,r="";return/isFirst/.test(n[0])?(a=n[1],o=n[3]):(/isLast/.test(n[0])||n[3])&&(o=n[3]),e[s].forEach(((n,c)=>{let l;l=0===c&&void 0!==a?/{{index}}/g.test(a)?a.replace(/{{index}}/g,`${1+c}`):a:c===e[s].length-1&&void 0!==o?/{{index}}/g.test(o)?o.replace(/{{index}}/g,`${1+c}`):o:/{{index}}/g.test(i)?i.replace(/{{index}}/g,`${1+c}`):i,r+=/\n/g.test(t)?`${this.template(l,n)}\n`:this.template(l,n)})),r})).replace(/{{(\w+)}}/g,((t,s)=>e[s]?e[s]:""))}render(){const t=this.template(this.defaultTemplate,this.state);return this.el.innerHTML=t,t}}},641:(t,e,s)=>{e.y=void 0;const i=s(797);class n extends i.BasicComponent{constructor(t,e){super(t,e),this.el=t,this.defaultState={cities:[{city:""}]},this.defaultEvents={defaultEvent:()=>null},this.defaultTemplate="{{for data as cities}}\n<li> {{city}}</li>",this.state=this.defaultState,e?(this.state=e,this.setState(this.state)):(this.state=this.defaultState,this.setState(this.state)),this.events=this.defaultEvents,this.onMountFlag=!1,this.onMount(t)}setState(t){this.state=t,this.render()}}e.y=n},299:(t,e,s)=>{e.G=void 0;const i=s(797);class n extends i.BasicComponent{constructor(t,e){super(t,e),this.el=t,this.defaultTemplate="In {{name}} now is\n{{weather}},\nTemperature: {{temp}} C,\nTemperature is feels like: {{tempFeelsLike}} C,\nHumidity:{{humidity}}%,\nAtmospheric pressure: {{pressure}} Pa,\nWind speed: {{windSpeed}} m/s",this.defaultState={weather:"",base:"",temp:0,tempFeelsLike:0,pressure:0,humidity:0,visibility:0,windSpeed:0,name:""},this.defaultEvents={defaultEvent:()=>null},this.state=this.defaultState,e?this.setState(e):this.setState(this.defaultState),this.events=this.defaultEvents,this.onMountFlag=!1,this.onMount(t)}setState(t){Object.keys(t).forEach((e=>{this.state[e]=t[e]})),this.render()}}e.G=n},980:(t,e)=>{e.k=void 0,e.k=function(t){return{name:t.name,weather:t.weather[0].main,temp:t.main.temp,tempFeelsLike:t.main.feels_like,humidity:t.main.humidity,pressure:t.main.pressure,windSpeed:t.wind.speed}}}},e={};function s(i){if(e[i])return e[i].exports;var n=e[i]={exports:{}};return t[i](n,n.exports,s),n.exports}(()=>{function t(t,e){const s=e.coord.lat,i=`https://static-maps.yandex.ru/1.x/?ll=${e.coord.lon},${s}&size=400,400&z=12&l=map&pt=37.620070,55.753630,pmwtm1~37.64,55.76363,pmwtm99`;t.src=i}async function e(t){try{const e=`https://api.openweathermap.org/data/2.5/weather?q=${t}&appid=29322a2e1ecf125b380cfcee03239f35&units=metric`,s=await fetch(e);return await s.json()}catch(t){return console.log("Can not downoload weather data!")}}async function i(s){const i=s.target.innerText,n=await e(i),a=`\n    In ${(o=n).name} now is \n    ${o.weather[0].main},\n    Temperature: ${o.main.temp} C,\n    Temperature is feels like: ${o.main.feels_like} C,\n    Humidity:${o.main.humidity}%,\n    Atmospheric pressure: ${o.main.pressure} Pa,\n    Wind speed: ${o.wind.speed} m/s`;var o;const r=document.querySelector(".weatherInReqCity"),c=document.querySelector(".cityMap");!function(t,e){t.innerText=e}(r,a),t(c,n)}var n=s(980);function a(t){const e=JSON.parse(localStorage.getItem("historyList"));e.cities.push({city:t}),localStorage.setItem("historyList",JSON.stringify(e))}function o(t,e,s,...i){0===i.length?t.addEventListener(e,s,!0):t.addEventListener(e,s.bind(null,...i))}var r=s(299),c=s(641);0===localStorage.length&&localStorage.setItem("historyList",JSON.stringify({cities:[{city:""}]}));const l=new r.G(document.querySelector(".weatherInUserCity")),u=new r.G(document.querySelector(".weatherInReqCity")),h=new c.y(document.querySelector(".historyList")),d=document.querySelector(".textbox"),m=document.querySelector(".cityMap");o(document.querySelector("button"),"click",(async function(s,i,o,r){const c=s.value;if(""===c)return console.log("Empty city requare!");const l=await e(c),u=(0,n.k)(l);return i.setState(u),function(t,e){for(let s=0;s<t.state.cities.length;s+=1)if(t.state.cities[s].city===e)return console.log("exit"),null;if(""===t.state.cities[0].city){const s=t.state;s.cities[0].city=e,t.setState(s),localStorage.clear(),localStorage.setItem("historyList",JSON.stringify({cities:[{city:e}]}))}else if(t.state.cities.length<10){const s=t.state;s.cities.push({city:e}),t.setState(s),a(e)}else{const s=t.state;s.cities.shift(),s.cities.push({city:e}),t.setState(s),function(){const t=JSON.parse(localStorage.getItem("historyList"));t.cities.shift(),localStorage.setItem("historyList",JSON.stringify(t))}(),a(e)}}(o,c),t(r,l),null}),d,u,h,m);const p=0===localStorage.length?null:JSON.parse(localStorage.getItem("historyList"));""!==p.cities[0].city&&h.setState(p),h.events={"click@historyList":i},h.subscribeToEvents(),o(document.querySelector(".historyList"),"click",i),async function(){const s=await async function(){try{const t="https://get.geojs.io/v1/ip/geo.json",e=await fetch(t);return(await e.json()).city}catch(t){return console.log("Can not downoload data about your city!")}}(),i=await e(s),a=(0,n.k)(i);l.setState(a),t(document.querySelector(".cityMap"),i)}()})()})();