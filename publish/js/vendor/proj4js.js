var Proj4js={defaultDatum:"WGS84",transform:function(a,c,b){if(!a.readyToUse)return this.reportError("Proj4js initialization for:"+a.srsCode+" not yet complete"),b;if(!c.readyToUse)return this.reportError("Proj4js initialization for:"+c.srsCode+" not yet complete"),b;if(a.datum&&c.datum&&((a.datum.datum_type==Proj4js.common.PJD_3PARAM||a.datum.datum_type==Proj4js.common.PJD_7PARAM)&&c.datumCode!="WGS84"||(c.datum.datum_type==Proj4js.common.PJD_3PARAM||c.datum.datum_type==Proj4js.common.PJD_7PARAM)&&
a.datumCode!="WGS84")){var d=Proj4js.WGS84;this.transform(a,d,b);a=d}a.axis!="enu"&&this.adjust_axis(a,!1,b);a.projName=="longlat"?(b.x*=Proj4js.common.D2R,b.y*=Proj4js.common.D2R):(a.to_meter&&(b.x*=a.to_meter,b.y*=a.to_meter),a.inverse(b));a.from_greenwich&&(b.x+=a.from_greenwich);b=this.datum_transform(a.datum,c.datum,b);c.from_greenwich&&(b.x-=c.from_greenwich);c.projName=="longlat"?(b.x*=Proj4js.common.R2D,b.y*=Proj4js.common.R2D):(c.forward(b),c.to_meter&&(b.x/=c.to_meter,b.y/=c.to_meter));
c.axis!="enu"&&this.adjust_axis(c,!0,b);return b},datum_transform:function(a,c,b){if(a.compare_datums(c))return b;if(a.datum_type==Proj4js.common.PJD_NODATUM||c.datum_type==Proj4js.common.PJD_NODATUM)return b;if(a.es!=c.es||a.a!=c.a||a.datum_type==Proj4js.common.PJD_3PARAM||a.datum_type==Proj4js.common.PJD_7PARAM||c.datum_type==Proj4js.common.PJD_3PARAM||c.datum_type==Proj4js.common.PJD_7PARAM)a.geodetic_to_geocentric(b),(a.datum_type==Proj4js.common.PJD_3PARAM||a.datum_type==Proj4js.common.PJD_7PARAM)&&
a.geocentric_to_wgs84(b),(c.datum_type==Proj4js.common.PJD_3PARAM||c.datum_type==Proj4js.common.PJD_7PARAM)&&c.geocentric_from_wgs84(b),c.geocentric_to_geodetic(b);return b},adjust_axis:function(a,c,b){for(var d=b.x,e=b.y,g=b.z||0,f,h,i=0;i<3;i++)if(!c||!(i==2&&b.z===void 0))switch(i==0?(f=d,h="x"):i==1?(f=e,h="y"):(f=g,h="z"),a.axis[i]){case "e":b[h]=f;break;case "w":b[h]=-f;break;case "n":b[h]=f;break;case "s":b[h]=-f;break;case "u":if(b[h]!==void 0)b.z=f;break;case "d":if(b[h]!==void 0)b.z=-f;
break;default:return alert("ERROR: unknow axis ("+a.axis[i]+") - check definition of "+a.projName),null}return b},reportError:function(){},extend:function(a,c){a=a||{};if(c)for(var b in c){var d=c[b];d!==void 0&&(a[b]=d)}return a},Class:function(){for(var a=function(){this.initialize.apply(this,arguments)},c={},b,d=0;d<arguments.length;++d)b=typeof arguments[d]=="function"?arguments[d].prototype:arguments[d],Proj4js.extend(c,b);a.prototype=c;return a},bind:function(a,c){var b=Array.prototype.slice.apply(arguments,
[2]);return function(){var d=b.concat(Array.prototype.slice.apply(arguments,[0]));return a.apply(c,d)}},scriptName:"proj4js-compressed.js",defsLookupService:"http://spatialreference.org/ref",libPath:null,getScriptLocation:function(){if(this.libPath)return this.libPath;for(var a=this.scriptName,c=a.length,b=document.getElementsByTagName("script"),d=0;d<b.length;d++){var e=b[d].getAttribute("src");if(e){var g=e.lastIndexOf(a);if(g>-1&&g+c==e.length){this.libPath=e.slice(0,-c);break}}}return this.libPath||
""},loadScript:function(a,c,b,d){var e=document.createElement("script");e.defer=!1;e.type="text/javascript";e.id=a;e.src=a;e.onload=c;e.onerror=b;e.loadCheck=d;if(/MSIE/.test(navigator.userAgent))e.onreadystatechange=this.checkReadyState;document.getElementsByTagName("head")[0].appendChild(e)},checkReadyState:function(){if(this.readyState=="loaded")if(this.loadCheck())this.onload();else this.onerror()}};
Proj4js.Proj=Proj4js.Class({readyToUse:!1,title:null,projName:null,units:null,datum:null,x0:0,y0:0,localCS:!1,queue:null,initialize:function(a,c){this.srsCodeInput=a;this.queue=[];c&&this.queue.push(c);if(a.indexOf("GEOGCS")>=0||a.indexOf("GEOCCS")>=0||a.indexOf("PROJCS")>=0||a.indexOf("LOCAL_CS")>=0)this.parseWKT(a),this.deriveConstants(),this.loadProjCode(this.projName);else{if(a.indexOf("urn:")==0){var b=a.split(":");if((b[1]=="ogc"||b[1]=="x-ogc")&&b[2]=="def"&&b[3]=="crs")a=b[4]+":"+b[b.length-
1]}else a.indexOf("http://")==0&&(b=a.split("#"),b[0].match(/epsg.org/)?a="EPSG:"+b[1]:b[0].match(/RIG.xml/)&&(a="IGNF:"+b[1]));this.srsCode=a.toUpperCase();this.srsCode.indexOf("EPSG")==0?(this.srsCode=this.srsCode,this.srsAuth="epsg",this.srsProjNumber=this.srsCode.substring(5)):this.srsCode.indexOf("IGNF")==0?(this.srsCode=this.srsCode,this.srsAuth="IGNF",this.srsProjNumber=this.srsCode.substring(5)):this.srsCode.indexOf("CRS")==0?(this.srsCode=this.srsCode,this.srsAuth="CRS",this.srsProjNumber=
this.srsCode.substring(4)):(this.srsAuth="",this.srsProjNumber=this.srsCode);this.loadProjDefinition()}},loadProjDefinition:function(){if(Proj4js.defs[this.srsCode])this.defsLoaded();else{var a=Proj4js.getScriptLocation()+"defs/"+this.srsAuth.toUpperCase()+this.srsProjNumber+".js";Proj4js.loadScript(a,Proj4js.bind(this.defsLoaded,this),Proj4js.bind(this.loadFromService,this),Proj4js.bind(this.checkDefsLoaded,this))}},loadFromService:function(){Proj4js.loadScript(Proj4js.defsLookupService+"/"+this.srsAuth+
"/"+this.srsProjNumber+"/proj4js/",Proj4js.bind(this.defsLoaded,this),Proj4js.bind(this.defsFailed,this),Proj4js.bind(this.checkDefsLoaded,this))},defsLoaded:function(){this.parseDefs();this.loadProjCode(this.projName)},checkDefsLoaded:function(){return Proj4js.defs[this.srsCode]?!0:!1},defsFailed:function(){Proj4js.reportError("failed to load projection definition for: "+this.srsCode);Proj4js.defs[this.srsCode]=Proj4js.defs.WGS84;this.defsLoaded()},loadProjCode:function(a){if(Proj4js.Proj[a])this.initTransforms();
else{var c=Proj4js.getScriptLocation()+"projCode/"+a+".js";Proj4js.loadScript(c,Proj4js.bind(this.loadProjCodeSuccess,this,a),Proj4js.bind(this.loadProjCodeFailure,this,a),Proj4js.bind(this.checkCodeLoaded,this,a))}},loadProjCodeSuccess:function(a){Proj4js.Proj[a].dependsOn?this.loadProjCode(Proj4js.Proj[a].dependsOn):this.initTransforms()},loadProjCodeFailure:function(a){Proj4js.reportError("failed to find projection file for: "+a)},checkCodeLoaded:function(a){return Proj4js.Proj[a]?!0:!1},initTransforms:function(){Proj4js.extend(this,
Proj4js.Proj[this.projName]);this.init();this.readyToUse=!0;if(this.queue)for(var a;a=this.queue.shift();)a.call(this,this)},wktRE:/^(\w+)\[(.*)\]$/,parseWKT:function(a){if(a=a.match(this.wktRE)){var c=a[1],b=a[2].split(","),d;d=c.toUpperCase()=="TOWGS84"?c:b.shift();d=d.replace(/^\"/,"");d=d.replace(/\"$/,"");for(var a=[],e=0,g="",f=0;f<b.length;++f){for(var h=b[f],i=0;i<h.length;++i)h.charAt(i)=="["&&++e,h.charAt(i)=="]"&&--e;g+=h;e===0?(a.push(g),g=""):g+=","}switch(c){case "LOCAL_CS":this.projName=
"identity";this.localCS=!0;this.srsCode=d;break;case "GEOGCS":this.projName="longlat";this.geocsCode=d;if(!this.srsCode)this.srsCode=d;break;case "PROJCS":this.srsCode=d;break;case "PROJECTION":this.projName=Proj4js.wktProjections[d];break;case "DATUM":this.datumName=d;break;case "LOCAL_DATUM":this.datumCode="none";break;case "SPHEROID":this.ellps=d;this.a=parseFloat(a.shift());this.rf=parseFloat(a.shift());break;case "PRIMEM":this.from_greenwich=parseFloat(a.shift());break;case "UNIT":this.units=
d;this.unitsPerMeter=parseFloat(a.shift());break;case "PARAMETER":c=d.toLowerCase();b=parseFloat(a.shift());switch(c){case "false_easting":this.x0=b;break;case "false_northing":this.y0=b;break;case "scale_factor":this.k0=b;break;case "central_meridian":this.long0=b*Proj4js.common.D2R;break;case "latitude_of_origin":this.lat0=b*Proj4js.common.D2R}break;case "TOWGS84":this.datum_params=a;break;case "AXIS":c=d.toLowerCase();b=a.shift();switch(b){case "EAST":b="e";break;case "WEST":b="w";break;case "NORTH":b=
"n";break;case "SOUTH":b="s";break;case "UP":b="u";break;case "DOWN":b="d";break;default:b=" "}if(!this.axis)this.axis="enu";switch(c){case "x":this.axis=b+this.axis.substr(1,2);break;case "y":this.axis=this.axis.substr(0,1)+b+this.axis.substr(2,1);break;case "z":this.axis=this.axis.substr(0,2)+b}}for(f=0;f<a.length;++f)this.parseWKT(a[f])}},parseDefs:function(){this.defData=Proj4js.defs[this.srsCode];var a,c;if(this.defData){for(var b=this.defData.split("+"),d=0;d<b.length;d++)switch(c=b[d].split("="),
a=c[0].toLowerCase(),c=c[1],a.replace(/\s/gi,"")){case "title":this.title=c;break;case "proj":this.projName=c.replace(/\s/gi,"");break;case "units":this.units=c.replace(/\s/gi,"");break;case "datum":this.datumCode=c.replace(/\s/gi,"");break;case "nadgrids":this.nagrids=c.replace(/\s/gi,"");break;case "ellps":this.ellps=c.replace(/\s/gi,"");break;case "a":this.a=parseFloat(c);break;case "b":this.b=parseFloat(c);break;case "rf":this.rf=parseFloat(c);break;case "lat_0":this.lat0=c*Proj4js.common.D2R;
break;case "lat_1":this.lat1=c*Proj4js.common.D2R;break;case "lat_2":this.lat2=c*Proj4js.common.D2R;break;case "lat_ts":this.lat_ts=c*Proj4js.common.D2R;break;case "lon_0":this.long0=c*Proj4js.common.D2R;break;case "alpha":this.alpha=parseFloat(c)*Proj4js.common.D2R;break;case "lonc":this.longc=c*Proj4js.common.D2R;break;case "x_0":this.x0=parseFloat(c);break;case "y_0":this.y0=parseFloat(c);break;case "k_0":this.k0=parseFloat(c);break;case "k":this.k0=parseFloat(c);break;case "r_a":this.R_A=!0;break;
case "zone":this.zone=parseInt(c,10);break;case "south":this.utmSouth=!0;break;case "towgs84":this.datum_params=c.split(",");break;case "to_meter":this.to_meter=parseFloat(c);break;case "from_greenwich":this.from_greenwich=c*Proj4js.common.D2R;break;case "pm":c=c.replace(/\s/gi,"");this.from_greenwich=Proj4js.PrimeMeridian[c]?Proj4js.PrimeMeridian[c]:parseFloat(c);this.from_greenwich*=Proj4js.common.D2R;break;case "axis":if(c=c.replace(/\s/gi,""),c.length==3&&"ewnsud".indexOf(c.substr(0,1))!=-1&&
"ewnsud".indexOf(c.substr(1,1))!=-1&&"ewnsud".indexOf(c.substr(2,1))!=-1)this.axis=c}this.deriveConstants()}},deriveConstants:function(){if(this.nagrids=="@null")this.datumCode="none";if(this.datumCode&&this.datumCode!="none"){var a=Proj4js.Datum[this.datumCode];if(a)this.datum_params=a.towgs84?a.towgs84.split(","):null,this.ellps=a.ellipse,this.datumName=a.datumName?a.datumName:this.datumCode}this.a||Proj4js.extend(this,Proj4js.Ellipsoid[this.ellps]?Proj4js.Ellipsoid[this.ellps]:Proj4js.Ellipsoid.WGS84);
if(this.rf&&!this.b)this.b=(1-1/this.rf)*this.a;if(this.rf===0||Math.abs(this.a-this.b)<Proj4js.common.EPSLN)this.sphere=!0,this.b=this.a;this.a2=this.a*this.a;this.b2=this.b*this.b;this.es=(this.a2-this.b2)/this.a2;this.e=Math.sqrt(this.es);if(this.R_A)this.a*=1-this.es*(Proj4js.common.SIXTH+this.es*(Proj4js.common.RA4+this.es*Proj4js.common.RA6)),this.a2=this.a*this.a,this.b2=this.b*this.b,this.es=0;this.ep2=(this.a2-this.b2)/this.b2;if(!this.k0)this.k0=1;if(!this.axis)this.axis="enu";this.datum=
new Proj4js.datum(this)}});Proj4js.Proj.longlat={init:function(){},forward:function(a){return a},inverse:function(a){return a}};Proj4js.Proj.identity=Proj4js.Proj.longlat;
Proj4js.defs={WGS84:"+title=long/lat:WGS84 +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees","EPSG:4326":"+title=long/lat:WGS84 +proj=longlat +a=6378137.0 +b=6356752.31424518 +ellps=WGS84 +datum=WGS84 +units=degrees","EPSG:4269":"+title=long/lat:NAD83 +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees","EPSG:3875":"+title= Google Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"};
Proj4js.defs["EPSG:3785"]=Proj4js.defs["EPSG:3875"];Proj4js.defs.GOOGLE=Proj4js.defs["EPSG:3875"];Proj4js.defs["EPSG:900913"]=Proj4js.defs["EPSG:3875"];Proj4js.defs["EPSG:102113"]=Proj4js.defs["EPSG:3875"];
Proj4js.common={PI:3.141592653589793,HALF_PI:1.5707963267948966,TWO_PI:6.283185307179586,FORTPI:0.7853981633974483,R2D:57.29577951308232,D2R:0.017453292519943295,SEC_TO_RAD:4.84813681109536E-6,EPSLN:1.0E-10,MAX_ITER:20,COS_67P5:0.3826834323650898,AD_C:1.0026,PJD_UNKNOWN:0,PJD_3PARAM:1,PJD_7PARAM:2,PJD_GRIDSHIFT:3,PJD_WGS84:4,PJD_NODATUM:5,SRS_WGS84_SEMIMAJOR:6378137,SIXTH:0.16666666666666666,RA4:0.04722222222222222,RA6:0.022156084656084655,RV4:0.06944444444444445,RV6:0.04243827160493827,msfnz:function(a,
c,b){a*=c;return b/Math.sqrt(1-a*a)},tsfnz:function(a,c,b){b*=a;b=Math.pow((1-b)/(1+b),0.5*a);return Math.tan(0.5*(this.HALF_PI-c))/b},phi2z:function(a,c){for(var b=0.5*a,d,e=this.HALF_PI-2*Math.atan(c),g=0;g<=15;g++)if(d=a*Math.sin(e),d=this.HALF_PI-2*Math.atan(c*Math.pow((1-d)/(1+d),b))-e,e+=d,Math.abs(d)<=1.0E-10)return e;alert("phi2z has NoConvergence");return-9999},qsfnz:function(a,c){var b;return a>1.0E-7?(b=a*c,(1-a*a)*(c/(1-b*b)-0.5/a*Math.log((1-b)/(1+b)))):2*c},asinz:function(a){Math.abs(a)>
1&&(a=a>1?1:-1);return Math.asin(a)},e0fn:function(a){return 1-0.25*a*(1+a/16*(3+1.25*a))},e1fn:function(a){return 0.375*a*(1+0.25*a*(1+0.46875*a))},e2fn:function(a){return 0.05859375*a*a*(1+0.75*a)},e3fn:function(a){return a*a*a*(35/3072)},mlfn:function(a,c,b,d,e){return a*e-c*Math.sin(2*e)+b*Math.sin(4*e)-d*Math.sin(6*e)},srat:function(a,c){return Math.pow((1-a)/(1+a),c)},sign:function(a){return a<0?-1:1},adjust_lon:function(a){return a=Math.abs(a)<this.PI?a:a-this.sign(a)*this.TWO_PI},adjust_lat:function(a){return a=
Math.abs(a)<this.HALF_PI?a:a-this.sign(a)*this.PI},latiso:function(a,c,b){if(Math.abs(c)>this.HALF_PI)return+Number.NaN;if(c==this.HALF_PI)return Number.POSITIVE_INFINITY;if(c==-1*this.HALF_PI)return-1*Number.POSITIVE_INFINITY;b*=a;return Math.log(Math.tan((this.HALF_PI+c)/2))+a*Math.log((1-b)/(1+b))/2},fL:function(a,c){return 2*Math.atan(a*Math.exp(c))-this.HALF_PI},invlatiso:function(a,c){var b=this.fL(1,c),d=0,e=0;do d=b,e=a*Math.sin(d),b=this.fL(Math.exp(a*Math.log((1+e)/(1-e))/2),c);while(Math.abs(b-
d)>1.0E-12);return b},sinh:function(a){a=Math.exp(a);return(a-1/a)/2},cosh:function(a){a=Math.exp(a);return(a+1/a)/2},tanh:function(a){a=Math.exp(a);return(a-1/a)/(a+1/a)},asinh:function(a){return(a>=0?1:-1)*Math.log(Math.abs(a)+Math.sqrt(a*a+1))},acosh:function(a){return 2*Math.log(Math.sqrt((a+1)/2)+Math.sqrt((a-1)/2))},atanh:function(a){return Math.log((a-1)/(a+1))/2},gN:function(a,c,b){c*=b;return a/Math.sqrt(1-c*c)},pj_enfn:function(a){var c=[];c[0]=this.C00-a*(this.C02+a*(this.C04+a*(this.C06+
a*this.C08)));c[1]=a*(this.C22-a*(this.C04+a*(this.C06+a*this.C08)));var b=a*a;c[2]=b*(this.C44-a*(this.C46+a*this.C48));b*=a;c[3]=b*(this.C66-a*this.C68);c[4]=b*a*this.C88;return c},pj_mlfn:function(a,c,b,d){b*=c;c*=c;return d[0]*a-b*(d[1]+c*(d[2]+c*(d[3]+c*d[4])))},pj_inv_mlfn:function(a,c,b){for(var d=1/(1-c),e=a,g=Proj4js.common.MAX_ITER;g;--g){var f=Math.sin(e),h=1-c*f*f,h=(this.pj_mlfn(e,f,Math.cos(e),b)-a)*h*Math.sqrt(h)*d;e-=h;if(Math.abs(h)<Proj4js.common.EPSLN)return e}Proj4js.reportError("cass:pj_inv_mlfn: Convergence error");
return e},C00:1,C02:0.25,C04:0.046875,C06:0.01953125,C08:0.01068115234375,C22:0.75,C44:0.46875,C46:0.013020833333333334,C48:0.007120768229166667,C66:0.3645833333333333,C68:0.005696614583333333,C88:0.3076171875};
Proj4js.datum=Proj4js.Class({initialize:function(a){this.datum_type=Proj4js.common.PJD_WGS84;if(a.datumCode&&a.datumCode=="none")this.datum_type=Proj4js.common.PJD_NODATUM;if(a&&a.datum_params){for(var c=0;c<a.datum_params.length;c++)a.datum_params[c]=parseFloat(a.datum_params[c]);if(a.datum_params[0]!=0||a.datum_params[1]!=0||a.datum_params[2]!=0)this.datum_type=Proj4js.common.PJD_3PARAM;if(a.datum_params.length>3&&(a.datum_params[3]!=0||a.datum_params[4]!=0||a.datum_params[5]!=0||a.datum_params[6]!=
0))this.datum_type=Proj4js.common.PJD_7PARAM,a.datum_params[3]*=Proj4js.common.SEC_TO_RAD,a.datum_params[4]*=Proj4js.common.SEC_TO_RAD,a.datum_params[5]*=Proj4js.common.SEC_TO_RAD,a.datum_params[6]=a.datum_params[6]/1E6+1}if(a)this.a=a.a,this.b=a.b,this.es=a.es,this.ep2=a.ep2,this.datum_params=a.datum_params},compare_datums:function(a){return this.datum_type!=a.datum_type?!1:this.a!=a.a||Math.abs(this.es-a.es)>5.0E-11?!1:this.datum_type==Proj4js.common.PJD_3PARAM?this.datum_params[0]==a.datum_params[0]&&
this.datum_params[1]==a.datum_params[1]&&this.datum_params[2]==a.datum_params[2]:this.datum_type==Proj4js.common.PJD_7PARAM?this.datum_params[0]==a.datum_params[0]&&this.datum_params[1]==a.datum_params[1]&&this.datum_params[2]==a.datum_params[2]&&this.datum_params[3]==a.datum_params[3]&&this.datum_params[4]==a.datum_params[4]&&this.datum_params[5]==a.datum_params[5]&&this.datum_params[6]==a.datum_params[6]:this.datum_type==Proj4js.common.PJD_GRIDSHIFT||a.datum_type==Proj4js.common.PJD_GRIDSHIFT?(alert("ERROR: Grid shift transformations are not implemented."),
!1):!0},geodetic_to_geocentric:function(a){var c=a.x,b=a.y,d=a.z?a.z:0,e,g,f;if(b<-Proj4js.common.HALF_PI&&b>-1.001*Proj4js.common.HALF_PI)b=-Proj4js.common.HALF_PI;else if(b>Proj4js.common.HALF_PI&&b<1.001*Proj4js.common.HALF_PI)b=Proj4js.common.HALF_PI;else if(b<-Proj4js.common.HALF_PI||b>Proj4js.common.HALF_PI)return Proj4js.reportError("geocent:lat out of range:"+b),null;c>Proj4js.common.PI&&(c-=2*Proj4js.common.PI);g=Math.sin(b);f=Math.cos(b);e=this.a/Math.sqrt(1-this.es*g*g);b=(e+d)*f*Math.cos(c);
c=(e+d)*f*Math.sin(c);d=(e*(1-this.es)+d)*g;a.x=b;a.y=c;a.z=d;return 0},geocentric_to_geodetic:function(a){var c,b,d,e,g,f,h,i,l,k,j=a.x;d=a.y;var m=a.z?a.z:0;c=Math.sqrt(j*j+d*d);b=Math.sqrt(j*j+d*d+m*m);if(c/this.a<1.0E-12){if(j=0,b/this.a<1.0E-12)return}else j=Math.atan2(d,j);d=m/b;e=c/b;g=1/Math.sqrt(1-this.es*(2-this.es)*e*e);h=e*(1-this.es)*g;i=d*g;k=0;do k++,f=this.a/Math.sqrt(1-this.es*i*i),b=c*h+m*i-f*(1-this.es*i*i),f=this.es*f/(f+b),g=1/Math.sqrt(1-f*(2-f)*e*e),f=e*(1-f)*g,g*=d,l=g*h-f*
i,h=f,i=g;while(l*l>1.0E-24&&k<30);c=Math.atan(g/Math.abs(f));a.x=j;a.y=c;a.z=b;return a},geocentric_to_geodetic_noniter:function(a){var c=a.x,b=a.y,d=a.z?a.z:0,e,g,f,h,i,c=parseFloat(c),b=parseFloat(b),d=parseFloat(d);i=!1;if(c!=0)e=Math.atan2(b,c);else if(b>0)e=Proj4js.common.HALF_PI;else if(b<0)e=-Proj4js.common.HALF_PI;else if(i=!0,e=0,d>0)g=Proj4js.common.HALF_PI;else if(d<0)g=-Proj4js.common.HALF_PI;else return;f=c*c+b*b;c=Math.sqrt(f);b=d*Proj4js.common.AD_C;f=Math.sqrt(b*b+f);b/=f;f=c/f;b=
d+this.b*this.ep2*b*b*b;h=c-this.a*this.es*f*f*f;f=Math.sqrt(b*b+h*h);b/=f;f=h/f;h=this.a/Math.sqrt(1-this.es*b*b);d=f>=Proj4js.common.COS_67P5?c/f-h:f<=-Proj4js.common.COS_67P5?c/-f-h:d/b+h*(this.es-1);i==!1&&(g=Math.atan(b/f));a.x=e;a.y=g;a.z=d;return a},geocentric_to_wgs84:function(a){if(this.datum_type==Proj4js.common.PJD_3PARAM)a.x+=this.datum_params[0],a.y+=this.datum_params[1],a.z+=this.datum_params[2];else if(this.datum_type==Proj4js.common.PJD_7PARAM){var c=this.datum_params[3],b=this.datum_params[4],
d=this.datum_params[5],e=this.datum_params[6],g=e*(d*a.x+a.y-c*a.z)+this.datum_params[1],c=e*(-b*a.x+c*a.y+a.z)+this.datum_params[2];a.x=e*(a.x-d*a.y+b*a.z)+this.datum_params[0];a.y=g;a.z=c}},geocentric_from_wgs84:function(a){if(this.datum_type==Proj4js.common.PJD_3PARAM)a.x-=this.datum_params[0],a.y-=this.datum_params[1],a.z-=this.datum_params[2];else if(this.datum_type==Proj4js.common.PJD_7PARAM){var c=this.datum_params[3],b=this.datum_params[4],d=this.datum_params[5],e=this.datum_params[6],g=(a.x-
this.datum_params[0])/e,f=(a.y-this.datum_params[1])/e,e=(a.z-this.datum_params[2])/e;a.x=g+d*f-b*e;a.y=-d*g+f+c*e;a.z=b*g-c*f+e}}});
Proj4js.Point=Proj4js.Class({initialize:function(a,c,b){typeof a=="object"?(this.x=a[0],this.y=a[1],this.z=a[2]||0):typeof a=="string"&&typeof c=="undefined"?(a=a.split(","),this.x=parseFloat(a[0]),this.y=parseFloat(a[1]),this.z=parseFloat(a[2])||0):(this.x=a,this.y=c,this.z=b||0)},clone:function(){return new Proj4js.Point(this.x,this.y,this.z)},toString:function(){return"x="+this.x+",y="+this.y},toShortString:function(){return this.x+", "+this.y}});
Proj4js.PrimeMeridian={greenwich:0,lisbon:-9.131906111111,paris:2.337229166667,bogota:-74.080916666667,madrid:-3.687938888889,rome:12.452333333333,bern:7.439583333333,jakarta:106.807719444444,ferro:-17.666666666667,brussels:4.367975,stockholm:18.058277777778,athens:23.7163375,oslo:10.722916666667};
Proj4js.Ellipsoid={MERIT:{a:6378137,rf:298.257,ellipseName:"MERIT 1983"},SGS85:{a:6378136,rf:298.257,ellipseName:"Soviet Geodetic System 85"},GRS80:{a:6378137,rf:298.257222101,ellipseName:"GRS 1980(IUGG, 1980)"},IAU76:{a:6378140,rf:298.257,ellipseName:"IAU 1976"},airy:{a:6377563.396,b:6356256.91,ellipseName:"Airy 1830"},"APL4.":{a:6378137,rf:298.25,ellipseName:"Appl. Physics. 1965"},NWL9D:{a:6378145,rf:298.25,ellipseName:"Naval Weapons Lab., 1965"},mod_airy:{a:6377340.189,b:6356034.446,ellipseName:"Modified Airy"},
andrae:{a:6377104.43,rf:300,ellipseName:"Andrae 1876 (Den., Iclnd.)"},aust_SA:{a:6378160,rf:298.25,ellipseName:"Australian Natl & S. Amer. 1969"},GRS67:{a:6378160,rf:298.247167427,ellipseName:"GRS 67(IUGG 1967)"},bessel:{a:6377397.155,rf:299.1528128,ellipseName:"Bessel 1841"},bess_nam:{a:6377483.865,rf:299.1528128,ellipseName:"Bessel 1841 (Namibia)"},clrk66:{a:6378206.4,b:6356583.8,ellipseName:"Clarke 1866"},clrk80:{a:6378249.145,rf:293.4663,ellipseName:"Clarke 1880 mod."},CPM:{a:6375738.7,rf:334.29,
ellipseName:"Comm. des Poids et Mesures 1799"},delmbr:{a:6376428,rf:311.5,ellipseName:"Delambre 1810 (Belgium)"},engelis:{a:6378136.05,rf:298.2566,ellipseName:"Engelis 1985"},evrst30:{a:6377276.345,rf:300.8017,ellipseName:"Everest 1830"},evrst48:{a:6377304.063,rf:300.8017,ellipseName:"Everest 1948"},evrst56:{a:6377301.243,rf:300.8017,ellipseName:"Everest 1956"},evrst69:{a:6377295.664,rf:300.8017,ellipseName:"Everest 1969"},evrstSS:{a:6377298.556,rf:300.8017,ellipseName:"Everest (Sabah & Sarawak)"},
fschr60:{a:6378166,rf:298.3,ellipseName:"Fischer (Mercury Datum) 1960"},fschr60m:{a:6378155,rf:298.3,ellipseName:"Fischer 1960"},fschr68:{a:6378150,rf:298.3,ellipseName:"Fischer 1968"},helmert:{a:6378200,rf:298.3,ellipseName:"Helmert 1906"},hough:{a:6378270,rf:297,ellipseName:"Hough"},intl:{a:6378388,rf:297,ellipseName:"International 1909 (Hayford)"},kaula:{a:6378163,rf:298.24,ellipseName:"Kaula 1961"},lerch:{a:6378139,rf:298.257,ellipseName:"Lerch 1979"},mprts:{a:6397300,rf:191,ellipseName:"Maupertius 1738"},
new_intl:{a:6378157.5,b:6356772.2,ellipseName:"New International 1967"},plessis:{a:6376523,rf:6355863,ellipseName:"Plessis 1817 (France)"},krass:{a:6378245,rf:298.3,ellipseName:"Krassovsky, 1942"},SEasia:{a:6378155,b:6356773.3205,ellipseName:"Southeast Asia"},walbeck:{a:6376896,b:6355834.8467,ellipseName:"Walbeck"},WGS60:{a:6378165,rf:298.3,ellipseName:"WGS 60"},WGS66:{a:6378145,rf:298.25,ellipseName:"WGS 66"},WGS72:{a:6378135,rf:298.26,ellipseName:"WGS 72"},WGS84:{a:6378137,rf:298.257223563,ellipseName:"WGS 84"},
sphere:{a:6370997,b:6370997,ellipseName:"Normal Sphere (r=6370997)"}};
Proj4js.Datum={WGS84:{towgs84:"0,0,0",ellipse:"WGS84",datumName:"WGS84"},GGRS87:{towgs84:"-199.87,74.79,246.62",ellipse:"GRS80",datumName:"Greek_Geodetic_Reference_System_1987"},NAD83:{towgs84:"0,0,0",ellipse:"GRS80",datumName:"North_American_Datum_1983"},NAD27:{nadgrids:"@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",ellipse:"clrk66",datumName:"North_American_Datum_1927"},potsdam:{towgs84:"606.0,23.0,413.0",ellipse:"bessel",datumName:"Potsdam Rauenberg 1950 DHDN"},carthage:{towgs84:"-263.0,6.0,431.0",
ellipse:"clark80",datumName:"Carthage 1934 Tunisia"},hermannskogel:{towgs84:"653.0,-212.0,449.0",ellipse:"bessel",datumName:"Hermannskogel"},ire65:{towgs84:"482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",ellipse:"mod_airy",datumName:"Ireland 1965"},nzgd49:{towgs84:"59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",ellipse:"intl",datumName:"New Zealand Geodetic Datum 1949"},OSGB36:{towgs84:"446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",ellipse:"airy",datumName:"Airy 1830"}};
Proj4js.WGS84=new Proj4js.Proj("WGS84");Proj4js.Datum.OSB36=Proj4js.Datum.OSGB36;Proj4js.wktProjections={"Lambert Tangential Conformal Conic Projection":"lcc",Mercator:"merc","Popular Visualisation Pseudo Mercator":"merc",Mercator_1SP:"merc",Transverse_Mercator:"tmerc","Transverse Mercator":"tmerc","Lambert Azimuthal Equal Area":"laea","Universal Transverse Mercator System":"utm"};
Proj4js.Proj.utm={dependsOn:"tmerc",init:function(){this.zone?(this.lat0=0,this.long0=(6*Math.abs(this.zone)-183)*Proj4js.common.D2R,this.x0=5E5,this.y0=this.utmSouth?1E7:0,this.k0=0.9996,Proj4js.Proj.tmerc.init.apply(this),this.forward=Proj4js.Proj.tmerc.forward,this.inverse=Proj4js.Proj.tmerc.inverse):Proj4js.reportError("utm:init: zone must be specified for UTM")}};
Proj4js.Proj.tmerc={init:function(){this.e0=Proj4js.common.e0fn(this.es);this.e1=Proj4js.common.e1fn(this.es);this.e2=Proj4js.common.e2fn(this.es);this.e3=Proj4js.common.e3fn(this.es);this.ml0=this.a*Proj4js.common.mlfn(this.e0,this.e1,this.e2,this.e3,this.lat0)},forward:function(a){var c=a.y,b=Proj4js.common.adjust_lon(a.x-this.long0),d,e;d=Math.sin(c);var g=Math.cos(c);if(this.sphere){var f=g*Math.sin(b);if(Math.abs(Math.abs(f)-1)<1.0E-10)return Proj4js.reportError("tmerc:forward: Point projects into infinity"),
93;else e=0.5*this.a*this.k0*Math.log((1+f)/(1-f)),d=Math.acos(g*Math.cos(b)/Math.sqrt(1-f*f)),c<0&&(d=-d),c=this.a*this.k0*(d-this.lat0)}else{e=g*b;var b=Math.pow(e,2),g=this.ep2*Math.pow(g,2),f=Math.tan(c),h=Math.pow(f,2);d=1-this.es*Math.pow(d,2);d=this.a/Math.sqrt(d);c=this.a*Proj4js.common.mlfn(this.e0,this.e1,this.e2,this.e3,c);e=this.k0*d*e*(1+b/6*(1-h+g+b/20*(5-18*h+Math.pow(h,2)+72*g-58*this.ep2)))+this.x0;c=this.k0*(c-this.ml0+d*f*b*(0.5+b/24*(5-h+9*g+4*Math.pow(g,2)+b/30*(61-58*h+Math.pow(h,
2)+600*g-330*this.ep2))))+this.y0}a.x=e;a.y=c;return a},inverse:function(a){var c,b,d,e;if(this.sphere){b=Math.exp(a.x/(this.a*this.k0));var g=0.5*(b-1/b);d=this.lat0+a.y/(this.a*this.k0);e=Math.cos(d);c=Math.sqrt((1-e*e)/(1+g*g));b=Proj4js.common.asinz(c);d<0&&(b=-b);c=g==0&&e==0?this.long0:Proj4js.common.adjust_lon(Math.atan2(g,e)+this.long0)}else{var g=a.x-this.x0,f=a.y-this.y0;b=c=(this.ml0+f/this.k0)/this.a;for(e=0;;e++){d=(c+this.e1*Math.sin(2*b)-this.e2*Math.sin(4*b)+this.e3*Math.sin(6*b))/
this.e0-b;b+=d;if(Math.abs(d)<=Proj4js.common.EPSLN)break;if(e>=6)return Proj4js.reportError("tmerc:inverse: Latitude failed to converge"),95}if(Math.abs(b)<Proj4js.common.HALF_PI){c=Math.sin(b);d=Math.cos(b);var h=Math.tan(b);e=this.ep2*Math.pow(d,2);var f=Math.pow(e,2),i=Math.pow(h,2),l=Math.pow(i,2);c=1-this.es*Math.pow(c,2);var k=this.a/Math.sqrt(c);c=k*(1-this.es)/c;g/=k*this.k0;var j=Math.pow(g,2);b-=k*h*j/c*(0.5-j/24*(5+3*i+10*e-4*f-9*this.ep2-j/30*(61+90*i+298*e+45*l-252*this.ep2-3*f)));c=
Proj4js.common.adjust_lon(this.long0+g*(1-j/6*(1+2*i+e-j/20*(5-2*e+28*i-3*f+8*this.ep2+24*l)))/d)}else b=Proj4js.common.HALF_PI*Proj4js.common.sign(f),c=this.long0}a.x=c;a.y=b;return a}};
Proj4js.Proj.merc={init:function(){if(this.lat_ts)this.k0=this.sphere?Math.cos(this.lat_ts):Proj4js.common.msfnz(this.es,Math.sin(this.lat_ts),Math.cos(this.lat_ts))},forward:function(a){var c=a.x,b=a.y;if(b*Proj4js.common.R2D>90&&b*Proj4js.common.R2D<-90&&c*Proj4js.common.R2D>180&&c*Proj4js.common.R2D<-180)return Proj4js.reportError("merc:forward: llInputOutOfRange: "+c+" : "+b),null;if(Math.abs(Math.abs(b)-Proj4js.common.HALF_PI)<=Proj4js.common.EPSLN)return Proj4js.reportError("merc:forward: ll2mAtPoles"),
null;else{if(this.sphere)c=this.x0+this.a*this.k0*Proj4js.common.adjust_lon(c-this.long0),b=this.y0+this.a*this.k0*Math.log(Math.tan(Proj4js.common.FORTPI+0.5*b));else var d=Math.sin(b),b=Proj4js.common.tsfnz(this.e,b,d),c=this.x0+this.a*this.k0*Proj4js.common.adjust_lon(c-this.long0),b=this.y0-this.a*this.k0*Math.log(b);a.x=c;a.y=b;return a}},inverse:function(a){var c=a.x-this.x0,b=a.y-this.y0;if(this.sphere)b=Proj4js.common.HALF_PI-2*Math.atan(Math.exp(-b/this.a*this.k0));else if(b=Math.exp(-b/
(this.a*this.k0)),b=Proj4js.common.phi2z(this.e,b),b==-9999)return Proj4js.reportError("merc:inverse: lat = -9999"),null;c=Proj4js.common.adjust_lon(this.long0+c/(this.a*this.k0));a.x=c;a.y=b;return a}};Proj4js.defs["EPSG:25832"]="+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs";Proj4js.defs.GOOGLE="+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs";Proj4js.defs["EPSG:900913"]=Proj4js.defs.GOOGLE;
