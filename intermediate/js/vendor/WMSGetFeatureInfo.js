OpenLayers.Format.WMSGetFeatureInfo=OpenLayers.Class(OpenLayers.Format.XML,{layerIdentifier:"_layer",featureIdentifier:"_feature",regExes:{trimSpace:/^\s*|\s*$/g,removeSpace:/\s*/g,splitSpace:/\s+/,trimComma:/\s*,\s*/g},gmlFormat:null,read:function(a){typeof a=="string"&&(a=OpenLayers.Format.XML.prototype.read.apply(this,[a]));var f=a.documentElement;if(f)var e=this["read_"+f.nodeName],a=e?e.call(this,f):(new OpenLayers.Format.GML(this.options?this.options:{})).read(a);return a},read_msGMLOutput:function(a){var f=
[];if(a=this.getSiblingNodesByTagCriteria(a,this.layerIdentifier))for(var e=0,h=a.length;e<h;++e){var b=a[e],c=b.nodeName;b.prefix&&(c=c.split(":")[1]);c=c.replace(this.layerIdentifier,"");if(b=this.getSiblingNodesByTagCriteria(b,this.featureIdentifier))for(var d=0;d<b.length;d++){var g=b[d],i=this.parseGeometry(g),g=this.parseAttributes(g),g=new OpenLayers.Feature.Vector(i.geometry,g,null);g.bounds=i.bounds;g.type=c;f.push(g)}}return f},read_FeatureInfoResponse:function(a){for(var f=[],a=this.getElementsByTagNameNS(a,
"*","FIELDS"),e=0,h=a.length;e<h;e++){var b=a[e],c={},d,g=b.attributes.length;if(g>0)for(d=0;d<g;d++){var i=b.attributes[d];c[i.nodeName]=i.nodeValue}else{b=b.childNodes;for(d=0,g=b.length;d<g;++d)i=b[d],i.nodeType!=3&&(c[i.getAttribute("name")]=i.getAttribute("value"))}f.push(new OpenLayers.Feature.Vector(null,c,null))}return f},getSiblingNodesByTagCriteria:function(a,f){var e=[],h,b,c,d;if(a&&a.hasChildNodes()){h=a.childNodes;c=h.length;for(var g=0;g<c;g++){for(d=h[g];d&&d.nodeType!=1;)d=d.nextSibling,
g++;b=d?d.nodeName:"";b.length>0&&b.indexOf(f)>-1?e.push(d):(b=this.getSiblingNodesByTagCriteria(d,f),b.length>0&&(e.length==0?e=b:e.push(b)))}}return e},parseAttributes:function(a){var f={};if(a.nodeType==1)for(var a=a.childNodes,e=a.length,h=0;h<e;++h){var b=a[h];if(b.nodeType==1){var c=b.childNodes,b=b.prefix?b.nodeName.split(":")[1]:b.nodeName;if(c.length==0)f[b]=null;else if(c.length==1&&(c=c[0],c.nodeType==3||c.nodeType==4))c=c.nodeValue.replace(this.regExes.trimSpace,""),f[b]=c}}return f},
parseGeometry:function(a){if(!this.gmlFormat)this.gmlFormat=new OpenLayers.Format.GML;var a=this.gmlFormat.parseFeature(a),f,e=null;a&&(f=a.geometry&&a.geometry.clone(),e=a.bounds&&a.bounds.clone(),a.destroy());return{geometry:f,bounds:e}},CLASS_NAME:"OpenLayers.Format.WMSGetFeatureInfo"});