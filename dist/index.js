const e="area,base,canvas,embed,frame,head,iframe,input,link,map,meta,param,rp,script,source,style,textarea,title,track,wbr".split(","),t="area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr".split(","),g="address,article,aside,blockquote,dd,div,dl,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ol,p,pre,section,table,ul".split(","),s={img:"image",video:"video",a:"link"},r={htmlToJson:{message:"can't parser html string to json",code:0},closure:{message:"can't find closure, please check html string.",code:1}},n=/^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,i=/^<\/([-A-Za-z0-9_]+)[^>]*>/,o=/^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/)>/,a=/([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,l=[[/<\?xml.*\?>\n/,""],[/<.*!doctype.*\>\n/,""],[/<.*!DOCTYPE.*\>\n/,""],[/\r?\n+/g,""],[/<!--.*?-->/gi,""],[/\/\*.*?\*\//gi,""],[/[ ]+</gi,"<"],[/&forall;/g,"∀"],[/&part;/g,"∂"],[/&exists;/g,"∃"],[/&empty;/g,"∅"],[/&nabla;/g,"∇"],[/&isin;/g,"∈"],[/&notin;/g,"∉"],[/&ni;/g,"∋"],[/&prod;/g,"∏"],[/&sum;/g,"∑"],[/&minus;/g,"−"],[/&lowast;/g,"∗"],[/&radic;/g,"√"],[/&prop;/g,"∝"],[/&infin;/g,"∞"],[/&ang;/g,"∠"],[/&and;/g,"∧"],[/&or;/g,"∨"],[/&cap;/g,"∩"],[/&cap;/g,"∪"],[/&int;/g,"∫"],[/&there4;/g,"∴"],[/&sim;/g,"∼"],[/&cong;/g,"≅"],[/&asymp;/g,"≈"],[/&ne;/g,"≠"],[/&le;/g,"≤"],[/&ge;/g,"≥"],[/&sub;/g,"⊂"],[/&sup;/g,"⊃"],[/&nsub;/g,"⊄"],[/&sube;/g,"⊆"],[/&supe;/g,"⊇"],[/&oplus;/g,"⊕"],[/&otimes;/g,"⊗"],[/&perp;/g,"⊥"],[/&sdot;/g,"⋅"],[/&Alpha;/g,"Α"],[/&Beta;/g,"Β"],[/&Gamma;/g,"Γ"],[/&Delta;/g,"Δ"],[/&Epsilon;/g,"Ε"],[/&Zeta;/g,"Ζ"],[/&Eta;/g,"Η"],[/&Theta;/g,"Θ"],[/&Iota;/g,"Ι"],[/&Kappa;/g,"Κ"],[/&Lambda;/g,"Λ"],[/&Mu;/g,"Μ"],[/&Nu;/g,"Ν"],[/&Xi;/g,"Ν"],[/&Omicron;/g,"Ο"],[/&Pi;/g,"Π"],[/&Rho;/g,"Ρ"],[/&Sigma;/g,"Σ"],[/&Tau;/g,"Τ"],[/&Upsilon;/g,"Υ"],[/&Phi;/g,"Φ"],[/&Chi;/g,"Χ"],[/&Psi;/g,"Ψ"],[/&Omega;/g,"Ω"],[/&alpha;/g,"α"],[/&beta;/g,"β"],[/&gamma;/g,"γ"],[/&delta;/g,"δ"],[/&epsilon;/g,"ε"],[/&zeta;/g,"ζ"],[/&eta;/g,"η"],[/&theta;/g,"θ"],[/&iota;/g,"ι"],[/&kappa;/g,"κ"],[/&lambda;/g,"λ"],[/&mu;/g,"μ"],[/&nu;/g,"ν"],[/&xi;/g,"ξ"],[/&omicron;/g,"ο"],[/&pi;/g,"π"],[/&rho;/g,"ρ"],[/&sigmaf;/g,"ς"],[/&sigma;/g,"σ"],[/&tau;/g,"τ"],[/&upsilon;/g,"υ"],[/&phi;/g,"φ"],[/&chi;/g,"χ"],[/&psi;/g,"ψ"],[/&omega;/g,"ω"],[/&thetasym;/g,"ϑ"],[/&upsih;/g,"ϒ"],[/&piv;/g,"ϖ"],[/&middot;/g,"·"],[/&nbsp;/g," "],[/&quot;/g,"'"],[/&amp;/g,"&"],[/&lt;/g,"<"],[/&gt;/g,">"],[/&#8226;/g,"•"],[/&OElig;/g,"Œ"],[/&oelig;/g,"œ"],[/&Scaron;/g,"Š"],[/&scaron;/g,"š"],[/&Yuml;/g,"Ÿ"],[/&fnof;/g,"ƒ"],[/&circ;/g,"ˆ"],[/&tilde;/g,"˜"],[/&ensp;/g,""],[/&emsp;/g,""],[/&thinsp;/g,""],[/&zwnj;/g,""],[/&zwj;/g,""],[/&lrm;/g,""],[/&rlm;/g,""],[/&ndash;/g,"–"],[/&mdash;/g,"—"],[/&lsquo;/g,"‘"],[/&rsquo;/g,"’"],[/&sbquo;/g,"‚"],[/&ldquo;/g,"“"],[/&rdquo;/g,"”"],[/&bdquo;/g,"„"],[/&dagger;/g,"†"],[/&Dagger;/g,"‡"],[/&bull;/g,"•"],[/&hellip;/g,"…"],[/&permil;/g,"‰"],[/&prime;/g,"′"],[/&Prime;/g,"″"],[/&lsaquo;/g,"‹"],[/&rsaquo;/g,"›"],[/&oline;/g,"‾"],[/&euro;/g,"€"],[/&trade;/g,"™"],[/&larr;/g,"←"],[/&uarr;/g,"↑"],[/&rarr;/g,"→"],[/&darr;/g,"↓"],[/&harr;/g,"↔"],[/&crarr;/g,"↵"],[/&lceil;/g,"⌈"],[/&rceil;/g,"⌉"],[/&lfloor;/g,"⌊"],[/&rfloor;/g,"⌋"],[/&loz;/g,"◊"],[/&spades;/g,"♠"],[/&clubs;/g,"♣"],[/&hearts;/g,"♥"],[/&diams;/g,"♦"],[/&#39;/g,"'"],[/\r\n/g,""],[/\n/g,""]];class c{config;constructor(e,t){return this.config=t||{},e?this.steps(e):""}steps(e){const t=this.decodeHtml(e),g=this.htmlToJson(t);return this.jsonToSkeleton(g)}decodeHtml(e){return e?(l.forEach((t=>{const[g,s]=t;e=e.replace(g,s)})),e):""}isInvalidElement(t){const{ignoredElement:g=e}=this.config;return g.includes(t)}isSelfClosingElement(e,g){return o.test(e)||t.includes(g)}formatElementName(e){const{transMap:t=s}=this.config;return e in t?t[e]:"view"}attributeProcessor(e,t){const{format:g={}}=this.config;if(g[t]){const s=g[t];Object.keys(s).forEach((t=>{const g=s[t];e[t]="function"==typeof g?g(e[t]):g}))}return e}formatAttributes(e,t){if(!e)return{};let g={};return e.replace(a,(function(e,t,s){const r=Array.prototype.slice.call(arguments);return r.length>=3&&(console.log(s),g[t]=s?s.replace(/(^|[^\\])"/g,'$1\\"'):""),""})),this.attributeProcessor(g,t)}updateHtmlStr(e,t){return e.substring(t.length)}htmlToJson(e){const s=[];try{for(;e;){if(0===e.indexOf("</")){const g=e.match(i);if(!g)continue;const[r,n]=g,o=this.updateHtmlStr(e,r);if(this.isInvalidElement(n)){e=o;continue}e=o;const a=t.includes(n);s.push({type:a?"selfClosing":"end",name:this.formatElementName(n),originName:n});continue}if(0===e.indexOf("<")){const t=e.match(n);if(!t)continue;const[r,i,o=""]=t,a=this.updateHtmlStr(e,r);if(this.isInvalidElement(i)){e=a;continue}e=a;const l=this.isSelfClosingElement(r,i),c=this.formatAttributes(o,i);let m=g.includes(i)?"block":"inline";s.push({type:l?"selfClosing":"start",name:this.formatElementName(i),originName:i,attrs:c,display:m});continue}const r=e.indexOf("<"),o=r<0;let a=o?e:e.substring(0,r);e=o?"":e.substring(r),s.push({type:"text",name:"text",attrs:this.attributeProcessor({content:a},"text")})}}catch(e){this.emitError("htmlToJson"),console.error(e)}return s}skeletonGenerator(e,t=0){if(e.length<=0)return[];let g=0;const s=[];for(;g<e.length;){const r=e[g],n=`${t}_${g}_${r.name}`,i=["start","end"].includes(r.type)?"default":r.type;if("start"===r.type){const t=e.findIndex((({type:e,genKey:t})=>"end"===e&&t===r.genKey));if(-1===t){this.emitError("closure");break}s.push({id:n,...r,type:i,children:this.skeletonGenerator(e.slice(g+1,t),g)}),g=t+1}else s.push({id:n,...r,type:i}),g++}return s}jsonToSkeleton(e){const t=[];return e.forEach(((e,g)=>{const{type:s}=e;switch(s){case"start":e.genKey=g,t.push(g);break;case"end":const s=t.splice(t.length-1,1)[0];e.genKey=s}})),this.skeletonGenerator(e)}emitError(e){const{onError:t}=this.config;t&&t(r[e]),console.error(`MiniParser: ${r[e].message}`)}}export{c as MiniParser,e as defaultIgnoreElements,s as defaultTransMap};
