/*
Copyright 2012, KISSY UI Library v1.30dev
MIT Licensed
build time: May 24 18:37
*/
KISSY.add("editor/plugin/flash/dialog",function(g,d,h,f,i){function e(a){this.editor=a;d.Utils.lazyRun(this,"_prepareShow","_realShow");this._config()}var j=f.Dialog;g.augment(e,{addRes:d.Utils.addRes,destroyRes:d.Utils.destroyRes,_config:function(){this._urlTip="请输入如 http://www.xxx.com/xxx.swf";this._type="flash";this._cls="ke_flash";this._config_dwidth="400px";this._title="Flash";this._bodyHtml="<div style='padding:20px 20px 0 20px'><p><label>网址： <input  data-verify='^https?://[^\\s]+$'  data-warning='网址格式为：http://' class='ke-flash-url ke-input' style='width:300px;vertical-align:middle' /></label></p><table style='margin:10px 0 5px  40px;width:300px;'><tr><td><label>宽度： <input  data-verify='^(?!0$)\\d+$'  data-warning='宽度请输入正整数' class='ke-flash-width ke-input' style='width:60px;margin-left:2px;vertical-align:middle' /> 像素 </label></td><td><label>高度：<input  data-verify='^(?!0$)\\d+$'  data-warning='高度请输入正整数' class='ke-flash-height ke-input' style='width:60px;vertical-align:middle' /> 像素 </label></td></tr><tr><td><label>对齐： <select class='ke-flash-align' title='对齐'><option value='none'>无</option><option value='left'>左对齐</option><option value='right'>右对齐</option></select></td><td><label>间距：<input  data-verify='^\\d+$'  data-warning='间距请输入非负整数' class='ke-flash-margin ke-input' style='width:60px;vertical-align:middle' value='5'/> 像素</label></td></tr></table></div>";
this._footHtml="<div style='padding:5px 20px 20px;'><a class='ke-flash-ok ke-button' style='margin-left:40px;margin-right:20px;'>确定</a> <a class='ke-flash-cancel ke-button'>取消</a></div>"},_prepareShow:function(){this.dialog=new j({autoRender:!0,headerContent:this._title,bodyContent:this._bodyHtml,footerContent:this._footHtml,width:this._config_dwidth||"500px",mask:!0});this.addRes(this.dialog);this._initD()},_realShow:function(){this._updateD();this.dialog.show()},_getFlashUrl:function(a){return h.getUrl(a)},
_updateD:function(){var a=this.editor,b=a.get("pluginConfig").flash||{},c=this.selectedFlash;if(c){if(a=a.restoreRealElement(c))c.css("width")&&this.dWidth.val(parseInt(c.css("width"))),c.css("height")&&this.dHeight.val(parseInt(c.css("height"))),this.dAlign.val(c.css("float")),d.Utils.valInput(this.dUrl,this._getFlashUrl(a)),this.dMargin.val(parseInt(a.style("margin"))||0)}else d.Utils.resetInput(this.dUrl),this.dWidth.val(b.defaultWidth||""),this.dHeight.val(b.defaultHeight||""),this.dAlign.val("none"),
this.dMargin.val("5")},show:function(a){this.selectedFlash=a;this._prepareShow()},_initD:function(){var a=this.dialog,b=a.get("el");this.dHeight=b.one(".ke-flash-height");this.dWidth=b.one(".ke-flash-width");this.dUrl=b.one(".ke-flash-url");this.dAlign=i.decorate(b.one(".ke-flash-align"));this.dMargin=b.one(".ke-flash-margin");var c=b.one(".ke-flash-ok"),b=b.one(".ke-flash-cancel");c.on("click",this._gen,this);b.on("click",function(b){a.hide();b&&b.halt()});d.Utils.placeholder(this.dUrl,this._urlTip);
this.addRes(c,b,this.dUrl)},_getDInfo:function(){return{url:this.dUrl.val(),attrs:{width:this.dWidth.val(),height:this.dHeight.val(),style:"margin:"+(parseInt(this.dMargin.val())||0)+"px;float:"+this.dAlign.val()+";"}}},_gen:function(a){a&&a.halt();var b=this,c=b.editor,e=(a=b._getDInfo())&&g.trim(a.url),f=a&&a.attrs;a&&d.Utils.verifyInputs(b.dialog.get("el").all("input"))&&(b.dialog.hide(),h.insertFlash(c,e,f,b._cls,b._type,function(a){b.selectedFlash&&c.getSelection().selectElement(a);c.notifySelectionChange()}))},
destroy:function(){this.destroyRes()}});return e},{requires:["editor","../flashCommon/utils","../overlay/","../select/"]});