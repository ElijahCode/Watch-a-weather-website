(()=>{"use strict";var e={641:(e,t,i)=>{t.y=void 0;const s=i(830),n=i(705);t.y=class{constructor(e,t){this.state=n.CITY_LIST_DEFAULT_VALUE,this.events=n.EVENTS_DEFAULT_VALUE,this.el=e,t?this.setState(t):this.onMount(e)}setState(e){this.state=e,this.render()}subscribeToEvents(){Object.keys(this.events).forEach((e=>{const[t,i]=e.split("@");document.querySelector(`.${i}`).addEventListener(t,this.events[e],!0)}))}onMount(e){this.el.innerHTML=this.el.innerHTML}render(){const e=s.template(n.HISTORY_LIST_TPL,this.state);return this.el.innerHTML=e,e}}},299:(e,t,i)=>{t.G=void 0;const s=i(830),n=i(705);t.G=class{constructor(e,t){this.state=n.WEATHER_BEFORE_FIRST_DEFINE,this.events=n.EVENTS_DEFAULT_VALUE,this.el=e,t?this.setState(t):this.onMount(e)}subscribeToEvents(){Object.keys(this.events).forEach((e=>{const[t,i]=e.split("@");document.querySelector(`.${i}`).addEventListener(t,this.events[e])}))}setState(e){Object.keys(e).forEach((t=>{this.state[t]=e[t]})),this.render()}onMount(e){this.render()}render(){const e=s.template(n.WEATHER_IN_CITY_COMP_TPL,this.state);return this.el.innerHTML=e,e}}},705:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CITY_LIST_DEFAULT_VALUE=t.EVENTS_DEFAULT_VALUE=t.WEATHER_BEFORE_FIRST_DEFINE=t.WEATHER_IN_CITY_COMP_TPL=t.HISTORY_LIST_TPL=void 0,t.HISTORY_LIST_TPL="{{for data as cities}}\n<li> {{city}}</li>\n",t.WEATHER_IN_CITY_COMP_TPL="In {{name}} now is\n{{weather}},\nTemperature: {{temp}} C,\nTemperature is feels like: {{tempFeelsLike}} C,\nHumidity:{{humidity}}%,\nAtmospheric pressure: {{pressure}} Pa,\nWind speed: {{windSpeed}} m/s",t.WEATHER_BEFORE_FIRST_DEFINE={weather:"",base:"",temp:0,tempFeelsLike:0,pressure:0,humidity:0,visibility:0,windSpeed:0,name:""},t.EVENTS_DEFAULT_VALUE={defaultEvent:()=>null},t.CITY_LIST_DEFAULT_VALUE={cities:[{city:""}]}},980:(e,t)=>{t.k=void 0,t.k=function(e){return{name:e.name,weather:e.weather[0].main,temp:e.main.temp,tempFeelsLike:e.main.feels_like,humidity:e.main.humidity,pressure:e.main.pressure,windSpeed:e.wind.speed}}},830:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.template=void 0,t.template=function e(t,i){return t.replace(/{{if (\w+)}}\n?([a-zA-Z0-9{}<>"#!.,/= ]{1,})\n?{{endif}}/gm,((e,t,s)=>i[t]?s:"")).replace(/{{for \w+ as (\w+)}}\n?([a-zA-Z0-9{}()<>"#!.,/= ]{1,})\n?(_{{isFirst ([a-zA-Z0-9{}()<>"#!.,/= ]{1,})}})?\n?(_{{isLast ([a-zA-Z0-9{}()<>"#!.,/= ]{1,})}})?/g,((t,s,n,...r)=>{let a,o,c="";return/isFirst/.test(r[0])?(a=r[1],o=r[3]):(/isLast/.test(r[0])||r[3])&&(o=r[3]),i[s].forEach(((r,l)=>{let u;u=0===l&&void 0!==a?/{{index}}/g.test(a)?a.replace(/{{index}}/g,`${1+l}`):a:l===i[s].length-1&&void 0!==o?/{{index}}/g.test(o)?o.replace(/{{index}}/g,`${1+l}`):o:/{{index}}/g.test(n)?n.replace(/{{index}}/g,`${1+l}`):n,c+=/\n/g.test(t)?`${e(u,r)}\n`:e(u,r)})),c})).replace(/{{(\w+)}}/g,((e,t)=>i[t]?i[t]:""))}}},t={};function i(s){if(t[s])return t[s].exports;var n=t[s]={exports:{}};return e[s](n,n.exports,i),n.exports}(()=>{function e(e,t){const i=t.coord.lat,s=`https://static-maps.yandex.ru/1.x/?ll=${t.coord.lon},${i}&size=400,400&z=12&l=map&pt=37.620070,55.753630,pmwtm1~37.64,55.76363,pmwtm99`;e.src=s}async function t(e){try{const t=`https://api.openweathermap.org/data/2.5/weather?q=${e}&appid=29322a2e1ecf125b380cfcee03239f35&units=metric`,i=await fetch(t);return await i.json()}catch(e){return console.log("Can not downoload weather data!")}}async function s(i){const s=i.target.innerText,n=await t(s),r=`\n    In ${(a=n).name} now is \n    ${a.weather[0].main},\n    Temperature: ${a.main.temp} C,\n    Temperature is feels like: ${a.main.feels_like} C,\n    Humidity:${a.main.humidity}%,\n    Atmospheric pressure: ${a.main.pressure} Pa,\n    Wind speed: ${a.wind.speed} m/s`;var a;const o=document.querySelector(".weatherInReqCity"),c=document.querySelector(".cityMap");!function(e,t){e.innerText=t}(o,r),e(c,n)}var n=i(980);function r(e){const t=JSON.parse(localStorage.getItem("historyList"));t.cities.push({city:e}),localStorage.setItem("historyList",JSON.stringify(t))}function a(e,t,i,...s){0===s.length?e.addEventListener(t,i,!0):e.addEventListener(t,i.bind(null,...s))}var o=i(299),c=i(641);0===localStorage.length&&localStorage.setItem("historyList",JSON.stringify({cities:[{city:""}]}));const l=new o.G(document.querySelector(".userCityBlock").getElementsByTagName("p").item(1)),u=new o.G(document.querySelector(".weatherInReqCity")),d=new c.y(document.querySelector(".historyList")),h=document.querySelector(".textbox"),m=document.querySelector(".cityMap");a(document.querySelector("button"),"click",(async function(i,s,a,o){const c=i.value;if(""===c)return console.log("Empty city requare!");const l=await t(c),u=(0,n.k)(l);return s.setState(u),function(e,t){for(let i=0;i<e.state.cities.length;i+=1)if(e.state.cities[i].city===t)return console.log("exit"),null;if(""===e.state.cities[0].city){const i=e.state;i.cities[0].city=t,e.setState(i),localStorage.clear(),localStorage.setItem("historyList",JSON.stringify({cities:[{city:t}]}))}else if(e.state.cities.length<10){const i=e.state;i.cities.push({city:t}),e.setState(i),r(t)}else{const i=e.state;i.cities.shift(),i.cities.push({city:t}),e.setState(i),function(){const e=JSON.parse(localStorage.getItem("historyList"));e.cities.shift(),localStorage.setItem("historyList",JSON.stringify(e))}(),r(t)}}(a,c),e(o,l),null}),h,u,d,m);const y=0===localStorage.length?null:JSON.parse(localStorage.getItem("historyList"));""!==y.cities[0].city&&d.setState(y),d.events={"click@historyList":s},d.subscribeToEvents(),a(document.querySelector(".historyList"),"click",s),async function(){const i=await async function(){try{const e="https://get.geojs.io/v1/ip/geo.json",t=await fetch(e);return(await t.json()).city}catch(e){return console.log("Can not downoload data about your city!")}}(),s=await t(i),r=(0,n.k)(s);l.setState(r),e(document.querySelector(".cityMap"),s)}()})()})();