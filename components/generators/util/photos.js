import domToImage from 'dom-to-image'

export async function ExportPhoto(photoName) {
  console.log('hi')
  const defaultPic = new Image()
  defaultPic.src = '/generators/DefaultTeamPic.png'
  defaultPic.onload = async (e) => {
    const canvas = document.createElement('canvas')
    canvas.height = defaultPic.height
    canvas.width = defaultPic.width
    canvas.style = { backgroundColor: 'transparent' }
    const context = canvas.getContext('2d')
    context.drawImage(defaultPic, 0, 0)
    const photoArea = document.getElementById('photo-area')
    const scale = 1920 / photoArea.clientWidth
    const blob = await domToImage.toJpeg(photoArea, {
      imagePlaceholder: canvas.toDataURL('image/png'),
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      },
      height: 1080,
      width: 1920,
    })
    const link = document.createElement('a')
    link.download = `${photoName}.jpg`
    link.href = blob
    link.click()
  }
}
