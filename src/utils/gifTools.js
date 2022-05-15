import SuperGif from 'libgif'
import gifshot from './gifshot'
import config from '../config/config'

async function readGif(url) {
  var gifImg = createImgElement(url)

  var superGif = new SuperGif({ gif: gifImg })
  console.log('gif has been read:')
  console.log(superGif)
  return superGif
}

async function renderGifWithSubtitle(url, subtitleConfigs, fontSetting, isSlowMotion, elementRef) {
  console.log(elementRef)
  console.log(subtitleConfigs)

  var superGif = await readGif(url)
  var img_list = []
  await readEveryFrames(superGif, img_list)

  var image_list_with_subtitle = fillImageWithSubtitles(subtitleConfigs, img_list, isSlowMotion)
  console.log(image_list_with_subtitle)

  gifshot.createGIF(
    {
      images: image_list_with_subtitle,
      frameDuration: isSlowMotion ? 2 : 1,
      fontColor: fontSetting ? fontSetting.fontColor : '#ffffff',
      fontSize: fontSetting ? fontSetting.size : '16px'
    },
    function (obj) {
      if (!obj.error) {
        elementRef.url = obj.image
        // if not use vue, we just operate DOM
        // var animatedImage2 = document.getElementById("archie");
        // animatedImage.data.src = image;
        // document.body.appendChild(animatedImage);
      } else {
        console.log(obj)
      }
    }
  )
}

async function readEveryFrames(rub, image_list) {
  return new Promise((resolve, reject) => {
    rub.load(() => {
      console.log('gif length：' + rub.get_length())

      for (let i = 1; i <= rub.get_length(); i++) {
        // loop every frame of Gif
        rub.move_to(i)
        // convert every frame from canvas to file Object
        let cur_file = rub.get_canvas().toDataURL()
        // console.log(cur_file);
        image_list.push(cur_file)
      }
      resolve()
    })
  })
}

function fillImageWithSubtitles(subtitleConfigs, img_list, isSlowMotion) {
  var subtitles = new Array()

  if (subtitleConfigs) {
    for (let index = 0; index < subtitleConfigs.length; index++) {
      const element = subtitleConfigs[index]
      // check subtitle index
      if (
        element.startFrameIndex < 0 ||
        element.startFrameIndex > img_list.length ||
        element.endFrameIndex < 0 ||
        element.endFrameIndex.index > img_list.length
      ) {
        throw Error('frame index is wrong, out of array.')
      }

      for (let subIndex = element.startFrameIndex; subIndex < element.endFrameIndex; subIndex++) {
        subtitles[subIndex] = element.text
      }
    }
  }

  var image_list_with_subtitle = []
  for (let index = 0; index < img_list.length; index++) {
    let defaultText = isSlowMotion ? index : ''
    image_list_with_subtitle.push({
      src: img_list[index],
      text: index < subtitles.length && subtitles[index] ? subtitles[index] : defaultText
    })
  }
  return image_list_with_subtitle
}

function createImgElement(gifFile) {
  const gifImg = document.createElement('img')
  // gifshot library need input these two attributes in img tag
  gifImg.setAttribute('rel:animated_src', gifFile)
  gifImg.setAttribute('rel:auto_play', '0')

  const div = document.createElement('div')
  div.appendChild(gifImg) //in case throw error
  return gifImg
}

export default {
  readGif,
  renderGifWithSubtitle
}
