const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const axios = require('axios')

//Load env vars
dotenv.config({ path: './config/config.env' })

//Route files

const app = express()
app.use(cors())

app.get('/api/v1/my-gallery', async (req, res) => {
  const galleryIds = [
    '72157720409510023',
    '72157720607928857',
    '72157720530279238',
    '72157720529928239',
    '72157720474604239',
    '72157720411155991',
    '72157720471687824',
  ]
  let id = galleryIds[Math.floor(Math.random() * galleryIds.length)]
  //let url = `https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${process.env.API_KEY}&gallery_id=72157720607928857&get_gallery_info=&format=json&nojsoncallback=1`
  let url = `https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${process.env.API_KEY}&gallery_id=${id}&get_gallery_info=&format=json&nojsoncallback=1`
  try {
    const { data } = await axios.get(url)
    const list = data.photos.photo.map((photo) => {
      return {
        id: photo.id,
        title: photo.title,
        url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
      }
    })

    res.status(200).json({
      status: 'success',
      list,
    })
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    })
  }
})

const PORT = process.env.PORT || 6000

app.listen(PORT, () => {
  console.log(`Server running on port  ${PORT} `)
})
