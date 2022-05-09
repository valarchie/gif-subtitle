import utils from "./utils";
import SuperGif from "libgif";
import gifshot from "./gifshot"
import config from "../config/config"

function readFile() {
  console.log("读取了文件");
}

async function readGif() {
  let gifFile = "/src/assets/wangjingze.gif";

  let res = await utils.CheckImgExists(gifFile);

  var gifImg;

  if(res) {
    gifImg= createImgElement(gifFile);
  }else {
    console.error('输入的不是gif 文件');
  }

 

  

  var rub = new SuperGif({ gif: gifImg });
  var img_list = [];
  await readEveryFrames(rub, img_list);


  // let subtitleConfigStr = "/src/assets/gif-subtitle-config.json";
  let subtitleConfigs = config.subtitleConfig;
  var subtitles = new Array();

  for (let index = 0; index < subtitleConfigs.subtitles.length; index++) {
    const element = subtitleConfigs.subtitles[index];

    for (let subIndex = element.startFrameIndex; subIndex < element.startFrameIndex + element.duration ; subIndex++) {
      subtitles[subIndex] = element.text;
    }
  }

  console.log("读取到的多少帧" + img_list.length);

  var image_list_with_subtitle = [];
  for (let index = 0; index < img_list.length; index++) {
    image_list_with_subtitle.push({
        src:img_list[index],
        text: subtitles[index] ? subtitles[index] : ""
    })
      
  }

  console.log(image_list_with_subtitle);


  gifshot.createGIF({
    'images': image_list_with_subtitle,

  },function(obj) {
    if(!obj.error) {
      var image = obj.image,
      animatedImage = document.getElementById("archie");
    //   animatedImage1 = document.getElementById("archie");
      animatedImage.src = image;
    //   document.body.appendChild(animatedImage);
    }
  });

 
 
  console.log(rub);

  console.log(res);
}

async function readEveryFrames(rub, image_list) {
  return new Promise((resolve, reject) => {
    rub.load(() => {
      console.log("长度：" + rub.get_length());

      for (let i = 1; i <= rub.get_length(); i++) {
        // 遍历gif实例的每一帧
        rub.move_to(i);
        // 将每一帧的canvas转换成file对象
        let cur_file = rub.get_canvas().toDataURL();
        //   console.log(cur_file);
        image_list.push(cur_file);
      }
      resolve();
    });
    
  });
}

function convertCanvasToImage(canvas, filename) {
  return this.dataURLtoFile(canvas.toDataURL("image/png"), filename);
}

function createImgElement(gifFile) {
  const gifImg = document.createElement("img");
  // gif库需要img标签配置下面两个属性
  gifImg.setAttribute("rel:animated_src", gifFile);
  gifImg.setAttribute("rel:auto_play", "0");

  const div = document.createElement("div");
  div.appendChild(gifImg); //防止报错
  return gifImg;
}


export default {
  readFile,
  readGif,
};
