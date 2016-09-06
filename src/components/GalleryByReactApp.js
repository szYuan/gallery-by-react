'use strict';

var React = require('react/addons');

// CSS
require('normalize.css');
require('../styles/main.scss');

//引入图片数据json文件
var imageDatas = require('../data/imageDatas.json');

// var imageURL = require('../images/yeoman.png');

// function genImageURL(imageDatasArr){
//   for (var i = 0; i < imageDatasArr.length; i++) {
//     var sigleImageData=imageDatasArr[i];
//     singleImageData.imageURL=require('../images/'+singleImageData.fileName);
//     imageDatasArr[i]=singleImageData;
//   }
//   return imageDatasArr;
// }
// imageDatas=genImageURL(imageDatas);
//上面方法优化后VVV
imageDatas = (function(imageDatasArr){//将json文件读取后，为每个图片数据赋值url。
  for (var i = 0; i < imageDatasArr.length; i++) {
    var singleImageData = imageDatasArr[i];
    singleImageData.imageURL = require('../images/' + singleImageData.fileName);
    imageDatasArr[i] = singleImageData;
  }
  return imageDatasArr;
})(imageDatas);

var GalleryByReactApp = React.createClass({
  render: function() {
    return (
      <section className="stage">
        <section className="img-sec">
        </section>
        <nav className="controller-nav">
        </nav>
      </section>
    );
  }
});
React.render(<GalleryByReactApp />, document.getElementById('content')); // jshint ignore:line

module.exports = GalleryByReactApp;
