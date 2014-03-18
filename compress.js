/*common*/
/**
 * canvas图片压缩
 * @author yaoyao
 * @param  {[Object]} opt [配置参数]
 * @param  {[Function]} cbk [回调函数]
 * @return {[Void]}
 * example:
 * var opt = {
	'type' : 1,//为1为预览，建议不为1或后期进行改进
	'file' : "#loadFile"//文件上传控件
},_compress = require('app/compress');
_compress(opt,function (result) {
	console.log(result)
});
 */
function writeDom (opt,cbk) {
	var _opt = opt,
		_cbk = cbk;
    $('#img,#_canvas,#img-c').remove();
	$('body').append($('<canvas id="_canvas" style="display: none;"></canvas><img id="img-c" src="" style="display:none;"/><img id="img" src="" style="width:300px;"/>'));
	_image = new Image();
    _image.src = _opt.src || "";
    $('#img-c').attr('src',_opt.src)[0].onload = function(){
        var _this = $(this);
        var _canvas=document.getElementById('_canvas');
        _canvas.width = _this.width();
        _canvas.height = _this.height();
        var _context=_canvas.getContext('2d');
        _context.drawImage(_image,0,0);
        if (_opt.type) {$('#img').attr('src',_canvas.toDataURL('image/jpeg',_opt.scale));};
        _cbk(_canvas.toDataURL('image/jpeg',_opt.scale));
    };
}
var result = '';
return function(opt,cbk){
	var _opt = {
		'type' : opt.type || 0,
		'file' : opt.file ? $(opt.file) : $("#loadFile")
	},
	_file = _opt.file,
	_cbk = cbk || function(){};
	_file.change(function(){
	    var file = $(this)[0].files[0];
	    var fReader = new FileReader();
	    fReader.readAsDataURL(file);
	    fReader.onload = function (e){
	        var _num = +prompt('请输入压缩比例');
	        if (isNaN(_num)) {_num = 1};
	        _opt.scale = _num;
	        result = _opt.src = this.result;
	        writeDom(_opt,_cbk);
	    };
	});
}
